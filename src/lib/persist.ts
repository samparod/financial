import fs from "fs";
import path from "path";
import { SEED } from "./seed";
import type { AppState } from "./types";

const FILE = path.join(process.cwd(), "data", "state.json");

type Pool = import("pg").Pool;
let pool: Pool | null = null;

async function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!pool) {
    const { Pool } = await import("pg");
    pool = new Pool({ connectionString: url });
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_state (
        id INTEGER PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);
  }
  return pool;
}

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

export async function loadState(): Promise<AppState> {
  const db = await getPool();
  if (db) {
    const r = await db.query("SELECT data FROM app_state WHERE id = 1");
    if (r.rows[0]) return r.rows[0].data as AppState;
    const seed = pickState(SEED);
    await db.query(
      "INSERT INTO app_state (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()",
      [seed]
    );
    return seed;
  }
  try {
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, "utf8")) as AppState;
    }
  } catch {
    /* empty */
  }
  const seed = pickState(SEED);
  await saveState(seed);
  return seed;
}

export async function saveState(state: AppState) {
  const data = pickState(state);
  const db = await getPool();
  if (db) {
    await db.query(
      "INSERT INTO app_state (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1, updated_at = now()",
      [data]
    );
    return;
  }
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}
