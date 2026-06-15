# Handoff: Read Aloud Fixes

## 1. Observation
1. **Punctuation stripping** in `read-aloud-ui.js` used `/[.,¡!¿?]/g` instead of `/[.,;:"'!?¿¡]/g`. 
2. **Duplicate matching**: Web Speech API interim results continuously feed previously matched words in the current utterance array (e.g. `['el']`, then `['el', 'perro']`). The script looped from index 0 on each result, causing duplicate "el" tokens to jump ahead to a future "el" in the expected phrase.
3. **Resource Leak**: When navigating away from the Read Aloud tab, `topicsContainer.innerHTML = ''` removed the DOM elements, but did not call `speechService.stop()`, leaving the microphone active in the background.

## 2. Logic Chain
- Expanding the regex character set in `cleanWord` directly resolves the punctuation stripping defect.
- To prevent duplicate token matching, we track `prevSpokenWords` and `lastMatchedTranscriptIndex`. If the newly emitted string is a continuation (starts with the same first word), we resume matching from `lastMatchedTranscriptIndex + 1`. If the array shrinks or the first word changes, we assume a new utterance began and reset `lastMatchedTranscriptIndex = -1`.
- A `MutationObserver` watching `document.body` for the removal of `#raTextContainer` automatically cleans up the `speechService` even if navigation removes the entire dashboard node at an arbitrary layer, guaranteeing that the leak is plugged regardless of how the user navigates.

## 3. Caveats
- Speech interim results can sometimes alter preceding words slightly (e.g., "they" to "there"). The heuristic will reset the matching index if the first word changes completely, ensuring no tokens are skipped, though mid-sentence API auto-corrections might require the user to repeat the sentence if a missed token is bypassed.

## 4. Conclusion
The requested Read Aloud defects reported by [AQA] are successfully resolved. Token-matching handles repeated words correctly without jumping ahead. The microphone automatically stops if the user clicks out to another tab (Words, Sentences, etc.).

## 5. Verification Method
- Execute `npm test` and `npm run build` directly. Both run cleanly.
- Boot the dev server with `npm run dev`. Navigate to "Read Aloud", start the mock speech or recording, then click on the "Words" or "Sentences" tab in the bottom bar and observe that the recording indicator/status is cleared automatically. 
- Use Mock Speech on an item with repeated words to verify no jumping.
