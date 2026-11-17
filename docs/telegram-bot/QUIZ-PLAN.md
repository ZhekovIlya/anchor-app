# Telegram reels v2 — quiz cards (plan, 2026-11-16)

## Why

v1 shows the Spanish word with the translation behind a spoiler and asks the learner to grade
themselves (Again / Know). Two problems reported by the owner:

1. **"The spoiler never comes back."** The whole session is one message edited in place. Telegram
   remembers on the client that a message's spoiler was opened, so after the first tap every later
   card arrives already revealed. It cannot be fixed from the server while spoilers are used.
2. **"I just click I know."** Self-grading without having to produce or choose anything is the weakest
   form of practice: recognising a word feels like knowing it. Memory research is consistent that
   *retrieval* (having to come up with or pick the answer, then seeing feedback) is what builds recall,
   and that spacing depends on honest grades. v1 gets neither.

## What v2 does

The bot asks; the learner answers; the bot grades. No spoilers, no self-grading.

Card types (one message, edited in place, as today):

| Type | When | Shows | Buttons |
|---|---|---|---|
| **Study** | first time a word is ever seen (`isNew`) | 🇪🇸 word + translation (both languages) | `🔊` `Got it ➡️` |
| **Choose translation** (ES → RU/UK) | word in SRS bucket 0–1, and the in-session re-test of a just-studied word | 🇪🇸 word, "What does it mean?" | 4 translations, one per row |
| **Choose Spanish** (RU/UK → ES) | bucket 2 | translation, "How do you say it?" | 4 Spanish words in a 2×2 grid |
| **Type it** (RU/UK → ES) | bucket ≥ 3, only if `typing` setting is on (default on); otherwise Choose Spanish | translation, "Type it in Spanish" | `💡 Hint` `🤷 Don't know` |

Flow rules:

- **Study is not graded.** "Got it" re-inserts the word 3 cards later as a *Choose translation* card
  (same mechanism as `requeueMissed`), and that answer is the one that registers it in SRS
  (`registerNew` if correct, `demote` if wrong).
- **Correct answer:** grade (`promote`, or `registerNew` for a new word), then show the next card
  immediately with a one-line receipt on top: `✅ la cuenta — счёт`. No extra tap.
- **Wrong answer:** grade (`demote`), requeue the word 3 cards later, and stay on a feedback card:
  `❌ <what you chose>` / `✅ la cuenta — счёт`, buttons `🔊` `Next ➡️`. The learner has to look at the
  right answer before moving on.
- **Type it:** the learner sends a normal chat message. Compare like the web app's submit check
  (`src/core/engine.js` `checkAnswer`: ignore case and punctuation; accent-insensitive Levenshtein
  ≤ max(1, floor(len/6)) counts as correct with a note `✅ almost — written: la cuenta`). The leading
  article is optional for the match but always shown in the receipt. `💡 Hint` reveals the first letter
  and the length (`l_ c_____`) once and has no penalty; `🤷 Don't know` counts as wrong. A text message
  while no typed card is active gets the old "Send /reels to start" reply.
- **Distractors** (3 per card) are picked when the session is built and stored in the session, so a
  tap can be validated and a redraw shows the same options: prefer words from the same topic, then the
  whole index; same "shape" where possible (with/without article, single/multi-word); never a word
  whose translation in the active language equals the answer's; shuffle with the session's random
  source (injectable for tests). If fewer than 3 distractors exist, fall back to a Study-style
  "show answer" card graded as wrong — never render a question with duplicate options.
- **Audio** (`🔊`) is offered only where it cannot give the answer away: Study cards and feedback cards.
- **Session summary:** `✅ 9 correct · ❌ 3 to repeat · accuracy 75 %`, streak, XP, due count — plus the
  list of missed words with translations, because the summary is the last chance to see them.
- Stale-tap protection stays exactly as in v1: every button carries the session id and the card
  position, the transition is claimed before progress is touched, a double tap changes nothing.

Callback data (all ≤ 64 bytes): `q:<sid>:<pos>:<0-3>` option tap · `r:s:<sid>:<pos>` study "Got it" ·
`r:x:<sid>:<pos>` next after feedback · `r:h:<sid>:<pos>` hint · `r:d:<sid>:<pos>` don't know ·
`r:a:<sid>:<pos>` audio. `r:n`, `p`, `t:<topic>`, `s:<field>:<value>`, `lk:`/`lx:` are unchanged.
Old v1 buttons (`r:v`, `r:k`, `r:g`) still in a chat answer "This card is no longer active".

Settings: add `typing: true|false` ("Typing cards") to `/settings` next to language, size and reminder.

## Binding rules

- Same as `PLAN.md` §3: no real Telegram/Upstash calls in tests, no new dependencies, allowlist on
  every entry point, `escapeHtml` for all card text, always `answerCallbackQuery`.
- Pure logic (queue building, distractor choice, answer matching, card-type selection) lives in
  `src/core/reels-queue.js` (or a new `src/core/reels-quiz.js`) and is unit-tested without a store.
- The SRS entry shape and the progress doc do not change; the web app must sync with v2 unchanged.
- Sessions stored by v1 may still exist in Redis: a session without the v2 fields is treated as
  finished/stale, not crashed on.

## Checklist

- [x] Q1 Core: card-type selection by bucket, distractor picker, typed-answer matcher, requeue after study — with tests
- [x] Q2 Session state machine in `server/reels.js`: answer / study / next / hint / don't-know transitions, grading, v1-session tolerance — with tests
- [x] Q3 Rendering: the four card types, receipt line, feedback card, summary with missed words
- [x] Q4 Bot wiring in `server/bot.js`: new callbacks, text-message answers for typed cards, `typing` setting, help text
- [x] Q5 Update `tests/bot.test.js`, `tests/reels.test.js`, `tests/e2e-flow.test.js`, `tests/cron-nudge.test.js` as needed; add cases for stale taps, double taps, wrong → requeue, study → re-test
- [x] Q6 Update `docs/telegram-bot/SETUP.md` smoke test (§9) and `PLAN.md` status section for v2

## Status / handoff

- 2026-11-16 — **Q1–Q6 implemented**, covered by tests; not yet run against a real bot (walk SETUP.md §9).
  - Core: `src/core/reels-quiz.js` (matcher, hint, kind by bucket, distractors, queue, retest/requeue). Session: `server/reels.js` (`v: 2`). Bot: `server/bot.js`.
  - Session doc: `{ v: 2, sid, queue, pos, phase: 'ask'|'feedback', hinted, receipt, feedback, known, missed, missedIds, lang, messageId, audioMessageId, finished }`.
    Card: `{ id, isNew, kind: study|tr|es|type|show, options?: [4 word ids], retest? }` — distractors are stored, never recomputed.
  - Callbacks as planned: `q:<sid>:<pos>:<0-3>`, `r:<s|x|h|d|a>:<sid>:<pos>`; `r:v|k|g` parse as `legacy` and answer "no longer active". A session without `v: 2` is stale.
  - Decisions beyond the plan: (1) a *different* leading article (`el cuenta`) is wrong, not "almost" — gender is the point; (2) "type it" is replaced by choose-Spanish for words with `+ / ( )` etc.;
    (3) a wrong answer's repeat asks the same question with the options reversed, max 2 repeats per word; (4) study cards stay in the queue count (`n/m` grows when re-tests are inserted);
    (5) session XP/streak is paid when the session finishes, also when the last tap is "Next" after a miss; (6) audio is refused on question cards even if the button is replayed.
  - Not verified: real Telegram rendering (button widths, long Cyrillic labels are clipped at 60 chars), message edit rate limits, typing from a phone keyboard.
