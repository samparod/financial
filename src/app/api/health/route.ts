import { NextResponse } from "next/server";
import { probeStore } from "@/lib/persist";
import { setTelegramWebhook } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE = {
  "Cache-Control": "private, no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
};

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE });
}

export async function GET() {
  const probe = await probeStore();
  if (!probe.durable) {
    return json(
      {
        ok: false,
        db: probe.backend,
        empty: probe.empty,
        error: probe.error || "database unavailable",
      },
      503
    );
  }
  await setTelegramWebhook();
  return json({
    ok: true,
    db: probe.backend,
    empty: probe.empty,
    host: process.env.WEBAPP_URL || null,
  });
}
