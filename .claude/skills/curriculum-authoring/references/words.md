# Word topics — format and registration

## File shape

`data/words/ropa.js`:

```js
export default {
  id: "words_ropa",                 // keep it short: the Telegram bot puts it in a 64-byte button payload
  type: "words",
  title: "La Ropa",
  icon: "checkroom",                // Material Symbols name
  description: "Clothes and shopping for them",   // shown as the small label on the topic card
  theory: { title: "…", subtitle: "…", sections: [ /* see theory.md */ ] },   // optional but expected
  lessons: [
    {
      id: "wropa_l1",               // unique in the whole app, permanent
      title: "Prendas básicas",
      words: [                      // exactly 12
        { ru: "рубашка", uk: "сорочка", es: "la camisa" },
        // …eleven more
      ],
    },
    // …more lessons
    { id: "wropa_exam", title: "🏆 Ropa Exam", exam: true },
  ],
};
```

## Rules the code depends on

- **12 words per lesson** (48 correct answers = 4 passes).
- **`ru`, `uk`, `es` on every word.** Give nouns with their article (`la camisa`, `el abrigo`) — gender
  is part of what is being learned, and the learner types exactly what `es` contains.
- **One sense per card.** If the Russian or Ukrainian word is ambiguous, disambiguate in brackets:
  `"меню (карта блюд)"`. The learner must be able to produce the Spanish from the prompt alone.
- **No duplicates across topics unless intended.** `npm run audit:data` lists words taught in more than
  one lesson; a repeat should be a decision, not an accident.
- **Exam lesson has no `words`.** It draws from every lesson of the topic.
- Words are not colour-coded, so `data/vocabulary.js` is not involved — unless the same words also
  appear in sentence phrases.

## Register the topic (two places)

1. `src/core/data-loader.js` — add the `import` and add the topic to the `hydrateWordTopics([...])`
   array. Array order is the order of the cards on the Words tab.
2. If the topic has `theory`: `src/core/theory-registry.js` — add the `import` and one entry in
   `THEORY_DEFINITIONS` with `source: 'words'`, `sourceId: '<topic id>'`,
   `id: '<topic id>_theory'`, a `category`, `icon`, `tags`, and `getData: () => wordsRopa.theory`.
   Update the expected count in `tests/theory-registry.test.js`.

The Telegram bot's reels pick the new topic up automatically on the next deploy (it reads the same
loader), and its words join the daily "due" queue as the learner meets them.

## Changing existing content

Same caution as for sentences: SRS history is stored per position (`<lessonId>_w<index>`), in the
browser and on the sync server. Fixing a spelling or a translation in place is safe; reordering or
replacing a word re-labels its history.
