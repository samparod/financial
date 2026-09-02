# Stability COD · financial

Web dashboard + Telegram bot (`@financial2025_bot`) for Gulf / Algeria COD accounts. Same data on the site and in Telegram. Postgres in production.

## EasyPanel

1. Create app from GitHub: `samparod/financial`
2. Build: **Dockerfile** (port **3000**)
3. Add a **PostgreSQL** service and attach it
4. Environment:

| Key | Value |
|-----|--------|
| `DATABASE_URL` | Postgres URL from EasyPanel |
| `TELEGRAM_BOT_TOKEN` | from BotFather |
| `TELEGRAM_ALLOW_IDS` | your Telegram numeric id (optional) |
| `WEBAPP_URL` | `https://your-domain` |
| `WEBHOOK_URL` | `https://your-domain` |

5. After the first deploy, open `https://your-domain/api/telegram` once to register the webhook.

Do not put `.env` or the bot token in git.

## Local

```
npm install
npm run dev
```

Site: http://localhost:3070

Telegram polling (site must be running):

```
npm run bot
```
