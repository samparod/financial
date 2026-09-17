import fs from "fs";
import path from "path";
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

function asRows(result: unknown): Record<string, unknown>[] {
  if (Array.isArray(result)) return result as Record<string, unknown>[];
  if (result && typeof result === "object" && Array.isArray((result as { rows?: unknown }).rows)) {
    return (result as { rows: Record<string, unknown>[] }).rows;
  }
  return [];
}

function parseJsonb(data: unknown): AppState | null {
  try {
    const v = typeof data === "string" ? JSON.parse(data) : data;
    if (v && typeof v === "object" && (v as AppState).settings && Array.isArray((v as AppState).plProducts)) {
      return pickState(v as AppState);
    }
  } catch {
    /* empty */
  }
  return null;
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
      const url = envConnectionString();
      const db = url ? getDatabase({ connectionString: url }) : getDatabase();
      const handle: DbHandle = {
        backend: "netlify-db",
        query: async (sql, params = []) => {
          const rows = await db.sql.unsafe(sql, params);
          return { rows: asRows(rows) };
        },
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
          return { rows: asRows(r.rows) };
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
        CREATE TABLE IF NOT EXISTS workspaces (
          id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `);
      try {
        await db.query(`
          INSERT INTO workspaces (id, data, updated_at)
          SELECT 'default', data, COALESCE(updated_at, now())
          FROM app_state
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
    const r = await db.query("SELECT data, updated_at FROM workspaces WHERE id = $1", [workspace]);
    const row = r.rows[0];
    if (row) {
      const state = parseJsonb(row.data);
      if (state) {
        return {
          state,
          empty: false,
          backend: db.backend,
          updatedAt: row.updated_at ? String(row.updated_at) : null,
          workspace,
        };
      }
    }
    return {
      state: pickState(SEED),
      empty: true,
      backend: db.backend,
      updatedAt: null,
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
      `INSERT INTO workspaces (id, data, updated_at)
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
