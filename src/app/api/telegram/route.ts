import { NextResponse } from "next/server";
import { handleTelegramUpdate, setTelegramWebhook } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const key = process.env.TELEGRAM_WEBHOOK_SECRET || process.env.STATE_API_KEY;
  if (key) {
    const url = new URL(req.url);
    const got = url.searchParams.get("key") || req.headers.get("x-api-key");
    if (got !== key) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await setTelegramWebhook();
  return NextResponse.json({ ok: true, webhook: Boolean(process.env.WEBHOOK_URL) });
}

export async function POST(req: Request) {
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret) {
    const got = req.headers.get("x-telegram-bot-api-secret-token");
    if (got !== secret) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  const update = await req.json();
  await handleTelegramUpdate(update);
  return NextResponse.json({ ok: true });
}
