# Handoff Report: Cannot Speak Mode Implementation

## 1. Observation
- **Branch checked out**: `task/cannot-speak` via `git checkout -b task/cannot-speak` completed successfully.
- **Settings Toggle UI**: Added the `disableSpeechToggle` checkbox input at the bottom of the Settings Modal body in `index.html`.
- **Settings Toggle Logic**: Added the checkbox to elements and wired it in `src/web/main.js` to persist via `localStorageAdapter` under the key `'anchor_disable_speech'`.
- **Engine Settings Integration**: Wired `disableSpeech` in `src/web/drill-ui.js` inside `startDrill` to load using `localStorageAdapter` and passed it as an option to `createDrillEngine({...})`.
- **Engine Speech Mode Bypass**: Destructured `disableSpeech` from options and checked `!disableSpeech` before allowing `SPEECH` mode selection in `prepareInteractionMode()` in `src/core/engine.js`. Added `setInteractionMode(mode)` setter to the returned engine object.
- **Node Environment Test Failure**: On first test run, tests crashed with `ReferenceError: window is not defined` inside `engine.js` line 94 because Node.js does not define `window`. 
- **Node Environment Guard**: Fixed this by guarding the `webkitSpeechRecognition` check with `typeof window !== 'undefined'` in `src/core/engine.js`.
- **Type Instead Button UI & Logic**: Added a `#typeInsteadBtn` inside `#speechContainer` in `index.html`. Wired its `onclick` in `src/web/drill-ui.js` to stop speech recognition, set engine interaction mode to `'TYPE'`, hide speech container, clear and populate typing inputs and ghost text spans, focus the input, and show `#revealAnswerBtn` if it is the Recall stage and not an exam.
- **Speech Recall Hints UI & Logic**: Added `#hintBtn` next to `#revealAnswerBtn` in `index.html`. In `src/web/drill-ui.js` inside `onNextPhrase`, if mode is `SPEECH` and it is Recall stage (`!isCopyStage`), masked the prompt (`opacity-0`) and displayed `#hintBtn`. Clicking the hint button removes `opacity-0` and hides the button without penalty.
- **Test Suite Verification**: Added unit tests in `tests/engine.test.js` to test:
  1. `setInteractionMode` updates interaction mode correctly.
  2. `disableSpeech` prevents `SPEECH` mode from being selected.
  3. normal speech mode selection is allowed when `disableSpeech` is false.
- **Test Results**: All 10 tests passed successfully.
- **Git Commit**: Committed changes to `task/cannot-speak` branch with commit message `"feat: implement Cannot Speak mode and speech recall stage hints"`.

## 2. Logic Chain
1. Checked out the branch `task/cannot-speak` (Observation 1) to establish an isolated environment for the development lifecycle.
2. Added the toggle checkbox UI (Observation 2) and connected its event listener and initialization in the controller layer (Observation 3) to allow users to toggle speech drills.
3. Updated the instantiator (Observation 4) and engine core (Observation 5) to dynamically check and bypass speech selection when disabled.
4. Corrected the global `window` ReferenceError (Observation 6) by introducing `typeof window !== 'undefined'` (Observation 7) to ensure Node's test runner can test core logic without UI/DOM mock dependencies.
5. Wired the prominent `#typeInsteadBtn` (Observation 8) to transition from speech drills directly into fully functioning typing inputs, ensuring the user can type instead of speak seamlessly.
6. Masked the target phrase in `SPEECH` mode during the Recall stage and provided the `#hintBtn` (Observation 9) so users can peek at the translation prompt when they forget it.
7. Validated code correctness by creating and executing unit tests (Observation 10 & 11) and committed all changes (Observation 12).

## 3. Caveats
- Browser-specific support for the Web Speech API is dependent on Chrome/Safari implementation; however, the UI gracefully degrades to standard typed inputs if the API is missing or if the feature is disabled by the user.

## 4. Conclusion
The "Cannot Speak Mode" features are fully implemented, verified via unit tests, and safely committed to `task/cannot-speak`.

## 5. Verification Method
To independently verify:
1. Run `npm test` in the root folder to confirm all tests (including core data validation, tokenization, and engine settings logic) pass.
2. Build the project locally (`npm run build`) and open the application to check that settings persist correctly.
3. Run `git diff origin/main` to inspect the code changes.
