# Anchor — review findings and improvement plan (2026-11-16)

Branch: `task/review-gaps-and-agentic-setup`. Baseline before this work: 181 tests green, `npm run build` passes.

How to use this file: §1–§2 are the review. §3 is the binding brief for implementers — each work
package (WP) owns a fixed set of files. §5 is the status/handoff log; tick items there as they land.

---

## 1. Application findings

Severity: **P0** breaks learning or silently lost a feature · **P1** wrong behaviour · **P2** quality/UX/debt.
"Live" = reproduced in the running app on 2026-11-16.

| # | Sev | Finding | Where |
|---|-----|---------|-------|
| 1 | P0 | **Wrong answer + Enter: the "Correct solution" bar is dismissed by the same keypress.** The Enter listener is added to `document` while the keydown is still bubbling from the input, so it fires immediately. The learner never sees the correction (live: typed `xxx`+Enter → next phrase after <300 ms). | `src/web/drill-ui.js` showFeedback |
| 2 | P0 | **"Active Recall" shows the answer.** Daily review, Practice Mistakes and the refresher run in copy stage for the first 12 sentences / 24 words, so a normal review is 100 % copy-typing and SRS promotes every item (live: 3 due phrases → ghost text opacity 1, no Reveal button). | `src/core/engine.js` getStage |
| 3 | P0 | **XP/streak UI is gone.** `gamifStreak`, `gamifXP`, `gamifLevel`, `confettiContainer`, `endScreenXPContainer`, `endScreenXPValue`, `endScreenLevelLabel`, `hapticToggle` are read by JS but do not exist in `index.html`. XP is awarded and synced but never shown; confetti never fires; haptics cannot be turned off. Cause: an agent "fixed a layout bug" with `git checkout db9f8f7 -- index.html`; the markup lives only in unmerged commit `7aae60c`. | `index.html` |
| 4 | P0 | **PWA is dead.** Same rollback removed `<link rel="manifest">` and the service-worker registration. `public/sw.js`, `manifest.json` and `scripts/stamp-sw.js` are maintained but nothing loads them: no install, no offline. If simply re-enabled, the SW would cache `GET /api/link?code=…` cache-first and Telegram linking would hang on "pending". | `index.html`, `src/web/main.js`, `public/sw.js` |
| 5 | P1 | Multiple choice with a small pool (reviews of 1–3 items) builds fake options: `"X"`, `"X?"`, `"X?"`, `"X?"`. Hidden today only because of #2. | `engine.js` generateMCData |
| 6 | P1 | Quitting while the wrong-answer bar is open leaves the `document` Enter listener alive; the next Enter in the next drill skips a phrase. Enter inside the flag-correction field also dismisses the bar and loses the correction. Quit does not stop TTS or the microphone. | `drill-ui.js` |
| 7 | P1 | "Repeat Lesson" and the welcome-back refresher ignore the session-length setting. | `drill-ui.js` restartBtn, `main.js` |
| 8 | P1 | Word-drill input is written to `innerHTML` unescaped (`<` breaks the line). | `drill-ui.js` oninput |
| 9 | P1 | Activity chart is shifted by one day east of UTC (local midnight → `toISOString()`); today's session shows up tomorrow in Spain. | `src/web/stats-dashboard.js` buildActivityGrid |
| 10 | P1 | Profile "Mastered N of M lessons" counts 40 unreachable legacy lessons, so 100 % is impossible. | `stats-dashboard.js` |
| 11 | P1 | Week card turns "Mastered" off the *first* exam in the list — for weeks 5–14 that is a tab mini-exam, not the final exam. | `src/web/dashboard.js` getTopicStatus |
| 12 | P1 | Welcome-back "Quick Refresher (N items)" counts words but drills only sentences; with only words due the button does nothing. | `src/web/re-engagement.js` |
| 13 | P2 | `getDueCount` excludes mistakes, `getDuePhrases` includes them: the card says N, the session has more. No SRS unit tests exist at all. | `src/core/srs.js` |
| 14 | P2 | Prompt language (RU/UK) can only be changed by picking a TTS voice of that language. No Ukrainian voice installed → no Ukrainian prompts. | `src/web/speech.js`, settings |
| 15 | P2 | Debug tooling ships to users: "Mock Speech" button in Read Aloud (free XP), "STT Debug Logs" panel in Auditions. Reading aloud does not count for the daily streak. | `read-aloud-ui.js`, `audition-ui.js` |
| 16 | P2 | Colour coding is wrong for 14 % of tokens: 388 distinct words are missing from `data/vocabulary.js` and fall back to green "noun" — including conjugated verbs (`pide`, `lleva`, `busca`, `pedimos`), adverbs (`muy`, `nunca`, `después`) and clitics (`me`, `lo`, `se`). Existing entries are also wrong: `pero: adjective`, `que: adjective`, `también: object`, `mi: object`. | `data/vocabulary.js` |
| 17 | P2 | `src/core/speech-recognition.js` is browser code in `core` with an unguarded `window` (breaks the project's own hard rule). Nothing enforces the core/web boundary. | `src/core/` |
| 18 | P2 | Tests that do not test: the "exactly 6 phrases" test only logs; `uk` is not required for sentences; data files are imported by hand in the test, so an unregistered file is invisible to both app and tests. | `tests/validate-data.test.js` |
| 19 | P2 | Dev seed writes `completion_count_<id>` keys nobody reads (no-op). If "fixed" naively it would push fake completions into a Telegram-linked account (merge = max, irreversible). | `src/dev/seed-demo-data.js` |
| 20 | P2 | 37 MB of unreferenced images in `public/theory/` (19 of 24 files) are deployed with every build; `scripts/pareja.pdf` (35 MB course PDF) sits next to scripts. | `public/theory/`, `scripts/` |
| 21 | P2 | Dead code: root `app.js` (544-line pre-Vite app), `tmp_log_prepend.md`, legacy theory modal, unused `renderTheoryArticle`/`renderWordTheoryArticle`, unused imports/variables. | various |
| 22 | P2 | Icon-only buttons have no accessible names; topic cards are click-only `div`s. | `index.html`, `dashboard.js` |
| 23 | P2 | No CI (tests run only when an agent remembers), no README, `vite.config.js` crashes outside a git checkout. | repo |
| 24 | P1 | **The 🚩 "flag wrong translation" button has never worked.** `flag-store.js` does `storage.load(key) \|\| []`, but the real adapter returns `{}` for a missing key, so the first flag throws `existing.push is not a function` and the Settings counter shows `undefined`. No tests. (Found while writing the skill that consumes the export.) | `src/core/flag-store.js` |

Checked and found healthy: server/auth (hashed tokens, allowlist on every entry, size caps, constant-time
compare, `tests/security.test.js`), sync merge (CRDT, well tested), curriculum structure (1,338 phrases,
0 missing UK, every non-legacy lesson has 6 phrases, balanced `¿?`/`¡!`, unique lesson ids).

Known and left alone: completion counters are stored under bare lesson ids; topic ids/files are
inconsistently named (`week_7` vs `week8`); single 544 KB JS bundle; bot TTS uses an unofficial
Google endpoint; nudge time is fixed UTC. See §4.

## 2. Agentic setup findings ("am I using skills correctly?")

Short answer: the project has **no skills**. What the rules file calls "Skills" are persona bullet points.

| # | Finding |
|---|---------|
| S1 | No `CLAUDE.md`/`AGENTS.md`. Claude Code sessions start with zero project rules; `.cursorrules` (Cursor only, stale: describes 6 of 30 modules, no server, no words/theory) and `.agents/rules/multi-agent-rules.md` (Antigravity only) are never loaded by it. |
| S2 | "Skills" in `multi-agent-rules.md` are not skills: no `SKILL.md`, no description-based triggering, nothing loaded on demand. Procedures that *are* skill-shaped (add a week, add a word topic, apply flagged translations, verify, ship) live as prose scattered over three files. |
| S3 | Persona theatre instead of verification. `[DEV]/[AQA]/[QA]` run in one context, so the author "reviews" itself. Findings 1–4 all carry "[AQA] verified / [QA] confirmed" entries in the log. The rollback that deleted the PWA and XP header was logged as "[AQA]: verified main.js null-checks missing elements". |
| S4 | `LESSONS_LEARNED.md` contains itself twice (first copy corrupted with literal `\n`), mixes obsolete rules (Tailwind CDN) with live ones, and must be "read before any code". Rules that could be tests are prose. |
| S5 | `AGENTS_LOG.md` is 73 KB / 1,042 lines of append-only ritual; it duplicates commit messages and costs ~20k tokens to read. |
| S6 | `.agents/` holds 25 stale run-state folders from June (briefings, handoffs) tracked in git, plus a stray `" .agents"` directory with a leading space. |
| S7 | No `.claude/settings.json`: no permission allowlist, no hook. "Run `npm test` before committing data" depends on memory. |
| S8 | The one real `SKILL.md` you have — the scheduled task `anchor-telegram-bot-night-build` — is well written (plan file as source of truth, hard limits, one commit per item) and is the pattern to keep. It is now obsolete (one-time, already ran, branch merged). |
| S9 | No subagent definitions; your "strong model plans, Sonnet implements" routing is redone by hand each time. |

Target setup (built in this branch):

- `AGENTS.md` — one tool-agnostic guide (map, commands, hard rules, workflow). `CLAUDE.md` imports it; `.cursorrules` and `.agents/rules/` become pointers.
- `.claude/skills/` — `curriculum-authoring` (+ reference files), `fix-flagged-translations`, `verify-app`, `ship-task` (user-invoked only).
- `.claude/agents/` — `implementer` (Sonnet), `content-reviewer` (independent curriculum QA).
- `.claude/settings.json` — permission allowlist, secrets deny-list, PostToolUse hook that runs the data validators after edits under `data/`.
- Guardrail tests replace prose rules: DOM contract, core purity, strict data validation + file discovery, vocabulary coverage, service worker.
- `LESSONS_LEARNED.md` deduplicated and sectioned; `AGENTS_LOG.md` becomes a short rolling log, history archived.
- CI workflow so tests/build run on every push regardless of which agent did the work.

---

## 3. Work packages

### Ground rules for every implementer

1. Read `AGENTS.md` first. Then implement **only** your WP. Edit only the files your WP owns; if a fix needs another file, say so in your report instead of touching it.
2. Other agents are editing other files at the same time. While iterating run only your own test files (`node --test tests/<file>.test.js`). Run the full `npm test` once at the end; if a failure comes from a file you do not own, do not fix it — report it.
3. No git write commands (`add`, `commit`, `mv`, `rm`, `checkout`, `stash`, `reset`). Read-only git (`show`, `log`, `diff`, `status`) is fine. Use normal file operations.
4. Do not start dev servers or browsers. The orchestrator does the in-browser verification.
5. No new npm dependencies. `src/core` stays DOM-free. Keep every existing export of the modules you touch (other modules import them).
6. Every behaviour change gets a `node:test` test in `tests/`. Tests must not depend on the wall clock or the machine's time zone.
7. Match the surrounding code style (ES modules, 2-space indent, the banner comments). No drive-by refactors.
8. Final report: per item id — done / skipped (why); files changed; the tail of your test run with pass/fail counts; anything you are unsure about.

### WP-A — Drill engine and drill UI

Owns: `src/core/engine.js`, `src/core/srs.js`, `src/web/drill-ui.js`, `tests/engine.test.js`, new `tests/srs.test.js`, new `tests/drill-ui.test.js` (optional).

- **A1 (finding 1, 6)** `showFeedback` wrong-answer branch: the Enter-to-continue listener must not fire for the keypress that opened the bar. Keep one module-level reference to the active listener; attach it after the current event has finished (e.g. `setTimeout(…, 0)`), ignore `e.repeat`, ignore Enter when the event target is inside `#feedbackBarFlagPanel`, and remove it in `handleContinue`, when a new drill starts, and on Quit / Return. Put the arming logic in a small exported helper so it can be unit-tested (assert: not attached synchronously; detached after continue; detached by the cancel function).
- **A2 (finding 2)** Reviews are recall-only: `getStage()` returns `false` when `isReview`. Lessons keep copy → recall. Tests: with `isReview: true` the first `onNextPhrase` already has `isCopyStage === false` and never selects `SPEECH`.
- **A3 (finding 5)** Never build a broken question: choose `MC` only when at least 3 distinct distractors exist in `phrases`; choose `WORD_ORDER` only when the phrase has at least 3 words; otherwise fall back to `TYPE`. Remove the dead duplicated branch and the `'?'` filler in `generateMCData`. Tests: 1-, 2- and 3-phrase review sessions never yield `MC` over 300 draws; with ≥ 4 distinct phrases MC options are 4 distinct strings containing the answer.
- **A4 (finding 7)** `restartBtn` passes `sessionPace` through.
- **A5 (finding 8)** Word-mode `fakeInput` rendering escapes the typed text (reuse the `esc` approach of `renderFakeInput` or `textContent`). Test it.
- **A6 (finding 6)** Quit / Return: cancel TTS (`cancelSpeech()`), stop the speech service if recording, clear the pending "auto-advance after speech" timer, reset `isHandlingFeedback`. The speech auto-advance timer must only act on the engine that created it.
- **A7** Deck: use the existing Fisher–Yates `shuffle` instead of `sort(() => Math.random() - 0.5)`; when the deck is refilled and there are ≥ 2 phrases, the next phrase must differ from the one just shown. Test for no immediate repeats.
- **A8 (finding 13)** `getDuePhrases` excludes `isMistake` entries so it matches `getDueCount` (mistakes are practised through "Practice Mistakes"). New `tests/srs.test.js` covering `registerNew`, `promote` (bucket cap, clears mistake flag), `demote`, due filtering against an injected clock or explicit `dueDate`s, mistakes list/count, unknown ids ignored.
- **A9** Remove the unused module variables (`boundKeydownHandler`, `boundVisibilityHandler`).

### WP-B — App shell, PWA, settings

Owns: `index.html`, `public/sw.js`, `public/manifest.json`, new icon files in `public/`, `src/web/main.js`, `src/web/speech.js`, `src/web/gamification-ui.js`, `src/web/theory-viewer.js` (dead-code removal only), `src/dev/seed-demo-data.js`, `vite.config.js`, new `scripts/generate-icons.js`, new `tests/dom-contract.test.js`, new `tests/sw.test.js`, new `tests/seed-demo-data.test.js`.

- **B1 (finding 3)** Restore the gamification markup in `index.html`: header bar (streak / XP / level), `#confettiContainer`, end-screen XP block, and a "Haptic feedback" toggle (`#hapticToggle`) in Settings. Take the original markup from `git show 7aae60c:index.html` and adapt it to today's page; do **not** replace the file. Call `updateGamificationDisplay(gamification.getStats())` at boot and every time the dashboard is rendered so the header is current after a drill.
- **B2 (finding 4)** PWA back on, safely:
  - `index.html`: `<link rel="manifest" href="/manifest.json">`, `theme-color`, `meta name="description"`, Apple web-app meta tags, `apple-touch-icon`.
  - `main.js`: register `/sw.js` on `window` `load`, only when `import.meta.env.PROD` and `'serviceWorker' in navigator`.
  - `public/sw.js`: return early (no `respondWith`) for non-GET, cross-origin, and any `/api/` request. Keep network-first for navigations and cache-first for same-origin static files. Keep the `%%CACHE_VERSION%%` placeholder.
  - Icons: `scripts/generate-icons.js` renders `public/icon.svg` to `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180 px) with the already-installed Playwright (devDependency). Run it once and keep the PNGs; add them to `manifest.json`. If no Playwright browser is installed, skip the PNGs and say so.
  - `tests/sw.test.js`: load `public/sw.js` in `node:vm` with a stub `self`/`caches`/`fetch`; assert `/api/link?code=x`, a POST, and a cross-origin GET are not intercepted, and a navigation is.
- **B3 (finding 14)** Prompt language is its own setting: a "Prompt language" select (Русский / Українська) stored under the existing `anchor_prompt_lang` key. The prompt-voice list shows only voices of the chosen language and is rebuilt when the language changes; choosing a voice no longer changes the language; `speakPrompt` uses the saved voice only if its language matches. Keep all current exports of `speech.js`.
- **B4 (finding 7, 21)** `main.js`: the refresher passes `getSessionPace()`; remove unused imports. Remove the legacy theory modal (`#theoryModal…`) and the unused article view (`#theoryArticleView…`, `renderTheoryArticle`, `renderWordTheoryArticle` and helpers used only by them) **only after** a grep proves no code path can open them; otherwise leave them and report.
- **B5 (finding 22)** `aria-label` on every icon-only button in `index.html`. Add one line to the Drill Guide: reviews are always recall (no ghost text).
- **B6 (finding 3, guardrail)** `tests/dom-contract.test.js`: every string literal passed to `getElementById` in `src/web/*.js` exists as an `id` in `index.html` or is created in JS (`id="…"` in a template or `.id = '…'`). This must fail on the current `main` and pass after B1.
- **B7 (finding 23)** `vite.config.js`: fall back to `VERCEL_GIT_COMMIT_SHA` (7 chars) or `'dev'` when `git rev-parse` fails.
- **B8 (finding 19)** Dev seed: write the keys the app actually reads (bare lesson ids), run only when the URL has `?demo=1` in dev, and never when `anchor_sync_auth` is present. Test that every seeded id exists in `loadAllData()`.

### WP-C — Stats, dashboard, re-engagement, read-aloud, auditions, data tests

Owns: `src/web/stats-dashboard.js`, `src/web/dashboard.js`, `src/web/re-engagement.js`, `src/web/read-aloud-ui.js`, `src/web/audition-ui.js`, `src/core/gamification.js`, new `src/core/dates.js`, new `src/core/progress-status.js`, new `data/auditions.js`, `tests/validate-data.test.js`, `package.json`, new tests for the above. (`scripts/audit-data.js` already exists — only wire it up.)

- **C1 (finding 9, 10)** One definition of "day": `src/core/dates.js` exports `utcDayString(date)` (the `YYYY-MM-DD` the streak already uses) and a helper to step days in UTC. `gamification.js` uses it. `buildActivityGrid(activityLog, now)` becomes exported, takes `now`, and uses UTC everywhere (date key and weekday), so its last cell is always the day `recordActivity` writes to. Test with instants just after local midnight in UTC+1/+2 terms (pure UTC maths, no TZ dependence). Stats: skip `legacy` topics; import `LESSON_MASTERED_THRESHOLD` from `core/constants.js`.
- **C2 (finding 11, 22)** Move status logic to `src/core/progress-status.js` as pure functions taking a `getCount(lessonId)` callback: `getLessonStatus`, `getTopicStatus`. Topic is `mastered` when its final exam (exam without `tab`) has ≥ `EXAM_MASTERED_THRESHOLD` completions; if the topic has no final exam, when every exam lesson has. Other states unchanged. `dashboard.js` uses them. Topic cards get `role="button"`, `tabindex="0"` and Enter/Space activation. Remove the unused `renderStatsTab` import. Keep every current export of `dashboard.js`.
- **C3 (finding 12)** Welcome-back overlay: the refresher button shows `min(dueSentences, 20)` and is hidden when no sentences are due; when only words are due, say so and point to the Words tab.
- **C4 (finding 15)** Read Aloud: "Mock Speech" only in dev (`import.meta.env && import.meta.env.DEV`). Finishing with at least one word read calls `gamification.recordActivity()` and `notifyProgressChanged()`.
- **C5 (finding 15)** Auditions: the "STT Debug Logs" panel and `console.log` only in dev. Move `vocabularyDB` to `data/auditions.js` (default export) and import it. A completed session also records activity.
- **C7 (finding 18)** `tests/validate-data.test.js` validates what the app loads: build the topic lists from `loadAllData()` instead of hand-written imports. Make sizing strict (non-legacy sentence lessons exactly 6 phrases, word lessons exactly 12). Require `uk` on every non-legacy phrase. Add a discovery test: every `.js` file in `data/sentences`, `data/words`, `data/theory` is present in `loadAllData()` / the theory registry (compare by default-export identity or id), so a forgotten registration fails the suite. Keep the existing assertions (theory schema, tokenizer round-trip, tabs, unique ids).
- **C9** `package.json`: add `"audit:data": "node scripts/audit-data.js"` and `"engines": { "node": ">=22" }`.

### WP-D — Vocabulary coverage (colour coding)

Owns: `data/vocabulary.js`, `src/core/tokenizer.js`, new `tests/vocabulary-coverage.test.js`.

- **D1 (finding 16)** Run `node scripts/audit-data.js --unknown` to list every word used in non-legacy phrases that is missing from `data/vocabulary.js`, with an example sentence each. Classify **all** of them. Types and colours are in `src/core/constants.js` (`COLOR_MAP`, `TOKEN_LABELS`). Rules:
  - Conjugated verb forms → `verb`; infinitives → `verb_infinitive`. A verb must never be left to the default.
  - Unstressed pronouns (`me te se lo le nos les`) → `subject` (the "Subject / Pronoun" colour). `la/los/las` stay `article`.
  - Possessives (`mi tu su mis tus sus nuestro…`) → `article`, following the existing `sus`.
  - Nouns → `object`, written explicitly (so the coverage test can be strict).
  - Follow existing precedent for every other class; when a form is ambiguous (e.g. `como`, `para`, `sobre`, `este`) read every sentence it occurs in and pick the role it has in this corpus. List the ambiguous ones you decided in your report.
- **D2** Fix existing misclassifications of function words — at least `pero` and `que` (conjunction), `también` (adverb), `mi` (article) — and scan the rest of the file for the same kind of error.
- **D3** Export the tokenizer's word normalisation (`normalizeWord`) from `tokenizer.js` and use it in the tokenizer itself, so the test and the app agree. Behaviour must not change.
- **D4** `tests/vocabulary-coverage.test.js`: every normalised word of every non-legacy phrase is a key of `vocabulary`; every value is a valid type; the source text of `data/vocabulary.js` has no duplicate keys (a later duplicate silently overrides an earlier one). The existing tokenizer round-trip test must stay green.

### WP-E — Repository and agent-workflow cleanup

Owns: `LESSONS_LEARNED.md`, `AGENTS_LOG.md`, new `docs/archive/`, everything under `.agents/` and `" .agents/"`, `.cursorrules`, `tmp_log_prepend.md`, root `app.js`, `public/theory/` (moves only), `scripts/pareja.pdf` (move only), new `reference/`, `.gitignore`, new `.github/workflows/ci.yml`, new `README.md`. Does **not** own `AGENTS.md`, `CLAUDE.md`, `.claude/`.

- **E1 (S4)** Rewrite `LESSONS_LEARNED.md`: remove the duplicated first half and the `\n` corruption; one line per lesson, each with its *why*; group under exactly these headings — `Workflow and shell`, `Architecture`, `Curriculum content`, `Drill UI and CSS`, `Speech`, `Theory`, `Build, PWA and infrastructure`. Drop lessons that no longer apply (Tailwind CDN ordering) and collapse repeats. Where a lesson is now enforced by a test, end the line with `(enforced: tests/<file>)`. Do not invent lessons. Add the lesson from this review under Workflow: never restore a whole file from an old commit to fix a local bug — it silently deleted the PWA wiring and the XP header; fix the lines, and let `tests/dom-contract.test.js` catch missing markup. Target ≤ 80 lines.
- **E2 (S5)** Move the current `AGENTS_LOG.md` to `docs/archive/AGENTS_LOG-2026.md` unchanged. Start a new `AGENTS_LOG.md`: a 6-line header explaining the format (newest first; per task: date · branch · what changed · how it was verified · follow-ups; ≤ 10 lines per entry; archive when the file passes ~200 lines) and one entry for this branch (leave the "verified" line for the orchestrator: write `Verification: pending orchestrator sign-off`).
- **E3 (S6)** Delete the stale run-state folders under `.agents/` (everything except `.agents/rules/`) and the stray `" .agents"` directory (leading space). Replace `.agents/rules/multi-agent-rules.md` with a pointer that keeps its `trigger: always_on` front matter and tells the agent to read and follow `AGENTS.md` and `LESSONS_LEARNED.md`. Replace `.cursorrules` with the same pointer. Add to `.gitignore`: agent run-state folders under `.agents/` (keep `rules/` tracked), `.claude/settings.local.json`, `CLAUDE.local.md`.
- **E4 (20)** Find which files in `public/theory/` are referenced from `data/`, `src/`, `index.html` or `tests/` (grep each file name). Move every unreferenced one to `reference/miro/`. Move `scripts/pareja.pdf` to `reference/pareja.pdf` (first grep for `pareja.pdf` references in code/scripts and report any). Add `reference/README.md`: source course material, not deployed, crop from here into `public/theory/` (keep crops small). Then run `npm test` and `npm run build`.
- **E5 (21)** Delete root `app.js` (pre-Vite app; confirm nothing imports it: `index.html` loads `src/web/main.js`) and `tmp_log_prepend.md`.
- **E6 (23)** `.github/workflows/ci.yml`: on push and pull_request — checkout (full git metadata is needed by `vite.config.js`), Node 22, `npm ci`, `npm test`, `npm run build`.
- **E7 (23)** `README.md` (≤ 60 lines): what the app is, quick start (the npm scripts), the three content pillars, where things live, link to `AGENTS.md`, `docs/telegram-bot/SETUP.md`, `docs/review-2026-11/PLAN.md`.

### WP-F — Cross-cutting finish (runs after A–E)

Owns: `src/core/speech-recognition.js` → `src/web/speech-recognition.js`, the import lines of its three importers, `src/core/flag-store.js`, new `tests/architecture.test.js`, new `tests/flag-store.test.js`.

- **F0 (24)** `flag-store.js`: treat anything that is not an array as an empty list (the web adapter returns `{}` for a missing key), in every function. `tests/flag-store.test.js` uses an adapter with exactly that contract: count is `0` on an empty store; flagging twice stores two entries with `id` and `flaggedAt`; export is a JSON array; clear empties it.
- **F1 (17)** Move the file to `src/web/`, update the imports in `drill-ui.js`, `read-aloud-ui.js`, `audition-ui.js`.
- **F2 (17)** `tests/architecture.test.js`: no file in `src/core/` references `document`, `window`, `localStorage`, `navigator` or `sessionStorage` outside comments, except behind a `typeof window !== 'undefined'` guard on the same line; no file in `src/core/` imports from `src/web/`; no file in `server/` imports from `src/web/`.
- **F3** Full `npm test` and `npm run build`; report counts.

---

## 4. Deliberately not done here

- Namespacing completion counters / renaming topic ids — needs a storage + sync migration; no user-visible gain.
- Code-splitting the 544 KB bundle; self-hosting fonts/icons for full offline rendering.
- Converting the 5 remaining theory PNGs (0.2–1 MB) to WebP.
- Bot: per-user nudge time zone, official TTS provider, sentence reels.
- `workbook/` (separate project, still untracked — decide whether it belongs in this repo).
- Deleting the obsolete scheduled task `anchor-telegram-bot-night-build` (yours to delete in the app).

## 5. Status / handoff

- [x] WP-A · [x] WP-B · [x] WP-C · [x] WP-D · [x] WP-E · [x] WP-F
- [x] Agent setup (AGENTS.md, CLAUDE.md, skills, subagents, settings + hook)
- [x] Orchestrator verification (2026-11-16): 300 tests pass, build passes; in browser: wrong-answer bar stays after Enter, reviews hide the answer, XP header shown, service worker active on the production build, flag button stores a flag. Not verified: speech recognition, Telegram quiz cards against a real bot, phone layout.
- [x] Translation audit applied (translation-fixes.md, 35 items) · [x] Telegram reels v2 quiz cards (docs/telegram-bot/QUIZ-PLAN.md)
