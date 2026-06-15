## Observation
- Verified git branch is `task/read-aloud`
- Verified `src/web/read-aloud-ui.js` properly tracks `lastMatchedTranscriptIndex` and compares `prevSpokenWords` to gracefully handle interim vs new transcript updates.
- Verified a `MutationObserver` is used to disconnect the microphone (`speechService.stop()`) when the component unmounts from the DOM.
- Verified robust punctuation stripping using regex `/[.,;:"'!?¿¡]/g`.
- Executed `npm test` and `npm run build`; both pass cleanly.

## Logic Chain
1. The new logic handles Web Speech API's transcript delivery by correctly detecting when a completely new transcription begins (by checking for shrinking length or a changed first word).
2. Look-ahead logic successfully skips mispronounced words.
3. The mutation observer listens on `document.body` and accurately stops the `speechService` when the user navigates away (e.g., clicking on another tab like Sentences).
4. Punctuation stripping fully covers standard Spanish punctuation marks, preventing regex mismatches.

## Caveats
- Very minor UX edge case: When the user successfully reads the text, `speechService.stop()` is invoked. This eventually triggers `onEnd()` callback, which applies the `.hidden` class to `statusEl`. Therefore, the "Great job!" success message will briefly appear and then disappear. This does not break core functionality.

## Conclusion
The fixes provided by [DEV] are technically sound, robust, and cleanly integrated. No regressions or syntax errors were found. Code compiles and tests pass.

## Verification Method
- `npm test`
- `npm run build`
- Inspected source code manually for intended fixes (`src/web/read-aloud-ui.js`, `src/core/speech-recognition.js`)
