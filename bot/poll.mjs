import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve("d:/18 juil/lmofid-cod/.env"), "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i < 1) continue;
      const k = t.slice(0, i).trim();
      const v = t.slice(i + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {
    /* no .env */
  }
}

loadEnv();

const token = process.env.TELEGRAM_BOT_TOKEN;
const api = process.env.API_URL || "http://127.0.0.1:3070";

if (!token) {
  console.error("TELEGRAM_BOT_TOKEN missing");
  process.exit(1);
}

let offset = 0;

async function loop() {
  await fetch(`https://api.telegram.org/bot${token}/deleteWebhook?drop_pending_updates=false`);
  console.log("Telegram polling →", api, "@financial2025_bot");
  for (;;) {
    try {
      const url = `https://api.telegram.org/bot${token}/getUpdates?timeout=30&offset=${offset}`;
      const r = await fetch(url);
      const j = await r.json();
      if (!j.ok) {
        console.error(j);
        await sleep(3000);
        continue;
      }
      for (const u of j.result || []) {
        offset = u.update_id + 1;
        const res = await fetch(`${api}/api/telegram`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(u),
        });
        if (!res.ok) console.error("api", res.status);
      }
    } catch (e) {
      console.error(e);
      await sleep(3000);
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

loop();
