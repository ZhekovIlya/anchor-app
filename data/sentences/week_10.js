// ========================
// WEEK 10 — "En la Estación y Direcciones"
// ========================
// Level: Intermediate.
// Focus: Travel vocabulary (train station, tickets, luggage), directions (girar, seguir, derecha), and reinforcing Week 9 stem-changing verbs.
// ========================

const week10Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: VIAJES Y TRENES
  // ═══════════════════════════════════════════════════════
  {
    id: "w10_l1",
    tab: "viajes",
    title: "En la Estación",
    phrases: [
      { ru: "Я покупаю билет в один конец в кассе.", uk: "Я купую квиток в один кінець у касі.", es: "Compro un billete de ida en la taquilla." },
      { ru: "Где находится железнодорожная станция, пожалуйста?", uk: "Де знаходиться залізнична станція, будь ласка?", es: "¿Dónde está la estación de tren, por favor?" },
      { ru: "Они не понимают автомат по продаже билетов.", uk: "Вони не розуміють автомат з продажу квитків.", es: "Ellos no entienden la máquina de billetes." },
      { ru: "Вы (мн.) покупаете билет туда и обратно.", uk: "Ви (мн.) купуєте квиток туди і назад.", es: "Vosotros compráis un billete de ida y vuelta." },
      { ru: "Я думаю, что расписание очень сложное.", uk: "Я думаю, що розклад дуже складний.", es: "Pienso que el horario es muy complicado." },
      { ru: "Мы хотим быть на станции вовремя.", uk: "Ми хочемо бути на станції вчасно.", es: "Queremos estar en la estación a tiempo." }
    ],
  },
  {
    id: "w10_l2",
    tab: "viajes",
    title: "El Viaje",
    phrases: [
      { ru: "Во сколько отправление поезда?", uk: "О котрій відправлення поїзда?", es: "¿A qué hora es la salida del tren?" },
      { ru: "Мы находимся в зале ожидания.", uk: "Ми знаходимося в залі очікування.", es: "Estamos en la sala de espera." },
      { ru: "Поезд находится на третьем пути, на второй платформе.", uk: "Поїзд знаходиться на третій колії, на другій платформі.", es: "El tren está en la vía tres, en el andén dos." },
      { ru: "Я предпочитаю место около окна.", uk: "Я віддаю перевагу місцю біля вікна.", es: "Prefiero un asiento cerca de la ventana." },
      { ru: "Мне все равно на время прибытия.", uk: "Мені все одно на час прибуття.", es: "Me da igual la hora de llegada." },
      { ru: "Час дня, и поезд прибывает сейчас.", uk: "Перша година дня, і поїзд прибуває зараз.", es: "Es la una por la tarde y el tren llega ahora." }
    ],
  },
  {
    id: "w10_l3",
    tab: "viajes",
    title: "Pasajeros",
    phrases: [
      { ru: "Контролер хочет видеть билеты.", uk: "Контролер хоче бачити квитки.", es: "El revisor quiere ver los billetes." },
      { ru: "Водитель начинает вести поезд.", uk: "Водій починає вести поїзд.", es: "El conductor comienza a conducir el tren." },
      { ru: "Пассажирка теряет свой багаж.", uk: "Пасажирка губить свій багаж.", es: "La pasajera pierde su equipaje." },
      { ru: "Мы не водим, потому что мы устали.", uk: "Ми не водимо, тому що ми втомилися.", es: "Nosotros no conducimos porque estamos cansados." },
      { ru: "У вас (мн.) много багажа?", uk: "У вас (мн.) багато багажу?", es: "¿Vosotros tenéis mucho equipaje?" },
      { ru: "Я рекомендую поговорить с контролером.", uk: "Я рекомендую поговорити з контролером.", es: "Recomiendo hablar con la revisora." }
    ],
  },
  { id: "w10_m1", tab: "viajes", exam: true, mini: true, title: "Mini-examen: Viajes" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: DIRECCIONES
  // ═══════════════════════════════════════════════════════
  {
    id: "w10_l4",
    tab: "direcciones",
    title: "En la Calle",
    phrases: [
      { ru: "Ты должен повернуть направо здесь.", uk: "Ти повинен повернути праворуч тут.", es: "Tú tienes que girar a la derecha aquí." },
      { ru: "Ты должен продолжать идти, чтобы прийти в парк.", uk: "Ти повинен продовжувати йти, щоб прийти в парк.", es: "Tienes que seguir para llegar al parque." },
      { ru: "Я продолжаю направо и потом налево.", uk: "Я продовжую направо і потім наліво.", es: "Sigo a la derecha y luego a la izquierda." },
      { ru: "Они не понимают и поворачивают неправильно.", uk: "Вони не розуміють і повертають неправильно.", es: "Ellos no entienden y giran mal." },
      { ru: "Если хочешь, мы продолжаем вместе в больницу.", uk: "Якщо хочеш, ми продовжуємо разом до лікарні.", es: "Si quieres, seguimos juntos al hospital." },
      { ru: "Вы (мн.) начинаете поворачивать направо.", uk: "Ви (мн.) починаєте повертати праворуч.", es: "Vosotros empezáis a girar a la derecha." }
    ],
  },
  { id: "w10_m2", tab: "direcciones", exam: true, mini: true, title: "Mini-examen: Direcciones" },
  { id: "w10_exam", tab: "viajes", exam: true, title: "Examen de la Semana 10" },
];

