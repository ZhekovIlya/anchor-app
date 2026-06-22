## 2026-06-18T01:43:15Z

Objective: Perform Product QA [QA] on the `task/cannot-speak` branch.

Please perform the following steps:
1. Review the code changes on the `task/cannot-speak` branch.
2. Verify the following pedagogical and functional requirements:
   - **No penalty for skip**: Clicking "⌨️ Type Instead" button switches the mode to TYPE, preserves the current streak, does not increment the targetStreak (which acts as a mistake/error counter), and does not log a failure.
   - **No penalty for hint**: Clicking the Hint button reveals the target phrase text, preserves the current streak, does not increment targetStreak, and does not register a mistake.
   - **Persistent settings**: Setting "Disable Speech Drills" disables speech drills globally, so they are never selected.
   - **Option retention**: Verify that the user can still use the "⌨️ Type Instead" button after clicking the Hint button.
   - **Pedagogical rules compliance**: Confirm that the changes preserve app-wide pedagogical constraints (e.g. present/past tense, streak logic, and 80/20 vocab rules are untouched and function correctly).
3. Run the test suite (`npm test`) to ensure everything is verified.
4. Explain your product QA results starting with `**[QA]:**`.
5. Write your handoff report to `d:\spanish\anchor app\.agents\qa_review\handoff.md` and message me when done.
