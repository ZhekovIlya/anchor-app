# Anchor

A small web app for drilling Spanish from Russian/Ukrainian prompts. Vite + vanilla JS (ES modules) + Tailwind v4,
deployed on Vercel from `main`. A Telegram "reels" bot and two-way progress sync run as Vercel Functions on Upstash Redis.
There are no runtime npm dependencies.

## Quick start

```bash
npm install
npm run dev          # web app on :3000 (proxies /api to :3001)
npm test             # all tests (node:test)
npm run build        # production build + service-worker stamp
npm run dev:api      # local API with an in-memory store
npm run dev:bot      # local API plus Telegram long-polling (needs .env.local)
```

Pass flags to a script after `--`, e.g. `npm run dev -- --host`. `npm run audit:data` prints a curriculum report.

## Content

- **Sentences** — weekly topics in `data/sentences/`: lessons of 6 phrases `{ ru, uk, es }`, grouped in tabs, plus exams.
- **Words** — word topics in `data/words/`: lessons of 12 words.
- **Theory** — articles in `data/theory/`; weeks and word topics can also embed a theory section.

## Where things live

| Path | Contents |
|---|---|
| `src/core/` | DOM-free logic: drill engine, SRS, gamification, data loading, sync merge |
| `src/web/` | browser code: entry point, dashboard, drill UI, theory viewer, speech |
| `server/`, `api/` | Vercel Functions (bot, reels, sync, cron nudge); `api/*` are thin wrappers |
| `data/` | curriculum and the vocabulary list used for colour coding |
| `tests/` | `node:test` suites |
| `public/` | service worker, manifest, icons, theory images in use |
| `reference/` | source course material, not deployed |
| `workbook/` | separate printable-workbook project with its own README |
| `docs/` | plans, runbooks, archive |

## More

- [AGENTS.md](AGENTS.md) — rules and workflow for anyone (human or agent) changing the code
- [docs/telegram-bot/SETUP.md](docs/telegram-bot/SETUP.md) — Telegram bot and Redis setup runbook
- [docs/review-2026-11/PLAN.md](docs/review-2026-11/PLAN.md) — latest review and work plan

Environment variables are listed in `.env.example` (placeholders only).
