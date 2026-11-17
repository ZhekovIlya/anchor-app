# LESSONS LEARNED
Mistakes made once, kept so they are not made twice. Read the sections for your area before changing code.
When the user corrects you, add a one-line lesson with its reason here — or better, a test that makes the mistake impossible.

## Workflow and shell
- **Task branch lifecycle (STRICT USER REQUIREMENT):** create `task/<slug>` and switch to it BEFORE any file change; commit on the branch, then STOP for user review. Merge to `main` and push only after an explicit "Done"/"Merge"/"Deploy". Never do the work and the merge in the same turn. Squash the branch into one descriptive commit before merging, push `origin main`, delete the branch. Why: feature-branch noise and unreviewed deploys.
- **Never restore a whole file from an old commit to fix a local bug:** it silently deleted the PWA wiring and the XP header. Fix the lines; `tests/dom-contract.test.js` catches missing markup. (enforced: tests/dom-contract.test.js)
- **PowerShell has no `&&`:** chain with `;` (Git Bash accepts `&&`), otherwise the command fails to parse.
- **Flags to npm scripts need `--`:** `npm run dev -- --host`; otherwise npm swallows the flag and Vite never sees it.
- **Never leave a dev server running:** terminate Vite and any background process once the check is done.
- **Delete temporary scripts right after use:** a throwaway `.py`/`.js` used to refactor or seed data must not stay in the repo.
- **Run `npm test` before committing data changes:** broken data fails silently in the UI.

## Architecture
- **Core/web separation:** logic goes in `src/core/` (DOM-free, shared with the Telegram bot) or `src/web/` (browser only); never DOM code in core. (enforced: tests/architecture.test.js)
- **No browser globals in core:** `window`, `localStorage`, `webkitSpeechRecognition` throw `ReferenceError` under Node tests; if one is unavoidable, guard with `typeof window !== 'undefined'`. Storage goes through the injected adapter `{ load(key), save(key, data) }`. (enforced: tests/architecture.test.js)
- **ES modules only:** `import`/`export`, data files use `export default { ... }`; no `window.AnchorData`-style globals.
- **Register every new data file in `src/core/data-loader.js`:** otherwise the app never sees it. (enforced: tests/validate-data.test.js)
- **Instantiate before use in `main.js`:** a missing `gamification = createGamification(...)` is a silent `ReferenceError` that blanks the whole app.
- **Three content pillars, separate directories:** `data/sentences/`, `data/words/`, `data/theory/`. `loadAllData()` returns `{ sentences, theory, words }`, not a flat array.
- **Separate SRS pools:** sentences use `srs_sentences`, words `srs_words`; never mix them. `createSRS` requires a `storageKey`.
- **Word drills:** engine `mode: 'word'` uses streak 48 (12 words x 4 loops), copy threshold 24, no tokenizer; word exams use 50 words from all lessons of the topic.
- **Lesson ids are storage keys:** globally unique, never reused or renamed (completion counts would collide). (enforced: tests/validate-data.test.js)
- **Objects have no `.length`:** use `Object.keys(obj).length > 0`, and `Object.values(obj)` before iterating or spreading; `obj.length > 0` is `false` and silently hides UI.
- **Mastery thresholds depend on the item kind:** standard lessons master at 3 completions, exams at 5; thresholds are exact (`>=`), not "any completion". Intermediate counts show as in progress.
- **Session pacing caps penalty inflation:** `handleWrong()` must not grow `targetStreak` unboundedly; track `wrongPenaltyTotal` and cap at `MAX_WRONG_PENALTY` (6). Exams are exempt (fixed targets).
- **Flag button for translation errors:** reports made out-of-band get lost; the in-app flag stores `{ es, ru, uk, field, correction, lessonId, flaggedAt }` in `anchor_flagged_items` as structured input for later sessions.

## Curriculum content
- **Exactly 6 phrases per sentence lesson:** `targetStreak=24` is 4 loops of 6; any other size leaves orphaned reviews. (enforced: tests/validate-data.test.js)
- **Declare every `tab` in the topic's `tabs` array** (`tabs: [{ id, label }]`): otherwise the UI silently renders an empty screen. (enforced: tests/validate-data.test.js)
- **Tab topic discipline:** every phrase in a grammar tab (e.g. "Pasado: -AR") must use that grammar point; no present-tense filler. Old-week review belongs only in the Repaso tab.
- **RU/UK must match the ES meaning exactly:** check each preposition ("del parque" = "парка", not "после парка"). A plausible-but-different translation is a bug.
- **Never pair a verb with its own adjective in one phrase:** "Yo limpio la cocina limpia" is nonsense; drop one or restructure (limpiar/limpio, secar/seco).
- **`ser` for inherent qualities such as price, `estar` for temporary states:** "El alquiler es caro", "El perro está sucio".

