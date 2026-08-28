// ========================
// WEEK 9 — "Verbos con cambio de vocal"
// ========================
// Level: Intermediate.
// Focus: Stem-changing verbs (e>ie) and new conversational phrases (algunas palabras, algo, por ejemplo, me da igual).
// ========================

const week9Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: CAMBIO E>IE
  // ═══════════════════════════════════════════════════════
  {
    id: "w9_l1",
    tab: "cambio_e_ie",
    title: "Pensar y Querer",
    phrases: [
      { ru: "Я думаю о некоторых словах.", uk: "Я думаю про деякі слова.", es: "Pienso en algunas palabras." },
      { ru: "Ты хочешь сказать что-то?", uk: "Ти хочеш сказати щось?", es: "¿Quieres decir algo?" },
      { ru: "Мне все равно, я ничего не понимаю.", uk: "Мені все одно, я нічого не розумію.", es: "Me da igual, no entiendo nada." },
      { ru: "Например, мы думаем, что это очень рано.", uk: "Наприклад, ми думаємо, що це дуже рано.", es: "Por ejemplo, pensamos que es muy temprano." },
      { ru: "Мы хотим выйти в восемь вечера.", uk: "Ми хочемо вийти о восьмій вечора.", es: "Queremos salir a las ocho de la tarde." },
      { ru: "Они не понимают некоторые вещи.", uk: "Вони не розуміють деякі речі.", es: "Ellos no entienden algunas cosas." }
    ],
  },
  {
    id: "w9_l2",
    tab: "cambio_e_ie",
    title: "Cerrar y Empezar",
    phrases: [
      { ru: "Я закрываю дверь ключами.", uk: "Я закриваю двері ключами.", es: "Cierro la puerta con las llaves." },
      { ru: "Ты начинаешь работать в девять.", uk: "Ти починаєш працювати о дев'ятій.", es: "Empiezas a trabajar a las nueve." },
      { ru: "Например, фильм начинается скоро.", uk: "Наприклад, фільм починається скоро.", es: "Por ejemplo, la película comienza pronto." },
      { ru: "Мы закрываем окна из-за холода.", uk: "Ми закриваємо вікна через холод.", es: "Cerramos las ventanas por el frío." },
      { ru: "Во сколько мы начинаем идти?", uk: "О котрій ми починаємо йти?", es: "¿A qué hora empezamos a caminar?" },
      { ru: "Они начинают есть сейчас.", uk: "Вони починають їсти зараз.", es: "Ellas comienzan a comer ahora." }
    ],
  },
  {
    id: "w9_l3",
    tab: "cambio_e_ie",
    title: "Perder y Preferir",
    phrases: [
      { ru: "Я теряю ключи каждую пятницу.", uk: "Я гублю ключі кожної п'ятниці.", es: "Pierdo las llaves cada viernes." },
      { ru: "Ты предпочитаешь пить чай или кофе?", uk: "Ти віддаєш перевагу пити чай чи каву?", es: "¿Prefieres tomar té o café?" },
      { ru: "Ему все равно, он чувствует сильный холод.", uk: "Йому все одно, він відчуває сильний холод.", es: "Le da igual, siente mucho frío." },
      { ru: "Мы не теряем время.", uk: "Ми не втрачаємо час.", es: "Nosotros no perdemos el tiempo." },
      { ru: "Мы предпочитаем гулять по парку.", uk: "Ми віддаємо перевагу гуляти парком.", es: "Preferimos pasear por el parque." },
      { ru: "Они чувствуют, что это слишком поздно.", uk: "Вони відчувають, що це надто пізно.", es: "Ellos sienten que es demasiado tarde." }
    ],
  },
  {
    id: "w9_l4",
    tab: "cambio_e_ie",
    title: "Mentir y Recomendar",
    phrases: [
      { ru: "Я никогда не лгу своим друзьям.", uk: "Я ніколи не брешу своїм друзям.", es: "Yo nunca miento a mis amigos." },
      { ru: "Ты рекомендуешь мне эту книгу?", uk: "Ти рекомендуєш мені цю книгу?", es: "¿Me recomiendas este libro?" },
      { ru: "Он просыпается ровно в семь.", uk: "Він прокидається рівно о сьомій.", es: "Él se despierta a las siete en punto." },
      { ru: "Мы почти никогда не лжем.", uk: "Ми майже ніколи не брешемо.", es: "Nosotros no mentimos casi nunca." },
      { ru: "Мы рекомендуем убрать кухню.", uk: "Ми рекомендуємо прибрати кухню.", es: "Recomendamos limpiar la cocina." },
      { ru: "Они просыпаются очень уставшими.", uk: "Вони прокидаються дуже втомленими.", es: "Ellos se despiertan muy cansados." }
    ],
  },
  { id: "w9_m1", tab: "cambio_e_ie", exam: true, mini: true, title: "Mini-examen: Cambio vocal" },

  { id: "w9_exam", tab: "cambio_e_ie", exam: true, title: "Examen de la Semana 9" },
];

