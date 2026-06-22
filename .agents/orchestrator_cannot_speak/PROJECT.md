# Project: Cannot Speak Mode

## Architecture
- Module/package boundaries:
  - `src/core/engine.js`: Handles session states, settings, and transition between drill types (e.g. `SPEECH` to `TYPE`).
  - `src/web/drill-ui.js`: Renders the UI for each drill type, including the speech view, and handles button clicks (such as "Type Instead" and "Hint").
  - `LESSONS_LEARNED.md`: Project-wide rules and guidelines.
  - `AGENTS_LOG.md`: Step-by-step progress log for DEV, AQA, and QA.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Speech Drill toggle & Skip Logic | Add global settings toggle in engine.js to disable speech drills, and handle the transition to TYPE mode when "Type Instead" is clicked in engine.js. | None | DONE |
| 2 | "Type Instead" Button UI | Add a button in drill-ui.js during SPEECH drills to trigger the skip logic without penalty. | M1 | DONE |
| 3 | Recall Stage Hint/Reveal UI | Add a Hint button in drill-ui.js for SPEECH mode during Recall stage (past half progress) to reveal the Spanish phrase without penalty. | M1, M2 | DONE |

## Interface Contracts
- **Global Setting**: `settings.disableSpeech` or similar property tracked in settings/engine state.
- **Switch to Type**: A transition command/method (e.g., `switchToType()` or state modification in engine) that transitions the current drill from `SPEECH` mode to `TYPE` mode without resetting streak/incrementing mistakes.
- **Hint Trigger**: A callback or function in `drill-ui.js` that updates UI to reveal hidden target text during recall stage without modifying the drill state parameters (such as `targetStreak` or error counters).
