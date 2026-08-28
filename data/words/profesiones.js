// ========================
// WORDS: PROFESIONES
// ========================
export default {
  id: "words_profesiones",
  type: "words",
  title: "Profesiones",
  icon: "badge",
  description: "Professions, jobs, and masculine/feminine occupation nouns",
  theory: {
    title: "Spanish Professions & Gender Nouns",
    subtitle: "Masculine and feminine profession patterns",
    sections: [
      {
        type: "heading",
        text: "1. Reglas de formación de género en profesiones"
      },
      {
        type: "paragraph",
        text: "En español, la gran mayoría de las profesiones tienen formas masculinas y femeninas que siguen patrones muy predecibles según la terminación del sustantivo."
      },
      {
        type: "table",
        caption: "Patrones regulares de cambio de género",
        headers: ["Patrón", "Masculino", "Femenino", "Traducción"],
        rows: [
          ["-o → -a", "el camarero", "la camarera", "waiter / waitress"],
          ["-o → -a", "el médico", "la médica", "doctor"],
          ["-o → -a", "el cocinero", "la cocinera", "cook / chef"],
          ["-o → -a", "el enfermero", "la enfermera", "nurse"],
          ["-o → -a", "el abogado", "la abogada", "lawyer"],
          ["-or → -ora", "el profesor", "la profesora", "teacher / professor"],
          ["-ente → -enta", "el dependiente", "la dependienta", "shop assistant"]
        ]
      },
      {
        type: "heading",
        text: "2. Profesiones invariables en -ista y terminaciones fijas"
      },
      {
        type: "paragraph",
        text: "Las profesiones terminadas en '-ista' o palabras como 'policía' no cambian la terminación del sustantivo: el género se marca únicamente a través del artículo ('el' o 'la')."
      },
      {
        type: "table",
        caption: "Sustantivos de profesión comunes en género",
        headers: ["Masculino", "Femenino", "Traducción"],
        rows: [
          ["el taxista", "la taxista", "taxi driver"],
          ["el recepcionista", "la recepcionista", "receptionist"],
          ["el dentista", "la dentista", "dentist"],
          ["el policía", "la policía", "police officer"],
          ["el periodista", "la periodista", "journalist"]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 Para preguntar a alguien por su profesión en un entorno natural se suele decir: '¿A qué te dedicas?' (What do you do?) o '¿En qué trabajas?'"
      }
    ]
  },
  lessons: [
    {
      id: "wp_l1",
      title: "Profesiones Comunes 1",
      words: [
        { ru: "официант", uk: "офіціант", es: "el camarero" },
        { ru: "официантка", uk: "офіціантка", es: "la camarera" },
        { ru: "врач (мужчина)", uk: "лікар (чоловік)", es: "el médico" },
        { ru: "врач (женщина)", uk: "лікарка", es: "la médica" },
        { ru: "учитель", uk: "вчитель", es: "el profesor" },
        { ru: "учительница", uk: "вчителька", es: "la profesora" },
        { ru: "повар (мужчина)", uk: "кухар", es: "el cocinero" },
        { ru: "повар (женщина)", uk: "кухарка", es: "la cocinera" },
        { ru: "инженер (мужчина)", uk: "інженер (чоловік)", es: "el ingeniero" },
        { ru: "инженер (женщина)", uk: "інженерка", es: "la ingeniera" },
        { ru: "медбрат", uk: "медбрат", es: "el enfermero" },
        { ru: "медсестра", uk: "медсестра", es: "la enfermera" },
      ]
    },
    {
      id: "wp_l2",
      title: "Profesiones Comunes 2",
      words: [
        { ru: "адвокат (мужчина)", uk: "адвокат (чоловік)", es: "el abogado" },
        { ru: "адвокат (женщина)", uk: "адвокатка", es: "la abogada" },
        { ru: "продавец", uk: "продавець", es: "el dependiente" },
        { ru: "продавщица", uk: "продавчиня", es: "la dependienta" },
        { ru: "полицейский (мужчина)", uk: "поліцейський", es: "el policía" },
        { ru: "полицейский (женщина)", uk: "поліцейська", es: "la policía" },
        { ru: "администратор (мужчина)", uk: "адміністратор", es: "el recepcionista" },
        { ru: "администратор (женщина)", uk: "адміністраторка", es: "la recepcionista" },
        { ru: "таксист", uk: "таксист", es: "el taxista" },
        { ru: "таксистка", uk: "таксистка", es: "la taxista" },
        { ru: "стоматолог (мужчина)", uk: "стоматолог (чоловік)", es: "el dentista" },
        { ru: "стоматолог (женщина)", uk: "стоматологиня", es: "la dentista" },
      ]
    },
    { id: "wp_exam", title: "🏆 Profesiones Exam", exam: true },
  ],
};
