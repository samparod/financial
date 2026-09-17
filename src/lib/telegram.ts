import { calcPl, opsTotal, stockPath } from "./cod";
import { loadState, saveState } from "./persist";
import type { AppState, CashEntry, Region } from "./types";

const TOKEN = () => process.env.TELEGRAM_BOT_TOKEN || "";

function allow(id: number) {
  const raw = process.env.TELEGRAM_ALLOW_IDS || "";
  if (!raw.trim()) return true;
  return raw.split(",").map((x) => x.trim()).includes(String(id));
}

async function send(chatId: number, text: string, extra: Record<string, unknown> = {}) {
  await fetch(`https://api.telegram.org/bot${TOKEN()}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      ...extra,
    }),
  });
}

function menu() {
  const web = process.env.WEBAPP_URL;
  const rows: Array<Array<{ text: string; callback_data?: string; web_app?: { url: string } }>> = [
    [{ text: "ملخص", callback_data: "sum" }, { text: "مخزون", callback_data: "stock" }],
    [{ text: "حسابات", callback_data: "pl" }, { text: "كاش", callback_data: "cash" }],
    [{ text: "+ حركة كاش", callback_data: "addcash" }, { text: "+ منتج شيت", callback_data: "addpl" }],
  ];
  if (web && web.startsWith("https://")) {
    rows.push([{ text: "فتح اللوحة", web_app: { url: web } }]);
  }
  return { keyboard: { inline_keyboard: rows } };
}

const steps = new Map<number, { step: string; data: Record<string, string> }>();

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function money(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

async function summary(state: AppState) {
  const gulf = state.plProducts.filter((p) => p.region === "gulf");
  const dz = state.plProducts.filter((p) => p.region === "algeria");
  const gp = gulf.reduce((a, p) => a + calcPl(p, state.settings.gulfFees).profit, 0);
  const dp = dz.reduce((a, p) => a + calcPl(p, state.settings.algeriaFeesUsd).profit, 0);
  const go = state.operations.find((o) => o.region === "gulf");
  const dzo = state.operations.find((o) => o.region === "algeria");
  const alerts = state.stock.filter((s) => {
    const a = stockPath(s).advice;
    return a === "order_now" || a === "plan";
  });
  return [
    "<b>Stability COD</b>",
    `الخليج: ${money(gp - (go ? opsTotal(go) : 0))} $`,
    `الجزائر: ${money(dp - (dzo ? opsTotal(dzo) : 0))} $  ·  ${money((dp - (dzo ? opsTotal(dzo) : 0)) * state.settings.usdToDzd)} د.ج`,
    `تنبيهات مخزون: ${alerts.length}`,
    alerts.map((s) => `• ${s.name}: ${s.qty} · ينتهي ~${stockPath(s).stockZeroDay} يوم`).join("\n"),
  ]
    .filter(Boolean)
    .join("\n");
}

export async function handleTelegramUpdate(update: {
  message?: {
    chat: { id: number };
    from?: { id: number };
    text?: string;
  };
  callback_query?: {
    id: string;
    from: { id: number };
    data?: string;
    message?: { chat: { id: number } };
  };
}) {
  if (!TOKEN()) return;

  const cb = update.callback_query;
  const msg = update.message;
  const userId = cb?.from.id ?? msg?.from?.id ?? 0;
  const chatId = cb?.message?.chat.id ?? msg?.chat.id;
  if (!chatId) return;
  if (!allow(userId)) {
    await send(chatId, "غير مسموح. أضف رقمك في TELEGRAM_ALLOW_IDS.");
    return;
  }

  if (cb) {
    await fetch(`https://api.telegram.org/bot${TOKEN()}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: cb.id }),
    });
  }

  const text = (msg?.text || "").trim();
  const data = cb?.data || "";
  const state = await loadState();
  const pending = steps.get(chatId);

  if (text === "/start" || text === "/menu") {
    steps.delete(chatId);
    await send(chatId, "لوحة Stability. الموقع والتيليغرام يحفظان في نفس المكان.", {
      reply_markup: menu().keyboard,
    });
    return;
  }

  if (data === "sum" || text === "/sum") {
    await send(chatId, await summary(state), { reply_markup: menu().keyboard });
    return;
  }

  if (data === "stock" || text === "/stock") {
    const lines = state.stock.map((s) => {
      const p = stockPath(s);
      const tag = p.advice === "order_now" ? "اطلب الآن" : p.advice === "plan" ? "خطط" : "OK";
      return `<b>${s.name}</b> (${s.region})\n${s.qty} قطعة · ${s.dailySales}/يوم · ${tag}\nتعديل: <code>qty ${s.id} 120</code>`;
    });
    await send(chatId, lines.join("\n\n") || "لا يوجد مخزون.", { reply_markup: menu().keyboard });
    return;
  }

  if (data === "pl" || text === "/pl") {
    const lines = state.plProducts.map((p) => {
      const fees = p.region === "gulf" ? state.settings.gulfFees : state.settings.algeriaFeesUsd;
      const c = calcPl(p, fees);
      return `<b>${p.name}</b> [${p.region}]\nLead ${p.leads} · Order ${p.orders} · Del ${p.delivered}\nService ${money(c.service)} · Profit ${money(c.profit)} · EPD ${money(c.epd)}`;
    });
    await send(chatId, lines.join("\n\n") || "لا منتجات.", { reply_markup: menu().keyboard });
    return;
  }

  if (data === "cash" || text === "/cash") {
    const last = [...state.cash].slice(-8).reverse();
    const lines = last.map((c) => `${c.date} ${c.type === "in" ? "+" : "-"} ${money(c.amount)} ${c.currency} · ${c.label}`);
    await send(chatId, lines.join("\n") || "لا حركات.", { reply_markup: menu().keyboard });
    return;
  }

  if (data === "addcash") {
    steps.set(chatId, { step: "cash_region", data: {} });
    await send(chatId, "الحركة لأي سوق؟", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "الخليج", callback_data: "cr_gulf" },
            { text: "الجزائر", callback_data: "cr_algeria" },
          ],
        ],
      },
    });
    return;
  }

  if (data === "cr_gulf" || data === "cr_algeria") {
    steps.set(chatId, { step: "cash_type", data: { region: data === "cr_gulf" ? "gulf" : "algeria" } });
    await send(chatId, "دخول ولا خروج؟", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "دخول COD", callback_data: "ct_in" },
            { text: "خروج", callback_data: "ct_out" },
          ],
        ],
      },
    });
    return;
  }

  if (data === "ct_in" || data === "ct_out") {
    const prev = steps.get(chatId)?.data || {};
    steps.set(chatId, { step: "cash_amount", data: { ...prev, type: data === "ct_in" ? "in" : "out" } });
    await send(chatId, "أرسل المبلغ ثم العملة في سطر واحد.\nمثال: <code>9800 USD</code> أو <code>1860000 DZD</code>");
    return;
  }

  if (pending?.step === "cash_amount" && text) {
    const m = text.match(/^([\d.]+)\s*([A-Za-z]{3})?$/);
    if (!m) {
      await send(chatId, "الصيغة: 9800 USD");
      return;
    }
    steps.set(chatId, {
      step: "cash_label",
      data: { ...pending.data, amount: m[1], currency: (m[2] || "USD").toUpperCase() },
    });
    await send(chatId, "البيان؟ مثال: تحصيل COD أسبوعي");
    return;
  }

  if (pending?.step === "cash_label" && text) {
    const entry: CashEntry = {
      id: uid(),
      region: pending.data.region as Region,
      date: new Date().toISOString().slice(0, 10),
      type: pending.data.type as "in" | "out",
      category: pending.data.type === "in" ? "cod" : "other",
      label: text,
      amount: parseFloat(pending.data.amount),
      currency: (pending.data.currency as CashEntry["currency"]) || "USD",
    };
    state.cash.push(entry);
    await saveState(state);
    steps.delete(chatId);
    await send(chatId, `تم الحفظ: ${entry.type === "in" ? "+" : "-"}${money(entry.amount)} ${entry.currency}\n${entry.label}`, {
      reply_markup: menu().keyboard,
    });
    return;
  }

  if (data === "addpl") {
    steps.set(chatId, { step: "pl_region", data: {} });
    await send(chatId, "المنتج لأي سوق؟", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "الخليج", callback_data: "pr_gulf" },
            { text: "الجزائر", callback_data: "pr_algeria" },
          ],
        ],
      },
    });
    return;
  }

  if (data === "pr_gulf" || data === "pr_algeria") {
    const region = (data === "pr_gulf" ? "gulf" : "algeria") as Region;
    const n = state.plProducts.filter((p) => p.region === region).length;
    const letter = n < 26 ? String.fromCharCode(65 + n) : `P${n + 1}`;
    state.plProducts.push({
      id: uid(),
      region,
      name: letter,
      productCost: 0,
      leads: 0,
      orders: 0,
      delivered: 0,
      unitSellPrice: 0,
      totalSales: 0,
      adsSpend: 0,
      testSpend: 0,
      adAccount: 0,
      bonus: 0,
      currency: "USD",
    });
    await saveState(state);
    await send(
      chatId,
      `أُضيف عمود <b>${letter}</b> في شيت ${region === "gulf" ? "الخليج" : "الجزائر"}.\nكمّل الأرقام من الموقع أو أرسل:\n<code>set ${letter} leads 1000</code>`,
      { reply_markup: menu().keyboard }
    );
    return;
  }

  const qtyCmd = text.match(/^qty\s+(\S+)\s+(\d+)/i);
  if (qtyCmd) {
    const item = state.stock.find((s) => s.id === qtyCmd[1] || s.sku === qtyCmd[1] || s.name === qtyCmd[1]);
    if (!item) {
      await send(chatId, "ما لقيت هذا الصنف.");
      return;
    }
    item.qty = parseInt(qtyCmd[2], 10);
    item.updatedAt = new Date().toISOString().slice(0, 10);
    await saveState(state);
    const p = stockPath(item);
    await send(chatId, `تم: ${item.name} = ${item.qty}\nينتهي يوم ${p.stockZeroDay} · ${p.advice}`, {
      reply_markup: menu().keyboard,
    });
    return;
  }

  const setCmd = text.match(/^set\s+(\S+)\s+(leads|orders|delivered|sales|ads|cost)\s+([\d.]+)/i);
  if (setCmd) {
    const p = state.plProducts.find((x) => x.name === setCmd[1] || x.name.startsWith(setCmd[1]) || x.id === setCmd[1]);
    if (!p) {
      await send(chatId, "ما لقيت المنتج. أسماء الأعمدة: " + state.plProducts.map((x) => x.name).join("، "));
      return;
    }
    const field = setCmd[2].toLowerCase();
    const n = parseFloat(setCmd[3]);
    if (field === "leads") p.leads = n;
    if (field === "orders") p.orders = n;
    if (field === "delivered") p.delivered = n;
    if (field === "sales") p.totalSales = n;
    if (field === "ads") p.adsSpend = n;
    if (field === "cost") p.productCost = n;
    await saveState(state);
    const fees = p.region === "gulf" ? state.settings.gulfFees : state.settings.algeriaFeesUsd;
    const c = calcPl(p, fees);
    await send(chatId, `تم تحديث ${p.name}.\nService Cost ${money(c.service)}\nProfit ${money(c.profit)}\nEPD ${money(c.epd)}`, {
      reply_markup: menu().keyboard,
    });
    return;
  }

  if (text.startsWith("/")) {
    await send(chatId, "الأوامر: /start /sum /stock /pl /cash\nأو qty و set كما فوق.", { reply_markup: menu().keyboard });
  }
}

export async function setTelegramWebhook() {
  const token = TOKEN();
  const hook = process.env.WEBHOOK_URL;
  if (!token || !hook) return;
  const body: Record<string, string> = { url: `${hook.replace(/\/$/, "")}/api/telegram` };
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (secret) body.secret_token = secret;
  await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
