# Telegram Reels Bot + Two-Way Progress Sync — Plan

Branch: `task/telegram-reels-bot` (never commit to `main`, never push, never merge — see LESSONS_LEARNED "Task Branch Lifecycle").

This file is the contract between the interactive session (2026-11-01) and the unattended night jobs.
Night jobs: read **Rules for unattended runs** first, then work the **Checklist** top to bottom.

---

## 1. What we are building

1. **A Telegram bot that teaches the app's words as "reels" in chat.**
   One message per session that is *edited in place* into the next card on every tap.
   ```
   🇪🇸 <b>el camarero</b>
   <tg-spoiler>официант</tg-spoiler>

   <i>3/12 · En el Restaurante · 🆕 new</i>
   [ 🔊 Audio ] [ 👁 Reveal ]
   [ ❌ Again ] [ ✅ Know  ]
   ```
   - ✅ Know → SRS promote (review) / registerNew (new word) — same semantics as `src/core/engine.js handleCorrect`.
   - ❌ Again → SRS demote (bucket 0, `isMistake: true`) and re-queue the word 3 cards later (max 2 repeats/word/session).
   - 👁 Reveal → edit the card to show RU **and** UK translations un-spoilered.
   - 🔊 Audio → send a voice message with the Spanish pronunciation (deleted when the card advances).
   - End of session → summary card (✅/❌ counts, streak, XP, due-now count) with [▶️ Next] [📊 Progress].
   - Commands: `/start`, `/reels` (alias `/learn`), `/topics`, `/progress`, `/settings` (RU/UK, session size 8/12/20, daily nudge on/off), `/link <code>`, `/disconnect`, `/help`.
   - Daily nudge (Vercel cron, once a day): "📚 14 words due" + [▶️ Start reels] for users with due words and no activity today.
2. **Two-way progress sync** between the web app (localStorage) and the bot, so both share one SRS state, XP and streak.
3. **Authorization** via Telegram identity: the web app links to a Telegram account with a deep link; the bot is restricted to an allowlist.

Out of scope for v1: Telegram Mini App, sentence reels, RU→ES direction (possible v2), flag sync.

---

## 2. Architecture

```
 Browser PWA (Vite, localStorage)            Telegram
   src/web/sync-client.js                      │ webhook (secret header)
        │  Bearer token                        ▼
        ▼                               api/telegram.js ──► server/bot.js ──► server/reels.js
   api/sync.js  api/link.js                                      │                │
        │            │                                           ▼                ▼
        └──► server/progress.js ◄────────────── src/core/progress-adapter.js (createSRS / createGamification on a doc)
                     │   CAS retry loop                 src/core/sync-merge.js   (CRDT merge)
                     ▼                                  src/core/reels-queue.js  (what to show next)
              server/store.js  ── Upstash Redis REST (prod) | in-memory (tests/dev)
```

- **Hosting**: same Vercel project as the PWA (`https://anchor-app-sage.vercel.app`, auto-deploys from GitHub `main`; any other branch pushed = preview deploy).
  Functions live in root `api/*.js` using the Web-standard signature `export default { fetch(request) { … } }` (package.json has `"type": "module"`, so native ESM).
  One file per endpoint (zero-config routing). Shared server code in `server/` (Node-only, no Vercel specifics, injectable deps for tests).
  Pure shared logic stays in `src/core/` (no DOM, no Node-only APIs — LESSONS_LEARNED "Core/Web Separation").
- **Storage**: Upstash Redis via the Vercel Marketplace, called with plain `fetch` against the REST API (no SDK, keep zero runtime deps).
  Env: `KV_REST_API_URL` + `KV_REST_API_TOKEN` (Vercel integration names) or `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`.
  Without them the server falls back to the in-memory store (tests, local dev).
- **No new runtime dependencies.** Node ≥ 18 globals only (`fetch`, `crypto.subtle`/`node:crypto`, `Request`, `Response`).

