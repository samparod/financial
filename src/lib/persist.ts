import fs from "fs";
import path from "path";
import { workspaceRecordFromRows, normalizeQueryRows } from "./db-rows";
import { SEED } from "./seed";
import {
  DEFAULT_WORKSPACE,
  isDurableBackend,
  pickState,
  workspaceIdFrom,
  type StateBackend,
} from "./state-io";
import type { AppState } from "./types";

export { pickState } from "./state-io";

const FILE = path.join(process.cwd(), "data", "state.json");
const MEMORY_SNAPSHOT = path.join(process.cwd(), "data", "memory-snapshot.json");

let memoryState: AppState | null = null;

export function memoryModeEnabled() {
  return process.env.STATE_MEMORY === "1";
}

export function resetMemoryState() {
  memoryState = null;
}

function loadMemoryState(): AppState {
  if (memoryState) return memoryState;
  try {
    if (fs.existsSync(MEMORY_SNAPSHOT)) {
      const raw = JSON.parse(fs.readFileSync(MEMORY_SNAPSHOT, "utf8")) as AppState;
      if (raw?.settings && Array.isArray(raw.plProducts)) {
        memoryState = pickState(raw);
        return memoryState;
      }
    }
  } catch {
    /* empty */
  }
  memoryState = pickState(SEED);
  return memoryState;
}

function saveMemoryState(state: AppState) {
  memoryState = state;
  try {
    fs.mkdirSync(path.dirname(MEMORY_SNAPSHOT), { recursive: true });
    fs.writeFileSync(MEMORY_SNAPSHOT, JSON.stringify(state, null, 2), "utf8");
  } catch {
    /* disk optional */
  }
}

