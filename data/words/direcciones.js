// ========================
// WORDS: DIRECCIONES
// ========================
export default {
  id: "words_direcciones",
  type: "words",
  title: "Direcciones",
  icon: "explore",
  description: "Navigating the city",
  theory: {
    title: "Direcciones y Lugares en la Ciudad",
    subtitle: "Cómo orientarse, pedir indicaciones y ubicar lugares en el mapa",
    sections: [
      {
        type: "paragraph",
        text: "Para moverte con soltura por cualquier ciudad hispanohablante, utiliza las preposiciones de ubicación y los verbos de movimiento para indicar direcciones con exactitud."
      },
      {
        type: "table",
        caption: "Preposiciones de lugar clave",
        headers: ["Español", "Traducción", "Ejemplo práctico"],
        rows: [
          ["a la derecha de / a la izquierda de", "to the right / left of", "El banco está a la derecha de la cafetería."],
          ["al lado de / junto a", "next to / beside", "Hay una farmacia al lado del supermercado."],
          ["enfrente de", "opposite / across from", "El cine está enfrente de la biblioteca."],
          ["entre X e Y", "between X and Y", "El parque está entre Correos y el aeropuerto."],
          ["cerca de / lejos de", "near / far from", "El hospital está cerca de la estación de tren."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 Recuerda la regla de oro de la ciudad: usamos 'HAY' para la existencia general de cosas o servicios desconocidos ('¿Hay un banco por aquí?'), y 'ESTÁ / ESTÁN' para ubicar un lugar específico y determinado ('El banco está en la calle Mayor')."
      },
      {
        type: "image",
        src: "/theory/miro_direcciones_ciudad.png",
        alt: "Esquema visual del curso: Direcciones y Lugares en la Ciudad"
      }
    ]
  },
  lessons: [
    { id: "wd_l1", title: "City Navigation", words: [
      { ru: "прибывать в", uk: "дістатися до", es: "llegar a" },
      { ru: "проходить", uk: "проходити", es: "pasar" },
      { ru: "угол (перекресток)", uk: "ріг (перехрестя)", es: "la esquina" },
      { ru: "левая сторона", uk: "ліва сторона", es: "la izquierda" },
      { ru: "правая сторона", uk: "права сторона", es: "la derecha" },
      { ru: "рядом с", uk: "поруч з", es: "junto a" },
      { ru: "сбоку", uk: "поруч", es: "al lado" },
      { ru: "напротив", uk: "навпроти", es: "enfrente" },
      { ru: "между", uk: "між", es: "entre" },
      { ru: "пересекать", uk: "переходити", es: "cruzar" },
      { ru: "мост", uk: "міст", es: "el puente" },
      { ru: "банк", uk: "банк", es: "el banco" },
    ]},
    { id: "wd_exam", title: "🏆 Direcciones Exam", exam: true },
  ],
};
