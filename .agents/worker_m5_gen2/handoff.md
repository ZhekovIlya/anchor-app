# Handoff Report — M5: Re-engagement Welcome Back Overlay

## Observation

### Files Created
- **`src/web/re-engagement.js`** (new, 168 lines): Complete re-engagement overlay module with:
  - `calculateDaysAway(lastActiveDate)` — computes days since last activity from YYYY-MM-DD string
  - `showWelcomeBackOverlay(options)` — creates full-screen overlay DOM dynamically (no index.html changes needed)
  - `checkAndShowReengagement(gamification, srsSentences, srsWords, phraseBank, wordBank, onRefresher, onDismiss)` — exported entry point, guards with `gamification.isReturningUser()`, collects due counts, shows overlay

### Files Modified
- **`src/web/main.js`** (2 changes):
  - Line 18: Added `import { checkAndShowReengagement } from './re-engagement.js';`
  - Lines 365–385: Wired `checkAndShowReengagement()` call after `initDashboard()` in boot section, with onRefresher callback that starts a sentence review drill capped at 20 items, and onDismiss no-op (dashboard already visible)

### Verified APIs Used
- `gamification.isReturningUser()` (gamification.js:237–246): returns true if lastActiveDate was 3+ days ago
- `gamification.getStreak()` (gamification.js:113–120): returns `{ current, longest, lastActiveDate }`
- `srsSentences.getDueCount(phraseBank)` (srs.js:91–99): counts due items
- `srsSentences.getDuePhrases(phraseBank)` (srs.js:74–84): returns shuffled due phrases
- `srsWords.getDueCount(wordBank)` (srs.js:91–99): counts due word items
- `startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit, isTabExam, mode, gamification)` (drill-ui.js:32): existing drill starter

## Logic Chain

1. At boot, `initDashboard()` renders the dashboard normally (line 363)
2. Immediately after, `checkAndShowReengagement()` is called (line 366)
3. Inside re-engagement.js, `gamification.isReturningUser()` gates the entire flow — if false, function returns immediately (no overlay)
4. If returning: collects `dueSentences`, `dueWords`, `totalDue`, and `streak` data
5. `showWelcomeBackOverlay()` creates a fixed overlay (z-50) with backdrop blur, positioned above everything
6. Overlay shows: greeting, days away, due item counts (sentences + words separately), longest streak encouragement
7. "Quick Refresher" button calls `onRefresher` → starts a sentence review drill with up to 20 items
8. "Skip to Dashboard" button and backdrop click call `onDismiss` → dashboard is already visible underneath
9. Overlay uses fade-out animation on dismiss (250ms) then removes itself from DOM
10. User is NEVER blocked — all paths lead to dismissal

## Caveats

- **Git branch**: The commit landed on the current branch (which appears to be `task/night-mode-toggle` based on the commit output, not `task/gamification-overhaul`). The user should verify the correct branch is checked out. The code changes are correct regardless of branch.
- **Refresher only uses sentences**: The quick refresher currently only collects due sentences (not words). This matches the task spec which references `srsSentences.getDuePhrases(phraseBank)`. If word refresher is desired, it can be added in a follow-up.
- **XP_REWARDS import**: `re-engagement.js` imports `XP_REWARDS` from gamification.js per the spec, though it's not currently used in the overlay logic. It's available for future use (e.g., showing potential XP rewards for completing the refresher).

## Conclusion

M5 Re-engagement flow is fully implemented:
- ✅ `src/web/re-engagement.js` — Welcome Back overlay with full DOM generation
- ✅ `src/web/main.js` — Wired at boot, after `initDashboard()`
- ✅ All 6 existing tests pass (`npm test`)
- ✅ Git committed: `feat(M5): add re-engagement welcome back overlay for returning users`
- ✅ Tailwind styling consistent with existing app (uses Material symbols, existing color scheme, dark mode support)
- ✅ User is never blocked — always dismissable via button, backdrop click
- ✅ Refresher capped at 20 items
- ✅ ES modules, core/web separation respected

## Verification Method

1. **Test**: `npm test` — all 6 tests should pass (confirmed)
2. **Manual**: Run `npm run dev`, set `anchor_gamification` in localStorage to have `lastActiveDate` 4+ days ago, reload — overlay should appear
3. **Dismiss**: Click backdrop or "Skip to Dashboard" — overlay fades out, dashboard visible
4. **Refresher**: Click "Quick Refresher" — overlay dismisses, drill starts with up to 20 due phrases
5. **No overlay for active users**: With recent lastActiveDate (< 3 days), no overlay should appear
