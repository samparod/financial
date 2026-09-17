import { NextResponse } from "next/server";
import { probeStore } from "@/lib/persist";
import { setTelegramWebhook } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const probe = await probeStore();
  if (!probe.durable) {
    return NextResponse.json(
      {
        ok: false,
        db: probe.backend,
        empty: probe.empty,
        error: probe.error || "database unavailable",
      },
      { status: 503 }
    );
  }
  await setTelegramWebhook();
  return NextResponse.json({
    ok: true,
    db: probe.backend,
    empty: probe.empty,
    host: process.env.WEBAPP_URL || null,
  });
}
