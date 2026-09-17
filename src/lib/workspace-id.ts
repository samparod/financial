/** Shared cloud record for this personal tool. Same key → same data on every device. */
export const DEFAULT_WORKSPACE = "default";
export const WORKSPACE_STORAGE_KEY = "istiqrar-workspace";
export const MIGRATED_STORAGE_PREFIX = "istiqrar-migrated:";
/** zustand persist key — browser cache / offline fallback */
export const LOCAL_STATE_KEY = "lmofid-cod-v1";

export function parseWorkspaceId(raw: unknown): string | null {
  const s = String(raw ?? "").trim();
  if (/^[a-zA-Z0-9_-]{1,64}$/.test(s)) return s;
  return null;
}

export function workspaceIdFrom(raw: unknown): string {
  return parseWorkspaceId(raw) ?? DEFAULT_WORKSPACE;
}
