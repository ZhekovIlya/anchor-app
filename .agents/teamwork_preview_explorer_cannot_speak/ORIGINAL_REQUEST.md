## 2026-06-17T23:36:58Z

Investigate the files `src/core/engine.js` and `src/web/drill-ui.js` in `d:\spanish\anchor app`.
Analyze:
1. How the global settings are initialized, stored, and loaded (e.g. through the Storage Adapter Pattern or other settings logic).
2. How `engine.js` selects `SPEECH` mode, and how to prevent it when a `disableSpeech` global setting is toggled on.
3. How the target streak and mistake counters are tracked during a drill session, and how to transition from `SPEECH` to `TYPE` mode mid-drill without resetting/penalizing the streak.
4. How the `drill-ui.js` is structured, specifically where `SPEECH` mode is rendered, how to add a "Type Instead" button, how to detect if we are in the Recall stage (past half progress of the drill) to show a "Hint" button, and how that button can reveal the Spanish phrase without penalty.
5. How tests are run (such as `npm test` or a specific runner) and what existing tests check.

Write your findings to `d:\spanish\anchor app\.agents\teamwork_preview_explorer_cannot_speak\handoff.md` and message me back with a summary and the file path.
