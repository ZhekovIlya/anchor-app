# BRIEFING — 2026-06-11T08:09:00Z

## Mission
Implement M3: Multiple Choice + Word-Order Puzzle drill modes for Week 6

## 🔒 My Identity
- Archetype: Worker
- Roles: implementer, qa, specialist
- Working directory: d:\spanish\anchor app\.agents\worker_m3_gen2
- Original parent: 0d1f0934-bf82-4907-a3d7-ea61a2458097
- Milestone: M3 — New Drill Modes

## 🔒 Key Constraints
- Core modules MUST be DOM-free
- New modes ONLY on Week 6 (topic.id === 'week_6')
- Existing type mode MUST remain unchanged for ALL weeks
- SRS: promote on correct, demote on wrong
- ES modules only, import/export
- PowerShell: use `;` not `&&`
- Read LESSONS_LEARNED.md before coding

## Current Parent
- Conversation ID: 0d1f0934-bf82-4907-a3d7-ea61a2458097
- Updated: 2026-06-11T08:09:00Z

## Task Summary
- **What to build**: MC + word-order drill engines (core), UIs (web), drill mode selector (Week 6 only), wiring into main.js + index.html
- **Success criteria**: npm test passes, new modes functional for Week 6 only, SRS integration works
- **Interface contracts**: PROJECT.md
- **Code layout**: PROJECT.md § Code Layout

## Key Decisions Made
- Branch: task/gamification-overhaul (already on it)
- Data structure from week_6.js: phrases have `ru`, `uk`, `es` fields, `meta.id` for SRS
- Actually, need to check: the phrases in week_6.js DON'T have `meta` or `tokens` fields — they are added by data-loader hydration

## Change Tracker
- **Files modified**: (pending)
- **Build status**: (pending)
- **Pending issues**: (none yet)

## Quality Status
- **Build/test result**: (pending)
- **Lint status**: (pending)
- **Tests added/modified**: (pending)
