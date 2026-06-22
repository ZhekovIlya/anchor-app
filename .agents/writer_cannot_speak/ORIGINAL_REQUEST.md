## 2026-06-17T23:44:07Z

Objective: Update `LESSONS_LEARNED.md` and `AGENTS_LOG.md` on the `task/cannot-speak` branch.

Please perform the following steps:
1. Ensure you are on the `task/cannot-speak` branch.
2. In `LESSONS_LEARNED.md`, add this new rule at the end of the `## Rules` section:
   - **Browser Globals Guard in Core Modules (Reported by [AQA]):** When referencing browser-specific globals like `window` or `webkitSpeechRecognition` inside core engine/loader files (which are run in Node.js unit tests), always guard with `typeof window !== 'undefined'` to prevent `ReferenceError` crashes during automated test execution.
3. In `AGENTS_LOG.md`, change the previous current task title to:
   `## Past Task: Centralized Vocabulary Unification`
   And prepend the new log section at the top of the file right below `# AGENTS LOG` (around line 2-3):
   ```markdown
   ## Current Task: Cannot Speak Mode

   ### **[DEV] (The Builder):**
   - Branch `task/cannot-speak` created.
   - Added `disableSpeechToggle` checkbox to the Settings Modal in `index.html`.
   - Connected the toggle to `localStorageAdapter` under key `anchor_disable_speech` in `src/web/main.js` and loaded its state on boot.
   - Passed `disableSpeech` from `startDrill` to `createDrillEngine` in `src/web/drill-ui.js`.
   - Bypassed the `'SPEECH'` mode selection in `prepareInteractionMode` in `src/core/engine.js` if `disableSpeech` is active, and added a `setInteractionMode(mode)` setter.
   - Added a prominent `⌨️ Type Instead` button (`#typeInsteadBtn`) inside `#speechContainer` in `index.html`.
   - Implemented `typeInsteadBtn.onclick` handler in `src/web/drill-ui.js` which stops speech recording, calls `activeEngine.setInteractionMode('TYPE')`, switches the layout to typed mode, resets input fields, and shows `revealAnswerBtn` if it is Recall stage.
   - Added `#hintBtn` next to `#revealAnswerBtn` in `index.html`.
   - Implemented Recall Stage Speech Hints logic in `src/web/drill-ui.js` which masks the Spanish text with `opacity-0` and displays `#hintBtn` during Recall stage speech drills. Clicking it reveals the text and hides the hint button without penalty.

   ### **[AQA] (Technical QA):**
   - Guarded window checks in `engine.js` using `typeof window !== 'undefined'` to avoid reference errors in Node environment.
   - Created `tests/engine.test.js` to cover the new settings, speech bypass, and interaction mode setter.
   - Verified that all 10 tests compile and pass successfully.

   ### **[QA] (Product QA):**
   - Validated settings persistence and engine integration logic.
   - Ensured "Type Instead" and "Hint" flows follow requested behavior without penalizing target streak or current achievements.

   ### **Status:**
   - [X] Added Settings UI & logic for 'Disable Speech Drills'.
   - [X] Integrated bypass in engine selection logic.
   - [X] Added Type Instead button and layout switching logic.
   - [X] Implemented Speech Recall Stage Hints and visibility toggle.
   - [X] Verified tests run and pass.
   - [X] Committed to `task/cannot-speak`.

   ---
   ```
4. Run `npm test` to verify everything is working fine.
5. Commit the updates to the branch: `git add . ; git commit -m "docs: update LESSONS_LEARNED.md and AGENTS_LOG.md for Cannot Speak mode"` (remember to use `;` for PowerShell compatibility as per the rules).

Please write your handoff report to `d:\spanish\anchor app\.agents\writer_cannot_speak\handoff.md` and message me when done.
