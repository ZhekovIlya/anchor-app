# Language quality checklist

Run this over every new or changed phrase. It is the same list the `content-reviewer` subagent uses.

## Spanish

- **Natural first.** Would a person in Barcelona say this, in this situation? Drop textbook oddities.
- **Grammar scope:** present indicative and pretérito indefinido only. No subjunctive (`cuando llegue`,
  `quiero que…`), no imperfect, perfect, future or conditional — except fixed polite formulas already
  taught as chunks (`me gustaría`, `¿podría…?`). If a sentence needs another tense, rewrite the sentence.
- **Castilian Spanish** (Spain): `vosotros` exists, `coger`, `ordenador`, `móvil`, `vale`.
- **Ser / estar:** `ser` for inherent qualities, identity, price (`El alquiler es caro`); `estar` for
  states and location (`La habitación está sucia`).
- **No verb beside its own adjective form:** `limpio/limpia`, `seco/seca` and similar pairs must not
  both appear in one phrase.
- **Agreement and articles:** gender and number of every adjective and article; `el agua fría`;
  contractions `al`, `del`.
- **Accents and punctuation:** `qué/que`, `sí/si`, `él/el`, `tú/tu`, `cómo/como`, `está/esta`; paired
  `¿ ?` and `¡ !`.
- **One teaching point per tab.** Each phrase in the tab visibly uses it.
- **Length:** the learner types it. Prefer 3–9 words; split anything longer.
- **Variety inside a lesson:** six phrases should not share the same frame with one noun swapped —
  unless the tab's point is exactly that frame.

## Russian and Ukrainian

- **Translate the Spanish that is there**, not a neighbouring idea. Check each preposition and each
  tense individually (`del parque` = «из парка / парка», not «после парка»).
- **The prompt must determine the answer.** If the Russian could map to two Spanish sentences the
  learner knows (tú vs. usted, él vs. ella, ser vs. estar, present vs. past), add the cue that picks
  one: a pronoun, «Вы», a time word.
- **Formal "you":** plain «Вы / Вам / У Вас» — no «(вежливо)» annotations.
- **Ukrainian is written as Ukrainian,** not transliterated Russian: «чи», «є», «потяг», «рахунок»,
  «будь ласка», correct apostrophes (`ім'я`), no Russian-only letters (ы, э, ъ).
- **Same register and person in all three languages.**
- **Gender of the speaker** stays consistent inside a lesson where the Russian verb shows it
  («я пошёл» / «я пошла»), and matches the Spanish adjective if there is one.

## Vocabulary map (`data/vocabulary.js`)

- Every word of every phrase is a key (lowercase, accents kept). `node scripts/audit-data.js --unknown`
  prints the missing ones with an example sentence.
- Conjugated forms → `verb`; infinitives → `verb_infinitive`; unstressed pronouns (`me te se lo le nos
  les`) → `subject`; possessives → `article`; nouns → `object`; then `adjective`, `adverb`,
  `preposition`, `conjunction`, `question`, `negation`.
- A form with two roles gets the role it has in this corpus; look at every sentence that uses it.
