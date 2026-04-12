# LESSONS LEARNED
> Auto-populated by the [AQA]/[QA] agents when [DEV] makes a mistake.

## Rules
- Each entry is a concrete, actionable rule.
- [DEV] MUST read this file before writing any new code.
- **Missing Data Files (Reported by USER):** Whenever a new data file is created (e.g., `data/week_X.js`), it MUST be explicitly included in `index.html` via a `<script>` tag. Otherwise, `app.js` will not detect the new week's data.
- **PowerShell Execution (Reported by USER):** The `&&` operator is not universally supported in local Windows PowerShell instances. Always use `;` to chain shell commands instead (e.g. `git add . ; git commit -m "msg"`) to prevent parse errors.
- **Script Cleanup (Reported by USER):** If a temporary script (e.g., Python or Node) is executed to refactor or seed data, the agent MUST explicitly delete it from the codebase immediately after verifying the data was successfully created. Do not leave `.py` or `.js` utility scripts in the project directory.

---
