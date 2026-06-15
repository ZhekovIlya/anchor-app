# BRIEFING — 2026-06-12T01:10:00+02:00

## Mission
Fix the Read Aloud feature bugs reported by [AQA]: Token matching logic flaws, microphone leaks on navigation, and robust punctuation stripping.

## 🔒 My Identity
- Archetype: implementer
- Roles: implementer, qa, specialist
- Working directory: d:\spanish\anchor app\.agents\dev
- Original parent: 78929a5d-f60d-40db-ae7f-5ef46aa57fcc
- Milestone: Read Aloud Fixes

## 🔒 Key Constraints
- Must follow the 80/20 vocabulary retention rules, though not directly applicable to this bug fix.
- Branch management: MUST create a new branch or work on `task/read-aloud`.
- Make inner monologue visible via `**[DEV]:**`.
- No whole-file replacement.
- DO NOT CHEAT. All implementations must be genuine.

## Current Parent
- Conversation ID: 78929a5d-f60d-40db-ae7f-5ef46aa57fcc
- Updated: 2026-06-12T01:10:00+02:00

## Task Summary
- **What to build**: Fix Read Aloud defects.
- **Success criteria**: Fix token matching, plug mic leak, fix regex. Tests must pass.

## Key Decisions Made
- Added `lastMatchedTranscriptIndex` and `prevSpokenWords` to accurately parse only newly emitted text chunks from the Web Speech API without jumping ahead on duplicate words.
- Attached a `MutationObserver` to `document.body` tied to the read aloud container to gracefully `stop()` the Speech Service whenever the UI is unmounted during navigation.

## Change Tracker
- **Files modified**: `src/web/read-aloud-ui.js` (Token logic, Observer cleanup, regex fix)
- **Build status**: PASS
- **Pending issues**: None

## Quality Status
- **Build/test result**: PASS
- **Lint status**: PASS
- **Tests added/modified**: 0