### 2.1 Redis keys (prefix `anchor:`)
| Key | Type | Content |
|---|---|---|
| `anchor:u:{tgId}:progress` | hash `{rev, doc}` | Progress doc v1 (below), optimistic concurrency via `rev` (Lua CAS) |
| `anchor:u:{tgId}:reels` | hash `{rev, doc}` | Current reels session |
| `anchor:u:{tgId}:settings` | string JSON | `{ lang: 'ru'\|'uk', size: 12, nudge: true, username, firstName }` |
| `anchor:users` | set | tgIds that pressed /start (for the cron nudge) |
| `anchor:link:{code}` | string JSON, TTL 600s | `{ status: 'pending'\|'claimed', tgId?, username? }` |
| `anchor:tok:{sha256(token)}` | string | tgId (web session token, no expiry, revocable) |
| `anchor:u:{tgId}:toks` | set | token hashes of that user (for /disconnect) |
| `anchor:tts:{sha1(text)}` | string | Telegram `file_id` of the cached voice for that text |

### 2.2 Progress doc v1 and merge rules (`src/core/sync-merge.js`)
```js
{
  v: 1,
  srs: {
    words:     { [itemId]: { bucket, dueDate, isMistake?, updatedAt? } },
    sentences: { [itemId]: { bucket, dueDate, isMistake?, updatedAt? } },
  },
  completions: { [lessonId]: number },          // per-key max
  activity:    { ['YYYY-MM-DD']: true },        // union (UTC dates, same as gamification.js)
  streak:      { current, longest, lastActiveDate }, // see below
  xp:          { [deviceId]: number },          // G-counter: per-device max, total = sum
}
```
- **SRS items**: last-writer-wins on `updatedAt` (missing = 0). Ties broken by the total order
  `(updatedAt, bucket, dueDate, isMistake)` → pick max. Deterministic, commutative, associative, idempotent.
  `src/core/srs.js` stamps `updatedAt: Date.now()` on promote/demote/registerNew.
- **completions**: max per lesson id.
- **activity**: union. **streak**: `lastActiveDate = max`, `current = max(current of the side(s) whose lastActiveDate == max, consecutive-day run in merged activity ending at lastActiveDate)`, `longest = max(both longest, current)`.
- **xp**: per-device max; displayed `totalXP = Σ xp[*]`. The bot is device `"tg"`. Each browser gets a random `deviceId`.
- Merge must be a pure join: `merge(a,b) == merge(b,a)`, `merge(a,merge(b,c)) == merge(merge(a,b),c)`, `merge(a,a) == normalize(a)`. Property tests enforce this.
- **Web apply rule**: never overwrite local state with the server doc; always write `merge(localNow, serverDoc)` (protects changes made while the request was in flight).

### 2.3 Running core engines on a doc (`src/core/progress-adapter.js`)
`createDocStorage(doc, { deviceId })` returns a `{ load(key), save(key, data) }` adapter that maps
`srs_words` → `doc.srs.words`, `srs_sentences` → `doc.srs.sentences`, `anchor_gamification` → `{ totalXP: Σxp, streak, activityLog: activity }`.
Saving gamification converts the `totalXP` delta into `doc.xp[deviceId] += delta`.
→ The bot calls the **same** `createSRS` / `createGamification` as the app, so semantics can't drift.

### 2.4 Web XP bookkeeping (`anchor_sync_meta` in localStorage)
`{ deviceId, xpContributed, xpBaseline, lastSyncAt, linkedAs }`.
On sync: `earned = max(0, totalXP − xpBaseline)`; send `xp = { [deviceId]: xpContributed + earned }`.
On success: `total = Σ merged.xp`; `inflight = max(0, totalXPNow − totalXPAtSend)`; set `totalXP = total + inflight`, `xpBaseline = total`, `xpContributed = merged.xp[deviceId]`.

