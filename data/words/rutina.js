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
        caption: "Verbos reflexivos de la rutina matutina y nocturna",
        headers: ["Infinitivo", "Yo (presente)", "Significado"],
        rows: [
          ["despertarse (e→ie)", "me despierto", "wake up"],
          ["levantarse", "me levanto", "get out of bed"],
          ["ducharse / lavarse", "me ducho / me lavo", "take a shower / wash"],
          ["vestirse (e→i)", "me visto", "get dressed"],
          ["peinarse / afeitarse", "me peino / me afeito", "comb hair / shave"],
          ["acostarse (o→ue)", "me acuesto", "go to bed"],
          ["dormirse (o→ue)", "me duermo", "fall asleep"]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 Para ordenar tus acciones en el tiempo usa los conectores: 'Primero me despierto, luego me ducho, después desayuno y finalmente voy al trabajo'."
      },
      {
        type: "image",
        src: "/theory/miro_rutina_acciones.png",
        alt: "Esquema visual del curso: Acciones Habituales y Rutina"
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
