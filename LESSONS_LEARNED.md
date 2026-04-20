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
- **Strict Lesson Sizing (Reported by [AQA]):** Every standard sub-lesson MUST contain exactly 6 phrases. This is mathematically required to ensure the `targetStreak=24` (exactly 4 loops) completes symmetrically without orphaned reviews. Never output an 8-phrase or 4-phrase lesson under any circumstances.
- **Mandatory Branch-per-Task (STRICT USER REQUIREMENT):** [DEV] MUST create a new task branch (e.g., `git checkout -b task/description`) and switch to it BEFORE making ANY file changes. NEVER modify files on the `main` branch. This is the absolute first step for every request. Violation of this rule is a failure of the agent workflow.
- **Tailwind Config Order (Reported by USER):** When importing Tailwind via CDN, the `tailwind.config` assignment script block MUST appear before the CDN `<script>` tag. Otherwise, custom colors and font families will fail to load.

---
\n## UI & Logic Fixes (Reported by User)\n- **Drill Stage Text Opacity**: When toggling Spanish text visibility in Stage 2 drills, ensure native opacity baseline classes (e.g., opacity-30) are actively removed, not just substituting opacity-100 with opacity-0, as tailwind retains the cascade. \n- **Fake Input Alignment**: When layering transparent strict inputs over colored fake inputs, explicitly match all standard box model and typography tokens (font-size, paddings, rounded borders, flex/line-heights) to prevent caret offset on mobile screens.\n- **Mastered vs Completed Limits**: 'Mastered' states apply at exact thresholds (>= 3 completions) not simply boolean presence (>0). Intermediate completions reflect as 'In Progress'.\n- **Sanitization of Redundant Titles**: Always trim repetitive prefixes in display lists (e.g. mapping week topic titles without redundant 'Week X:' headers).
\n## Hard-Earned Knowledge (Revisions & Retries)\n- **DOM Lifecycle on Class Switches**: Changing innerHTML and toggling opacity from 0 to 100 consecutively within the same execution frame prevents the browser from generating the CSS transition (because transition relies on layout/paint reflow states). A ~50ms timeout ensures frame decoupling to let the 0-opacity layout calc state sink in BEFORE the 100-opacity class attaches, permitting visual fade.\n- **white-space pre tokenizing**: For character-level colorful token injections into a pseudo-input container, applying \whitespace-nowrap\ will dangerously truncate multiple spaces between words if not careful. Always use \whitespace-pre\ to safeguard semantic spacing intervals requested by users.

## Lesson Completion Layout Constraints
- **Iconography vs Text Labels**: Users strongly prefer intuitive dashboard status tracking. Avoid spamming text tags like 'In Progress' or 'Mastered' repeatedly on item grids. Favor minimalist icons on the right edge (e.g. \check_circle\ for completed, \workspace_premium\ for mastered).
- **Strict States**: Completion requires strictly meeting thresholds. Week logic -> Lesson logic.

## Technical UI Fixes (Reported by USER)
- **CSS Transition Ghosting**: When updating text in a fading element (e.g., `transition-opacity`) and hiding it concurrently, the browser will animate the fade-out of the *newly injected text*. To prevent the next item from Ghosting/fading-out visibly, disable the transition (e.g., `el.style.transition = 'none'`) during the instant hide/reset, update the text, and then restore the transition (`el.style.transition = ''`) before triggering a reflow (`void el.offsetHeight;`) for subsequent reveal fades.
