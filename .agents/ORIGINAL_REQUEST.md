# Original User Request

## Initial Request — 2026-06-12T00:56:52Z

# Teamwork Project Prompt

An interactive reading feature for a language learning app where users read large texts aloud. The app uses the browser's native Web Speech API to verify correct pronunciation, and users must successfully read words for them to "count" as completed. Note from the user: "just think i need to learn spanish, so the best learning experience".

Working directory: d:\spanish\anchor app
Integrity mode: development

## Requirements

### R1. Implement a "Read Aloud" Component
Create a UI component that displays a paragraph of Spanish text. The user can start a reading session, which activates the browser's `SpeechRecognition` API.

### R2. Real-time Speech Validation
As the user speaks, the transcribed text should be compared against the displayed text. Words that are read correctly should be visually highlighted (e.g., turning green). Words that the user skips or mispronounces do not count and must be read correctly to progress.

### R3. Provide Sample Texts
Include at least 3 sample Spanish paragraphs of varying difficulty that the user can choose from to practice reading.

### R4. Integration
The new component should be accessible from the main navigation or dashboard of the existing app.

## Acceptance Criteria

### Functionality
- [ ] The app successfully requests microphone permissions and uses the native browser Web Speech API.
- [ ] Words in the text visually update (e.g., change color) only after they have been successfully spoken by the user.
- [ ] The user can seamlessly read through the text, and the app tracks their progress word-by-word.
- [ ] The feature has a modern, premium design aesthetic (smooth transitions, clean typography, vibrant or harmonious colors).

### Verification
- [ ] Provide a "Mock Speech" button or script that simulates the `SpeechRecognition` API emitting spoken words, ensuring the word-highlighting logic can be programmatically verified without needing a microphone during development.

## Follow-up — 2026-06-11T23:12:03Z

The user has activated the /goal directive. They want the team to finish the implementation entirely without any interruptions or requests for approval. They trust the team to handle everything, so please proceed until the Read Aloud feature is 100% complete, tested, and integrated. Do not ask for user input.
