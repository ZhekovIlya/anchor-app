## 2026-06-17T23:38:51Z

Objective: Implement the 'Cannot Speak Mode' features.

Please perform the following steps:
1. Run a command to checkout a new task branch: `git checkout -b task/cannot-speak`.
2. Explain your implementation approach starting with `**[DEV]:**`.
3. Implement the following changes:
   - **Settings UI (index.html)**: Add a toggle switch (checkbox) for 'Disable Speech Drills' in the Settings Modal (right before the modal body closing tag, aligned with the theme/speed select layout style). Give it the ID `disableSpeechToggle`.
   - **Settings Logic (src/web/main.js)**:
     - Retrieve `disableSpeechToggle` element and add it to `elements`.
     - Add a 'change' event listener to `disableSpeechToggle` that saves its value to local storage via `localStorageAdapter.save('anchor_disable_speech', e.target.checked)`.
     - During initialization, load the saved value `localStorageAdapter.load('anchor_disable_speech') === true` and set the toggle's checked state.
   - **Engine Settings Integration (src/web/drill-ui.js)**:
     - Load the setting `const disableSpeech = localStorageAdapter.load('anchor_disable_speech') === true` inside `startDrill(...)`.
     - Import `localStorageAdapter` from `./storage.js` if needed.
     - Pass `disableSpeech` parameter into options when calling `createDrillEngine({...})`.
   - **Engine Speech Mode Bypass (src/core/engine.js)**:
     - Destructure `disableSpeech = false` in `createDrillEngine(options)`.
     - In `prepareInteractionMode()`, check `!disableSpeech` as a prerequisite for selecting `'SPEECH'` mode (along with `hasSpeechAPI` and `Math.random() < 0.3`).
     - Add `setInteractionMode(mode)` method returning from `createDrillEngine` that lets the caller update `currentInteractionMode` to `mode`.
   - **Type Instead Button UI (index.html)**:
     - Add a "⌨️ Type Instead" button to the speech practice container (`#speechContainer`). Make it prominent and clearly visible during any SPEECH exercise.
     - Give it the ID `typeInsteadBtn`.
   - **Type Instead Button Handling (src/web/drill-ui.js)**:
     - Inside `SPEECH` mode rendering in `onNextPhrase`, bind `#typeInsteadBtn.onclick`.
     - The handler must stop speech recognition recording (if `speechService` is recording), call `activeEngine.setInteractionMode('TYPE')`, hide the `#speechContainer`, and switch to the `TYPE` mode layout.
     - The layout switch must replicate the initialization of the type input area, set up ghost text spans, reset and focus input fields, and show `revealAnswerBtn` if it's recall stage (`!isCopyStage` and not an exam), without resetting/penalizing target streak.
   - **Recall Stage Speech Hints UI & Logic**:
     - Add a Hint button (`#hintBtn`) to the drill view in `index.html`, right after `#revealAnswerBtn`.
     - In `drill-ui.js` inside `onNextPhrase`, if `interactionMode === 'SPEECH'` and it is Recall stage (`!isCopyStage` / `streak >= copyThreshold`), add `opacity-0` to `ghostText` (so the Spanish phrase is hidden) and remove `hidden` class from `#hintBtn`. Otherwise, keep it hidden.
     - Clicking `#hintBtn` must reveal the target Spanish phrase (`ghostText.classList.remove('opacity-0')`) and hide `#hintBtn`, without calling `handleWrong()` or penalizing the streak/mistake counters.
     - Ensure the user still has the option to use the "⌨️ Type Instead" button even after revealing the hint in speech mode.
4. Verify & Test:
   - Run `npm test` to verify that the existing tests pass successfully.
   - Run git commands to commit the changes to `task/cannot-speak`: `git add . ; git commit -m "feat: implement Cannot Speak mode and speech recall stage hints"` (use `;` to chain commands as per LESSONS_LEARNED.md rule).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write your handoff report to `d:\spanish\anchor app\.agents\worker_cannot_speak\handoff.md` and message me when done.
