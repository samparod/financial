// Tests for the pure calculation layer. cod.ts has no runtime imports, so Node
// can strip its types and run it directly — no build step, no dependencies.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  stockPath,
  sellingPriceUsd,
  migrateSettings,
  DEFAULT_PRICING,
  DEFAULT_GULF_FEES,
} from "../src/lib/cod.ts";

function item(over = {}) {
  return {
    id: "x",
    region: "algeria",
    name: "probe",
    qty: 500,
    dailySales: 20,
    leadTimeDays: 25,
    bufferDays: 7,
    ...over,
  };
}

test("horizon covers a near stock-out with the 32-day floor", () => {
  const p = stockPath(item({ qty: 100, dailySales: 20 }));
  assert.equal(p.stockZeroDay, 5);
  assert.equal(p.horizon, 32, "short paths keep the original 32-day window");
  assert.equal(p.days.length, 32);
});

test("horizon stretches past 32 days when stock lasts longer", () => {
  const p = stockPath(item({ qty: 1000, dailySales: 20 }));
  assert.equal(p.stockZeroDay, 50);
  assert.ok(p.horizon > 50, `horizon ${p.horizon} must reach past the stock-out day`);
  assert.equal(p.days.length, p.horizon);
  assert.ok(
    p.days.some((d) => d.event === "road.evZero"),
    "the stock-out day must be inside the returned window"
  );
});

test("horizon is capped at 90 days", () => {
  const p = stockPath(item({ qty: 100000, dailySales: 1 }));
  assert.equal(p.horizon, 90);
  assert.equal(p.days.length, 90);
});

test("events are i18n keys, never display text", () => {
  const p = stockPath(item({ qty: 100, dailySales: 20 }));
  const events = p.days.map((d) => d.event).filter(Boolean);
  assert.ok(events.length > 0, "expected at least one marked event");
  for (const e of events) {
    assert.match(e, /^road\.ev/, `"${e}" is not an i18n key`);
  }
});

test("sellingPriceUsd keeps the historical numbers by default", () => {
  // Same inputs and same result as the hardcoded 11 / 3.5 / x3 / 5% version.
  assert.equal(sellingPriceUsd(10, 0.5, 4, 20), 71.05);
});

test("target profit falls back to the pricing rules when omitted", () => {
  assert.equal(sellingPriceUsd(10, 0.5, 4), sellingPriceUsd(10, 0.5, 4, DEFAULT_PRICING.targetProfitUsd));
});

test("custom pricing rules change the price", () => {
  const cheap = sellingPriceUsd(10, 0.5, 4, 20, {
    ...DEFAULT_PRICING,
    shippingBaseUsd: 5,
    callCenterUsd: 1,
  });
  assert.ok(cheap < 71.05, `expected a lower price, got ${cheap}`);
});

test("delivered rate below 20% does not explode the shipping term", () => {
  assert.equal(sellingPriceUsd(10, 0.01, 4, 20), sellingPriceUsd(10, 0.2, 4, 20));
});

const baseSettings = {
  usdToDzd: 245,
  algeriaConfirm: 0.48,
  algeriaDelivered: 0.42,
  algeriaDeliveryDzd: 500,
  algeriaReturnDzd: 350,
  algeriaCallCenterDzd: 180,
  gulfFees: { ...DEFAULT_GULF_FEES },
  algeriaFeesUsd: { leadFee: 0.3, confirmFee: 0.6, extraPerConfirm: 0, deliveredFee: 1.2, codPercent: 0.04 },
  pricing: { ...DEFAULT_PRICING },
};

test("migration keeps every value the user already saved", () => {
  // A state saved before `pricing` existed, with customised numbers.
  const old = {
    usdToDzd: 260,
    algeriaConfirm: 0.55,
    algeriaDelivered: 0.5,
    algeriaDeliveryDzd: 600,
    algeriaReturnDzd: 400,
    algeriaCallCenterDzd: 200,
    gulfFees: { ...DEFAULT_GULF_FEES, leadFee: 0.9 },
    algeriaFeesUsd: { leadFee: 0.4, confirmFee: 0.7, extraPerConfirm: 0.1, deliveredFee: 1.5, codPercent: 0.05 },
  };

  const out = migrateSettings(old, baseSettings);

  assert.equal(out.usdToDzd, 260, "user exchange rate must survive");
  assert.equal(out.algeriaDeliveryDzd, 600);
  assert.equal(out.gulfFees.leadFee, 0.9, "customised gulf fee must survive");
  assert.equal(out.algeriaFeesUsd.deliveredFee, 1.5);
  assert.deepEqual(out.pricing, DEFAULT_PRICING, "missing pricing must be filled with defaults");
});

test("migration does not overwrite pricing the user already tuned", () => {
  const out = migrateSettings(
    { ...baseSettings, pricing: { ...DEFAULT_PRICING, targetProfitUsd: 35 } },
    baseSettings
  );
  assert.equal(out.pricing.targetProfitUsd, 35);
  assert.equal(out.pricing.shippingBaseUsd, DEFAULT_PRICING.shippingBaseUsd);
});

test("migration survives a completely empty saved state", () => {
  const out = migrateSettings(undefined, baseSettings);
  assert.deepEqual(out, baseSettings);
});

test("migration fills a half-written pricing object", () => {
  const out = migrateSettings({ pricing: { targetProfitUsd: 12 } }, baseSettings);
  assert.equal(out.pricing.targetProfitUsd, 12);
  assert.equal(out.pricing.codPercent, DEFAULT_PRICING.codPercent, "gap must be filled, not left undefined");
});
