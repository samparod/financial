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

## Netlify · vermillion-pony-71141f

Production site: https://vermillion-pony-71141f.netlify.app

The app uses **Netlify Database** (Postgres) via `@netlify/database`. Netlify injects `NETLIFY_DB_URL` — do not commit connection strings.

Schema: one `workspaces` row per workspace key (`id` text, `data` jsonb). The default key is `default`, so two browsers opening the same site share the same numbers. Change the key under Settings only if you want a separate copy.

After a production deploy:

1. Open https://vermillion-pony-71141f.netlify.app/api/health — `ok` should be true and `db` should be `netlify-db` (or `postgres`).
2. In one browser, change a figure (for example a product cost on the accounts sheet) and wait about a second. The sidebar should say the data is saved in the cloud.
3. In another browser or device (or a private window), open the same URL. The figure from step 2 should be there.
4. Optional: Settings → workspace key. Leave `default` for this personal tool. If you set a custom key, paste the same key on the other device.

If `/api/health` reports `database unavailable`, confirm Netlify Database is Ready for this site (Data & Storage → Database). No paid plan is required.

Existing numbers stored only in the browser (`localStorage` key `lmofid-cod-v1`) are uploaded once when the cloud record is still empty (or still the sample seed).

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

