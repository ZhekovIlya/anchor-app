// ========================
// WORDS: TIME & CALENDAR
// ========================
export default {
  id: "words_time",
  type: "words",
  title: "Time & Calendar",
  icon: "calendar_month",
  description: "Days, months, and time expressions",
  theory: {
    title: "El Calendario, las Fechas y las Estaciones",
    subtitle: "Días de la semana, meses por estaciones y las 4 estructuras clave para decir fechas",
    sections: [
      {
        type: "heading",
        text: "1. Días de la semana y meses (¡siempre en minúscula!)"
      },
      {
        type: "paragraph",
        text: "A diferencia del inglés, en español los días de la semana y los meses del año se escriben SIEMPRE con letra minúscula: `lunes` (no *Lunes*), `enero` (no *Enero*)."
      },
      {
        type: "table",
        caption: "Días de la semana",
        headers: ["Día", "Traducción (UK)", "Uso habitual"],
        rows: [
          ["el lunes / los lunes", "понеділок / щопонеділка", "Los lunes voy a la universidad."],
          ["el martes / los martes", "вівторок / щовівторка", "Los martes trabajo en la oficina."],
          ["el miércoles / los miércoles", "середа / щосереди", "Los miércoles hago deporte."],
          ["el jueves / los jueves", "четвер / щочетверга", "Los jueves limpio la casa."],
          ["el viernes / los viernes", "п'ятниця / щоп'ятниці", "Los viernes salgo con amigos."],
          ["el sábado / los sábados", "субота / щосуботи", "Los sábados descanso."],
          ["el domingo / los domingos", "неділя / щонеділі", "Los domingos como en familia."],
          ["el fin de semana / los fines de semana", "вихідні / щовихідних", "Los fines de semana duermo más."]
        ]
      },
      {
        type: "heading",
        text: "2. Meses del año agrupados por estaciones"
      },
      {
        type: "table",
        caption: "Meses y estaciones del año",
        headers: ["Estación", "Meses correspondientes", "Ejemplo práctico"],
        rows: [
          ["el invierno (зима)", "diciembre, enero, febrero", "Navidad es en invierno."],
          ["la primavera (весна)", "marzo, abril, mayo", "En primavera hay muchas flores."],
          ["el verano (літо)", "junio, julio, agosto", "En verano viajamos al mar."],
          ["el otoño (осінь)", "septiembre, octubre, noviembre", "En otoño hace fresco."]
        ]
      },
      {
        type: "heading",
        text: "3. Las 4 estructuras indispensables para decir fechas"
      },
      {
        type: "table",
        caption: "Estructuras para fechas, cumpleaños y festivos",
        headers: ["Uso", "Fórmula gramatical", "Ejemplo en contexto", "Traducción (UK)"],
        rows: [
          ["Fecha de hoy (sin artículo)", "Hoy es + número + de + mes", "Hoy es 14 de abril.", "Сьогодні 14 квітня."],
          ["Fecha como sujeto (con 'el')", "El + número + de + mes + es...", "El 1 de enero es Año Nuevo.", "1 січня — Новий рік."],
          ["Festivos célebres", "El + día + de + mes + es...", "El 25 de diciembre es Navidad.", "25 грудня — Різдво."],
          ["Día de la Mujer", "El 8 de marzo", "El 8 de marzo es el Día de la Mujer.", "8 березня — День жінок."],
          ["Cumpleaños", "Mi cumpleaños es el + fecha", "Mi cumpleaños es el 5 de mayo.", "Мій день народження 5 травня."],
          ["Meses y estaciones", "Usamos la preposición 'en'", "Mi cumple es en mayo / en verano.", "Мій д.н. у травні / влітку."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 ¡Ojo con el día 1! En español es muy común decir `primero` para el día 1 del mes: 'Hoy es el primero de febrero', 'Mi cumple es el primero de mayo'."
      }
    ]
  },
  lessons: [
    { id: "wt_l1", title: "Days of the Week", words: [
      { ru: "понедельник", uk: "понеділок", es: "lunes" },
      { ru: "вторник", uk: "вівторок", es: "martes" },
      { ru: "среда", uk: "середа", es: "miércoles" },
      { ru: "четверг", uk: "четвер", es: "jueves" },
      { ru: "пятница", uk: "п'ятниця", es: "viernes" },
      { ru: "суббота", uk: "субота", es: "sábado" },
      { ru: "воскресенье", uk: "неділя", es: "domingo" },
      { ru: "день", uk: "день", es: "día" },
      { ru: "неделя", uk: "тиждень", es: "semana" },
      { ru: "сегодня", uk: "сьогодні", es: "hoy" },
      { ru: "завтра", uk: "завтра", es: "mañana" },
      { ru: "вчера", uk: "вчора", es: "ayer" },
    ]},
    { id: "wt_l2", title: "Months of the Year", words: [
      { ru: "январь", uk: "січень", es: "enero" },
      { ru: "февраль", uk: "лютий", es: "febrero" },
      { ru: "март", uk: "березень", es: "marzo" },
      { ru: "апрель", uk: "квітень", es: "abril" },
      { ru: "май", uk: "травень", es: "mayo" },
      { ru: "июнь", uk: "червень", es: "junio" },
      { ru: "июль", uk: "липень", es: "julio" },
      { ru: "август", uk: "серпень", es: "agosto" },
      { ru: "сентябрь", uk: "вересень", es: "septiembre" },
      { ru: "октябрь", uk: "жовтень", es: "octubre" },
      { ru: "ноябрь", uk: "листопад", es: "noviembre" },
      { ru: "декабрь", uk: "грудень", es: "diciembre" },
    ]},
    { id: "wt_l3", title: "Time & Periods", words: [
      { ru: "час", uk: "година", es: "hora" },
      { ru: "минута", uk: "хвилина", es: "minuto" },
      { ru: "утро", uk: "ранок", es: "mañana" },
      { ru: "полдень", uk: "полудень", es: "mediodía" },
      { ru: "вечер", uk: "вечір", es: "tarde" },
      { ru: "ночь", uk: "ніч", es: "noche" },
      { ru: "полночь", uk: "північ", es: "medianoche" },
      { ru: "сейчас", uk: "зараз", es: "ahora" },
      { ru: "потом", uk: "потім", es: "después" },
      { ru: "раньше", uk: "раніше", es: "antes" },
      { ru: "всегда", uk: "завжди", es: "siempre" },
      { ru: "никогда", uk: "ніколи", es: "nunca" },
    ]},
    { id: "wt_exam", title: "🏆 Time & Calendar Exam", exam: true },
  ],
};
