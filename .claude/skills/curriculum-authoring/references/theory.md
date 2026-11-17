# Theory — format and registration

Theory is read-only reference: short, scannable, built from native tables and callouts. It appears in
the Theory tab (the "ledger") and as a card at the top of the week or word topic it belongs to.

## Where it lives

- **Embedded:** a `theory` object inside a sentence week or a word topic — `{ title, subtitle, sections }`.
  `subtitle` is required; the card prints it.
- **Standalone:** `data/theory/<name>.js` — `export default { id, type: "theory", title, icon, description, sections }`.

## Sections

`sections` is an array of typed objects. An unknown `type` renders nothing and raises no error, so
copy these shapes exactly:

```js
{ type: "heading",   text: "1. Vocabulario esencial" }
{ type: "paragraph", text: "Plain text. No HTML, no markdown." }
{ type: "callout",   style: "tip", text: "…" }          // style: "tip" | "important" | "warning"
{ type: "table",     caption: "Optional caption",
                     headers: ["Español", "Traducción", "Ejemplo"],
                     rows: [ ["la cuenta", "рахунок", "Pedimos la cuenta."], /* … */ ] }
{ type: "image",     src: "/theory/miro_gustos_chart.png", alt: "What the image shows" }
{ type: "video",     src: "https://…", title: "…" }
```

Table cells (only cells) understand a little markup: `**bold**`, `` `pill` ``, and the prefixes
`✅`, `❌`, `⚠️` turn the text that follows into a coloured badge; `→` is highlighted. The first column
is styled as the row label.

## Writing guidance

- One idea per section; a table instead of a paragraph whenever the content is a paradigm or a contrast.
- Six-person conjugation tables use the order yo / tú / él·ella·usted / nosotros / vosotros / ellos.
- Explanations in the language the surrounding article already uses (several are in Russian, newer
  week theory is in simple Spanish); examples always in Spanish, ideally phrases from the week itself.
- Images are for diagrams that a table cannot express. Crop to the single diagram — never a full
  course-board page with exercises — keep each file small (well under 300 KB), put it in
  `public/theory/`, and reference it as `/theory/<file>`. Source material is in `reference/`.

## Register it

`src/core/theory-registry.js`: add the `import` and one `THEORY_DEFINITIONS` entry.

```js
{
  id: 'theory_por_para',            // standalone: same as the file's `id`; embedded: '<sourceId>_theory'
  source: 'standalone',             // 'standalone' | 'sentences' | 'words'
  sourceId: 'theory_por_para',      // standalone: its id; embedded: the week's or word topic's `id`
  sourceLabel: 'Guía Gramatical',   // small label in the list
  category: 'verbos',               // one of THEORY_CATEGORIES in the same file
  icon: 'compare_arrows',
  tags: ['preposiciones', 'por-para'],   // at least one; POPULAR_TAGS lists the filter chips
  getData: () => theoryPorPara
},
```

Standalone files are also imported in `src/core/data-loader.js` for consistency with the other
pillars — follow the existing imports there. Then update the expected topic count in
`tests/theory-registry.test.js`. `tests/validate-data.test.js` checks every section's shape.
