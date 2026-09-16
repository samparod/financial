"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SEED } from "./seed";
import { landedCost, migrateSettings } from "./cod";
import type {
  AlibabaShipment,
  AppState,
  CashEntry,
  Operations,
  PlProduct,
  Region,
  Settings,
  StabilityInput,
  StockItem,
  WinningProduct,
} from "./types";

interface Store extends AppState {
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  patchSettings: (p: Partial<Settings>) => void;
  setPl: (id: string, p: Partial<PlProduct>) => void;
  addPl: (region: Region) => void;
  removePl: (id: string) => void;
  setOps: (region: Region, p: Partial<Operations>) => void;
  setStability: (region: Region, p: Partial<StabilityInput>) => void;
  setStock: (id: string, p: Partial<StockItem>) => void;
  addStock: (region: Region) => void;
  removeStock: (id: string) => void;
  addCash: (e: Omit<CashEntry, "id">) => void;
  removeCash: (id: string) => void;
  setShip: (id: string, p: Partial<AlibabaShipment>) => void;
  addShip: (region: Region) => void;
  receiveShip: (id: string) => void;
  removeShip: (id: string) => void;
  setWinner: (id: string, p: Partial<WinningProduct>) => void;
  addWinner: (region: Region) => void;
  removeWinner: (id: string) => void;
  reset: () => void;
  importState: (data: AppState) => void;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export const useCod = create<Store>()(
  persist(
    (set) => ({
      ...SEED,
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      patchSettings: (p) =>
        set((s) => ({
          settings: { ...s.settings, ...p },
          ...(p.usdToDzd != null
            ? {
                stability: {
                  ...s.stability,
                  algeria: { ...s.stability.algeria, fxToUsd: p.usdToDzd },
                },
              }
            : {}),
        })),
      setPl: (id, p) =>
        set((s) => ({
          plProducts: s.plProducts.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })),
      addPl: (region) =>
        set((s) => {
          const n = s.plProducts.filter((x) => x.region === region).length;
          const letter = n < 26 ? String.fromCharCode(65 + n) : `P${n + 1}`;
          return {
            plProducts: [
              ...s.plProducts,
              {
                id: uid(),
                region,
                name: letter,
                productCost: 0,
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
          };
        }),
      removePl: (id) => set((s) => ({ plProducts: s.plProducts.filter((x) => x.id !== id) })),
      setOps: (region, p) =>
        set((s) => ({
          operations: s.operations.map((x) => (x.region === region ? { ...x, ...p } : x)),
        })),
      setStability: (region, p) =>
        set((s) => ({
          stability: { ...s.stability, [region]: { ...s.stability[region], ...p } },
        })),
      setStock: (id, p) =>
        set((s) => ({
          stock: s.stock.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })),
      addStock: (region) =>
        set((s) => ({
          stock: [
            ...s.stock,
            {
              id: uid(),
              region,
              country: region === "algeria" ? "DZ" : "KSA",
              name: "منتج",
              sku: "SKU",
              qty: 100,
              dailySales: 5,
              leadTimeDays: 20,
              bufferDays: 5,
              unitCostUsd: 5,
              sellingPrice: 0,
              currency: region === "algeria" ? "DZD" : "USD",
              warehouse: "",
              updatedAt: new Date().toISOString().slice(0, 10),
            },
          ],
        })),
      removeStock: (id) => set((s) => ({ stock: s.stock.filter((x) => x.id !== id) })),
      addCash: (e) => set((s) => ({ cash: [...s.cash, { ...e, id: uid() }] })),
      removeCash: (id) => set((s) => ({ cash: s.cash.filter((x) => x.id !== id) })),
      setShip: (id, p) =>
        set((s) => ({
          shipments: s.shipments.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })),
      addShip: (region) =>
        set((s) => ({
          shipments: [
            ...s.shipments,
            {
              id: uid(),
              productName: "منتج علي بابا",
              supplier: "",
              alibabaUrl: "",
              chinaPrice: 3,
              weightKg: 0.2,
              seaRatePerKg: 9,
              qty: 100,
              customsPct: region === "algeria" ? 0.3 : 0.08,
              otherFees: 0,
              region,
              destination: region === "algeria" ? "DZ" : "KSA",
              status: "draft",
              orderDate: new Date().toISOString().slice(0, 10),
              productionDays: 10,
              transitDays: 20,
              note: "",
            },
          ],
        })),
      receiveShip: (id) =>
        set((s) => {
          const ship = s.shipments.find((x) => x.id === id);
          if (!ship || ship.status === "in_stock") return {};
          const L = landedCost(ship);
          const name = ship.productName.trim() || "منتج";
          const match = s.stock.find(
            (x) => x.region === ship.region && (x.name === name || x.sku === name)
          );
          const shipments = s.shipments.map((x) =>
            x.id === id ? { ...x, status: "in_stock" as const } : x
          );
          if (match) {
            return {
              shipments,
              stock: s.stock.map((x) =>
                x.id === match.id
                  ? {
                      ...x,
                      qty: x.qty + ship.qty,
                      unitCostUsd: L.perUnit,
                      updatedAt: new Date().toISOString().slice(0, 10),
                    }
                  : x
              ),
            };
          }
          return {
            shipments,
            stock: [
              ...s.stock,
              {
                id: uid(),
                region: ship.region,
                country: ship.region === "algeria" ? "DZ" : "KSA",
                name,
                sku: name,
                qty: ship.qty,
                dailySales: 5,
                leadTimeDays: ship.productionDays + ship.transitDays,
                bufferDays: 5,
                unitCostUsd: L.perUnit,
                sellingPrice: 0,
                currency: ship.region === "algeria" ? "DZD" : "USD",
                warehouse: ship.destination,
                updatedAt: new Date().toISOString().slice(0, 10),
              },
            ],
          };
        }),
      removeShip: (id) => set((s) => ({ shipments: s.shipments.filter((x) => x.id !== id) })),
      setWinner: (id, p) =>
        set((s) => ({
          winners: s.winners.map((x) => (x.id === id ? { ...x, ...p } : x)),
        })),
      addWinner: (region) =>
        set((s) => ({
          winners: [
            ...s.winners,
            {
              id: uid(),
              name: "منتج مرشح",
              niche: "",
              region,
              status: "not_tested",
              chinaPrice: 0,
              sellingPrice: 0,
              weightKg: 0,
              wow: 5,
              problem: 5,
              competition: 5,
              perceivedValue: 5,
              scalability: 5,
              availability: 5,
              alibabaUrl: "",
              notes: "",
            },
          ],
        })),
      removeWinner: (id) => set((s) => ({ winners: s.winners.filter((x) => x.id !== id) })),
      reset: () => set({ ...SEED }),
      importState: (data) =>
        set({
          settings: data.settings,
          plProducts: data.plProducts,
          operations: data.operations,
          stability: data.stability,
          stock: data.stock,
          cash: data.cash,
          shipments: data.shipments,
          winners: data.winners,
        }),
    }),
    {
      name: "lmofid-cod-v1",
      partialize: (s) => ({
        settings: s.settings,
        plProducts: s.plProducts,
        operations: s.operations,
        stability: s.stability,
        stock: s.stock,
        cash: s.cash,
        shipments: s.shipments,
        winners: s.winners,
      }),
      // Settings gained new sub-objects over time. Persisted state replaces the
      // defaults wholesale, so fill any gap instead of losing what the user saved.
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<AppState>;
        return {
          ...current,
          ...saved,
          settings: migrateSettings(saved.settings, current.settings),
        };
      },
      // Runs synchronously inside create(), so the `useCod` binding does not
      // exist yet — go through the rehydrated state instead.
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
