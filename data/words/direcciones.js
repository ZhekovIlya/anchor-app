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
    subtitle: "Cómo orientarse, pedir indicaciones, preposiciones de ubicación y regla HAY vs ESTÁ",
    sections: [
      {
        type: "heading",
        text: "1. Lugares y servicios indispensables de la ciudad"
      },
      {
        type: "paragraph",
        text: "Vocabulario clave para moverse por la ciudad y encontrar servicios públicos:"
      },
      {
        type: "table",
        caption: "Lugares habituales en la ciudad",
        headers: ["Lugar en español", "Traducción (UK)", "¿Qué se hace allí?"],
        rows: [
          ["el hospital", "лікарня", "Ver a un médico cuando estás enfermo"],
          ["la farmacia", "аптека", "Comprar medicinas"],
          ["la oficina de correos", "пошта", "Enviar cartas o paquetes"],
          ["la comisaría (estación de policía)", "поліцейський відділок", "Pedir ayuda ante emergencias"],
          ["la estación de tren / metro", "станція потяга / метро", "Viajar a otra ciudad o desplazarse"],
          ["el supermercado / el mercado", "супермаркет / ринок", "Comprar comida y productos frescos"],
          ["el banco", "банк", "Sacar dinero o pagar facturas"],
          ["la biblioteca", "бібліотека", "Leer libros y estudiar en silencio"],
          ["el cine / el teatro", "кінотеатр / театр", "Ver películas u obras de arte"],
          ["la gasolinera", "автозаправка", "Poner gasolina en el coche"]
        ]
      },
      {
        type: "heading",
        text: "2. Preposiciones y locuciones de ubicación"
      },
      {
        type: "table",
        caption: "Locuciones preposicionales de lugar",
        headers: ["Locución en español", "Traducción (UK)", "Ejemplo en contexto"],
        rows: [
          ["a la derecha de / a la izquierda de", "праворуч від / ліворуч від", "El banco está a la derecha de la cafetería."],
          ["al lado de / junto a", "поруч з / біля", "Hay una farmacia al lado del supermercado."],
          ["enfrente de / delante de", "навпроти / перед", "El cine está enfrente de la biblioteca."],
          ["detrás de", "позаду / за", "Hay una iglesia detrás del hospital."],
          ["entre X e Y", "між X та Y", "El parque está entre Correos y el aeropuerto."],
          ["cerca de / lejos de", "близько / далеко від", "El hospital está cerca de la estación."],
          ["en la esquina de", "на розі", "El bar está en la esquina de la calle Mayor."],
          ["al principio de / al final de", "на початку / в кінці", "La gasolinera está al final de la calle."]
        ]
      },
      {
        type: "heading",
        text: "3. La regla de oro: ¿HAY o ESTÁ / ESTÁN?"
      },
      {
        type: "paragraph",
        text: "Esta es la distinción más importante para dar y pedir información en la ciudad:"
      },
      {
        type: "table",
        caption: "Diferencia fundamental: HAY vs ESTÁ / ESTÁN",
        headers: ["Verbo", "Cuándo se usa", "Estructura acompañante", "Ejemplo práctico"],
        rows: [
          ["HAY", "Existencia general (algo no específico)", "HAY + un / una / muchos / números", "¿Hay una farmacia por aquí? — Sí, hay una."],
          ["ESTÁ", "Ubicación singular (lugar concreto)", "ESTÁ + el / la / este / mi", "¿Dónde está la farmacia? — Está al lado del banco."],
          ["ESTÁN", "Ubicación plural (lugares concretos)", "ESTÁN + los / las / estos / mis", "¿Dónde están los taxis? — Están delante del hotel."]
        ]
      },
      {
        type: "heading",
        text: "4. Preguntar y dar indicaciones para llegar"
      },
      {
        type: "table",
        caption: "Preguntas y respuestas útiles para pedir direcciones",
        headers: ["Cómo preguntar", "Cómo responder", "Traducción (UK)"],
        rows: [
          ["¿Dónde está la estación de tren?", "Está cerca de aquí, a unos 5 minutos a pie.", "Де вокзал? — Він близько, 5 хв пішки."],
          ["¿Hay un supermercado por aquí?", "Sí, hay uno justo al lado de la farmacia.", "Чи є тут супермаркет? — Так, поруч з аптекою."],
          ["¿Cómo puedo llegar a la plaza mayor?", "Sigue recto y gira a la derecha.", "Як дістатися до площі? — Прямо і направо."],
          ["¿Está lejos el aeropuerto?", "Está lejos, a unos 20 minutos en metro.", "Чи далеко аеропорт? — Далеко, 20 хв на метро."]
        ]
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
