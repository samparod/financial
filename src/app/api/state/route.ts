import { NextResponse } from "next/server";
import { loadState, pickState, saveState } from "@/lib/persist";
import type { AppState } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const state = await loadState();
  return NextResponse.json(state);
}

export async function PUT(req: Request) {
  const body = (await req.json()) as AppState;
  await saveState(pickState(body));
  return NextResponse.json({ ok: true });
}
