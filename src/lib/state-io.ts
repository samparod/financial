import { migrateSettings } from "./cod";
import { SEED } from "./seed";
import type { AppState } from "./types";
import {
  DEFAULT_WORKSPACE,
  LOCAL_STATE_KEY,
  MIGRATED_STORAGE_PREFIX,
  WORKSPACE_STORAGE_KEY,
  workspaceIdFrom,
} from "./workspace-id";

export {
  DEFAULT_WORKSPACE,
  LOCAL_STATE_KEY,
  MIGRATED_STORAGE_PREFIX,
  WORKSPACE_STORAGE_KEY,
  parseWorkspaceId,
  workspaceIdFrom,
} from "./workspace-id";

export type StateBackend = "netlify-db" | "postgres" | "memory" | "file" | "none";

export function pickState(s: AppState): AppState {
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

export function looksLikeSeed(state: AppState): boolean {
  const a = pickState({
    ...state,
    settings: migrateSettings(state.settings, SEED.settings),
  });
  const b = pickState({
    ...SEED,
    settings: migrateSettings(SEED.settings, SEED.settings),
  });
  return JSON.stringify(a) === JSON.stringify(b);
}

export function isDurableBackend(backend: StateBackend): boolean {
  if (backend === "netlify-db" || backend === "postgres") return true;
  if (backend === "memory" && process.env.STATE_MEMORY === "1") return true;
  if (backend === "file" && !process.env.NETLIFY) return true;
  return false;
}

/** GET /api/state may return a wrap `{ state, empty }` or a raw AppState (Electron / older). */
export function unwrapStatePayload(json: unknown): {
  state: AppState | null;
  empty: boolean;
  backend?: string;
  updatedAt?: string;
  workspace?: string;
} {
  if (!json || typeof json !== "object") return { state: null, empty: true };
  const o = json as Record<string, unknown>;
  const inner = o.state;
  if (inner && typeof inner === "object" && (inner as AppState).settings && Array.isArray((inner as AppState).plProducts)) {
    return {
      state: inner as AppState,
      empty: Boolean(o.empty),
      backend: typeof o.backend === "string" ? o.backend : undefined,
      updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : undefined,
      workspace: typeof o.workspace === "string" ? o.workspace : undefined,
    };
  }
  if (o.settings && Array.isArray(o.plProducts)) {
    return { state: o as unknown as AppState, empty: false };
  }
  return { state: null, empty: true };
}

export function readLocalPersisted(): AppState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LOCAL_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: AppState } | AppState;
    const state = (parsed && typeof parsed === "object" && "state" in parsed ? parsed.state : parsed) as
      | AppState
      | undefined;
    if (!state?.settings || !Array.isArray(state.plProducts)) return null;
    return pickState({
      ...state,
      settings: migrateSettings(state.settings, SEED.settings),
      operations: state.operations ?? [],
      stock: state.stock ?? [],
      cash: state.cash ?? [],
      shipments: state.shipments ?? [],
      winners: state.winners ?? [],
    });
  } catch {
    return null;
  }
}

export function getWorkspaceId(): string {
  if (typeof window === "undefined") return DEFAULT_WORKSPACE;
  const raw = window.localStorage.getItem(WORKSPACE_STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(WORKSPACE_STORAGE_KEY, DEFAULT_WORKSPACE);
    return DEFAULT_WORKSPACE;
  }
  return workspaceIdFrom(raw);
}

export function setWorkspaceId(id: string): void {
  window.localStorage.setItem(WORKSPACE_STORAGE_KEY, workspaceIdFrom(id));
}

export function cloudMigrated(ws: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MIGRATED_STORAGE_PREFIX + ws) === "1";
}

export function markCloudMigrated(ws: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MIGRATED_STORAGE_PREFIX + ws, "1");
}
