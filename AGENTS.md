# Anchor — agent guide

The single source of truth for every coding agent working in this repository (Claude Code, Cursor,
Antigravity, Codex…). Tool-specific files (`CLAUDE.md`, `.cursorrules`, `.agents/rules/`) only point here.

## What this is

A Vite + vanilla-JS (ES modules) + Tailwind v4 web app for drilling Spanish from Russian/Ukrainian
prompts, deployed on Vercel from `main`. It also has a Telegram "reels" bot and two-way progress sync,
running as Vercel Functions on Upstash Redis. No framework, no runtime npm dependencies.

One learner uses it (the owner): A1 moving to A2, native RU/UK, on phone and desktop. "Best learning
experience" outranks feature count — a drill that shows the answer or hides the correction is a P0 bug.

## Commands

| | |
|---|---|
| `npm test` | all `tests/*.test.js` with `node:test` — must be green before any commit |
| `node --test tests/engine.test.js` | one test file |
| `npm run build` | Vite build + service-worker stamp — must pass before merge |
| `npm run audit:data` | curriculum report; `node scripts/audit-data.js --unknown` lists unclassified words |
| `npm run dev` | web app on :3000 (proxies `/api` to :3001) |
| `npm run dev:api` / `npm run dev:bot` | local API with in-memory store / the same plus Telegram long-polling (`.env.local`) |

Windows machine. PowerShell 5.1 has no `&&` — chain with `;` (Git Bash accepts `&&`). Flags go through
npm after `--` (`npm run dev -- --host`). Never leave a dev server running when you finish.

## Map

| Path | What lives there |
|---|---|
| `data/sentences/week_*.js` | sentence topics: `tabs` → lessons of exactly 6 phrases `{ ru, uk, es }`; `exam: true` lessons auto-fill |
| `data/words/*.js` | word topics: lessons of exactly 12 words `{ ru, uk, es }` |
| `data/theory/*.js` | standalone theory articles; weeks and word topics can embed a `theory` object too |
| `data/vocabulary.js` | Spanish word → part of speech; drives the colour coding (`src/core/tokenizer.js`) |
| `src/core/` | pure logic that runs in Node and the browser: `engine` (drill state machine), `srs` (Leitner), `gamification`, `data-loader`, `theory-registry`, `learning-paths`, `sync-merge` / `sync-local` (CRDT progress doc), `reels-queue` |
| `src/web/` | browser only: `main.js` (entry, wiring), `dashboard`, `drill-ui`, `theory-viewer`, `read-aloud-ui`, `audition-ui`, `stats-dashboard`, `speech` (TTS), `sync-client`, `storage` |
| `server/`, `api/` | Vercel Functions. `api/*.js` are 5-line wrappers; logic is in `server/` (bot, reels, auth, store, tts, sync, cron nudge) |
| `tests/` | `node:test` suites; `fake-telegram.js` helper |
| `public/` | `sw.js` (cache name stamped at build), manifest, icons, theory images actually used |
| `docs/` | `telegram-bot/` (PLAN + SETUP runbook), `review-2026-11/PLAN.md` (latest review), `archive/` |
| `reference/` | source course material — never deployed |
| `workbook/` | a separate printable-workbook project with its own README — not part of the app |

## Hard rules

Most are enforced by a test. If you find one that is not, add the test rather than more prose.

1. **`src/core` is DOM-free.** No `document`, `window`, `localStorage`, `navigator`. Storage is an injected adapter `{ load(key), save(key, data) }`. (`tests/architecture.test.js`)
2. **The page and the script agree.** Every id passed to `getElementById` exists in `index.html` or is created in JS. Never restore or replace `index.html` (or any file) wholesale from an old commit — that once silently deleted the PWA wiring and the XP header. Fix the lines. (`tests/dom-contract.test.js`)
3. **Curriculum shape.** Sentence lessons: exactly 6 phrases with `ru`, `uk`, `es`. Word lessons: exactly 12 words. Every `tab` a lesson uses is declared in the topic's `tabs`. Every data file is registered in `src/core/data-loader.js` (and `theory-registry.js`). (`tests/validate-data.test.js`)
4. **Lesson ids are storage keys.** Globally unique, never renamed. A rename needs an entry in `src/core/id-migrations.js`.
5. **Every Spanish word in a phrase is classified** in `data/vocabulary.js`; verbs are never left to the default colour. (`tests/vocabulary-coverage.test.js`)
6. **Grammar scope:** present and pretérito indefinido only. No subjunctive or other tenses unless the user asks.
7. **Reviews are recall.** Copy stage (answer visible) exists only in first-time lessons; anything driven by SRS hides the answer.
8. **No runtime npm dependencies. No secrets in the repo** (`.env.example` holds placeholders only; do not read `.env*` files). Tests never call real Telegram, Upstash or Vercel.
9. **Server:** every entry point checks the allowlist; tokens are stored hashed. Read `tests/security.test.js` before touching auth or HTTP handling.
10. **Service worker** never intercepts `/api/*`, non-GET or cross-origin requests. (`tests/sw.test.js`)

## Workflow

1. **Branch first:** `task/<slug>` from `main`. Never commit on `main`.
2. **Read the lessons for your area** in `LESSONS_LEARNED.md` (sectioned; short). For curriculum work follow `.claude/skills/curriculum-authoring/SKILL.md` — plain markdown, usable by any agent.
3. **Change code and tests together.** Every behaviour change gets a test.
4. **Verify for real:** `npm test`, `npm run build`, and for anything a user can see, run the app and look at it (`.claude/skills/verify-app/SKILL.md`). Passing tests are not proof: the two worst bugs in this app's history passed every test and every "QA" sign-off.
5. **Commit on the task branch** (conventional commits), then stop and report what changed and how it was verified. Do not merge into `main` or push until the user says so ("merge", "deploy", "done"). Then squash-merge, push `main`, delete the branch (`.claude/skills/ship-task/SKILL.md`).
6. **Log it:** add an entry at the top of `AGENTS_LOG.md` — date, branch, what changed, how it was verified, follow-ups. Ten lines at most.
7. **When the user corrects you,** first record the lesson: one line with its *why* in the right section of `LESSONS_LEARNED.md` — or better, a test that makes the mistake impossible.
8. **Temporary scripts** go in a temp directory, not the repo. If you must create one here, delete it before you finish.

## Who does what

- Planning and review: the strongest available model. Implementation: Sonnet (`.claude/agents/implementer.md`), one work package with explicit file ownership per agent.
- Curriculum QA: `.claude/agents/content-reviewer.md`, in its own context. The agent that wrote the Spanish must not be the one that approves it.
- Do not role-play reviewers inside one context. A "[QA] verified" line written by the author is not a review; evidence is a test run, a build, or a screenshot.

## Big features

Write `docs/<feature>/PLAN.md` first: design, binding rules, an ordered checklist, and a status/handoff
section. Tick items as they land, one commit per item. The Telegram bot was built this way across
several sessions and an unattended night run.

## Deploy

Vercel builds `main`. Environment variables are listed in `.env.example`. Bot/Redis setup and the smoke
test are in `docs/telegram-bot/SETUP.md`.
