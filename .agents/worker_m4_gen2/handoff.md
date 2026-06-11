# Handoff — M4 Progress Dashboard / Stats Section

## Observation

### Files Created
- **`src/web/stats-dashboard.js`** (321 lines) — New Stats tab renderer module.
  - Imports: `getCompletionCount` from storage, `LEVEL_TIERS` from gamification, `SRS_KEY_WORDS`/`SRS_KEY_SENTENCES` from constants.
  - Exports: `renderStatsTab(container, gamification, srsSentences, srsWords, phraseBank, wordBank, data, storageAdapter)`
  - Local constant `LESSON_MASTERED_THRESHOLD = 3` to avoid circular import with dashboard.js.

### Files Modified
- **`src/web/dashboard.js`** (3 changes):
  1. Line 8: Added `import { renderStatsTab } from './stats-dashboard.js';`
  2. Line 153: Added `{ id: 'stats', label: 'Stats', icon: 'bar_chart' }` to HOME_TABS array
  3. Lines 194-195: Added `else if (activeHomeTab === 'stats')` branch in `renderDashboard()` that calls `renderStatsTab()` with `callbacks.gamification` and `callbacks.storageAdapter`

- **`src/web/main.js`** (1 change):
  1. Lines 147-148: Added `gamification` and `storageAdapter: localStorageAdapter` to the callbacks object passed to `renderDashboard()`

### Stats Tab UI Content
The Stats tab renders the following sections (all data derived, no duplication):

1. **Streak & Level Row** (2-col grid):
   - Streak card: current streak (days), longest streak
   - Level card: level name, total XP, XP progress bar to next tier

2. **Progress Counters** (3-col grid):
   - Words encountered: count of unique keys in `srs_words` localStorage
   - Sentences mastered: count of lessons with completionCount >= 3
   - Due items: `srsSentences.getDueCount(phraseBank) + srsWords.getDueCount(wordBank)`

3. **Phrases Encountered**: count of unique keys in `srs_sentences` localStorage

4. **Activity Chart** (4-week bar chart):
   - 28 days (4 rows × 7 columns) with day-of-week headers
   - Each day: colored bar if active, gray stub if not
   - Week labels (e.g., "Jun 2") on each row
   - Active day count summary

## Logic Chain
1. Task requires a Stats tab → Approach A (4th home tab) selected per spec.
2. `renderDashboard` uses a callbacks object → added `gamification` and `storageAdapter` to it (most extensible pattern, no breaking signature change).
3. Stats data must be derived → used `storageAdapter.load(SRS_KEY_WORDS)` for words encountered (counts SRS entries, not hardcoded), `getCompletionCount` for mastery, `gamification.getStats()` for streak/XP/level, and SRS `getDueCount` for due items.
4. Circular dependency risk: `stats-dashboard.js` originally imported `LESSON_MASTERED_THRESHOLD` from `dashboard.js`, which imports `renderStatsTab` from `stats-dashboard.js`. Fixed by defining the constant locally (value 3) with a comment explaining the duplication.
5. Review section hidden when stats tab active (line 151-152 in stats-dashboard.js).
6. UI uses existing Tailwind tokens: `font-headline`, `font-label`, `font-body`, `bg-surface-container-lowest`, `text-primary`, `rounded-xl`, etc. — fully consistent with existing dashboard cards.
7. Dark mode support with `dark:` variants on all elements.

## Caveats
- `LESSON_MASTERED_THRESHOLD` is duplicated (value 3) to avoid circular import. If this constant changes in `dashboard.js`, it must also be updated in `stats-dashboard.js`.
- Could not run `npm test` due to command approval timeouts. Tests should be run manually.
- Could not run `git checkout task/gamification-overhaul` or `git commit` due to command approval timeouts. Git operations should be done manually.
- The activity grid assumes contiguous 28-day layout regardless of timezone; `toISOString().split('T')[0]` may differ from local date at midnight in extreme timezone offsets. This matches the pattern used by `gamification.js` (line 72).

## Conclusion
M4 Stats Dashboard is fully implemented:
- New `src/web/stats-dashboard.js` module created with genuine data derivation
- Dashboard wired via 3 minimal changes (import, HOME_TABS entry, else-if branch)
- Main.js updated to pass gamification and storageAdapter via callbacks
- No data duplication — all stats derived from existing localStorage/API calls
- No circular dependencies
- Consistent MD3 Tailwind styling with dark mode support

## Verification Method
1. Run `npm test` to verify existing tests pass
2. Run `npm run dev -- --host` and click the "Stats" tab to verify:
   - All 4 home tabs render (Sentences, Theory, Words, Stats)
   - Stats tab shows streak, level, progress counters, and activity chart
   - Switching between tabs works without errors
   - Review section is hidden when Stats tab is active
   - Dark mode toggle works on the Stats tab
3. Run `git add . ; git commit -m "feat(M4): add progress dashboard with stats, streak, and activity history"` on the `task/gamification-overhaul` branch
