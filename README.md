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

## تطبيق ويندوز (البيانات على جهازك)

الأرقام تُحفظ في ملف محلي (`istiqrar-state.json` داخل مجلد بيانات التطبيق) — مو على سيرفر.

تجربة أثناء التطوير (الموقع على 3070 + نافذة Electron):

```
npm run desktop:dev
```

بناء التطبيق ثم فتحه:

```
npm run desktop
```

ملف تثبيت Setup.exe:

```
npm run desktop:pack
```

المثبّت: `dist-desktop/Istiqrar-COD-Setup-1.0.0.exe`. بعد التثبيت اختصار **Istiqrar COD**. من القائمة: ملف → فتح مجلد البيانات.

ويندوز قد يظهر تحذير SmartScreen لأن الملف غير موقّع رقمياً — اختر «مزيد من المعلومات» ثم «تشغيل anyway».

هذا الإصدار محلي بالكامل: لا تيليغرام ولا سيرفر. النسخة على الموقع (`samparo.pro`) منفصلة.

