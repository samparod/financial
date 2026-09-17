import { test } from "node:test";
import assert from "node:assert/strict";

import {
  getRowColumn,
  normalizeQueryRows,
  parseAppStateData,
  workspaceRecordFromRows,
} from "../src/lib/db-rows.ts";

function pick(s) {
  return {
    settings: s.settings,
    plProducts: s.plProducts,
    operations: s.operations,
    stability: s.stability,
    stock: s.stock,
    cash: s.cash,
    shipments: s.shipments,
    winners: s.winners,
  };
}

const sample = {
  settings: { usdToDzd: 1 },
  plProducts: [{ id: "g-b", productCost: 5.25 }],
  operations: [],
  stability: {},
  stock: [],
  cash: [],
  shipments: [],
  winners: [],
};

const seed = {
  settings: { usdToDzd: 245 },
  plProducts: [{ id: "g-b", productCost: 5 }],
  operations: [],
  stability: {},
  stock: [],
  cash: [],
  shipments: [],
  winners: [],
};

test("normalizeQueryRows accepts neon fullResults, arrays, and waddler-undefined", () => {
  assert.deepEqual(normalizeQueryRows(undefined), []);
  assert.deepEqual(normalizeQueryRows(null), []);

  const objRow = { data: sample, updated_at: "2026-09-17T12:00:00.000Z" };
  assert.equal(normalizeQueryRows([objRow])[0].data, sample);
  assert.equal(normalizeQueryRows({ rows: [objRow] })[0].data, sample);
  assert.equal(normalizeQueryRows({ data: [objRow], rowCount: 1 })[0].data, sample);
  assert.equal(normalizeQueryRows(objRow).length, 1);
  assert.equal(getRowColumn(normalizeQueryRows([[sample, "2026-09-17"]])[0], "data"), sample);
});

test("empty:true only when no row or SQL NULL data", () => {
  const missing = workspaceRecordFromRows([], pick, seed);
  assert.equal(missing.empty, true);
  assert.equal(missing.state?.plProducts[0].productCost, 5);

  const nullData = workspaceRecordFromRows(
    [{ data: null, updated_at: "2026-09-17T12:00:00.000Z" }],
    pick,
    seed
  );
  assert.equal(nullData.empty, true);
  assert.equal(nullData.updatedAt, "2026-09-17T12:00:00.000Z");

  const found = workspaceRecordFromRows(
    [{ data: sample, updated_at: "2026-09-17T12:00:00.000Z" }],
    pick,
    seed
  );
  assert.equal(found.empty, false);
  assert.equal(found.corrupt, undefined);
  assert.equal(found.state?.plProducts[0].productCost, 5.25);
  assert.equal(found.updatedAt, "2026-09-17T12:00:00.000Z");
});

test("array-mode rows and camelCase updatedAt still count as a persisted row", () => {
  const rec = workspaceRecordFromRows([[sample, new Date("2026-09-17T12:00:00Z")]], pick, seed);
  assert.equal(rec.empty, false);
  assert.equal(rec.state?.plProducts[0].productCost, 5.25);
  assert.ok(rec.updatedAt);

  const camel = workspaceRecordFromRows([{ data: sample, updatedAt: "ts" }], pick, seed);
  assert.equal(camel.empty, false);
  assert.equal(camel.updatedAt, "ts");
});

test("double-encoded JSON and { state } wraps still parse", () => {
  const once = JSON.stringify(sample);
  const twice = JSON.stringify(once);
  assert.equal(parseAppStateData(twice, pick)?.plProducts[0].productCost, 5.25);
  assert.equal(parseAppStateData({ state: sample }, pick)?.plProducts[0].productCost, 5.25);
  assert.equal(parseAppStateData(Buffer.from(once, "utf8"), pick)?.plProducts[0].productCost, 5.25);
});

test("a present unreadable data column is corrupt, not empty", () => {
  const rec = workspaceRecordFromRows([{ data: "not-json", updated_at: "ts" }], pick, seed);
  assert.equal(rec.empty, false);
  assert.equal(rec.corrupt, true);
  assert.equal(rec.state, null);
});