export default {
  id: "week9",
  type: "sentences",
  title: "Week 9: Verbos con Cambio de Vocal",
  description: "Stem-changing verbs and conversational phrases.",
  legacy: false,
  theory: {
    title: "Grammar Expansion",
    subtitle: "Verbos con cambio vocálico e → ie y expresiones útiles",
    sections: [
      {
        type: "paragraph",
        text: "En la Semana 9 dominamos los verbos de cambio vocálico (e → ie) en presente de indicativo. Este cambio ocurre cuando la vocal de la raíz recibe el golpe de voz (acento tónico)."
      },
      {
        type: "heading",
        text: "1. El patrón de la bota (e → ie)"
      },
      {
        type: "paragraph",
        text: "La 'e' de la raíz se transforma en el diptongo 'ie' en las personas Yo, Tú, Él/Ella y Ellos/Ellas. Las formas Nosotros y Vosotros NUNCA cambian su raíz porque el acento recae en la terminación."
      },
      {
        type: "callout",
        style: "important",
        text: "¡Regla fundamental! Nosotros y Vosotros conservan la vocal original: pensamos (no *piensamos*), queremos (no *quieremos*), cerramos (no *cierramos*)."
      },
      {
        type: "heading",
        text: "2. Modelos de conjugación e → ie"
      },
      {
        type: "table",
        caption: "Verbos modelo en -AR, -ER y -IR",
        headers: ["Pronombre", "Pensar (-AR)", "Querer / Entender (-ER)", "Preferir / Sentir (-IR)"],
        rows: [
          ["Yo", "pienso", "quiero / entiendo", "prefiero / siento"],
          ["Tú", "piensas", "quieres / entiendes", "prefieres / sientes"],
          ["Él / Ella / Usted", "piensa", "quiere / entiende", "prefiere / siente"],
          ["Nosotros / Nosotras", "pensamos", "queremos / entendemos", "preferimos / sentimos"],
          ["Vosotros / Vosotras", "pensáis", "queréis / entendéis", "preferís / sentís"],
          ["Ellos / Ellas / Ustedes", "piensan", "quieren / entienden", "prefieren / sienten"]
        ]
      },
      {
        type: "paragraph",
        text: "Otros verbos comunes con cambio e → ie que practicamos esta semana: cerrar (cierro), empezar (empiezo), comenzar (comienzo), perder (pierdo), mentir (miento), recomendar (recomiendo) y despertarse (me despierto)."
      },
      {
        type: "heading",
        text: "3. Expresiones y giros conversacionales"
      },
      {
        type: "table",
        caption: "Expresiones prácticas de Semana 9",
        headers: ["Expresión", "Significado", "Ejemplo práctico"],
        rows: [
          ["Me da igual / Le da igual", "It doesn't matter to me / him", "Me da igual, no entiendo nada."],
          ["Por ejemplo", "For example", "Por ejemplo, pensamos que es muy temprano."],
          ["Perder el tiempo", "To waste time", "Nosotros no perdemos el tiempo."],
          ["Tener / sentir frío", "To be cold / feel cold", "Él siente mucho frío."],
          ["Pensar en...", "To think about...", "Pienso en algunas palabras."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "En español, pensar en algo o en alguien siempre lleva la preposición 'en': 'Pienso en ti', 'Pienso en mis planes' (nunca *pienso de ti*)."
      },
      {
        type: "image",
        src: "/theory/miro_verbos_diptongo_boxes.png",
        alt: "Esquema visual del curso: Verbos con Cambio Vocálico (e→ie, o→ue, e→i)"
      }
    ]
  },
  tabs: [
    { id: 'cambio_e_ie', label: 'Cambio de Vocal' }
  ],
  lessons: week9Lessons
};
