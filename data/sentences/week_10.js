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
  theory: {
    title: "Grammar expansion",
    subtitle: "Travel and Directions",
    sections: [
      {
        type: "paragraph",
        content: "This week expands your vocabulary for traveling, navigating train stations, and giving or following directions."
      }
    ]
  },
  lessons: week10Lessons
};
