// ========================
// WORDS: EN EL RESTAURANTE
// ========================
export default {
  id: "words_restaurante",
  type: "words",
  title: "En el Restaurante",
  icon: "restaurant",
  description: "Ordering, paying and tipping at a restaurant",
  theory: {
    title: "En el Restaurante",
    subtitle: "El orden de la comida y cómo pedir, pagar y dejar propina",
    sections: [
      {
        type: "paragraph",
        text: "En España la comida en un restaurante sigue un orden fijo. Primero llegan los entrantes, después el primer plato y el segundo plato, luego el postre y, al final, la cuenta."
      },
      {
        type: "table",
        caption: "Orden de la comida",
        headers: ["Orden", "Español", "Traducción", "Ejemplo"],
        rows: [
          ["1", "los entrantes", "закуски", "Antes del plato principal pedimos los entrantes."],
          ["2", "el primer plato", "перша страва", "Primero comemos el primer plato."],
          ["3", "el segundo plato", "друга страва", "Después del primer plato comemos el segundo plato."],
          ["4", "el postre", "десерт", "Después del segundo plato pedimos el postre."],
          ["5", "la cuenta", "рахунок", "Al final de la comida pedimos la cuenta."],
          ["6", "la propina", "чайові", "Dejamos la propina si nos gustó el servicio."]
        ]
      },
      {
        type: "heading",
        text: "La carta, el menú del día y el plato principal"
      },
      {
        type: "table",
        caption: "No los confundas",
        headers: ["Español", "Significado", "Ejemplo"],
        rows: [
          ["la carta", "меню (перелік усіх страв)", "El camarero trae la carta."],
          ["el menú del día", "комплексний обід за фіксованою ціною", "Pedimos el menú del día para ahorrar."],
          ["el plato principal", "основна страва", "Antes del plato principal pedimos los entrantes."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 «Estar contento» describe un estado: 'Dejamos la propina si estamos contentos.' Para hablar del pasado usa 'si nos gustó el servicio'."
      }
    ]
  },
  lessons: [
    {
      id: "wrest_l1",
      title: "La mesa y la carta",
      words: [
        { ru: "официант", uk: "офіціант", es: "el camarero" },
        { ru: "меню (карта блюд)", uk: "меню (перелік страв)", es: "la carta" },
        { ru: "комплексный обед (меню дня)", uk: "комплексний обід (меню дня)", es: "el menú del día" },
        { ru: "стол", uk: "стіл", es: "la mesa" },
        { ru: "бронь", uk: "бронювання", es: "la reserva" },
        { ru: "закуски", uk: "закуски", es: "los entrantes" },
        { ru: "первое блюдо", uk: "перша страва", es: "el primer plato" },
        { ru: "второе блюдо", uk: "друга страва", es: "el segundo plato" },
        { ru: "основное блюдо", uk: "основна страва", es: "el plato principal" },
        { ru: "десерт", uk: "десерт", es: "el postre" },
        { ru: "столовые приборы", uk: "столові прибори", es: "los cubiertos" },
        { ru: "салфетка", uk: "серветка", es: "la servilleta" },
      ]
    },
    {
      id: "wrest_l2",
      title: "Pedir y pagar",
      words: [
        { ru: "заказывать", uk: "замовляти", es: "pedir" },
        { ru: "приносить", uk: "приносити", es: "traer" },
        { ru: "входить", uk: "входити", es: "entrar" },
        { ru: "платить", uk: "платити", es: "pagar" },
        { ru: "оставлять", uk: "залишати", es: "dejar" },
        { ru: "экономить", uk: "заощаджувати", es: "ahorrar" },
        { ru: "счёт", uk: "рахунок", es: "la cuenta" },
        { ru: "чаевые", uk: "чайові", es: "la propina" },
        { ru: "обслуживание", uk: "обслуговування", es: "el servicio" },
        { ru: "забронировать", uk: "зробити бронювання", es: "hacer la reserva" },
        { ru: "быть довольным", uk: "бути задоволеним", es: "estar contento" },
        { ru: "в конце", uk: "наприкінці", es: "al final" },
      ]
    },
    { id: "wrest_exam", title: "🏆 Restaurante Exam", exam: true },
  ],
};
