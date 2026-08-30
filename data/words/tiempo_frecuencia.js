// ========================
// WORDS: TIEMPO Y FRECUENCIA
// ========================
export default {
  id: "words_tiempo",
  type: "words",
  title: "Tiempo",
  icon: "schedule",
  description: "Time and frequency expressions",
  theory: {
    title: "La Frecuencia, la Hora y el Tiempo",
    subtitle: "Escala de adverbios de frecuencia (100% a 0%), estructuras para decir la hora y conectores temporales",
    sections: [
      {
        type: "heading",
        text: "1. La escala de frecuencia (de 100% a 0%)"
      },
      {
        type: "paragraph",
        text: "Para hablar de con qué regularidad realizas tus actividades cotidianas, utiliza esta escala de frecuencia:"
      },
      {
        type: "table",
        caption: "Adverbios y expresiones de frecuencia",
        headers: ["Porcentaje", "Expresión en español", "Traducción (UK)", "Ejemplo en contexto"],
        rows: [
          ["100%", "siempre", "завжди", "Siempre desayuno café con leche."],
          ["80%", "normalmente / habitualmente", "зазвичай", "Normalmente voy al gimnasio por la tarde."],
          ["70%", "a menudo / con frecuencia", "часто", "A menudo salgo a cenar con amigos."],
          ["50%", "a veces / de vez en cuando", "інколи / час від часу", "A veces duermo poco los lunes."],
          ["30%", "una vez / dos veces a la semana", "раз / двічі на тиждень", "Limpio la casa dos veces a la semana."],
          ["10%", "rara vez / casi nunca", "рідко / майже ніколи", "Casi nunca veo la televisión por la mañana."],
          ["0%", "nunca", "ніколи", "Nunca como carne los viernes."]
        ]
      },
      {
        type: "heading",
        text: "2. Cómo decir la hora en español (La Hora)"
      },
      {
        type: "paragraph",
        text: "En español usamos el verbo `SER` para decir la hora. Recuerda: solo la una de la tarde/mañana usa `Es la una`. Todas las demás horas usan `Son las X`:"
      },
      {
        type: "table",
        caption: "Estructuras para dar y pedir la hora",
        headers: ["Hora", "Estructura en español", "Traducción (UK)", "Regla"],
        rows: [
          ["1:00", "Es la una (en punto)", "Перша година (рівно)", "Singular (Es la una)"],
          ["2:00", "Son las dos", "Друга година", "Plural (Son las...)"],
          ["7:05", "Son las siete y cinco", "Сім годин п'ять хвилин", "Hora + y + minutos"],
          ["9:15", "Son las nueve y cuarto", "Чверть на десяту", "15 min = y cuarto"],
          ["11:30", "Son las once y media", "О пів на дванадцяту", "30 min = y media"],
          ["3:45", "Son las cuatro menos cuarto", "За чверть четверта", "45 min = menos cuarto"],
          ["7:50", "Son las ocho menos diez", "За десять восьма", "Restar minutos con 'menos'"],
          ["13:00 / 20:00", "la una de la tarde / las ocho de la noche", "13:00 / 20:00", "Formato de 12 horas habitual"]
        ]
      },
      {
        type: "heading",
        text: "3. Conectores temporales y partes del día"
      },
      {
        type: "table",
        caption: "Conectores y expresiones cronológicas",
        headers: ["Expresión", "Significado (UK)", "Ejemplo práctico"],
        rows: [
          ["por la mañana / tarde / noche", "вранці / вдень / ввечері", "Por la mañana trabajo en la oficina."],
          ["antes de (+ infinitivo / sustantivo)", "до / перед тим як", "Antes de desayunar me lavo la cara."],
          ["después de (+ infinitivo / sustantivo)", "після", "Después de comer tomo un té."],
          ["sobre las (+ hora)", "близько / приблизно о", "Vuelvo a casa sobre las ocho."]
        ]
      }
    ]
  },
  lessons: [
    { id: "wt_l1", title: "Time & Frequency", words: [
      { ru: "иногда", uk: "інколи", es: "a veces" },
      { ru: "раз", uk: "раз", es: "la vez" },
      { ru: "в другие разы", uk: "інші рази", es: "otras veces" },
      { ru: "никогда", uk: "ніколи", es: "nunca" },
      { ru: "всегда", uk: "завжди", es: "siempre" },
      { ru: "часто", uk: "часто", es: "con frecuencia" },
      { ru: "до", uk: "перед", es: "antes" },
      { ru: "после", uk: "після", es: "después" },
      { ru: "около (о времени)", uk: "близько (про час)", es: "sobre" },
      { ru: "четверть", uk: "чверть", es: "y cuarto" },
      { ru: "половина", uk: "половина", es: "y media" },
      { ru: "ровно", uk: "рівно", es: "en punto" },
    ]},
    { id: "wt_exam", title: "🏆 Tiempo Exam", exam: true },
  ],
};
