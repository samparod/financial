import { NextResponse } from "next/server";
import { loadStateRecord, pickState, saveState } from "@/lib/persist";
import { isDurableBackend, workspaceIdFrom } from "@/lib/state-io";
import type { AppState } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function workspaceFrom(req: Request) {
  const url = new URL(req.url);
  return workspaceIdFrom(
    url.searchParams.get("workspace") || req.headers.get("x-workspace-id") || undefined
  );
}

function bodyState(raw: unknown): AppState | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const inner = (o.state && typeof o.state === "object" ? o.state : o) as AppState;
  if (!inner.settings || !Array.isArray(inner.plProducts)) return null;
  return pickState(inner);
}

export async function GET(req: Request) {
  try {
    const workspace = workspaceFrom(req);
    const rec = await loadStateRecord(workspace);
    if (!isDurableBackend(rec.backend)) {
      return NextResponse.json(
        { ok: false, empty: true, backend: rec.backend, workspace, error: "database unavailable" },
        { status: 503 }
      );
    }
    return NextResponse.json({
      state: rec.state,
      empty: rec.empty,
      backend: rec.backend,
      updatedAt: rec.updatedAt,
      workspace: rec.workspace,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message.replace(/(postgres(?:ql)?:\/\/)[^\s'"]+/gi, "$1***") : "db";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const workspace = workspaceFrom(req);
    const rec = await loadStateRecord(workspace);
    if (!isDurableBackend(rec.backend)) {
      return NextResponse.json(
        { ok: false, backend: rec.backend, error: "database unavailable" },
        { status: 503 }
      );
    }
    const state = bodyState(await req.json());
    if (!state) {
      return NextResponse.json({ ok: false, error: "invalid state" }, { status: 400 });
    }
    await saveState(state, workspace);
    return NextResponse.json({ ok: true, workspace, backend: rec.backend });
  } catch (e) {
    const message = e instanceof Error ? e.message.replace(/(postgres(?:ql)?:\/\/)[^\s'"]+/gi, "$1***") : "db";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
