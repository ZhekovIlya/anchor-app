# LESSONS LEARNED
> Auto-populated by the [AQA]/[QA] agents when [DEV] makes a mistake.

## Rules
- Each entry is a concrete, actionable rule.
- [DEV] MUST read this file before writing any new code.
- **Missing Data Files (Reported by USER):** Whenever a new data file is created (e.g., `data/week_X.js`), it MUST be imported in `src/core/data-loader.js`. Otherwise, the app will not detect the new week's data.
- **PowerShell Execution (Reported by USER):** The `&&` operator is not universally supported in local Windows PowerShell instances. Always use `;` to chain shell commands instead (e.g. `git add . ; git commit -m "msg"`) to prevent parse errors.
- **Script Cleanup (Reported by USER):** If a temporary script (e.g., Python or Node) is executed to refactor or seed data, the agent MUST explicitly delete it from the codebase immediately after verifying the data was successfully created. Do not leave `.py` or `.js` utility scripts in the project directory.
- **Core/Web Separation:** All new logic must go into `src/core/` (DOM-free, reusable by Telegram bot) or `src/web/` (DOM-dependent, browser only). Never put DOM code in core modules.
- **ES Module Imports:** Use `import`/`export` — never `window.AnchorData` or other globals. Data files use `export default { ... }`.
- **Storage Adapter Pattern:** Storage must go through the adapter interface `{ load(key), save(key, data) }`. Never call `localStorage` directly from core modules.
- **Test Before Commit:** Run `npm test` to validate data integrity before committing data changes.
- **NPM Flag Passing (Reported by USER):** When passing flags like `--host` to an npm script (e.g., `npm run dev`), you MUST use the double-dash syntax: `npm run dev -- --host`. Otherwise, the flag is consumed by npm and never reaches the underlying tool (Vite).
- **Background Servers (Reported by USER):** Do not leave processes like Vite (`npm run dev`) running indefinitely in the background. After verifying the dev environment, terminate the process.

---