type QueryFn = (sql: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;

type DbHandle = {
  backend: "netlify-db" | "postgres";
  query: QueryFn;
};

type NetlifyDb = {
  sql?: {
    unsafe?: (sql: string, params?: unknown[], options?: { rowMode?: string }) => Promise<unknown>;
  };
  pool?: { query: (sql: string | object, params?: unknown[]) => Promise<unknown> };
  httpClient?: {
    query: (sql: string, params?: unknown[], opts?: Record<string, unknown>) => Promise<unknown>;
  };
};

let cachedDb: DbHandle | null | undefined;
let schemaReady: Promise<void> | null = null;

function envConnectionString(): string | undefined {
  return (
    process.env.NETLIFY_DB_URL ||
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    undefined
  );
}

function publicError(e: unknown): string {
  const m = e instanceof Error ? e.message : "db";
  return m.replace(/(postgres(?:ql)?:\/\/)[^\s'"]+/gi, "$1***");
}

/**
 * Run a parameterized query on the same Netlify Database handle for reads and writes.
 *
 * Prefer neon HTTP `httpClient.query(..., { fullResults: true })` over waddler
 * `sql.unsafe()`. Waddler unwraps `{ rows }` from the neon result; when neon
 * already returns the row array, that unwrap is `undefined` and SELECT looks
 * empty while INSERT still persists (result ignored).
 */
async function queryNetlify(db: NetlifyDb, sql: string, params: unknown[] = []) {
  const errors: unknown[] = [];

  if (typeof db.httpClient?.query === "function") {
    try {
      const result = await db.httpClient.query(sql, params, { fullResults: true, arrayMode: false });
      return { rows: normalizeQueryRows(result) };
    } catch (e) {
      errors.push(e);
    }
  }

  if (typeof db.pool?.query === "function") {
    try {
      const result = await db.pool.query(sql, params);
      return { rows: normalizeQueryRows(result) };
    } catch (e) {
      errors.push(e);
    }
  }

  if (typeof db.sql?.unsafe === "function") {
    try {
      const result = await db.sql.unsafe(sql, params, { rowMode: "object" });
      return { rows: normalizeQueryRows(result) };
    } catch (e) {
      errors.push(e);
    }
  }

  const first = errors[0];
  throw first instanceof Error ? first : new Error(publicError(first ?? "no database query method"));
}

async function openDb(): Promise<DbHandle | null> {
  if (cachedDb !== undefined) return cachedDb;

  const netlifyish = Boolean(
    process.env.NETLIFY_DB_URL ||
      process.env.NETLIFY_DATABASE_URL ||
      process.env.NETLIFY ||
      process.env.NETLIFY_DEV
  );

  if (netlifyish) {
    try {
      const { getDatabase } = await import("@netlify/database");
      // Runtime `getDatabase()` resolves the current deploy's branch URL.
      // Only pass process.env as a fallback (EasyPanel / local Netlify CLI).
      let db: NetlifyDb;
      try {
        db = getDatabase() as NetlifyDb;
      } catch (e) {
        const url = envConnectionString();
        if (!url) throw e;
        db = getDatabase({ connectionString: url }) as NetlifyDb;
      }
      const handle: DbHandle = {
        backend: "netlify-db",
        query: (sql, params = []) => queryNetlify(db, sql, params),
      };
      cachedDb = handle;
      return handle;
    } catch (e) {
      console.error("[persist] @netlify/database:", publicError(e));
    }
  }

  const url = envConnectionString();
  if (url) {
    try {
      const { Pool } = await import("pg");
      const needsSsl = /neon\.tech|netlify|sslmode=require/i.test(url) && !/sslmode=disable/i.test(url);
      const pool = new Pool({
        connectionString: url,
        max: 1,
        ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
      });
      const handle: DbHandle = {
        backend: netlifyish ? "netlify-db" : "postgres",
        query: async (sql, params = []) => {
          const r = await pool.query(sql, params);
          return { rows: normalizeQueryRows(r) };
        },
      };
      cachedDb = handle;
      return handle;
    } catch (e) {
      console.error("[persist] pg:", publicError(e));
    }
  }

  cachedDb = null;
  return null;
}

async function ensureSchema(db: DbHandle) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await db.query(`
        CREATE TABLE IF NOT EXISTS public.workspaces (
          id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);
      try {
        await db.query(`
          INSERT INTO public.workspaces (id, data, updated_at)
          SELECT 'default', data, COALESCE(updated_at, now())
          FROM public.app_state
          WHERE id = 1
          ON CONFLICT (id) DO NOTHING
        `);
      } catch {
        /* legacy app_state table may not exist */
      }
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

function tryLoadFile(): AppState | null {
  try {
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8")) as AppState;
    }
  } catch {
    /* empty */
  }
  return null;
}

function trySaveFile(data: AppState): boolean {
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    return true;
  } catch {
    return false;
  }
}

export type StateRecord = {
  state: AppState;
  empty: boolean;
  backend: StateBackend;
  updatedAt: string | null;
  workspace: string;
};

export async function loadStateRecord(workspaceRaw?: string): Promise<StateRecord> {
  const workspace = workspaceIdFrom(workspaceRaw ?? DEFAULT_WORKSPACE);

  if (memoryModeEnabled()) {
    return {
      state: loadMemoryState(),
      empty: false,
      backend: "memory",
      updatedAt: null,
      workspace,
    };
  }

  const db = await openDb();
  if (db) {
    await ensureSchema(db);
    const r = await db.query("SELECT data, updated_at FROM public.workspaces WHERE id = $1 LIMIT 1", [
      workspace,
    ]);
    const rec = workspaceRecordFromRows(r.rows, pickState, SEED);
    if (rec.corrupt) {
      throw new Error("workspaces.data is present but is not valid app state");
    }
    return {
      state: rec.state ?? pickState(SEED),
      empty: rec.empty,
      backend: db.backend,
      updatedAt: rec.updatedAt,
      workspace,
    };
  }

  const fromFile = tryLoadFile();
  if (fromFile?.settings && Array.isArray(fromFile.plProducts)) {
    return {
      state: pickState(fromFile),
      empty: false,
      backend: "file",
      updatedAt: null,
      workspace,
    };
  }

  return {
    state: pickState(SEED),
    empty: true,
    backend: process.env.NETLIFY ? "none" : "file",
    updatedAt: null,
    workspace,
  };
}

export async function loadState(workspaceRaw?: string): Promise<AppState> {
  const rec = await loadStateRecord(workspaceRaw);
  return rec.state;
}

export async function saveState(state: AppState, workspaceRaw?: string) {
  const data = pickState(state);
  const workspace = workspaceIdFrom(workspaceRaw ?? DEFAULT_WORKSPACE);

  if (memoryModeEnabled()) {
    saveMemoryState(data);
    return;
  }

  const db = await openDb();
  if (db) {
    await ensureSchema(db);
    await db.query(
      `INSERT INTO public.workspaces (id, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [workspace, JSON.stringify(data)]
    );
    return;
  }

  if (trySaveFile(data)) return;
  saveMemoryState(data);
}

export async function probeStore(): Promise<{
  backend: StateBackend;
  durable: boolean;
  empty: boolean;
  error?: string;
}> {
  try {
    const rec = await loadStateRecord(DEFAULT_WORKSPACE);
    return {
      backend: rec.backend,
      durable: isDurableBackend(rec.backend),
      empty: rec.empty,
    };
  } catch (e) {
    return { backend: "none", durable: false, empty: true, error: publicError(e) };
  }
}
