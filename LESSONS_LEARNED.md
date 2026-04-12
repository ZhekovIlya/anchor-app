# LESSONS LEARNED
> Auto-populated by the [AQA]/[QA] agents when [DEV] makes a mistake.

## Rules
- Each entry is a concrete, actionable rule.
- [DEV] MUST read this file before writing any new code.
- **Missing Data Files (Reported by USER):** Whenever a new data file is created (e.g., `data/week_X.js`), it MUST be explicitly included in `index.html` via a `<script>` tag. Otherwise, `app.js` will not detect the new week's data.

---
