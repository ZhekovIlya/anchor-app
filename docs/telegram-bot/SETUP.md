# Telegram Reels Bot — Setup Runbook

Everything in the code is tested with fakes; this is the part only you can do (accounts, secrets, deploys).
Takes about 20 minutes. Design and rationale: [PLAN.md](PLAN.md).

---

## 0. What you need
- A Telegram account (phone app is fine).
- Access to the Vercel project `anchor-app` (https://anchor-app-sage.vercel.app).
- This repo locally, `npm install` done.

## 1. Create the bot (BotFather)
1. In Telegram open **@BotFather** → `/newbot` → pick a name and a username ending in `bot`.
2. Copy the **token** (`123456789:AA…`) → `TELEGRAM_BOT_TOKEN`; the username without `@` → `TELEGRAM_BOT_USERNAME`.
3. Optional but recommended: create a **second bot for local development** (`/newbot` again). Local long polling
   (`npm run dev:bot`) cannot run on a bot that has a webhook, so a dev bot keeps production untouched.

## 2. Generate the secrets
Run twice, once for each value:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```
- `TELEGRAM_WEBHOOK_SECRET` — Telegram sends it in a header on every webhook call; `/api/telegram` rejects anything else.
- `CRON_SECRET` — Vercel sends it to `/api/cron-nudge`.

## 3. Your Telegram id → allowlist
The bot is default-deny. Your numeric id goes into `ALLOWED_TELEGRAM_IDS` (comma-separated for more people).
Easiest: deploy first with any value, send `/start` to the bot — it answers *"Your Telegram ID is N"*. Put N in the
variable and redeploy. (Or ask **@userinfobot**.)

## 4. Redis (Upstash via the Vercel Marketplace)
1. Vercel dashboard → project → **Storage** → **Create Database** → **Upstash for Redis** (free plan is plenty).
2. Connect it to the project for **Production and Preview**. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` itself.
   (`UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` work too if you create the database on upstash.com instead.)
3. Without these variables the functions refuse to start on Vercel (an in-memory store would silently lose data).

## 5. Environment variables in Vercel
Project → **Settings → Environment Variables**, for Production and Preview (see [.env.example](../../.env.example)):

| Name | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | from step 1 |
| `TELEGRAM_BOT_USERNAME` | from step 1, without `@` |
| `TELEGRAM_WEBHOOK_SECRET` | from step 2 |
| `ALLOWED_TELEGRAM_IDS` | from step 3 |
| `PUBLIC_APP_URL` | `https://anchor-app-sage.vercel.app` (or the preview URL while testing) |
| `CRON_SECRET` | from step 2 |
| `TTS_PROVIDER` | `google-translate` |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | added by step 4 |

## 6. Preview deploy (test before `main`)
1. Push the branch: `git push -u origin task/telegram-reels-bot` → Vercel builds a **preview** URL.
2. **Deployment Protection:** previews are usually behind Vercel Authentication, which also blocks Telegram's webhook calls.
   For the test either disable protection for previews temporarily, or enable *Protection Bypass for Automation* and set
   the webhook with the bypass parameter:
   `node scripts/telegram-setup.js --url="https://<preview-url>/api/telegram?x-vercel-protection-bypass=<bypass-secret>"`.
   (The app itself needs the preview to be reachable in your browser, which Vercel Authentication allows once you are logged in.)
3. Cron jobs only run on **production** deployments; on a preview you can trigger the nudge by hand:
   ```bash
   curl -H "Authorization: Bearer $CRON_SECRET" https://<preview-url>/api/cron-nudge
   ```

## 7. Point the webhook at the deployment
Create `.env.local` (git-ignored) from `.env.example` with the **same** token/secret and `PUBLIC_APP_URL` = the deployment
you are testing, then:
```bash
npm run telegram:setup
```
This calls `setWebhook` (with the secret and `allowed_updates`), `setMyCommands`, `setMyDescription`, `setMyShortDescription`.
Check with `node scripts/telegram-setup.js --info` (`last_error_message` should be empty).
Re-run it whenever the URL or the secret changes (e.g. after moving from preview to production).

## 8. Link the web app
1. Open the app (same deployment) → **Settings → Telegram Sync → Connect Telegram** → **Open Telegram**.
2. In Telegram press **Start**, then **✅ Connect**.
3. Back in the app the section shows *"Connected as @you · synced just now"* within a few seconds.
   Fallback if the deep link doesn't open: send the shown `/link <code>` to the bot.
4. Repeat on every browser/device you use. `/disconnect` in the bot logs all of them out.

## 9. Smoke test
- [ ] `/start` → help text with **▶️ Start reels**.
- [ ] `/reels` → one card; **👁 Reveal** shows RU + UK; **🔊 Audio** sends a voice message; **❌ Again** brings the word back 3 cards later; **✅ Know** advances; the same message is edited each time.
- [ ] Finish a session → summary with counts, streak, XP (+15).
- [ ] In the app: **Settings → Sync now** → dashboard/XP reflect the bot session.
- [ ] Do a lesson in the app, close the tab, then `/progress` in the bot shows it.
- [ ] `/settings` → switch to 🇺🇦 → next card's spoiler is Ukrainian.
- [ ] From another Telegram account (not on the allowlist): the bot answers with that id only.
- [ ] `curl -X POST https://<deployment>/api/telegram` → `401` (no secret).

## 10. Local development
```bash
cp .env.example .env.local   # fill in the dev bot token; leave KV_* empty for the in-memory store
npm run dev:api              # API on :3001
npm run dev                  # Vite on :3000, proxies /api → :3001
npm run dev:bot              # API + the dev bot via long polling (instead of dev:api)
```
`dev:bot` talks to the real Telegram API with the dev bot's token. If it reports *"a webhook is set"*, run
`node scripts/telegram-setup.js --delete-webhook` **for the dev bot only**.

## 11. Going live
Merging to `main` follows the usual rule in LESSONS_LEARNED ("Task Branch Lifecycle": squash, only on your explicit go).
After the production deploy: `PUBLIC_APP_URL=https://anchor-app-sage.vercel.app` in `.env.local` → `npm run telegram:setup`
again, and check **Settings → Cron Jobs** in Vercel lists `/api/cron-nudge` (17:00 UTC daily).

## Troubleshooting
| Symptom | Cause / fix |
|---|---|
| Bot silent | `--info` → `last_error_message`. 401 = secret mismatch (re-run setup); 403/HTML = Deployment Protection; 500 = env/Redis missing (Vercel function logs). |
| "Your Telegram ID is N" | Add N to `ALLOWED_TELEGRAM_IDS`, redeploy. |
| App: "Bot is not configured" | `TELEGRAM_BOT_USERNAME` missing in Vercel. |
| App stays "Open the bot and press Connect" | Code expired (10 min) or opened a different bot/deployment; press Connect again. |
| 🔊 "Audio unavailable right now" | The free Google TTS endpoint refused; cards keep working. Swap the provider in `server/tts.js`. |
