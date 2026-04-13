# AGENTS LOG
> Progress tracker for the autonomous multi-agent workflow.

---

## Session: 2026-04-04 Night Shift

### Task 1: Create week_1.js ✅
- **Commit:** `98cbd6f`
- 15 regular lessons + 1 Final Exam. 6 verbs (Ser, Estar, Ir, Tener, Hacer, Decir).
- Phase 1 = pure conjugation, Phase 2 = sentence building.
- Part A=Yo, Part B=Tú/Él, Part C=Nosotros. All tokens verified. [AQA] PASS, [QA] PASS.

### Task 2: Update app.js — Final Exam logic ✅
- **Commit:** `98cbd6f`
- startLesson() auto-populates exam phrases from siblings. targetStreak=50 for exams.
- Exam lesson cards have gold border UI.

### Task 3: Update index.html ✅
- **Commit:** `98cbd6f`
- Removed topic_1.js/topic_2.js scripts, added week_1.js.

### Task 4: Tag topics_core.js as legacy ✅
- **Commit:** `98cbd6f`
- Added `legacy: true`, updated title.

### Task 5: Update .cursorrules ✅
- **Commit:** `924a751`
- Full new schema docs: meta object, exam flag, Nosotros, streak targets, token rules.

### Task 6: SRS Leitner bucket system ✅
- **Commit:** `924a751`
- 5 buckets (12h → 1d → 3d → 1w → 2w). LocalStorage-based.
- handleSuccess() registers/promotes. revealAnswer demotes to bucket 0.
- Global phrase bank built from non-legacy topics on init.

### Task 7: Daily Review drill ✅
- **Commit:** `924a751`
- Purple card on dashboard shows due count. startReviewDrill() generates mixed drill.
- Navigation buttons handle review mode (no null crash). Streak = min(due, 24).

---

## Summary
All 7 MVP tasks COMPLETE. Branch `feature/curriculum-redesign` has 2 commits on top of baseline.
- `98cbd6f` — week_1.js data + exam logic + HTML cleanup + legacy tag
- `924a751` — SRS engine + Daily Review + .cursorrules update

### No blockers encountered. No entries needed in LESSONS_LEARNED.md.

[2026-04-12] [QA/DEV] Generated week_2.js matching specific phrase set, keeping 80/20 rule. Passed token validation check.

[2026-04-12] [QA/DEV] Updated .agents/rules/multi-agent-rules.md to include the 80/20 vocabulary degradation scaling formula rules.

### Task 8: Fix Missing Week 2 in Dashboard ✅
- **[TEACH]** Noted that adding new `week_X.js` files requires updating `index.html`. Added this to `LESSONS_LEARNED.md`.
- **[DEV]** Injected `<script src="data/week_2.js"></script>` into `index.html`. 
- **[AQA/QA]** Verified HTML validity and product logic. Week 2 now appears on the dashboard.

### Task 9: Audio Synchronization & Loader UI ✅
- **[DEV]**: Added `#successLoader` spinner to `index.html`. Refactored `handleSuccess` and `nextPhrase` in `app.js` to wait for TTS completion (`utterance.onend`) before advancing to the next phrase. 
- **[AQA/QA]**: Verified that the screen visualizer strictly syncs with the pronunciation, preventing cognitive overload and overlap.

### Task 10: Split 'Tú / Él' into 'Tú / Usted' and 'Él / Ella' ✅
- **[DEV]**: Refactored `data/week_1.js` to logically separate all 'Tú / Él' lesson types into dedicated 'Tú / Usted' and 'Él / Ella' pairings. Assigned proper gendered adjectives (e.g. `pequeña`, `buena`, `lista`) and pronoun formats across both ES and RU translation matrices.
- **[AQA]**: Performed token verification. All newly generated tokens accurately mirror the target schema.
- **[QA]**: Verified streak target consistency (`24`). Balances lesson size without increasing base duration artificially. Passed.

### Task 11: Implement 5-Column Navigation and Ellos/Ellas/Ustedes Curriculum ✅
- **[DEV]**: Checked out `feature/5-lessons-layout`. Updated `index.html` and `app.js` grid definitions to strictly apply `md:grid-cols-5`. Updated `AGENTS_LOG.md` and `.cursorrules` to define the 5 progression buckets (Yo, Tu/Usted, El/Ella, Nosotros, Ellos/Ellas/Ustedes). Rewrote `data/week_1.js` enforcing the new curriculum standard, including dropping '(вежливо)' string descriptors from 'Usted/Ustedes' blocks.
- **[AQA]**: Verified the `grid-cols-5` Tailwind classes render without syntax conflicts in UI cards. Verified arrays are preserved identically in `week_1.js`.
- **[QA]**: Confirmed exactly 6 phrases per sub-lesson were constructed, effectively normalizing lesson density globally to ensure the `targetStreak_base` logic completes symmetrically with 4 loops over 6 iterations. Passed.

### Task 12: Row Layout for Topics and Documentation Updates ✅
- **[TEACH]**: Opened `LESSONS_LEARNED.md` to formally document that `&&` operators fail in standard Windows PowerShell, and explicitly logged a new rule to chain operations using `;`.
- **[DEV]**: Changed `index.html` `topicsContainer` to a `w-full flex-col` design so all topics render strictly linearly (row view). Allowed `app.js` review buttons to naturally inherit full width. Left `lessonsContainer` configured properly to `grid-cols-5`.
- **[AQA/QA]**: Display layouts function predictably under responsive viewport conditions. Wait logic unaffected. Passed.

### Task 13: Local Network Access Instructions ✅
- **[DEV]**: Analyzed Vite configuration and current running processes. Confirmed that the `--host` flag is active and the server is listening on port 3000.
- **[AQA/QA]**: Verified that providing the user with IP identification steps and connection instructions is the correct approach to enable multi-device testing without code changes.
- **[TEACH]**: No code error was found; this was an operational guidance task.

### Task 14: Fix Network Flag Passing ✅
- **[DEV]**: Identified that `npm run dev --host` fails to pass the flag to Vite.
- **[AQA]**: Verified that the correct syntax is `npm run dev -- --host`. 
- **[QA]**: Added a dedicated `"network": "vite --host"` script to `package.json` to simplify the user experience.
- **[TEACH]**: Updated `LESSONS_LEARNED.md` with the double-dash rule for npm flag passing.

### Task 15: Pre-Master Merge UI and Drill Fixes ✅
- **[DEV]**: Modified `src/core/engine.js` so that `onComplete` is checked *inside* the `onCorrectAnswer` done-callback, guaranteeing the Spanish TTS snippet finishes playing on the final successful phrase before ending the drill. Refactored `src/web/dashboard.js` to render completed lesson buttons with prominent `bg-green-100` and `border-green-300` styling, and added a specific blue badge for the number of completions for optimal contrast without breaking the minimalist theme. Updated `index.html` to allow native HTML horizontal scrolling behavior inside the input layer (`overflow-x: auto`), removed centering flex-wrap constraints, and bound `inputField.onscroll` in `src/web/drill-ui.js` to perfectly sync the `scrollLeft` property of the `fakeInput` overlay.
- **[AQA]**: Verified correct `style.css`/Tailwind layout behavior. Ensured JS modifications have zero impact on token-matching schemas.
- **[QA]**: Speech alignment logic respects pedagogical feedback loop. Green success states and contrast counters improve navigational feedback without confusing streaks. Passed.