export default {
  id: "week10",
  type: "sentences",
  title: "Week 10: En la Estación y Direcciones",
  description: "Travel vocabulary, train stations, and giving directions.",
  legacy: false,
  theory: {
    title: "Grammar & Vocab Expansion",
    subtitle: "Viajes en tren, billetes y orientación urbana",
    sections: [
      {
        type: "paragraph",
        text: "En la Semana 10 aprenderás a desenvolverte con soltura en estaciones de tren y a pedir o dar indicaciones precisas para moverte por una ciudad."
      },
      {
        type: "heading",
        text: "1. En la estación de tren: vocabulario clave"
      },
      {
        type: "paragraph",
        text: "Para comprar billetes y orientarte en una estación española o latinoamericana, necesitas dominar estos términos indispensables:"
      },
      {
        type: "table",
        caption: "Términos ferroviarios y de viaje",
        headers: ["Español", "Traducción", "Ejemplo práctico"],
        rows: [
          ["billete de ida", "one-way ticket", "Compro un billete de ida en la taquilla."],
          ["billete de ida y vuelta", "round-trip ticket", "Vosotros compráis un billete de ida y vuelta."],
          ["la taquilla", "ticket office / window", "¿Dónde está la taquilla, por favor?"],
          ["la máquina de billetes", "ticket vending machine", "Ellos no entienden la máquina de billetes."],
          ["el andén / la vía", "platform / track", "El tren está en la vía tres, en el andén dos."],
          ["la sala de espera", "waiting room", "Estamos en la sala de espera."],
          ["la salida / la llegada", "departure / arrival", "¿A qué hora es la salida del tren?"],
          ["el equipaje", "luggage / baggage", "¿Vosotros tenéis mucho equipaje?"],
          ["el revisor / la revisora", "ticket inspector", "El revisor quiere ver los billetes."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "En España se utiliza universalmente la palabra 'billete' para trenes y transporte. En Hispanoamérica es muy frecuente escuchar también 'boleto' o 'pasaje'."
      },
      {
        type: "heading",
        text: "2. Verbos de dirección y movimiento"
      },
      {
        type: "paragraph",
        text: "Para dar y seguir indicaciones, combinamos perífrasis de obligación ('tener que + infinitivo') con verbos directivos:"
      },
      {
        type: "table",
        caption: "Indicaciones de dirección en la calle",
        headers: ["Estructura", "Significado", "Ejemplo en contexto"],
        rows: [
          ["girar a la derecha / izquierda", "to turn right / left", "Tú tienes que girar a la derecha aquí."],
          ["seguir (+ dirección / infinitivo)", "to continue / keep going", "Tienes que seguir para llegar al parque."],
          ["sigo a la derecha y luego...", "I continue right and then...", "Sigo a la derecha y luego a la izquierda."],
          ["girar mal", "to turn the wrong way", "Ellos no entienden y giran mal."]
        ]
      },
      {
        type: "callout",
        style: "important",
        text: "'Seguir' es un verbo con cambio vocálico e → i: yo sigo, tú sigues, él sigue, nosotros seguimos, vosotros seguís, ellos siguen."
      },
      {
        type: "heading",
        text: "3. La forma 'vosotros' en el viaje"
      },
      {
        type: "paragraph",
        text: "Consolidamos el uso de vosotros (segunda persona del plural informal en España) en contextos de viaje en grupo:"
      },
      {
        type: "table",
        caption: "Formas de vosotros",
        headers: ["Verbo", "Vosotros", "Ejemplo"],
        rows: [
          ["comprar", "compráis", "Vosotros compráis un billete de ida y vuelta."],
          ["tener", "tenéis", "¿Vosotros tenéis mucho equipaje?"],
          ["empezar", "empezáis", "Vosotros empezáis a girar a la derecha."]
        ]
      },
      {
        type: "image",
        src: "/theory/miro_estacion_tren.png",
        alt: "Esquema visual del curso: En la Estación de Tren y Diálogos"
      }
    ]
  },
  tabs: [
    { id: 'viajes', label: 'Viajes' },
    { id: 'direcciones', label: 'Direcciones' }
  ],
  lessons: week10Lessons
};