## Drill UI and CSS
- **Answer matching ignores punctuation:** strip commas, `?`, `!`, `.`, ellipses (and `¿¡`) for typed and spoken input; the live typing assist must be equally tolerant while rendering exactly what was typed. (enforced: tests/engine.test.js)
- **Typed spaces must be wrapped in an element in `renderFakeInput()`:** `#fakeInput` is `display: flex`, which drops whitespace-only text nodes, so words merge. Use a span around the spaces; use `whitespace-pre`, not `whitespace-nowrap`, for the fake input. (enforced: tests/engine.test.js)
- **"Reveal answer" is visible in every recall interaction (TYPE, LISTENING), including exams and reviews:** hiding it traps users in endless re-queued wrong answers. It calls `handleWrong()`, so it gives no free completion.
- **Failure modals that show the correct answer need a replay-audio button.** Temporary success modals fade out (`opacity-0 pointer-events-none`) when their audio ends.
- **Floating alerts use `fixed bottom-X left-1/2 -translate-x-1/2`:** `absolute bottom-0` inside expanding elements (e.g. `drillView`) collides with the footer.
- **Modal depth in dark mode:** panel slightly lighter than the body (`dark:bg-stone-850` on `stone-900`), nested header/footer backgrounds and borders, backdrop `bg-black/60 dark:bg-black/70 backdrop-blur-sm`.
- **Fake-input overlay:** the transparent strict input must match the fake input's font, padding, border radius and line height, or the caret is offset on mobile.
- **Remove opacity baselines, do not just add `opacity-0`:** toggling Spanish text visibility must remove classes like `opacity-30`, or Tailwind's cascade keeps them.
- **Fades need a frame between states:** setting innerHTML and going `opacity-0` to `opacity-100` in one frame skips the transition; separate with a ~50 ms timeout.
- **Ghost fade-out of new text:** when resetting a fading element, set `el.style.transition = 'none'`, update the text, restore `''`, force reflow (`void el.offsetHeight`), then reveal.
- **Dashboard status uses icons, not repeated text tags:** `check_circle` for completed, `workspace_premium` for mastered. Strip redundant "Week X:" prefixes from topic titles in lists.

## Speech
- **Interim results are cumulative:** track the index of the last matched word and evaluate only newly appended words, or duplicate words ("el ... el") make matching jump ahead.
- **Accumulate with `+=`, not `||`:** `event.results` holds everything but the loop starts at `resultIndex`; `||` drops earlier strings.
- **Release the microphone on navigation:** bind a cleanup to leaving the Read Aloud tab or the mic stays on.
- **Normalise before comparing spoken Spanish:** strip accents with `.normalize('NFD').replace(/[̀-ͯ]/g, '')` and punctuation (`.,;:"'!?¿¡`).
- **Be lenient with speech:** score all target words wherever they appear in the transcript, show an accuracy percentage, and let the user pass at about 60% or move on manually; never stop at the first mispronounced word.
- **"Type instead" after a failed speech drill pre-fills the last transcript** so the user corrects words instead of retyping the sentence.

## Theory
- **Every theory section needs a `type`** (`heading`, `paragraph`, `callout`, `table`, `image`, `video`), with `text` (heading/paragraph/callout), `headers`/`rows` (table), `src` (image/video); no `content` key. Unknown types render blank with no error, also for week-embedded theory. (enforced: tests/validate-data.test.js)
- **Embedded theory needs `title` and `subtitle`:** the dashboard card prints `theory.subtitle` and shows `undefined` otherwise.
- **Theory is read-only:** no drill, no completion tracking. Word topics may carry an embedded `theory` object shown as a card above the lessons.
- **Crop course-board visuals tightly:** never embed full worksheet pages with blank homework lines; crop the diagram or table. Originals live in `reference/`.
- **Theory tables are styled cards, not raw borders:** rounded corners, elevated dark background (`dark:bg-stone-850`, `dark:border-stone-750`), crisp headers with accent, zebra rows or hover, readable in dark mode.

## Build, PWA and infrastructure
- **Stamp the service-worker cache name at build time:** Vite copies `public/sw.js` verbatim, so `define` does not apply; use the `%%CACHE_VERSION%%` placeholder replaced by `scripts/stamp-sw.js` (postbuild, git short hash) so each deploy gets a new cache and `activate` purges old ones.
- **Network-first for navigation requests:** cache-first only for hashed JS/CSS; cache-first on `/index.html` strands returning visitors on a stale shell. The service worker never intercepts `/api`. (enforced: tests/sw.test.js)
- **Tailwind v4 only:** custom colours go in the `@theme` block of the main CSS, not in an `index.html` config; never add the Play CDN script next to `@tailwindcss/vite` (dark-mode and colour clashes). `index.html` no longer loads any CDN script.