### 2.5 Auth
- **Webhook**: `setWebhook(secret_token=TELEGRAM_WEBHOOK_SECRET)`; `api/telegram.js` rejects requests whose `X-Telegram-Bot-Api-Secret-Token` header differs (constant-time compare).
- **Allowlist**: `ALLOWED_TELEGRAM_IDS` (comma-separated). Default-deny: a user not on the list gets "Your Telegram ID is N — add it to ALLOWED_TELEGRAM_IDS" and nothing is stored.
- **Web linking** (works from inside an installed PWA):
  1. App `POST /api/link` → `{ code, deepLink: https://t.me/<BOT_USERNAME>?start=link_<code>, expiresIn: 600 }` (code = 16 random bytes, base64url).
  2. App opens the deep link; user presses Start → bot replies "Connect this browser to your Anchor progress? Only confirm if you just pressed Connect in the app." [✅ Connect] [Cancel].
  3. On ✅ the code becomes `claimed` with the tgId.
  4. App polls `GET /api/link?code=…` every 2 s (and on `visibilitychange`); once claimed the server issues a random 32-byte token **once**, stores only its SHA-256, deletes the code, returns `{ token, user }`.
  5. App stores the token in localStorage `anchor_sync_auth` and sends `Authorization: Bearer <token>` to `/api/sync`.
  Fallback: the app also shows the code; `/link <code>` in the bot does the same as step 2.
- `/disconnect` in the bot revokes all tokens of that user; "Disconnect" in the app forgets the token locally and calls `DELETE /api/link` to revoke it server-side.
- **Cron**: `api/cron-nudge.js` requires `Authorization: Bearer ${CRON_SECRET}` (Vercel sends it automatically when `CRON_SECRET` is set).
- Same-origin only: no CORS headers are emitted (the PWA and API share the origin).

### 2.6 Env vars (`.env.example`, never commit real values)
`TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_USERNAME`, `TELEGRAM_WEBHOOK_SECRET`, `ALLOWED_TELEGRAM_IDS`, `PUBLIC_APP_URL`,
`KV_REST_API_URL`/`KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`), `CRON_SECRET`, `TTS_PROVIDER` (default `google-translate`).

### 2.7 Audio (🔊)
`server/tts.js`: provider `google-translate` = unofficial `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=es&q=…` (MP3, free, no key, may break or rate-limit — swappable in one file).
Upload once with `sendVoice` (multipart, MP3); if Telegram rejects it fall back to `sendAudio`. Cache the returned `file_id` under `anchor:tts:{sha1(text)}` and reuse it forever.
On any failure: `answerCallbackQuery` "Audio unavailable right now" — the card keeps working.

### 2.8 Known data issue fixed in this branch
`data/words/time_calendar.js` and `data/words/tiempo_frecuencia.js` both use lesson ids `wt_l1` / `wt_exam`, so the
12 "Days of the Week" words are shadowed in `buildWordBank` (252 instead of 264 words) and share SRS/completion keys.
Fix (done in M1): rename the Tiempo lessons to `wtf_l1` / `wtf_exam`; a one-time web migration (`anchor_migration_wtf_v1`) copies
existing `wt_l1_w*` SRS entries to `wtf_l1_w*` and the `wt_l1`/`wt_exam` completion counters to `wtf_l1`/`wtf_exam` (copy, never move: both topics keep their progress).

Also fixed in M1: `gamification.js isConsecutiveDay` parsed the UTC date strings as *local* midnight, so across a DST change
(e.g. 2026-10-25 → 10-26 in Europe/Madrid, a 25 h "day") the streak reset to 1. Dates are now parsed as UTC.

---

## 3. Rules for unattended runs (night jobs)

1. Work in `D:\spanish\anchor app` on branch `task/telegram-reels-bot` only. Start with `git status` + `git log --oneline -5`.
   If the tree is dirty from an interrupted run, inspect the diff: finish that checklist item if it is close, otherwise commit it as `wip: …` and continue.
