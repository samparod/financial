import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

process.env.STATE_MEMORY = "1";

const snap = path.join(process.cwd(), "data", "memory-snapshot.json");
if (fs.existsSync(snap)) fs.unlinkSync(snap);

const { loadState, saveState } = await import("../src/lib/persist.ts");
const { resetMemoryState } = await import("../src/lib/memory-state.ts");

test("memory server: /api/state backend round-trip in RAM", async () => {
  resetMemoryState();
  const a = await loadState();
  assert.ok(Array.isArray(a.plProducts));
  const n = a.plProducts.length;
  await saveState({
    ...a,
    plProducts: [
      ...a.plProducts,
      {
        id: "mem-test",
        region: "gulf",
        name: "RAM",
        productCost: 1,
        leads: 0,
        orders: 0,
        delivered: 0,
        totalSales: 0,
        adsSpend: 0,
        testSpend: 0,
        adAccount: 0,
        bonus: 0,
        currency: "USD",
      },
    ],
  });
  resetMemoryState();
  const b = await loadState();
  assert.equal(b.plProducts.length, n + 1);
  assert.ok(fs.existsSync(snap), "snapshot on disk for restart");
});
