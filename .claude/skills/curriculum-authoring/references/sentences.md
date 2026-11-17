# Sentence weeks — format and registration

## File shape

`data/sentences/week_15.js` (follow the newest existing file for naming):

```js
const week15Lessons = [
  {
    id: "w15_l1",              // unique in the whole app, permanent
    tab: "compras",            // must be one of the ids in `tabs` below
    title: "En la tienda",     // Spanish title shown on the lesson card
    phrases: [                 // exactly 6
      { ru: "Сколько это стоит?", uk: "Скільки це коштує?", es: "¿Cuánto cuesta esto?" },
      // …five more
    ],
  },
  // …more lessons of the same tab
  { id: "w15_m1", tab: "compras", exam: true, mini: true, title: "Mini-examen: Compras" },

  // …next tab, its lessons, its mini-exam

  { id: "w15_exam", exam: true, title: "Examen de la Semana 15" },   // final exam: no `tab`
];

export default {
  id: "week15",
  type: "sentences",
  title: "Week 15: De compras",      // the "Week N:" prefix is stripped on the dashboard card
  description: "One English sentence about the week's goal.",
  legacy: false,
  theory: { title: "…", subtitle: "…", sections: [ /* see theory.md */ ] },
  tabs: [
    { id: "compras", label: "Compras" },
    // one entry per tab used by the lessons, in display order
  ],
  lessons: week15Lessons,
};
```

## Rules the code depends on

- **6 phrases per lesson.** A lesson session is 24 correct answers = 4 passes over 6 phrases.
- **`ru`, `uk`, `es` on every phrase.** `tokens` and `meta` are generated at load time — never write them.
- **Exam lessons have no `phrases`.** A mini-exam (`exam: true` + `tab`) draws from the lessons of its
  tab (up to 30); the final exam (`exam: true`, no `tab`) draws from the whole week. The week card shows
  "Mastered" once the final exam has 5 completions, so every week should have one.
- **`tabs` is required** whenever lessons carry a `tab`. Each tab needs at least one lesson.
- **Typical size:** 2–3 tabs, 3 lessons + 1 mini-exam per tab, 1 final exam. Early weeks (1–4) use five
  person tabs (yo / tú / él·ella·usted / nosotros / ellos·ellas·ustedes); later weeks use thematic tabs.
- **Spanish punctuation is part of the phrase.** Write `¿…?` and `¡…!` in pairs and normal sentence
  capitalisation. The learner may omit punctuation while typing; the checker ignores it.
- **Dashboard week numbers come from the order of the array in `data-loader.js`**, not from the id.

## Register the week (three places)

1. `src/core/data-loader.js` — add the `import` and add the topic to the `hydrateSentenceTopics([...])`
   array, before `topicsCoreData` (the legacy topic stays last).
2. `src/core/theory-registry.js` — add the `import` and one entry in `THEORY_DEFINITIONS` for the
   week's theory:

   ```js
   {
     id: 'week_15_theory',
     source: 'sentences',
     sourceId: 'week15',          // must equal the topic's `id` so "open theory" from the week resolves
     sourceLabel: 'Semana 15',
     category: 'vocabulario',     // one of THEORY_CATEGORIES
     icon: 'shopping_bag',        // a Material Symbols name
     tags: ['vocabulario', 'compras', 'semana15', 'curriculum'],
     getData: () => week15Data.theory
   },
   ```

   Then update the expected topic count in `tests/theory-registry.test.js`.
3. Optional: if the week belongs to a guided route, add its lesson ids to a step in
   `src/core/learning-paths.js` (ids are checked by `tests/learning-paths.test.js`).

Nothing else needs editing: the dashboard, exams, daily review, statistics, progress sync and the data
tests all discover the week through the loader.

## Changing existing content

- Rewording a phrase or fixing a translation is safe.
- **Reordering, inserting or deleting phrases inside an existing lesson is not free:** SRS progress is
  stored per position (`<lessonId>_p<index>`). Append-only edits keep history aligned; if you must
  reorder, tell the user that review history for that lesson will point at different phrases.
- Never rename a lesson id. If it cannot be avoided, add the old → new pair to
  `src/core/id-migrations.js` so local and synced progress is carried over.
- Renumbering weeks means changing array order and titles only — ids stay as they are.