2. **Never** push, merge, rebase onto `main`, deploy, run `vercel`, call the real Telegram or Upstash APIs, or create/modify `.env*` files with real secrets. There are no secrets on this machine for this feature — everything is tested with fakes.
3. Read `LESSONS_LEARNED.md` rules once before writing code. Follow the existing code style (plain ES modules, JSDoc comments, `// ===` section banners, 2-space indent).
4. Take the first unchecked item in the checklist. Implement it **with tests** (`node:test`, files in `tests/*.test.js` — `npm test` picks them up).
5. `npm test` must be green before every commit. Commit after **each** item (small commits survive a usage-limit cutoff), ticking its box in this file in the same commit.
   Commit message: conventional (`feat(bot): …`, `test(sync): …`), ending with a blank line and `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
6. If an item needs a decision that is the user's, write it under **Open questions**, choose the conservative default, and keep going.
7. Before stopping: run `npm run build` (the PWA must still build), update **Status / handoff** below, append an entry to `AGENTS_LOG.md` in its existing `[DEV]/[AQA]/[QA]` format, commit.
8. Stage explicit paths only (`git add <files>`), never `git add -A` / `git add .`: the untracked `workbook/` folder and ` .agents/` belong to the user — never stage, edit or delete them.
9. Stop when the checklist is done, or when the remaining context/usage clearly will not fit the next item — never leave a half-written item uncommitted.

---

## 4. Checklist

### M1 — Core sync (pure, `src/core/`)
- [x] 1.1 `srs.js`: stamp `updatedAt` on promote/demote/registerNew (+ test).
- [x] 1.2 `sync-merge.js`: `emptyProgress`, `normalizeProgress`, `mergeProgress`, `totalXP`, streak helpers (+ property tests: commutative/associative/idempotent on random docs, LWW, G-counter, streak).
- [x] 1.3 `progress-adapter.js`: `createDocStorage(doc, {deviceId})`; createSRS/createGamification run on a doc (+ tests).
- [x] 1.4 Fix `wt_l1`/`wt_exam` collision (rename Tiempo → `wtf_*`, web migration, drop KNOWN_DUPLICATES from the test) (+ test that the word bank has 264 words).

### M2 — Server foundation (`server/`, `api/`)
- [x] 2.1 `server/store.js`: `createMemoryStore()` and `createRedisStore({url, token, fetch})` with `getDoc/casDoc/getJSON/setJSON(ttl)/del/sadd/smembers/srem` (+ tests incl. fake-fetch request shapes and CAS conflicts).
- [x] 2.2 `server/config.js`: env parsing + `createStoreFromEnv()` (+ tests).
- [x] 2.3 `server/progress.js`: `loadProgress`, `updateProgress(store, tgId, mutator)` with CAS retry (+ tests incl. concurrent writers).
- [x] 2.4 `server/auth.js`: link codes, token issue/verify/revoke (SHA-256), allowlist (+ tests).
- [x] 2.5 `server/http.js` helpers + `server/api-sync.js`/`server/api-link.js` (handlers) + thin `api/sync.js`/`api/link.js` via `vercelFunction()` in `server/config.js` (+ handler tests with Web `Request`).

### M3 — Bot (`server/`, `api/telegram.js`)
- [x] 3.1 `server/telegram.js`: Bot API client with injectable fetch (`call(method, params)`, multipart upload for voice) (+ tests).
- [x] 3.2 `src/core/reels-queue.js`: word index (id → word, topic, lesson) + `buildReelsQueue({wordTopics, srsWords, now, size, topicId})` (due first, mistakes first, then new in curriculum order) (+ tests).
- [x] 3.3 `server/reels.js`: session state machine (start/know/again/reveal/finish, stale-callback guard via session id + position) + HTML card rendering with `<tg-spoiler>` and HTML escaping (+ tests).
- [x] 3.4 `server/bot.js` + `api/telegram.js`: update router (commands, deep-link `/start link_…`, callbacks), webhook secret check, allowlist (+ tests simulating full flows).
- [x] 3.5 `server/tts.js` + 🔊 handling with `file_id` cache and graceful failure (+ tests with fakes).
- [x] 3.6 `api/cron-nudge.js` + `vercel.json` `crons` (daily 17:00 UTC) (+ tests).

### M4 — Web app
- [x] 4.1 `src/web/sync-client.js`: collect local doc, XP bookkeeping, POST `/api/sync`, apply via merge, triggers (start, `visibilitychange` hidden, every 5 min, after drill end, "Sync now") (+ tests for the pure parts).
- [x] 4.2 Settings modal "Telegram sync" section (connect via deep link + code + polling, status, sync now, disconnect); re-render dashboard after a sync that changed data.
- [x] 4.3 `scripts/dev-api.js` (local API on :3001, memory or Redis store, `--poll` long-polling bot mode, loads `.env.local`), Vite proxy `/api` → :3001, `.env.example`, `.gitignore` env files.

### M5 — Ops & polish
- [x] 5.1 `scripts/telegram-setup.js`: setWebhook (secret, allowed_updates), setMyCommands, setMyDescription.
- [x] 5.2 `docs/telegram-bot/SETUP.md`: morning runbook (BotFather, Upstash via Vercel Marketplace, env vars, preview deploy, webhook, linking, smoke test).
- [x] 5.3 `tests/e2e-flow.test.js`: link → web sync up → reels know/again → web sync down, all in-process with the memory store and a fake Telegram.
- [x] 5.4 Self-review (security: secret compare, allowlist on every entry point, input validation/size limits on `/api/sync`, callback spoofing; merge correctness) + AGENTS_LOG entry.

### 5.4 Self-review notes (2026-11-02 night run; enforced by `tests/security.test.js`)
| Area | Finding |
|---|---|
| Secret compares | Webhook secret and `CRON_SECRET` use `safeEqual` (SHA-256 + `timingSafeEqual`). Missing secret ⇒ 503 (default-deny), never "open". |
| Allowlist | Checked on bot messages, bot callbacks, `/api/sync` (403 even with a valid token once removed), and cron (non-allowlisted ids skipped). `/api/link` POST is open by design (a code is useless until an allowlisted user confirms it) and rate-limited to 30/min. |
| Input limits | `/api/sync` 1 MB, webhook 256 KB; **added**: early 413 from `Content-Length` before buffering. Doc contents are validated by `normalizeProgress` (ids ≤ 80 chars, buckets ≤ 20, finite numbers, `YYYY-MM-DD` dates). |
| Callback spoofing | Reel taps act only on the tapping user's session (keyed by `from.id`) and only if sid+pos match; settings/topic/link values are whitelisted/regex-checked; garbage is answered and ignored. |
| HTML/XSS | Bot text goes through `escapeHtml`; the web section uses `textContent` only; **added**: the client refuses a `deepLink` that isn't `https://t.me/…`. |
| Dev server | **Added**: `scripts/dev-api.js` binds to 127.0.0.1 only (Vite proxy updated). |
| Merge | Join properties are property-tested (M1). The web apply path merges *current* local state with the server doc (in-flight taps survive, test-covered); XP G-counter verified not to double-count across repeated syncs and two browsers. |
| Residual risks (accepted) | (1) Link phishing: someone could send an allowlisted user a deep link to *their own* code; the prompt warns "Only confirm if you just pressed Connect in the app". Impact: read/write of that user's learning progress only. (2) If the progress write fails after a reel tap was claimed (Redis outage), that one tap's SRS update is lost; the session still advances. (3) The bearer token lives in localStorage (standard XSS exposure; the app has no third-party scripts). |

