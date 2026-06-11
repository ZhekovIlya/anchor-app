# BRIEFING — 2026-06-11T08:09:00Z

## Mission
Implement Progress Dashboard / Stats Section (Milestone 4) — add a 4th "Stats" tab to the home dashboard.

## 🔒 My Identity
- Archetype: implementer + qa + specialist
- Roles: implementer, qa, specialist
- Working directory: d:\spanish\anchor app\.agents\worker_m4_gen2
- Original parent: 0d1f0934-bf82-4907-a3d7-ea61a2458097
- Milestone: M4 — Progress Dashboard

## 🔒 Key Constraints
- All data DERIVED from existing localStorage — no data duplication
- Core/web separation: stats-dashboard.js → src/web/
- ES modules only
- Don't break existing dashboard tabs
- Hide review section when stats tab is active
- PowerShell: use `;` not `&&`

## Current Parent
- Conversation ID: 0d1f0934-bf82-4907-a3d7-ea61a2458097
- Updated: 2026-06-11T08:09:00Z

## Task Summary
- **What to build**: Stats tab with streak, XP, level, progress counters, activity heatmap
- **Success criteria**: Stats tab renders correctly, existing tabs unbroken, data derived not duplicated
- **Interface contracts**: LESSONS_LEARNED.md rules
- **Code layout**: src/web/ for DOM code, src/core/ for pure logic

## Key Decisions Made
- Approach A: Add 4th home tab "Stats" to HOME_TABS
- Pass gamification via callbacks object
- Activity chart: 4-week bar chart from getActivityLog()

## Artifact Index
- src/web/stats-dashboard.js — new Stats tab renderer
- src/web/dashboard.js — modified to add Stats tab
- src/web/main.js — modified to pass gamification to callbacks
