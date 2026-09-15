import type { AppState } from "./types";

export function sliceBusiness(s: AppState): AppState {
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

export function parseBackup(raw: unknown): AppState | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const inner = (o.state && typeof o.state === "object" ? o.state : o) as Partial<AppState>;
  if (!inner.settings || !Array.isArray(inner.plProducts)) return null;
  return {
    settings: inner.settings,
    plProducts: inner.plProducts,
    operations: inner.operations ?? [],
    stability: inner.stability as AppState["stability"],
    stock: inner.stock ?? [],
    cash: inner.cash ?? [],
    shipments: inner.shipments ?? [],
    winners: inner.winners ?? [],
  };
}

export function downloadBackup(state: AppState) {
  const body = {
    app: "stability-cod",
    version: 1,
    exportedAt: new Date().toISOString(),
    state: sliceBusiness(state),
  };
  const blob = new Blob([JSON.stringify(body, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  const day = new Date().toISOString().slice(0, 10);
  a.href = URL.createObjectURL(blob);
  a.download = `istiqrar-${day}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
