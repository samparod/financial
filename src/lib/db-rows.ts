import type { AppState } from "./types";

/**
 * Normalize whatever a Postgres driver returns into an array of row objects.
 *
 * @netlify/database `sql.unsafe()` goes through waddler, which does
 * `({ rows } = queryResult)`. Neon HTTP with `fullResults: false` (or a
 * Proxy that drops the 3rd-arg options) already returns the row array, so
 * that unwrap yields `undefined` and the caller thinks the table is empty.
 * INSERT still runs (result unused). This helper accepts every shape we
 * have seen from neon HTTP, pg, and waddler.
 */
export function normalizeQueryRows(result: unknown): Record<string, unknown>[] {
  if (result == null) return [];
  if (Array.isArray(result)) return result.map(asRowObject);
  if (typeof result !== "object") return [];

  const o = result as Record<string, unknown>;
  if (Array.isArray(o.rows)) return o.rows.map(asRowObject);
  if (isRowList(o.data)) return o.data.map(asRowObject);
  if (hasOwn(o, "data") || hasOwn(o, "updated_at") || hasOwn(o, "updatedAt") || hasOwn(o, "id")) {
    return [asRowObject(o)];
  }
  return [];
}

function isRowList(v: unknown): v is unknown[] {
  if (!Array.isArray(v) || v.length === 0) return false;
  return v.every((item) => item != null && (typeof item === "object" || Array.isArray(item)));
}

function hasOwn(o: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(o, key);
}

function asRowObject(row: unknown): Record<string, unknown> {
  if (row == null) return {};
  if (Array.isArray(row)) {
    return { data: row[0], updated_at: row[1] };
  }
  if (typeof row === "object") return row as Record<string, unknown>;
  return { data: row };
}

export function getRowColumn(row: Record<string, unknown>, ...names: string[]): unknown {
  const keys = Object.keys(row);
  for (const name of names) {
    if (name in row) return row[name];
    const found = keys.find((k) => k.toLowerCase() === name.toLowerCase());
    if (found) return row[found];
  }
  return undefined;
}

function decodeBytes(data: unknown): unknown {
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
    return data.toString("utf8");
  }
  if (data instanceof Uint8Array) {
    return new TextDecoder().decode(data);
  }
  return data;
}

function looksLikeAppState(v: unknown): v is AppState {
  if (!v || typeof v !== "object") return false;
  const o = v as AppState;
  return Boolean(o.settings) && Array.isArray(o.plProducts);
}

/** Parse JSONB `workspaces.data` into AppState. Returns null if missing/invalid. */
export function parseAppStateData(data: unknown, pick: (s: AppState) => AppState): AppState | null {
  let v: unknown = decodeBytes(data);
  if (v == null) return null;

  for (let i = 0; i < 3 && typeof v === "string"; i++) {
    const s = v.trim();
    if (!s) return null;
    try {
      v = JSON.parse(s);
    } catch {
      return null;
    }
  }

  if (looksLikeAppState(v)) return pick(v);
  if (v && typeof v === "object") {
    const inner = (v as { state?: unknown }).state;
    if (looksLikeAppState(inner)) return pick(inner);
  }
  return null;
}

export type WorkspaceRowRecord = {
  empty: boolean;
  state: AppState | null;
  updatedAt: string | null;
  /** True when a row was found but `data` could not be read as AppState. */
  corrupt?: boolean;
};

/**
 * Map SELECT rows to a workspace record.
 * `empty` is true only when there is no row, or the row's `data` is SQL NULL.
 */
export function workspaceRecordFromRows(
  rows: unknown,
  pick: (s: AppState) => AppState,
  seed: AppState
): WorkspaceRowRecord {
  const list = normalizeQueryRows(rows);
  const row = list[0];
  if (!row) {
    return { empty: true, state: pick(seed), updatedAt: null };
  }

  const data = getRowColumn(row, "data");
  const updatedRaw = getRowColumn(row, "updated_at", "updatedAt");
  const updatedAt = updatedRaw == null || updatedRaw === "" ? null : String(updatedRaw);

  if (data == null) {
    return { empty: true, state: pick(seed), updatedAt };
  }

  const state = parseAppStateData(data, pick);
  if (!state) {
    return { empty: false, state: null, updatedAt, corrupt: true };
  }
  return { empty: false, state, updatedAt };
}
