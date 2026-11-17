---
name: verify-app
description: Run and verify the Anchor app — tests, production build, and a real in-browser check of what changed. Use this after any change to src/, index.html, public/ or data/, whenever asked to run, start, open, preview, screenshot or smoke-test the app, and before saying a change "works". Also explains how to put the app into a given state (due reviews, completed lessons) for testing.
---

# Verifying Anchor

Two bugs once sat in the core drill for months with every test green: wrong answers flashed past
without showing the correction, and "recall" reviews displayed the answer. Both were visible within a
minute of using the app. So verification here has two halves, and the second is not optional for
anything a user can see.

## 1. Automated gate

```bash
npm test
```

```bash
npm run build
```

Both must pass. Report the pass/fail counts, not "tests pass".

## 2. Look at it

Start servers through the preview tools with the names in `.claude/launch.json` — not with
`npm run dev` in a shell — and stop them when finished.

| Name | Port | Use |
|---|---|---|
| `anchor-web` | 3000 | dev server; everyday checks |
| `anchor-api` | 3001 | local API (in-memory store) — only for Telegram sync / link UI |
| `anchor-preview` | 4173 | serves `dist/` after `npm run build`; the only place the service worker runs |

Without preview tools (other agents): Playwright is a devDependency; drive `http://localhost:3000`
headlessly from a script kept outside the repo.

Prefer reading the page (accessibility tree, text, computed values) over screenshots; take one
screenshot at the end as evidence for visual changes. Check the console for errors after each flow.

### Smoke path (5 minutes; run the parts your change touches, all of it before a merge)

1. **Dashboard:** week cards and the "Domina el Pasado" path card render; the header shows streak, XP
   and level; no console errors.
2. **Lesson drill:** open a week → a tab → a lesson. In the copy stage the grey ghost answer is
   visible. Type it: the drill advances by itself, counter goes up.
3. **Wrong answer:** type `xxx`, press Enter. The red "Correct solution" bar must *stay* until Continue
   or a second Enter. This is the regression that matters most.
4. **Recall stage and reviews:** past the midpoint, and in any Daily Review / Practice Mistakes
   session, the ghost answer is hidden and "Reveal Answer" is offered. Multiple choice shows four
   different sentences.
5. **Finish a lesson** (set Settings → Session Length to 0.5× to shorten it): end screen shows the XP
   gained; back on the dashboard the lesson card is marked and the header XP increased.
6. **Words:** a topic → a lesson → a few words. **Theory:** open an article; tables render.
   **Read:** a text opens. **Settings / Profile:** open and close; changed settings persist on reload.
7. **Narrow screen:** repeat step 2 at phone width — the typed text and the caret line up.

Speech recognition cannot be exercised headlessly; in dev the Read Aloud view has a "Mock Speech"
button that simulates the next word.

### Putting the app into a state

All progress is in `localStorage`. The preview browser has its own storage, separate from the user's
real browser — but still read a key before overwriting it, and never seed on the production origin.

| Key | Value |
|---|---|
| `<lessonId>` (bare, e.g. `w1_l1`) | completion count as a string; 1 = completed, 3 = mastered (5 for exams) |
| `srs_sentences`, `srs_words` | `{ "<lessonId>_p<i>" or "<lessonId>_w<i>": { bucket, dueDate, isMistake?, updatedAt } }` |
| `anchor_gamification` | `{ totalXP, streak: { current, longest, lastActiveDate }, activityLog: { "YYYY-MM-DD": true } }` (UTC days) |
| `anchor_session_pace` | `0.5`, `1` or `1.5` |

Example — make three sentences due so the review card appears, then reload:

```js
const past = Date.now() - 3600_000;
const srs = JSON.parse(localStorage.getItem('srs_sentences') || '{}');
for (const id of ['w1_l1_p0', 'w1_l1_p1', 'w1_l1_p2']) srs[id] = { bucket: 1, dueDate: past, updatedAt: past };
localStorage.setItem('srs_sentences', JSON.stringify(srs));
location.reload();
```

In dev, opening `/?demo=1` seeds a "week 1 mastered, week 2 completed" profile (skipped when the
browser is linked to Telegram).

### Service worker / offline (only when `public/sw.js`, the manifest or the build changed)

`npm run build`, start `anchor-preview`, load the page twice, then check in the page:
`navigator.serviceWorker.controller` is set; a request to `/api/link?code=x` is answered by the
network (not the cache); with the server stopped, a reload still shows the app shell.

### Server and bot changes

`tests/` covers the HTTP handlers, bot flows and sync end-to-end with fakes — that is the gate. Real
Telegram/Redis behaviour is checked by the user with `docs/telegram-bot/SETUP.md` §9; say so in the
report instead of claiming it was verified.

## 3. Report

State what was run and seen: test counts, build result, which smoke steps, what the page showed (quote
the text or attach the screenshot), console clean or not. Say plainly what was **not** verified.
