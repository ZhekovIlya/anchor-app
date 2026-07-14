// ========================
// WORDS: QUESTION WORDS (Interrogativos)
// ========================
export default {
  id: "words_question_words",
  type: "words",
  title: "Question Words",
  icon: "help_outline",
  description: "Master Spanish interrogatives — when, where, how, why and more",
  theory: {
    title: "Spanish Question Words",
    subtitle: "8 interrogatives with nuanced meanings for RU/UK speakers",
    sections: [
      { type: "heading", text: "❓ Why Are These Tricky For RU/UK Speakers?" },
      {
        type: "paragraph",
        text: "Spanish interrogatives look simple but carry important nuances. The most confusing pair for Slavic speakers is QUÉ vs CUÁL: in Russian/Ukrainian both can translate as «что / що» or «какой / який» depending on context. Read this guide carefully — the distinction will save you from embarrassing mistakes."
      },
      { type: "heading", text: "⚡ QUÉ — Что / Що (open definition)" },
      {
        type: "paragraph",
        text: "QUÉ asks for a definition, meaning, or open-ended answer. Use it when the answer is a concept or free description — not a selection from a list. Think: «что это?» / «що це?»"
      },
      {
        type: "table",
        caption: "QUÉ — examples",
        headers: ["Spanish", "Russian", "Ukrainian", "Note"],
        rows: [
          ["¿Qué es esto?", "Что это?", "Що це?", "asking for a definition"],
          ["¿Qué quieres?", "Что ты хочешь?", "Що ти хочеш?", "open-ended desire"],
          ["¿Qué haces?", "Что ты делаешь?", "Що ти робиш?", "action / activity"],
        ]
      },
      { type: "heading", text: "⚡ CUÁL(ES) — Который из вариантов / Який з варіантів" },
      {
        type: "paragraph",
        text: "CUÁL asks 'which one?' when there is a set of options to choose from. It implies selection, not definition. This is the word that trips RU/UK speakers up most — resist the urge to use QUÉ here!"
      },
      {
        type: "table",
        caption: "CUÁL — examples",
        headers: ["Spanish", "Russian", "Ukrainian", "Note"],
        rows: [
          ["¿Cuál prefieres?", "Который предпочитаешь?", "Який вибираєш?", "choice from options"],
          ["¿Cuál es tu número?", "Какой твой номер?", "Який твій номер?", "identity within a set"],
          ["¿Cuáles son tus libros?", "Которые из них твои?", "Які з них твої?", "plural — selecting several"],
        ]
      },
      {
        type: "callout",
        style: "warning",
        text: "❌ NEVER say «¿Qué es tu nombre?» — it sounds like you're asking the DEFINITION of a name. ✅ ALWAYS say «¿Cuál es tu nombre?» because a name is a SELECTION from all possible names."
      },
      { type: "heading", text: "⚡ CÓMO — Каким образом / Яким чином (manner)" },
      {
        type: "paragraph",
        text: "CÓMO asks about the manner, way, or method of something. It is NOT just «как / як» in a vague sense — it specifically asks HOW something is done or the state something is in."
      },
      {
        type: "table",
        caption: "CÓMO — examples",
        headers: ["Spanish", "Russian", "Ukrainian", "Note"],
        rows: [
          ["¿Cómo estás?", "Как ты?", "Як ти?", "state / condition"],
          ["¿Cómo se hace?", "Каким образом это делается?", "Яким чином це робиться?", "method / manner"],
          ["¿Cómo se llama?", "Как его зовут?", "Як його звати?", "name introduction"],
        ]
      },
      { type: "heading", text: "⚡ DÓNDE — Где / Де (location)" },
      {
        type: "paragraph",
        text: "DÓNDE asks about physical or abstract location. Add ADÓNDE (¿Adónde vas?) for direction/destination — toward where."
      },
      {
        type: "table",
        caption: "DÓNDE — examples",
        headers: ["Spanish", "Russian", "Ukrainian"],
        rows: [
          ["¿Dónde vives?", "Где ты живёшь?", "Де ти живеш?"],
          ["¿Dónde está el banco?", "Где находится банк?", "Де знаходиться банк?"],
          ["¿Adónde vas?", "Куда идёшь?", "Куди йдеш?"],
        ]
      },
      { type: "heading", text: "⚡ CUÁNDO — Когда / Коли (time)" },
      {
        type: "paragraph",
        text: "CUÁNDO asks about time — when something happens or happened. Straightforward 1-to-1 with RU «когда» / UK «коли»."
      },
      { type: "heading", text: "⚡ POR QUÉ — Почему / Чому (reason/cause)" },
      {
        type: "paragraph",
        text: "POR QUÉ is 'why' — it asks for a reason or cause. Written as TWO words with accent. Note: the answer uses PORQUE (one word, no accent) = «потому что / тому що»."
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 Memory trick: POR QUÉ (question, two words, accent) vs PORQUE (answer, one word, no accent). Like RU: «Почему?» → «Потому что...»"
      },
      { type: "heading", text: "⚡ QUIÉN(ES) — Кто / Хто (person)" },
      {
        type: "paragraph",
        text: "QUIÉN asks about a person or persons. QUIÉNES is the plural form — use it when expecting multiple people as the answer. Direct 1-to-1 with RU «кто» / UK «хто»."
      },
      { type: "heading", text: "⚡ CUÁNTO/A(S) — Сколько / Скільки (quantity)" },
      {
        type: "paragraph",
        text: "CUÁNTO agrees in gender and number with the noun: cuánto (masc sg), cuánta (fem sg), cuántos (masc pl), cuántas (fem pl). As an adverb it stays CUÁNTO — «сколько стоит / скільки коштує»."
      },
      {
        type: "table",
        caption: "CUÁNTO — gender/number agreement",
        headers: ["Form", "Gender/Number", "Example", "Russian", "Ukrainian"],
        rows: [
          ["cuánto", "masc sg / adverb", "¿Cuánto cuesta?", "Сколько стоит?", "Скільки коштує?"],
          ["cuánta", "fem sg", "¿Cuánta agua?", "Сколько воды?", "Скільки води?"],
          ["cuántos", "masc pl", "¿Cuántos días?", "Сколько дней?", "Скільки днів?"],
          ["cuántas", "fem pl", "¿Cuántas personas?", "Сколько людей?", "Скільки людей?"],
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "🎯 Quick cheat sheet: qué = что, quién = кто, dónde = где, cuándo = когда, cómo = как, por qué = почему, cuál = который (из вариантов), cuánto = сколько"
      },
    ]
  },
  lessons: [
    {
      id: "wqw_l1",
      title: "Core 8 + Cuánto Forms",
      words: [
        // ── The 8 core interrogatives ───────────────────────────────────────
        {
          ru: "Что? (открытый вопрос — не из списка)",
          uk: "Що? (відкрите питання — не з переліку)",
          es: "qué"
        },
        {
          ru: "Как? / Каким образом?",
          uk: "Як? / Яким чином?",
          es: "cómo"
        },
        {
          ru: "Где? (место / местонахождение)",
          uk: "Де? (місце / місцезнаходження)",
          es: "dónde"
        },
        {
          ru: "Когда? (момент времени)",
          uk: "Коли? (момент часу)",
          es: "cuándo"
        },
        {
          ru: "Почему? (причина; ответ: porque)",
          uk: "Чому? (причина; відповідь: porque)",
          es: "por qué"
        },
        {
          ru: "Который? (выбор из вариантов)",
          uk: "Який? (вибір з варіантів)",
          es: "cuál"
        },
        {
          ru: "Кто? (о человеке / людях)",
          uk: "Хто? (про людину / людей)",
          es: "quién"
        },
        // ── cuánto forms — gender/number variants ──────────────────────────
        {
          ru: "Сколько? (м.р. ед.ч. / наречие)",
          uk: "Скільки? (ч.р. одн. / прислівник)",
          es: "cuánto"
        },
        {
          ru: "Сколько? (ж.р. ед.ч.) — ¿Cuánta agua?",
          uk: "Скільки? (ж.р. одн.) — ¿Cuánta agua?",
          es: "cuánta"
        },
        {
          ru: "Сколько? (м.р. мн.ч.) — ¿Cuántos días?",
          uk: "Скільки? (ч.р. мн.) — ¿Cuántos días?",
          es: "cuántos"
        },
        {
          ru: "Сколько? (ж.р. мн.ч.) — ¿Cuántas personas?",
          uk: "Скільки? (ж.р. мн.) — ¿Cuántas personas?",
          es: "cuántas"
        },
        // ── Plural form ────────────────────────────────────────────────────
        {
          ru: "Которые? / Кто из них? (мн.ч. выбор)",
          uk: "Які? / Хто з них? (мн. вибір)",
          es: "cuáles"
        },
      ]
    },
    { id: "wqw_exam", title: "🏆 Question Words Exam", exam: true },
  ],
};
