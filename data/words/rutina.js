// ========================
// WORDS: RUTINA DIARIA
// ========================
export default {
  id: "words_rutina",
  type: "words",
  title: "Mi Rutina",
  icon: "routine",
  description: "Verbs for your daily routine",
  theory: {
    title: "Acciones Habituales y Rutina Diaria",
    subtitle: "Verbos reflexivos y vocabulario cronológico del día a día",
    sections: [
      {
        type: "paragraph",
        text: "Los verbos reflexivos describen acciones que el sujeto realiza sobre sí mismo y requieren el pronombre reflexivo correspondiente (me, te, se, nos, os, se)."
      },
      {
        type: "table",
        caption: "Los 6 pronombres reflexivos en acción (Ejemplo: LEVANTARSE)",
        headers: ["Persona", "Pronombre + Verbo", "Traducción", "Ejemplo práctico"],
        rows: [
          ["Yo", "me levanto", "я встаю / підводжуся", "Me levanto a las siete de la mañana."],
          ["Tú", "te levantas", "ти встаєш", "¿A qué hora te levantas normalmente?"],
          ["Él / Ella / Usted", "se levanta", "він/вона встає", "Él se levanta muy temprano."],
          ["Nosotros / Nosotras", "nos levantamos", "ми встаємо", "Nos levantamos juntos los domingos."],
          ["Vosotros / Vosotras", "os levantáis", "ви встаєте", "¿Vosotros os levantáis antes de las ocho?"],
          ["Ellos / Ellas / Ustedes", "se levantan", "вони встають", "Ellos se levantan cuando quieren."]
        ]
      },
      {
        type: "table",
        caption: "Verbos reflexivos con cambio de raíz (diptongo)",
        headers: ["Infinitivo", "Cambio vocálico", "Yo (presente)", "Él / Ella (presente)"],
        rows: [
          ["despertarse", "e → ie", "me despierto", "se despierta"],
          ["acostarse", "o → ue", "me acuesto", "se acuesta"],
          ["vestirse", "e → i", "me visto", "se viste"],
          ["dormirse", "o → ue", "me duermo", "se duerme"]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 Para ordenar tus acciones en el tiempo usa los conectores: 'Primero me despierto, luego me ducho, después desayuno y finalmente voy al trabajo'."
      }
    ]
  },
  lessons: [
    { id: "wr_l1", title: "Daily Actions", words: [
      { ru: "просыпаться", uk: "прокидатися", es: "despertarse" },
      { ru: "вставать", uk: "вставати", es: "levantarse" },
      { ru: "одеваться", uk: "одягатися", es: "vestirse" },
      { ru: "бриться", uk: "голитися", es: "afeitarse" },
      { ru: "причесываться", uk: "розчісуватися", es: "peinarse" },
      { ru: "ужинать", uk: "вечеряти", es: "cenar" },
      { ru: "перекусывать", uk: "перекушувати", es: "merendar" },
      { ru: "выходить", uk: "виходити", es: "salir" },
      { ru: "брать", uk: "брати", es: "coger" },
      { ru: "подниматься", uk: "підніматися", es: "subir" },
      { ru: "подметать", uk: "підмітати", es: "barrer" },
      { ru: "забывать", uk: "забувати", es: "olvidar" },
    ]},
    { id: "wr_exam", title: "🏆 Rutina Exam", exam: true },
  ],
};
