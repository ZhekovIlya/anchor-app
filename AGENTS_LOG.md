# AGENTS LOG

## Current Task: Token Coloring System Overhaul

### **[DEV] (The Builder):**
- Expanded `COLOR_MAP` in `src/core/constants.js`.
- Created and executed `fix-tokens.js` to normalize 720 phrases across 4 weeks.
- Implemented the `drillInfoBtn` and `drillLegendOverlay` in `index.html`.
- Updated `src/web/main.js` and `src/web/dashboard.js` for UI toggling and event wiring.
- Moved the info button from body-level fixed to drill-container absolute (`top-8 right-8`) with cozy styling.

### **[AQA] (Technical QA):**
- Verified `npm test` passes (720 phrases, 0 failures).
- Updated `tests/validate-data.test.js` to include the new `conjunction` token type.
- Confirmed no duplicate meta IDs and exact 6-phrase symmetry.

### **[QA] (Product QA):**
- Verified the legend explains the 80/20 vocabulary retention rules implicitly through the streak mechanic explanation.
- Confirmed the ⓘ button is non-intrusive and matches the "help button" aesthetic.
- Verified the split of compound tokens ("del parque" -> preposition + object) logic correctly applies colors.

### **Status:**
- [X] Expanded Coloring System
- [X] Automated Data Transformation
- [X] Drill Legend Tooltip
- [X] Responsive Layout Check
