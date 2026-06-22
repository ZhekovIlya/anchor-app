# BRIEFING — 2026-06-17T23:38:00Z

## Mission
Investigate global settings, SPEECH mode logic, drill session tracking/transitions, and drill-ui structure in anchor-app to propose speech disabling, "Type Instead", "Hint" buttons, and detail the testing setup.

## 🔒 My Identity
- Archetype: explorer
- Roles: Teamwork explorer, Read-only investigator
- Working directory: d:\spanish\anchor app\.agents\teamwork_preview_explorer_cannot_speak
- Original parent: cd1972e6-8a1d-49ae-8510-944c2065ae48
- Milestone: Investigation and analysis of speech vs type modes and drill UI.

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Code-only network mode (no external websites/services, no curl/wget/etc.)

## Current Parent
- Conversation ID: cd1972e6-8a1d-49ae-8510-944c2065ae48
- Updated: 2026-06-17T23:38:00Z

## Investigation State
- **Explored paths**:
  - `src/web/storage.js`
  - `src/core/engine.js`
  - `src/web/drill-ui.js`
  - `src/web/main.js`
  - `src/web/speech.js`
  - `src/core/constants.js`
  - `tests/validate-data.test.js`
  - `index.html`
- **Key findings**:
  - Settings are split between `localStorageAdapter` (for theme/haptics/SRS) and direct `localStorage` (for voices/speeds).
  - Speech mode is activated in engine's Copy Stage with a 30% random probability. Can be disabled with `options.disableSpeech`.
  - Streak and target streaks are incremented on correct/wrong answers. Transitioning between SPEECH and TYPE modes can be done penalty-free by changing the interaction mode.
  - Drill-ui handles SPEECH mode by rendering the speech UI and wiring speech recognition. "Type Instead" can switch the active mode. Recall stage corresponds to `streak >= copyThreshold`, where a Hint button can be displayed to reveal ghost text without calling `handleWrong()`.
  - Tests run using Node's test runner (`npm test`) and check topic structure, phrase validation, and tokenizer consistency.
- **Unexplored areas**: None.

## Key Decisions Made
- Formulate concrete patch designs for settings addition, mode switching, and hint buttons to facilitate the developer's work.

## Artifact Index
- d:\spanish\anchor app\.agents\teamwork_preview_explorer_cannot_speak\handoff.md — Detailed analysis and findings report
