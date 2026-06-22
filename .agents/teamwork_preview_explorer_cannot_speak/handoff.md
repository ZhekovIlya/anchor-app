# Handoff Report: Speech vs. Typing Modes and Settings Investigation

## 1. Observation

### A. Global Settings Initialization, Storage, and Loading
* **Storage Adapter Pattern**: Defined in `src/web/storage.js` (Lines 7-19):
  ```javascript
  export const localStorageAdapter = {
    load(key) {
      try {
        return JSON.parse(localStorage.getItem(key) || '{}');
      } catch (e) {
        return {};
      }
    },
    save(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
  };
  ```
* **General settings (theme and haptics)**: Managed in `src/web/main.js` (Lines 430-444):
  * Theme loaded and applied:
    ```javascript
    const savedTheme = localStorageAdapter.load('anchor_theme_settings');
    const theme = (savedTheme && savedTheme.theme) || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } ...
    ```
  * Haptics checked (though the actual checkbox element `#hapticToggle` is missing from `index.html`):
    ```javascript
    const savedHaptics = localStorageAdapter.load('anchor_haptics');
    if (elements.hapticToggle) {
      elements.hapticToggle.checked = savedHaptics !== false;
    }
    ```
* **Audio-specific settings (Speech Voices and Rate)**: Persisted directly to `localStorage` in `src/web/speech.js` (Lines 14-16, 50-52, 65-66, 92-93) bypassing the adapter:
  * Spanish Playback Rate: `localStorage.getItem('anchor_voice_rate')` (default `'1.0'`).
  * Spanish Playback Voice: `localStorage.getItem('anchor_selected_voice_uri')`.
  * Prompt Voice: `localStorage.getItem('anchor_prompt_voice_uri')`.
  * Prompt Lang: `localStorage.getItem('anchor_prompt_lang')` (default `'ru'`).

### B. Speech Mode Selection and Prevention in `engine.js`
* **Speech Mode Selection**: Located in `src/core/engine.js` (Lines 92-102):
  ```javascript
  const isCopyStage = getStage();
  if (isCopyStage) {
    const hasSpeechAPI = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);
    if (hasSpeechAPI && Math.random() < 0.3) {
      currentInteractionMode = 'SPEECH';
    } else {
      currentInteractionMode = 'TYPE';
    }
    currentQuestionData = null;
    return;
  }
  ```
* **Prevention**: There is currently no `disableSpeech` check inside the selection logic.

### C. Streak and Mistake Tracking
* **Initialization and Targets**: In `src/core/engine.js` (Lines 51-60), `streak` starts at `0`. `targetStreak` starts at the base target for the lesson mode (e.g., `STREAK_TARGETS.regular = 24` for sentences, defined in `src/core/constants.js` Line 38).
* **Correct Answer**: Incrementing `streak` in `handleCorrect()` (Lines 237-238):
  ```javascript
  streak++;
  callbacks.onStreakUpdate(streak, targetStreak);
  ```
* **Incorrect Answer**: Incrementing `targetStreak` in `handleWrong()` (Lines 257-260):
  ```javascript
  targetStreak++;
  failedPhrases.push(currentPhrase);
  ```
  Note: `streak` is NOT reset or demoted in the engine during mistakes. Mistakes are implicitly represented by `targetStreak - initialTargetStreak`.

### D. Drill UI Structure, "Type Instead", and "Hint" Buttons
* **Render Dispatch**: In `src/web/drill-ui.js` (Lines 184-297), the `onNextPhrase` callback handles setting up the DOM for each interaction mode:
  ```javascript
  if (interactionMode === 'TYPE' || interactionMode === 'LISTENING') { ... }
  else if (interactionMode === 'MC') { ... }
  else if (interactionMode === 'WORD_ORDER') { ... }
  else if (interactionMode === 'SPEECH') {
    const speechContainer = document.getElementById('speechContainer');
    ...
  }
  ```
* **Recall Stage**: Detected in `onNextPhrase` arguments: `isCopyStage` represents the first half of the progress (`streak < copyThreshold`, where `copyThreshold` is `12` for sentences / `24` for words). The Recall Stage is active when `!isCopyStage` (the second half).
* **Reveal Answer Button**: Located at lines 187-190 in `index.html`. It triggers a penalty when clicked (Line 473 in `drill-ui.js` calls `activeEngine.handleWrong();`).
* **Haptic Toggle & Settings Toggle Absence**: In `index.html`, there are no checkbox toggles under settings, indicating the settings UI has not been populated with the toggles for haptics or speech disabling.