---

## 5. Open questions
- **Webhook on previews vs. Deployment Protection** — Vercel Authentication on preview deployments blocks Telegram's webhook calls. SETUP.md §6 offers: disable protection temporarily, use *Protection Bypass for Automation* with `--url=…?x-vercel-protection-bypass=…`, or test on production. Your call which one.
- **One bot or two?** Local `npm run dev:bot` long-polls and can't share a bot that has a webhook. Default chosen: recommend a separate dev bot (SETUP.md §1); nothing in the code assumes either.
- **Nudge time** — fixed 17:00 UTC (18:00 Madrid in winter, 19:00 in summer). Per-user time zones were left out of v1.
- **Missed nudges** — a nudge is marked as sent *before* the Telegram call, so a failed send (e.g. bot blocked) is not retried the same day. Conservative (never double-nudges).
- `src/dev/seed-demo-data.js` writes completion counters under `completion_count_<id>`, but the app reads plain `<lessonId>` keys, so the dev seed's completions never show. Pre-existing and unrelated to this feature; not changed.

## 6. Status / handoff
- 2026-11-16 — **reels v2 (quiz cards)** replaces the Reveal/Know/Again flow described in §2 and in the 3.3–3.4 notes below: study → re-test, choose/type cards graded by the bot, no `<tg-spoiler>`. Spec and decisions: [QUIZ-PLAN.md](QUIZ-PLAN.md). `r:v|k|g` callbacks and v1 sessions are tolerated as stale.
- 2026-11-02 night run — **checklist complete (3.3 → 5.4)**, 181 tests green, `npm run build` passes. Nothing pushed or deployed.
  **What you need to do** (all in [SETUP.md](SETUP.md)): create the bot(s) in BotFather, add Upstash Redis via the Vercel Marketplace,
  set the env vars in Vercel, push the branch for a preview, run `npm run telegram:setup` against it, link the app in Settings → Telegram Sync,
  and walk the smoke test (§9). Not verified by the night run: anything against real Telegram/Upstash/Vercel, the free Google TTS endpoint,
  and the Settings section's look in a real browser (logic is unit-tested; layout reuses the modal's existing classes).
  Then decide the Open questions above and merge per the Task Branch Lifecycle rule when you're happy.
