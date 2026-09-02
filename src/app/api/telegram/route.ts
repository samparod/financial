import { NextResponse } from "next/server";
import { handleTelegramUpdate, setTelegramWebhook } from "@/lib/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await setTelegramWebhook();
  return NextResponse.json({ ok: true, webhook: Boolean(process.env.WEBHOOK_URL) });
}

export async function POST(req: Request) {
  const update = await req.json();
  await handleTelegramUpdate(update);
  return NextResponse.json({ ok: true });
}
