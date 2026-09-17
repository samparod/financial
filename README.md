# Stability COD · financial

Web dashboard + Telegram bot (`@financial2025_bot`) for Gulf / Algeria COD accounts. Same data on the site and in Telegram. Postgres in production.

## EasyPanel · samparo.pro

Proxy:

- Host: `samparo.pro`
- Path: `/`
- Destination: **HTTP** · port **3000** · path `/`

Build from GitHub `samparod/financial` with the **Dockerfile**.

Environment (paste in EasyPanel, not in git):

```
PORT=3000
HOSTNAME=0.0.0.0
DATABASE_URL=postgres://USER:PASSWORD@financial_financial:5432/financial?sslmode=disable
TELEGRAM_BOT_TOKEN=
TELEGRAM_ALLOW_IDS=
WEBAPP_URL=https://samparo.pro
WEBHOOK_URL=https://samparo.pro
```

Use the Postgres URL EasyPanel gives you for this app (internal host like `financial_financial`).

After deploy, open once:

- https://samparo.pro/api/health
- https://samparo.pro/api/telegram

That creates the table and registers the Telegram webhook.

## Local

```
npm install
npm run dev
```

Site: http://localhost:3070

```
npm run bot
```

## الاستضافة على الحاسوب (مو على الإنترنت)

إذا ما تحبش بياناتك على `samparo.pro`، استعمل **نسخة الحاسوب** — البرنامج كامل يخدم من جهازك، والحفظ في ملف محلي (`istiqrar-state.json`) داخل مجلد بيانات التطبيق. **ما كاينش اتصال بـ `/api/state`** ولا قاعدة بيانات سحابية.

### 1) تطبيق ويندوز (موصى به — مثل Word)

**أول مرة — بناء المثبّت:**

```
npm install
npm run desktop:pack
```

ثبّت من: `dist-desktop/Istiqrar-COD-Setup-1.0.0.exe`  
اختصار سطح المكتب: **Istiqrar COD**. من القائمة: **ملف → فتح مجلد البيانات** (نسخ احتياطي للـ JSON).

ويندوز قد يظهر SmartScreen (ملف غير موقّع) → «مزيد من المعلومات» → تشغيل.

**تشغيل سريع من المجلد (تطوير):** دبل كليك على `start-istiqrar.bat` أو:

```
npm run desktop:dev
```

### 2) سيرفر = ذاكرة الحاسوب (RAM) — موصى للتطوير المحلي

Next يخدم على `localhost` و **`/api/state` يخزّن في RAM** داخل عملية Node على جهازك (مش Postgres ولا سحابة). نسخة احتياطية تلقائية في `data/memory-snapshot.json` عند كل حفظ.

```
npm run dev:memory
```

أو دبل كليك: **`start-memory.bat`**  
افتح: http://localhost:3070 — تحت القائمة يظهر: *سيرفر محلي — البيانات في ذاكرة الحاسوب*.

### 3) متصفح فقط (localStorage، بلا `/api/state`)

```
npm run dev:local
```

### 4) موقع على الإنترنت (`samparo.pro`)

اختياري ومنفصل — للتيليغرام والمزامنة على سيرفر. **ما تحتاجوش** إذا كل شغلك محلي.

| | تطبيق ويندوز | `dev:memory` | `dev:local` | samparo.pro |
|---|---|---|---|---|
| البيانات | RAM + ملف JSON | RAM + snapshot | localStorage | Postgres |
| `/api/state` | نعم (Electron RAM) | نعم | لا | نعم |
| بدون إنترنت | نعم | نعم | نعم | لا |
| تيليغرام | لا | لا | لا | نعم |

