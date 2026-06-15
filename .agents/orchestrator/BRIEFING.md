# BRIEFING — 2026-06-12T00:57:15+02:00

## Mission
Implement an interactive "Read Aloud" component using Web Speech API for real-time Spanish pronunciation validation.

## 🔒 My Identity
- Archetype: project_orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: d:\spanish\anchor app\.agents\orchestrator
- Original parent: top-level
- Original parent conversation ID: 78929a5d-f60d-40db-ae7f-5ef46aa57fcc

## 🔒 My Workflow
- **Pattern**: Multi-agent workflow loop (DEV -> AQA -> QA -> TEACH -> LOG)
- **Scope document**: d:\spanish\anchor app\.agents\orchestrator\plan.md
1. **Decompose**: Split "Read Aloud" into independent steps (Data, UI Component, Web Speech Engine, Integration).
2. **Dispatch & Execute**: Execute tasks sequentially through [DEV], [AQA], [QA] agents.
3. **On failure**: Nudge, re-read LESSONS_LEARNED.md, update TEACH, re-try DEV.
4. **Succession**: N/A right now.

## 🔒 Key Constraints
- Must follow the Multi-Agent rules explicitly ([DEV] writes code, [AQA] checks syntax/tokens, [QA] checks product logic).
- [DEV] must branch to `task/read-aloud`.
- Must never commit directly to `main`.
- Must provide Mock Speech script for offline dev.

## Current Parent
- Conversation ID: 78929a5d-f60d-40db-ae7f-5ef46aa57fcc

## Key Decisions Made
- Proceeding with sequential agent execution according to `user_rules`.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| [DEV] | teamwork_preview_worker | Read Aloud task | Pending | TBD |
| [AQA] | teamwork_preview_reviewer | Technical QA | Pending | TBD |
| [QA]  | teamwork_preview_reviewer | Product QA | Pending | TBD |
