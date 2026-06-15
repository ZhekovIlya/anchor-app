# Observation
- Checked out branch `task/read-aloud`.
- Examined `src/core/speech-recognition.js`, `src/web/read-aloud-ui.js`, `src/web/dashboard.js`, `src/web/main.js`, and `data/read_aloud.js`.
- `npm test` and `npm run build` pass cleanly.
- `speech-recognition.js` fires `onResult(finalTranscript.trim() || interimTranscript.trim())`, which means interim results are repeatedly passed to `onResult` as they build up (e.g., "el", then "el perro").
- `read-aloud-ui.js` `handleTranscript` loop advances a module-level `currentIndex` by matching every word in the received transcript, looking ahead up to 3 words.
- If the user switches home tabs while in the Read Aloud view, the `topicsContainer` is overwritten without calling `speechService.stop()`.

# Logic Chain
1. Because `onResult` emits interim transcripts repeatedly ("el", then "el perro", etc.), `handleTranscript` parses and tries to match the same spoken words multiple times.
2. If the text is "el perro y el gato" and the user says "el", it matches index 0. `currentIndex` becomes 1. 
3. When the interim updates to "el perro", `handleTranscript` processes "el" again. It looks ahead 3 words from index 1 (which are "perro", "y", "el"). It finds a match at index 3 ("el") and advances `currentIndex` to 4, entirely skipping "perro y". This is a critical token-matching logic flaw.
4. Additionally, since the UI allows navigating away from Read Aloud via the main tab bar, the active `speechService` is left running, causing a microphone leak.
5. `cleanWord` uses `word.replace(/[.,¡!¿?]/g, '').toLowerCase().trim()`. This misses other common punctuation like colons, semicolons, and quotes.

# Caveats
- Did not test with actual microphone input since this is a static code review, but the logic flaw is mathematically certain based on the code's state management.

# Conclusion
REQUEST_CHANGES. The word-matching logic handles skip-aheads but fails when processing repeated interim transcripts containing repeated words. The background microphone leak is also a major issue.

# Verification Method
- Run the provided unit tests (`npm test`) which pass.
- Dry-run the state machine in `handleTranscript` with input words `['el', 'perro', 'y', 'el', 'gato']` and inputs `['el']` followed by `['el', 'perro']` to observe `currentIndex` skipping to 4.
