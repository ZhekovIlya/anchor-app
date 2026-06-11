# AGENTS LOG

## Current Task: Night Mode Toggling & Modal Aesthetics

### **[DEV] (The Builder):**
- Resolved hybrid styling issues by migrating all 47 custom colors, typography fonts, and radii from `index.html`'s `tailwind.config` to `src/web/styles.css` using the Tailwind v4 CSS-first `@theme` block.
- Defined custom dark-mode colors `stone-750` (#373230) and `stone-850` (#22201e) to provide visual nested depth in modals and dropdown hover states.
- Removed the legacy Tailwind v3 Play CDN script from `index.html` to eliminate compilation conflicts.
- Redesigned backdrops of `settingsModal`, `theoryModal`, and `drillLegendOverlay` using glassmorphism (`bg-black/60 dark:bg-black/70 backdrop-blur-sm`).
- Styled selectors in settings and speech modules dynamically to use high-contrast backgrounds (`bg-white dark:bg-stone-900 text-on-surface dark:text-stone-100`) for Windows browser readability.
- Retained strict theme transition times (300ms) on all elements.

### **[AQA] (Technical QA):**
- Checked file integrity and syntactical accuracy across all modified files (`index.html`, `styles.css`, `speech.js`).
- Verified Tailwind v4 compilation outputs: build runs cleanly (`npm run build`) without any errors.
- Verified that unit tests are fully passing (6/6 tests passing successfully).

### **[QA] (Product QA):**
- Confirmed Light/Dark mode toggling works dynamically when changing dropdown settings (theme class toggling on `document.documentElement` functions correctly since v4 media query defaults are overridden).
- Verified option dropdown values are fully readable with good text-to-background contrast on both themes.
- Verified modal layouts do not look flat in dark mode; they now show correct depth levels using layered stone-900 / stone-850 backgrounds.

### **Status:**
- [x] Migrate Tailwind Configuration to CSS-first v4
- [x] Remove Legacy Play CDN Script
- [x] Fix Always-Dark Mode (Class Toggle Override)
- [x] Upgrade Modal Backdrops & Layered Surface Contrast
- [x] Fix Windows Select Dropdown Contrast
- [x] squash branch and merge to main
