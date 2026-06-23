// ========================
// THEORY: DEMONSTRATIVE PRONOUNS
// ========================
// Standalone theory article for the Theory tab.
// Covers: este/esta, ese/esa, aquel/aquella — with gender/number forms.
// Target audience: Russian/Ukrainian speakers learning Spanish.

export default {
  id: "theory_demonstratives",
  type: "theory",
  title: "Pronombres Demostrativos",
  icon: "near_me",
  description: "Este, ese, aquel — как сказать «этот», «тот», «вон тот» на испанском. Полная таблица и правила применения.",
  sections: [
    {
      type: "heading",
      text: "📍 Что такое демонстративные местоимения?"
    },
    {
      type: "paragraph",
      text: "Демонстративные местоимения — это «этот», «тот», «вон тот» по-испански. Они указывают на предмет в зависимости от расстояния: близко к говорящему, близко к собеседнику или далеко от обоих."
    },
    {
      type: "callout",
      style: "tip",
      text: "Запомни три уровня расстояния: ESTE (близко ко мне) → ESE (близко к тебе) → AQUEL (далеко от нас обоих)."
    },
    {
      type: "heading",
      text: "📋 Полная таблица форм"
    },
    {
      type: "table",
      caption: "Демонстративные местоимения — все формы",
      headers: ["", "Ед.ч. м.р.", "Ед.ч. ж.р.", "Мн.ч. м.р.", "Мн.ч. ж.р."],
      rows: [
        ["ESTE (этот/эта) — близко ко мне", "este", "esta", "estos", "estas"],
        ["ESE (тот/та) — близко к тебе", "ese", "esa", "esos", "esas"],
        ["AQUEL (вон тот) — далеко от всех", "aquel", "aquella", "aquellos", "aquellas"],
      ]
    },
    {
      type: "heading",
      text: "🟢 ESTE / ESTA / ESTOS / ESTAS — «этот», «эта», «эти»"
    },
    {
      type: "paragraph",
      text: "Используется, когда предмет находится БЛИЗКО К ГОВОРЯЩЕМУ (к тому, кто говорит «я»). Если предмет рядом с тобой — говори ESTE/ESTA."
    },
    {
      type: "table",
      caption: "ESTE — примеры",
      headers: ["Испанский", "Русский", "Примечание"],
      rows: [
        ["¿Qué es esto?", "Что это?", "esto = нейтральная форма (неизвестный предмет)"],
        ["Este libro es mío.", "Эта книга моя.", "este — книга рядом со мной (libro = м.р.)"],
        ["Esta casa es grande.", "Этот дом большой.", "esta — дом рядом со мной (casa = ж.р.)"],
        ["Estos zapatos son cómodos.", "Эти туфли удобные.", "estos — множ. число м.р."],
        ["Estas llaves son tuyas.", "Эти ключи твои.", "estas — множ. число ж.р."],
      ]
    },
    {
      type: "heading",
      text: "🟡 ESE / ESA / ESOS / ESAS — «тот», «та», «те»"
    },
    {
      type: "paragraph",
      text: "Используется, когда предмет находится БЛИЗКО К СОБЕСЕДНИКУ (к тому, с кем ты говоришь), но ДАЛЕКО ОТ ТЕБЯ. Или просто: не совсем рядом с тобой."
    },
    {
      type: "table",
      caption: "ESE — примеры",
      headers: ["Испанский", "Русский"],
      rows: [
        ["¿Puedes pasarme ese libro?", "Можешь передать мне ту книгу?"],
        ["Esa chica es mi amiga.", "Та девушка — моя подруга."],
        ["Esos zapatos son caros.", "Те туфли дорогие."],
        ["Esas ideas son buenas.", "Те идеи хорошие."],
      ]
    },
    {
      type: "heading",
      text: "🔴 AQUEL / AQUELLA / AQUELLOS / AQUELLAS — «вон тот», «вон та»"
    },
    {
      type: "paragraph",
      text: "Используется, когда предмет находится ДАЛЕКО ОТ ОБОИХ собеседников. В разговорной речи AQUEL встречается реже — часто заменяют на ESE, но AQUEL звучит точнее и образованнее."
    },
    {
      type: "table",
      caption: "AQUEL — примеры",
      headers: ["Испанский", "Русский"],
      rows: [
        ["Aquel edificio es muy antiguo.", "Вон то здание очень старое."],
        ["Aquella montaña se llama Montserrat.", "Вон та гора называется Монтсеррат."],
        ["Aquellos tiempos eran difíciles.", "Те времена были трудными."],
        ["Aquellas fotos son preciosas.", "Те фотографии прекрасны."],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "AQUEL также используется для событий В ПРОШЛОМ, которые кажутся далёкими: 'aquella noche' (та ночь — о давно прошедшем), 'en aquellos tiempos' (в те времена)."
    },
    {
      type: "heading",
      text: "⚡ ESTO / ESO / AQUELLO — нейтральные формы"
    },
    {
      type: "paragraph",
      text: "Когда ты не знаешь рода предмета (или говоришь о ситуации, идее, событии), используй НЕЙТРАЛЬНЫЕ формы: esto, eso, aquello. У них нет формы множественного числа."
    },
    {
      type: "table",
      caption: "Нейтральные формы",
      headers: ["Форма", "Когда использовать", "Пример"],
      rows: [
        ["esto", "Неизвестный предмет рядом / эта ситуация", "¿Qué es esto? — Что это?"],
        ["eso", "Неизвестный предмет чуть дальше / то, о чём только что говорили", "Eso es verdad. — Это правда. / Eso no me gusta. — Это мне не нравится."],
        ["aquello", "Что-то далёкое / давнее", "Aquello fue horrible. — То было ужасно."],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "¿Qué es esto? / ¿Qué es eso? — самые частые вопросы в реальной жизни. Используй их постоянно, когда не знаешь слова!"
    },
    {
      type: "heading",
      text: "🗣️ Разговорные фразы с демонстративными"
    },
    {
      type: "table",
      caption: "Полезные разговорные выражения",
      headers: ["Испанский", "Русский", "Контекст"],
      rows: [
        ["Eso es.", "Именно так. / Вот именно.", "Согласие, подтверждение"],
        ["Eso es todo.", "Это всё. / Вот и всё.", "Завершение разговора или перечисления"],
        ["Eso sí.", "Это да. / Вот это точно.", "Частичное согласие с уточнением"],
        ["¿Eso que significa?", "А что это значит?", "Просьба объяснить"],
        ["Esto no me cuadra.", "Это меня не вяжется. / Что-то тут не так.", "Сомнение"],
        ["A esto me refiero.", "Вот о чём я говорю.", "Уточнение своей мысли"],
        ["Este/Esta... (имя)", "Этот/эта... (имя)", "В разговоре указать на кого-то рядом"],
      ]
    },
    {
      type: "heading",
      text: "🧠 Как легко запомнить"
    },
    {
      type: "callout",
      style: "important",
      text: "Мнемоника расстояния: ESTE = «Е» близко (ЕСТь рядом) → ESE = середина → AQUEL = «А» вон там (Аж вон где). Три уровня: здесь → там → вон там."
    },
    {
      type: "table",
      caption: "Краткая шпаргалка",
      headers: ["Местоимение", "Расстояние", "Аналог в русском"],
      rows: [
        ["este / esta / estos / estas", "Близко ко мне 📍", "этот / эта / эти"],
        ["ese / esa / esos / esas", "Близко к тебе / не рядом со мной 📍📍", "тот / та / те"],
        ["aquel / aquella / aquellos / aquellas", "Далеко от нас обоих 📍📍📍", "вон тот / вон та / вон те"],
        ["esto / eso / aquello", "Нейтральное (без рода)", "это / то / вон то"],
      ]
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/BFmmvdANZl0",
      title: "Demonstrative Pronouns in Spanish"
    }
  ]
};
