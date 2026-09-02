import { NextResponse } from "next/server";
import { loadState } from "@/lib/persist";
import { setTelegramWebhook } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  let db = "file";
  try {
    await loadState();
    db = process.env.DATABASE_URL ? "postgres" : "file";
  } catch (e) {
    return NextResponse.json(
      { ok: false, db: "error", error: e instanceof Error ? e.message : "db" },
      { status: 500 }
    );
  }
  await setTelegramWebhook();
  return NextResponse.json({
    ok: true,
    db,
    host: process.env.WEBAPP_URL || null,
  });
}