- 2026-11-02 00:20 — 3.2 done (reels queue + requeue + topic progress), 89 tests green. The interactive session stopped here to stay
  inside the 5-hour window. **Next: 3.3.** Implementation notes for 3.3/3.4 (decided in the interactive session):
  - Know/Again run inside `updateProgress(store, tgId, mutator)` with `createSRS(createDocStorage(doc, { deviceId: 'tg' }), SRS_KEY_WORDS)`:
    Know = `promote` for a review card, `registerNew` for a new card (mirrors engine.js handleCorrect); Again = `demote` + `requeueMissed`.
  - Claim the session transition first (`updateDoc` on `anchor:u:{tgId}:reels`, return `undefined` when sid/pos don't match → stale tap ignored),
    then touch progress. That makes double taps harmless.
  - callback_data: `r:<a|v|k|g>:<sid>:<pos>` (audio/reveal/know/again), `r:n` (new session), `p` (progress), `lk:<code>` / `lx:<code>` (link confirm/cancel),
    `t:<topicId>`, `s:<lang|size|nudge>:<value>`. Keep each ≤ 64 bytes.
  - Session end: `createGamification(adapter).recordActivity()` + `addXP(XP_REWARDS.review)` on the doc (bot is XP device `tg`).
  - Always `answerCallbackQuery`; swallow `isNotModified()` on edits; card text via `escapeHtml` (server/telegram.js).
  - Settings default `{ lang: 'ru', size: 12, nudge: true }`; `sadd('anchor:users', tgId)` on /start for allowlisted users only.
- 2026-11-01 23:15 — plan written in the interactive session; building starts with M1.
- 2026-11-02 00:05 — M2 + 3.1 done (store, config, progress CAS, auth, /api/sync, /api/link, Telegram client), 81 tests green. Next: 3.2.
- 2026-11-01 23:40 — M1 done (core merge + adapter + id migration + DST streak fix), 59 tests green. Next: M2.
