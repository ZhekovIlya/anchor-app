# BRIEFING — 2026-06-17T23:38:51Z

## Mission
Implement the 'Cannot Speak Mode' features including settings toggle, engine settings integration, speech mode bypass, type instead button, and recall stage speech hints.

## 🔒 My Identity
- Archetype: Developer/QA/Specialist
- Roles: implementer, qa, specialist
- Working directory: d:\spanish\anchor app\.agents\worker_cannot_speak
- Original parent: cd1972e6-8a1d-49ae-8510-944c2065ae48
- Milestone: Cannot Speak Mode Features

## 🔒 Key Constraints
- Checkout new branch: `task/cannot-speak`
- Explain implementation approach starting with `**[DEV]:**`
- Keep changes minimal and follow existing code style
- Use `;` to chain git commands as per LESSONS_LEARNED.md rule
- Verify changes using `npm test`
- Do not cheat or use dummy implementations

## Current Parent
- Conversation ID: cd1972e6-8a1d-49ae-8510-944c2065ae48
- Updated: not yet

## Task Summary
- **What to build**: Add UI and logic for "Cannot Speak Mode" (toggle in settings, engine bypass for SPEECH mode, Type Instead button layout switch, Speech Recall stage hints with opacity toggle).
- **Success criteria**: All settings correctly persist, SPEECH mode is bypassed if checked, Type Instead button dynamically switches UI context to TYPE, hints display correctly in recall stage, and tests pass.
- **Interface contracts**: Web UI (index.html), src/web/main.js, src/web/drill-ui.js, src/core/engine.js.
- **Code layout**: Client-side app in HTML/JS, engine logic in src/core/engine.js.

## Key Decisions Made
- [TBD]

## Artifact Index
- d:\spanish\anchor app\.agents\worker_cannot_speak\ORIGINAL_REQUEST.md — Original User Request
- d:\spanish\anchor app\.agents\worker_cannot_speak\progress.md — Liveness progress log
- d:\spanish\anchor app\.agents\worker_cannot_speak\handoff.md — Final handoff report
