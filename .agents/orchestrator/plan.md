# Project Plan: Read Aloud Component

## Scope
Implement an interactive reading feature using the native Web Speech API. Users will read large texts aloud, and correctly pronounced words will be highlighted in real-time.

## Architecture
- **Data (`data/read_aloud.js`)**: Store at least 3 Spanish paragraphs of varying difficulty.
- **Core (`src/core/speech-recognition.js`)**: Handle `SpeechRecognition` API interaction. It needs a mock mode for development.
- **Web (`src/web/read-aloud-ui.js`)**: Render the paragraphs, track the current word, handle highlighting, and manage the "Mock Speech" development tools.
- **Integration (`index.html` & `src/web/main.js`)**: Add a new tab/navigation button to access the "Read Aloud" feature.

## Milestones
1. **Data & Mock Engine**: Create sample paragraphs and a SpeechRecognition wrapper that supports a mock mode.
2. **UI Component & Logic**: Build the Read Aloud UI. Render the text as individual spans to allow word-by-word highlighting. Compare incoming transcribed words to the expected words.
3. **Integration**: Add navigation to switch to the Read Aloud view.
4. **Testing & QA**: Verify functionality and run [AQA] and [QA] checks.

## Interface Contracts
- `speech-recognition.js` -> `onResult(transcript)`, `onError(err)`, `start(mockMode)`
- Data format: `[ { id, title, difficulty, text } ]`
