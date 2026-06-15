# Progress

Last visited: 2026-06-12T01:10:00+02:00

- Read `LESSONS_LEARNED.md` carefully to understand the precise technical requirements reported by [AQA].
- Modified `src/web/read-aloud-ui.js` to implement `lastMatchedTranscriptIndex` and `prevSpokenWords` to eliminate Web Speech API cumulative array replay issues.
- Integrated a `MutationObserver` to watch for the UI component's removal from `document.body` to correctly call `speechService.stop()`.
- Updated the punctuation stripping regex to cover colons, semicolons, quotes, question marks, and exclamation points: `/[.,;:"'!?¿¡]/g`.
- Ran `npm test` and `npm run build` cleanly.
- Committed the changes directly to `task/read-aloud`.
