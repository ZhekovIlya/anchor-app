# AGENTS LOG

Rolling log, newest first. One entry per task: date · branch · what changed · how it was verified · follow-ups.
At most 10 lines per entry. Commit messages hold the detail; this is the index.
When the file passes ~200 lines, move it to `docs/archive/AGENTS_LOG-<year>.md` and start fresh.
The history before 2026-11-16 is in `docs/archive/AGENTS_LOG-2026.md`.

---

## 2026-11-16 · task/review-gaps-and-agentic-setup
- Full review written to `docs/review-2026-11/PLAN.md`.
- Drill fixes: the wrong-answer bar is no longer dismissed by the submitting Enter; reviews are recall-only; multiple-choice guards.
- Restored XP header, end-screen XP, confetti and the haptic toggle.
- PWA re-enabled with a service worker that ignores `/api`; stats and status fixes.
- Vocabulary coverage (colour coding) completed; guardrail tests added (DOM contract, core purity, data validation, vocabulary, service worker).
- Agent setup: `AGENTS.md`, `CLAUDE.md`, skills, subagents, settings hook.
- Repository cleanup: stale `.agents/` run-state removed, course material moved to `reference/`, CI workflow, README.
- Verification: 300 tests pass, build passes; browser-checked drill feedback, recall-only reviews, XP header, service worker, flag button. Not checked: speech recognition, Telegram quiz cards on a real bot.
