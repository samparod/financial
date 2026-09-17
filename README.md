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

### 2) متصفح على نفس الحاسوب فقط (بدون Electron)

البيانات في **localStorage** المتصفح، بلا سيرفر:

```
npm run dev:local
```

ثم افتح: http://localhost:3070

### 3) موقع على الإنترنت (`samparo.pro`)

اختياري ومنفصل — للتيليغرام والمزامنة على سيرفر. **ما تحتاجوش** إذا كل شغلك محلي.

| | تطبيق ويندوز | `dev:local` | samparo.pro |
|---|---|---|---|
| البيانات | ملف JSON على القرص | متصفح فقط | سيرفر + متصفح |
| بدون إنترنت | نعم | نعم | لا |
| تيليغرام | لا | لا | نعم |

