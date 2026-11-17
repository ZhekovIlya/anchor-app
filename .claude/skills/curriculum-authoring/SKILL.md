---
name: curriculum-authoring
description: Author or change Anchor's Spanish curriculum — sentence weeks, tabs, lessons, phrases, word topics, theory articles, or the vocabulary colour map. Use this whenever the task touches anything under data/ (adding a week, a tab, a lesson, a word topic, a theory table, new phrases, fixing or rewording translations, renumbering), even if the user only says "add week 15", "more restaurant phrases", "make a topic about clothes" or "this translation is off".
---

# Authoring curriculum for Anchor

The learner is one real person (A1 moving to A2, native Russian/Ukrainian) who types every phrase you
write, dozens of times. A wrong translation or an unnatural sentence gets memorised. Treat content as
the product, not as test data: fewer, correct, natural phrases beat more phrases.

## What exists

| Pillar | Files | Unit | Reference |
|---|---|---|---|
| Sentences | `data/sentences/week_N.js` | lesson = exactly 6 phrases `{ ru, uk, es }` | [references/sentences.md](references/sentences.md) |
| Words | `data/words/<topic>.js` | lesson = exactly 12 words `{ ru, uk, es }` | [references/words.md](references/words.md) |
| Theory | `data/theory/<name>.js`, or a `theory` object inside a week / word topic | typed `sections` | [references/theory.md](references/theory.md) |

Read the reference for the pillar you are touching before writing — the formats are strict and a
wrong key renders as a blank screen rather than an error. Read
[references/quality-checklist.md](references/quality-checklist.md) before writing any Spanish.

## Workflow

1. **Look before you write.** Run `npm run audit:data` to see every topic, its tabs, lesson counts and
   what is missing. Open the neighbouring week to match its level, tone and id scheme.
2. **Decide the teaching point.** One grammar or communication goal per tab. Every phrase in a tab must
   exercise that goal; old material belongs in a dedicated review tab, never as filler. Stay inside the
   grammar scope: present and pretérito indefinido only, unless the user asked for more.
3. **Write the content** in the pillar's format. New lesson ids must be globally unique and are
   permanent — they are the keys progress is stored under, on the device and on the sync server.
4. **Register new files.** A data file that is not imported in `src/core/data-loader.js` does not exist
   for the app. Theory (standalone or embedded) also needs an entry in `src/core/theory-registry.js`.
   The references list the exact places.
5. **Classify every new Spanish word** in `data/vocabulary.js`. Run
   `node scripts/audit-data.js --unknown`; it must print 0 missing words. A verb left unclassified is
   shown in the noun colour, which teaches the wrong thing.
6. **Validate.** `npm test` (the data, vocabulary and registry suites are the gate) and `npm run build`.
7. **Get an independent language review.** Hand the new or changed content to the `content-reviewer`
   subagent (`.claude/agents/content-reviewer.md`); if subagents are not available, re-read every phrase
   against the checklist in a fresh pass, ES → RU → UK, one preposition at a time. The author is the
   worst person to spot their own calques.
8. **See it in the app.** Follow the `verify-app` skill: open the week or topic, check the tab bar, the
   lesson cards, the theory card, and drill one lesson to the end.
9. **Report** what was added (topic, tabs, lesson ids, counts), what the reviewer changed, and anything
   you were unsure about so the user can decide.

## Things that have gone wrong before

- A week exported without a `tabs` array: the lessons view rendered empty, with no error.
- Theory written as `{ heading, body }` instead of typed sections: silently blank article.
- A week file created but not imported in the loader: invisible to the app *and* to the tests.
- An 8-phrase lesson: the 24-rep session no longer divides evenly, so some phrases get fewer reps.
- Two topics reusing the lesson id `wt_l1`: one topic's progress overwrote the other's.
- "Yo limpio la cocina limpia" — a verb next to its own adjective form; grammatical, but nonsense.
- "del parque" translated as "после парка": plausible, wrong. Check each preposition.

These are now caught by tests where a test can catch them; the last two kinds only by reading.