### E. Test Execution and Validation
* **Running command**: `npm test` runs `node --test tests/*.test.js` using Node's built-in test runner.
* **Test content** (`tests/validate-data.test.js`):
  * Checks that topics/lessons conform to structure schemas (required fields, array types).
  * Validates phrase lists (checks `ru` and `es` keys, and checks that week 6 has exactly 6 phrases).
  * Validates tokenizer functionality (reconstructing the `es` string from generated tokens and asserting token types are valid grammar classes).

---

## 2. Logic Chain

### A. Implementing `disableSpeech`
1. Since general settings (like theme) utilize `localStorageAdapter`, we should store the `disableSpeech` setting in local storage under key `'anchor_disable_speech'` using `localStorageAdapter.save('anchor_disable_speech', value)`.
2. This toggle can be added as a checkbox in the settings modal of `index.html`.
3. In `main.js`, load the setting: `const disableSpeech = localStorageAdapter.load('anchor_disable_speech') === true;` and bind the toggle input's `change` event.
4. Pass `disableSpeech` into the options object of `startDrill(...)` and forward it into `createDrillEngine({ ..., disableSpeech })`.
5. In `engine.js`'s `prepareInteractionMode()`, check `!disableSpeech` as a prerequisite for selecting `'SPEECH'` mode:
   ```javascript
   if (hasSpeechAPI && !disableSpeech && Math.random() < 0.3) { ... }
   ```

### B. Transitioning from `SPEECH` to `TYPE` Mode Mid-Drill
1. A mid-drill transition should not penalize the streak. Since the engine only updates the streak during `handleCorrect()` and `handleWrong()`, we can safely change the mode from `'SPEECH'` to `'TYPE'` without altering the streak counters.
2. We can add a method `setInteractionMode(mode)` to the engine returned by `createDrillEngine`:
   ```javascript
   setInteractionMode(mode) {
     currentInteractionMode = mode;
   }
   ```
3. A "Type Instead" button (`#typeInsteadBtn`) can be added to the `#speechContainer` in `index.html`.
4. In `drill-ui.js`, under the `'SPEECH'` mode rendering, wire `#typeInsteadBtn.onclick` to stop the speech recording, call `activeEngine.setInteractionMode('TYPE')`, hide the `#speechContainer`, and manually invoke the `'TYPE'` rendering setup.

### C. Adding a Penalty-Free "Hint" Button in the Recall Stage
1. Recall stage corresponds to `!isCopyStage` (where `isCopyStage = false`).
2. We can add a `#hintBtn` next to `#revealAnswerBtn` in `index.html` (default class `hidden`).
3. In `drill-ui.js` inside `onNextPhrase`, if `interactionMode === 'TYPE' && !isCopyStage && !isExam`, remove the `hidden` class from `#hintBtn`.
4. Wire `#hintBtn.onclick` to reveal the target phrase by setting `ghostText.classList.remove('opacity-0')` and hiding the `#hintBtn`.
5. Crucially, do NOT call `activeEngine.handleWrong()` when the hint is clicked, ensuring the streak is unaffected and `targetStreak` does not increase.

---

## 3. Caveats
* **Browser Speech Recognition**: Web Speech API is unstable on some platforms (e.g. non-Safari iOS browsers or certain Windows browsers).
* **Missing Settings Controls**: The settings modal markup in `index.html` does not currently contain checkbox toggles (e.g., `#hapticToggle` or `#disableSpeechToggle` must be inserted).
* **State Sync**: If the user clicks "Type Instead", the input field must be focused and prepared immediately so the transition feels seamless.

---

## 4. Conclusion
We have mapped the precise mechanisms of settings serialization, interaction mode selection, and streak management. Implementing a speech-disabling setting, a mid-drill typing transition, and a penalty-free hint button in the Recall stage is architecturally straightforward and requires no complex state redesign. 

Proposed code changes:

### A. UI Additions in `index.html`
1. Add toggles in settings modal:
```html
<!-- Disable Speech Drills Toggle -->
<div class="flex items-center justify-between py-3 border-b border-outline-variant/10 dark:border-stone-800">
  <div class="flex flex-col gap-0.5">
    <label for="disableSpeechToggle" class="font-label text-sm font-semibold text-on-surface dark:text-stone-200">Disable Speech Drills</label>
    <span class="text-xs text-on-surface-variant dark:text-stone-400">Skip speech exercises and use typing instead</span>
  </div>
  <input type="checkbox" id="disableSpeechToggle" class="accent-primary dark:accent-emerald-500 cursor-pointer" />
</div>
```
2. Add "Type Instead" button inside `#speechContainer`:
```html
<button id="typeInsteadBtn" class="px-6 py-2 rounded-xl font-label font-bold text-sm uppercase tracking-wider bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-300 hover:opacity-90 transition-all">
  Type Instead
</button>
```
3. Add "Hint" button in `#drillView`:
```html
<button id="hintBtn" class="hidden mt-8 px-6 py-3 bg-secondary-container dark:bg-stone-800 text-on-secondary-container dark:text-stone-300 rounded-xl font-label font-bold hover:opacity-90 transition-all duration-300 uppercase tracking-wider shadow-sm flex items-center justify-center gap-2">
  <span class="material-symbols-outlined">lightbulb</span>
  Hint
</button>
```

### B. Engine logic in `src/core/engine.js`
Update options and check `disableSpeech` in `prepareInteractionMode`:
```javascript
export function createDrillEngine(options) {
  const { ..., disableSpeech = false } = options;
  ...
  function prepareInteractionMode() {
    ...
    if (isCopyStage) {
      const hasSpeechAPI = ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window);
      if (hasSpeechAPI && !disableSpeech && Math.random() < 0.3) {
        currentInteractionMode = 'SPEECH';
      } else {
        currentInteractionMode = 'TYPE';
      }
      currentQuestionData = null;
      return;
    }
  }
  ...
  return {
    ...,
    setInteractionMode(mode) {
      currentInteractionMode = mode;
    }
  }
}
```

### C. UI wiring in `src/web/drill-ui.js`
Under `onNextPhrase` setup:
```javascript
const hintBtn = document.getElementById('hintBtn');
if (hintBtn) hintBtn.classList.add('hidden');

// ...
if (interactionMode === 'TYPE') {
  if (!isCopyStage && !isExam && hintBtn) {
    hintBtn.classList.remove('hidden');
    hintBtn.onclick = () => {
      ghostText.classList.remove('opacity-0');
      hintBtn.classList.add('hidden');
    };
  }
}
// ...
else if (interactionMode === 'SPEECH') {
  const typeInsteadBtn = document.getElementById('typeInsteadBtn');
  if (typeInsteadBtn) {
    typeInsteadBtn.onclick = () => {
      if (speechService && speechService.isRecording) {
        speechService.stop();
      }
      activeEngine.setInteractionMode('TYPE');
      // Trigger rendering of TYPE mode
      typeInputArea.classList.remove('hidden');
      speechContainer.classList.add('hidden');
      ghostText.parentElement.classList.remove('hidden');
      ghostText.innerHTML = '';
      phrase.es.split(' ').forEach((word, idx, arr) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.onclick = () => speakSlowly(word);
        ghostText.appendChild(span);
        if (idx < arr.length - 1) ghostText.appendChild(document.createTextNode(' '));
      });
      inputField.value = '';
      fakeInput.innerHTML = '';
      inputField.disabled = false;
      inputField.focus();
      ghostText.classList.add('opacity-0');
    };
  }
}
```

---

## 5. Verification Method
1. **Tests Execution**: Run `npm test` inside the project folder. Ensure all tests continue to pass.
2. **Visual Inspection**:
   * Inspect `src/web/storage.js` to confirm JSON structure load/save logic.
   * Inspect `src/core/engine.js` around line 90 to confirm `SPEECH` mode selection.
   * Inspect `src/web/drill-ui.js` around line 250 to confirm speech setup.
3. **Behavioral Invalidation**:
   * If `disableSpeech` is true and `webkitSpeechRecognition` is mocked to `true` in a browser session, the engine must never select `'SPEECH'` mode.
   * If transitioning from SPEECH to TYPE, verify that `activeEngine.getState().streak` remains unchanged.
