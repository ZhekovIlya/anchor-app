// ========================
// THEORY: REFLEXIVE & SPECIAL VERBS — PART 3
// ========================
// Standalone theory article for the Theory tab.
// Covers reflexive verbs (verbos reflexivos) and gustar-type verbs.
// Target audience: Russian/Ukrainian speakers learning Spanish.

export default {
  id: "theory_reflexive_special",
  type: "theory",
  title: "Возвратные и особые глаголы",
  icon: "autorenew",
  description: "Verbos reflexivos (ducharse, levantarse) и verbos especiales (gustar, doler, encantar) — как они работают и почему они такие особенные.",
  sections: [
    {
      type: "heading",
      text: "🔄 Что такое возвратные глаголы (Verbos Reflexivos)?"
    },
    {
      type: "paragraph",
      text: "Возвратные глаголы — это глаголы, действие которых направлено на самого себя. В испанском языке они оканчиваются на -SE в инфинитиве: ducharse (мыться в душе), levantarse (вставать), peinarse (причёсываться)."
    },
    {
      type: "callout",
      style: "tip",
      text: "Простое правило: если в русском ты добавляешь «-ся» к глаголу (одеваться, умываться, просыпаться) — скорее всего, испанский аналог тоже возвратный!"
    },
    {
      type: "table",
      caption: "Самые частые возвратные глаголы",
      headers: ["Инфинитив", "Значение", "Пример"],
      rows: [
        ["ducharse", "принимать душ", "Me ducho por la mañana. — Я принимаю душ утром."],
        ["levantarse", "вставать / подниматься", "Me levanto a las siete. — Я встаю в семь."],
        ["acostarse", "ложиться спать", "Me acuesto tarde. — Я ложусь спать поздно."],
        ["llamarse", "называться / зваться", "Me llamo Ana. — Меня зовут Ана."],
        ["peinarse", "причёсываться", "Se peina rápido. — Он/она быстро причёсывается."],
        ["vestirse", "одеваться", "¿Ya te has vestido? — Ты уже оделся?"],
        ["lavarse", "мыться", "Lávate las manos. — Помой руки."],
        ["sentirse", "чувствовать себя", "Me siento bien hoy. — Я хорошо себя чувствую сегодня."],
        ["quedarse", "оставаться", "Me quedo en casa. — Я остаюсь дома."],
        ["ponerse", "надевать / становиться", "Me pongo el abrigo. — Я надеваю пальто."],
      ]
    },
    {
      type: "heading",
      text: "⚙️ Как спрягать возвратные глаголы"
    },
    {
      type: "paragraph",
      text: "При спряжении возвратного глагола частица -SE превращается в возвратное местоимение (me/te/se/nos/os/se) и ВЫНОСИТСЯ ПЕРЕД глаголом. Сам глагол спрягается как обычно."
    },
    {
      type: "table",
      caption: "Возвратные местоимения",
      headers: ["Лицо", "Возвратное местоимение"],
      rows: [
        ["Yo", "me"],
        ["Tú", "te"],
        ["Él/Ella/Usted", "se"],
        ["Nosotros", "nos"],
        ["Vosotros", "os"],
        ["Ellos/Ustedes", "se"],
      ]
    },
    {
      type: "table",
      caption: "Пример: DUCHARSE (принимать душ) — полное спряжение",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "me ducho", "Me ducho cada mañana. — Я принимаю душ каждое утро."],
        ["Tú", "te duchas", "¿Te duchas por la noche? — Ты принимаешь душ вечером?"],
        ["Él/Ella/Usted", "se ducha", "Se ducha rápido. — Он/она быстро моется."],
        ["Nosotros", "nos duchamos", "Nos duchamos después del gym. — Мы моемся после зала."],
        ["Vosotros", "os ducháis", "¿Os ducháis juntos? — Вы моетесь вместе?"],
        ["Ellos/Ustedes", "se duchan", "Se duchan antes de cenar. — Они моются перед ужином."],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "Порядок слов: местоимение + глагол (me ducho, te levantas). Но с инфинитивом возможны два варианта: 'Quiero levantarme' ИЛИ 'Me quiero levantar' — оба правильны!"
    },
    {
      type: "table",
      caption: "Пример: LEVANTARSE (вставать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "me levanto", "Me levanto a las siete. — Я встаю в семь."],
        ["Tú", "te levantas", "¿A qué hora te levantas? — В котором часу ты встаёшь?"],
        ["Él/Ella/Usted", "se levanta", "Se levanta muy temprano. — Он встаёт очень рано."],
        ["Nosotros", "nos levantamos", "Nos levantamos tarde los domingos. — Мы встаём поздно по воскресеньям."],
        ["Vosotros", "os levantáis", "¿Os levantáis a la misma hora? — Вы встаёте в одно время?"],
        ["Ellos/Ustedes", "se levantan", "Se levantan cuando quieren. — Они встают когда хотят."],
      ]
    },
    {
      type: "table",
      caption: "Пример: RELAJARSE (расслабляться / отдыхать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "me relajo", "Por la noche me relajo en el sofá. — Вечером я расслабляюсь на диване."],
        ["Tú", "te relajas", "¿Cómo te relajas después del trabajo? — Как ты расслабляешься после работы?"],
        ["Él / Ella / Usted", "se relaja", "Ella se relaja leyendo un libro. — Она отдыхает за чтением книги."],
        ["Nosotros / Nosotras", "nos relajamos", "Nos relajamos los fines de semana. — Мы расслабляемся на выходных."],
        ["Vosotros / Vosotras", "os relajáis", "¿Vosotros os relajáis en la playa? — Вы отдыхаете на пляже?"],
        ["Ellos / Ellas / Ustedes", "se relajan", "Ellos se relajan escuchando música. — Они расслабляются под музыку."]
      ]
    },
    {
      type: "heading",
      text: "⚡ Разница: Обычный глагол vs. Возвратный глагол"
    },
    {
      type: "paragraph",
      text: "Один и тот же глагол может быть возвратным (действие на себя) или обычным (действие на другой предмет или человека):"
    },
    {
      type: "table",
      caption: "Сравнение: Обычный vs. Возвратный",
      headers: ["Обычный глагол (на объект)", "Возвратный глагол (на себя)", "Разница в значении"],
      rows: [
        ["Lavo el coche (Я мою машину)", "Me lavo la cara (Я умываю лицо)", "Мыть что-то vs. умываться самому"],
        ["Despierto a mi hijo (Я бужу сына)", "Me despierto a las siete (Я просыпаюсь в 7)", "Будить кого-то vs. просыпаться самому"],
        ["Llamo a María (Я звоню Марии)", "Me llamo Juan (Меня зовут Хуан)", "Звонить/звать кого-то vs. зваться самому"],
        ["Duermo ocho horas (Я сплю 8 часов)", "Me duermo rápido (Я засыпаю быстро)", "Спать (процесс) vs. засыпать (действие)"]
      ]
    },
    {
      type: "image",
      src: "/theory/miro_ducharse_reflexive_table.png",
      alt: "Схема спряжения возвратных глаголов (Miro Board)"
    },
    {
      type: "heading",
      text: "⭐ Особые глаголы: GUSTAR, DOLER, ENCANTAR"
    },
    {
      type: "paragraph",
      text: "Эти глаголы работают через местоимения КОСВЕННОГО дополнения (дательный падеж: кому? мне, тебе, ему...). В испанском: «Мне нравится музыка»."
    },
    {
      type: "heading",
      text: "⚠️ ГЛАВНАЯ ЛОВУШКА: Reflexivos (SE) vs. Gustar (LE) — почему НЕТ 'se gusta'!"
    },
    {
      type: "paragraph",
      text: "Никогда не путай возвратные глаголы (me/te/se) и глагол gustar (me/te/le)! В 3-м лице у них РАЗНЫЕ местоимения:"
    },
    {
      type: "table",
      caption: "Сравнение местоимений: Возвратные vs. Gustar",
      headers: ["Лицо", "Возвратные (Relajarse / Ducharse)", "Тип Gustar (Gustar / Encantar)", "Важное правило"],
      rows: [
        ["Yo", "me relajo (я расслабляюсь)", "me gusta (мне нравится)", "Совпадают (me)"],
        ["Tú", "te relajas (ты расслабляешься)", "te gusta (тебе нравится)", "Совпадают (te)"],
        ["Él / Ella / Usted", "se relaja (он расслабляется)", "le gusta ⚠️ (ему/ей нравится)", "❌ НЕТ *se gusta → ✅ ТОЛЬКО le gusta"],
        ["Nosotros", "nos relajamos (мы расслабляемся)", "nos gusta (нам нравится)", "Совпадают (nos)"],
        ["Vosotros", "os relajáis (вы расслабляетесь)", "os gusta (вам нравится)", "Совпадают (os)"],
        ["Ellos / Ustedes", "se relajan (они расслабляются)", "les gusta ⚠️ (им нравится)", "❌ НЕТ *se gustan → ✅ ТОЛЬКО les gusta"]
      ]
    },
    {
      type: "callout",
      style: "warning",
      text: "🚨 Золотое правило:\n• С 'se': действие направлено на себя (Él se relaja, Ella se ducha).\n• С 'le / les': предмет нравится человеку (A él le gusta el café, A ellos les gusta viajar).\nКонструкции '*se gusta' или '*se gustan' в испанском НЕ СУЩЕСТВУЕТ!"
    },
    {
      type: "table",
      caption: "Структура глагола GUSTAR",
      headers: ["Кому нравится", "Косвенное дополнение", "Глагол", "Что нравится"],
      rows: [
        ["Мне", "Me", "gusta / gustan", "el libro / los libros"],
        ["Тебе", "Te", "gusta / gustan", "la música / las películas"],
        ["Ему/Ей/Вам", "Le", "gusta / gustan", "viajar / los viajes"],
        ["Нам", "Nos", "gusta / gustan", "el español / los idiomas"],
        ["Вам (мн.)", "Os", "gusta / gustan", "la pizza / las tapas"],
        ["Им", "Les", "gusta / gustan", "el fútbol / los deportes"],
      ]
    },
    {
      type: "image",
      src: "/theory/miro_acciones_habituales_grid.png",
      alt: "Сетка действий и распорядка дня (Miro Board)"
    },
    {
      type: "table",
      caption: "GUSTAR — примеры с разными объектами",
      headers: ["Испанский", "Русский", "Почему?"],
      rows: [
        ["Me gusta el café.", "Мне нравится кофе.", "el café = единственное → gusta"],
        ["Me gustan los gatos.", "Мне нравятся кошки.", "los gatos = множественное → gustan"],
        ["Me gusta leer.", "Мне нравится читать.", "leer = инфинитив → gusta"],
        ["A ella le gusta viajar.", "Ей нравится путешествовать.", "a ella = уточнение, le = ей"],
        ["¿Te gusta el chocolate?", "Тебе нравится шоколад?", "te = тебе"],
        ["No nos gusta el frío.", "Нам не нравится холод.", "nos = нам"],
      ]
    },
    {
      type: "heading",
      text: "😍 ENCANTAR — обожать / очень нравиться"
    },
    {
      type: "paragraph",
      text: "ENCANTAR работает точно так же, как GUSTAR, но означает «очень нравится / обожать». Используется в тех же конструкциях."
    },
    {
      type: "table",
      caption: "ENCANTAR — примеры",
      headers: ["Испанский", "Русский"],
      rows: [
        ["Me encanta la música española.", "Я обожаю испанскую музыку."],
        ["Le encanta bailar.", "Он/она обожает танцевать."],
        ["Nos encantan las playas de Barcelona.", "Мы обожаем пляжи Барселоны."],
        ["¿Te encanta el verano?", "Ты обожаешь лето?"],
      ]
    },
    {
      type: "heading",
      text: "🤕 DOLER — болеть"
    },
    {
      type: "paragraph",
      text: "DOLER работает так же: спрягается по ТОМУ, ЧТО болит. Если болит одна часть тела — duele. Если несколько — duelen."
    },
    {
      type: "table",
      caption: "DOLER — примеры",
      headers: ["Испанский", "Русский", "Почему?"],
      rows: [
        ["Me duele la cabeza.", "У меня болит голова.", "la cabeza = единственное → duele"],
        ["Me duelen los pies.", "У меня болят ноги.", "los pies = множественное → duelen"],
        ["¿Te duele el estómago?", "У тебя болит живот?", "te = тебе"],
        ["A Ana le duele la espalda.", "У Аны болит спина.", "a Ana le = Ане"],
        ["Nos duelen los oídos.", "У нас болят уши.", "nos = нам, los oídos = мн. число"],
      ]
    },
    {
      type: "heading",
      text: "📊 Сравнительная шпаргалка особых глаголов"
    },
    {
      type: "table",
      caption: "Gustar / Encantar / Doler — одна система",
      headers: ["Глагол", "Значение", "Единственное число", "Множественное число"],
      rows: [
        ["gustar", "нравиться", "me gusta", "me gustan"],
        ["encantar", "очень нравиться / обожать", "me encanta", "me encantan"],
        ["doler", "болеть", "me duele", "me duelen"],
        ["molestar", "беспокоить / раздражать", "me molesta", "me molestan"],
        ["interesar", "интересовать", "me interesa", "me interesan"],
        ["parecer", "казаться", "me parece", "me parecen"],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "Секрет этих глаголов: просто запомни ME/TE/LE/NOS/OS/LES + gusta/gustan, encanta/encantan, duele/duelen. Это всё, что нужно! Остальные формы (yo, tú...) в этих глаголах почти никогда не используются."
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/hfWcAgihqVw",
      title: "Reflexive Verbs and Gustar in Spanish"
    }
  ]
};
