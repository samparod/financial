// Regression tests for the store hydration flag.
// Run with: npm test   (uses the Node built-in test runner, no dependencies)

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const storeSource = readFileSync(join(root, "src/lib/store.ts"), "utf8");

function memoryStorage(seed) {
  const mem = new Map(Object.entries(seed ?? {}));
  return {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => mem.set(k, v),
    removeItem: (k) => mem.delete(k),
  };
}

test("onRehydrateStorage does not reference the store binding", () => {
  // zustand runs this callback synchronously inside create(), before the
  // exported `useCod` binding is assigned. Touching it there throws a TDZ
  // ReferenceError that zustand swallows, leaving `hydrated` false forever.
  const match = storeSource.match(/onRehydrateStorage:[\s\S]*?\n {6}\},/);
  assert.ok(match, "onRehydrateStorage block not found in store.ts");
  assert.ok(
    !/useCod\./.test(match[0]),
    "onRehydrateStorage must not touch `useCod` — use the `state` argument instead"
  );
});

test("rehydration sets hydrated via the state argument", () => {
  const storage = memoryStorage({
    "hydration-probe": JSON.stringify({ state: { value: 7 }, version: 0 }),
  });

  const store = createStore(
    persist(
      (set) => ({
        value: 0,
        hydrated: false,
        setHydrated: (v) => set({ hydrated: v }),
      }),
      {
        name: "hydration-probe",
        storage: createJSONStorage(() => storage),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    )
  );

  assert.equal(store.getState().hydrated, true, "hydrated must be true after create()");
  assert.equal(store.getState().value, 7, "persisted value must be restored");
});

test("first run with empty storage still marks hydrated", () => {
  const store = createStore(
    persist(
      (set) => ({
        value: 0,
        hydrated: false,
        setHydrated: (v) => set({ hydrated: v }),
      }),
      {
        name: "absent-key",
        storage: createJSONStorage(() => memoryStorage()),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      }
    )
  );

  assert.equal(store.getState().hydrated, true, "a fresh install must not hang on loading");
});
