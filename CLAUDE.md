@AGENTS.md
@LESSONS_LEARNED.md

## Claude Code specifics

- **Skills** (`.claude/skills/`): `curriculum-authoring` (weeks, lessons, word topics, theory), `fix-flagged-translations` (apply an exported 🚩 file), `verify-app` (tests, build, in-browser checks), `ship-task` (squash-merge and push — user-invoked only).
- **Subagents** (`.claude/agents/`): `implementer` (Sonnet; give it one work package and the files it owns), `content-reviewer` (independent Spanish/RU/UK review of new curriculum).
- **Preview servers** (`.claude/launch.json`): `anchor-web` (:3000, dev), `anchor-api` (:3001), `anchor-preview` (:4173, serves the production build — the only place the service worker runs; run `npm run build` first). Start them with the preview tools, not `npm run dev` in a shell, and stop them when you are done.
- **Hook:** after an edit under `data/` or to the tokenizer, a PostToolUse hook runs the data validators. If it reports a failure, fix the data before anything else.
- **Secrets:** `.env.local` and friends hold real bot and Redis credentials. Reading them is denied in `.claude/settings.json`; use `.env.example` for names.
