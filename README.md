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
