# Handoff Report: Product QA Review of Cannot Speak Mode

## 1. Observation
- **Branch Checked**: `task/cannot-speak` is active on the workspace.
- **Settings Toggle Persistence**:
  - In `src/web/main.js` (lines 364-368):
    ```javascript
    if (elements.disableSpeechToggle) {
      elements.disableSpeechToggle.addEventListener('change', (e) => {
        localStorageAdapter.save('anchor_disable_speech', e.target.checked);
      });
    }
    ```
  - Loaded state during boot in `src/web/main.js` (lines 453-456):
    ```javascript
    const savedDisableSpeech = localStorageAdapter.load('anchor_disable_speech') === true;
    if (elements.disableSpeechToggle) {
      elements.disableSpeechToggle.checked = savedDisableSpeech;
    }
    ```
- **Engine settings check & bypass**:
  - Loaded in `src/web/drill-ui.js` (line 36):
    ```javascript
    const disableSpeech = localStorageAdapter.load('anchor_disable_speech') === true;
    ```
    and passed as `disableSpeech` parameter option inside `createDrillEngine` (line 160).
  - Destructured and evaluated in `src/core/engine.js` (lines 94-99):
    ```javascript
    const hasSpeechAPI = (typeof window !== 'undefined') && (('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window));
    if (!disableSpeech && hasSpeechAPI && Math.random() < 0.3) {
      currentInteractionMode = 'SPEECH';
    } else {
      currentInteractionMode = 'TYPE';
    }
    ```
- **Skip ("Type Instead") behavior**:
  - Element `#typeInsteadBtn` defined in `index.html` (line 168):
    ```html
    <button id="typeInsteadBtn" class="w-full max-w-sm px-6 py-3 rounded-xl ...">
      <span>⌨️</span> Type Instead
    </button>
    ```
  - Wired in `src/web/drill-ui.js` (lines 323-328):
    ```javascript
    if (typeInsteadBtn) {
      typeInsteadBtn.onclick = () => {
        if (speechService && speechService.isRecording) {
          speechService.stop();
        }
        activeEngine.setInteractionMode('TYPE');
    ```
  - No call is made to `activeEngine.handleWrong()`.
- **Hint behavior**:
  - Element `#hintBtn` defined in `index.html` (lines 192-195).
  - Wired in `src/web/drill-ui.js` (lines 270-277):
    ```javascript
    ghostText.classList.add('opacity-0');
    if (hintBtn) {
      hintBtn.classList.remove('hidden');
      hintBtn.onclick = () => {
        ghostText.classList.remove('opacity-0');
        hintBtn.classList.add('hidden');
      };
    }
    ```
  - Only affects CSS visibility classes; no call is made to any engine state mutations.
- **Option retention**:
  - Clicking `hintBtn` hides `hintBtn` and reveals `ghostText` but does not hide the `#speechContainer` containing `#typeInsteadBtn`.
- **Test suite results**:
  - `npm test` runs successfully, outputting:
    ```
    ℹ tests 10
    ℹ suites 4
    ℹ pass 10
    ```
    Including 3 specific tests for speech drill features under `Engine Cannot Speak features`.
- **Build compilation results**:
  - `npm run build` compiles Vite assets successfully in 143ms.

## 2. Logic Chain
- **No penalty for skip**: Because `typeInsteadBtn.onclick` calls `activeEngine.setInteractionMode('TYPE')` and alters layout state without triggering `activeEngine.handleWrong()`, the target streak is not incremented, the current streak is preserved, and no mistakes are recorded in SRS.
- **No penalty for hint**: The `hintBtn.onclick` only removes `opacity-0` from `ghostText` and hides itself without dispatching any engine mutations. Therefore, the user can peek at the answer without affecting their streak or target streak.
- **Persistent settings**: Setting "Disable Speech Drills" is saved to local storage via the `localStorageAdapter` using the key `'anchor_disable_speech'`. This is loaded inside `startDrill` and passed to the engine. If true, the engine bypasses `SPEECH` mode selection and defaults to `TYPE`.
- **Option retention**: Because `hintBtn.onclick` only targets the visibility of the hint button itself and `ghostText`, the `#speechContainer` is not hidden, and the user can still click "⌨️ Type Instead" after using the Hint.
- **Pedagogical rules compliance**: The curriculum contents, SRS demote/promote hooks, and streak calculations are unchanged and unaffected by this speech-mode-specific layout switching.

## 3. Caveats
- Browser compatibility with the Web Speech API remains standard (requires Chrome/Safari support); however, the fallback to `TYPE` mode handles cases where speech recognition is unavailable or disabled.

## 4. Conclusion
The implementation of the Cannot Speak mode on the `task/cannot-speak` branch is fully correct, fits all functional and pedagogical requirements, passes all unit tests, compiles successfully, and is approved.

## 5. Verification Method
- Execute `npm test` in the terminal to verify the unit tests for the Cannot Speak features pass.
- Execute `npm run build` to verify standard build compilation.
- Review `index.html`, `src/core/engine.js`, and `src/web/drill-ui.js` to inspect button wiring, state updates, and style visibility selectors.
