import fs from "fs";
import path from "path";
import { SEED } from "./seed";
import type { AppState } from "./types";

/** In-process state when STATE_MEMORY=1 — the “server” lives in this Node/Electron process RAM. */
let memoryState: AppState | null = null;

const SNAPSHOT = path.join(process.cwd(), "data", "memory-snapshot.json");

export function memoryModeEnabled() {
  return process.env.STATE_MEMORY === "1";
}

export function resetMemoryState() {
  memoryState = null;
}

function readSnapshot(): AppState | null {
  try {
    if (!fs.existsSync(SNAPSHOT)) return null;
    const raw = JSON.parse(fs.readFileSync(SNAPSHOT, "utf8")) as AppState;
    if (!raw?.settings || !Array.isArray(raw.plProducts)) return null;
    return raw;
  } catch {
    return null;
  }
}

function writeSnapshot(state: AppState) {
  try {
    fs.mkdirSync(path.dirname(SNAPSHOT), { recursive: true });
    fs.writeFileSync(SNAPSHOT, JSON.stringify(state, null, 2), "utf8");
  } catch {
    /* disk optional */
  }
}

export function loadMemoryState(): AppState {
  if (memoryState) return memoryState;
  const snap = readSnapshot();
  memoryState = snap ?? {
    settings: SEED.settings,
    plProducts: SEED.plProducts,
    operations: SEED.operations,
    stability: SEED.stability,
    stock: SEED.stock,
    cash: SEED.cash,
    shipments: SEED.shipments,
    winners: SEED.winners,
  };
  return memoryState;
}

export function saveMemoryState(state: AppState) {
  memoryState = state;
  writeSnapshot(memoryState);
}
