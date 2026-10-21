// ========================
// WEEK 12 — "Hoteles"
// ========================
// Level: Intermediate.
// Focus: Hotel reservations, amenities, checking in/out, and polite problem resolution at reception.
// ========================

const week12Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: RESERVA Y SERVICIOS
  // ═══════════════════════════════════════════════════════
  {
    id: "w12_l1",
    tab: "reserva",
    title: "Reservar Habitación",
    phrases: [
      { ru: "У вас есть свободный номер на две ночи?", uk: "У вас є вільний номер на дві ночі?", es: "¿Tiene una habitación libre para dos noches?" },
      { ru: "Я хотел бы забронировать двухместный номер.", uk: "Я хотів би забронювати двомісний номер.", es: "Me gustaría reservar una habitación doble." },
      { ru: "У меня есть бронь на имя Хуан.", uk: "У мене є бронь на ім'я Хуан.", es: "Tengo una reserva a nombre de Juan." },
      { ru: "Сколько стоит номер за ночь?", uk: "Скільки коштує номер за ніч?", es: "¿Cuánto cuesta la habitación por noche?" },
      { ru: "Мы хотим одноместный номер с видом.", uk: "Ми хочемо одномісний номер з видом.", es: "Queremos una habitación individual con vistas." },
      { ru: "Я могу оплатить картой на стойке регистрации?", uk: "Я можу оплатити карткою на стійці реєстрації?", es: "¿Puedo pagar con tarjeta en la recepción?" }
    ],
  },
  {
    id: "w12_l2",
    tab: "reserva",
    title: "Servicios del Hotel",
    phrases: [
      { ru: "Завтрак включен в стоимость?", uk: "Сніданок включений у вартість?", es: "¿El desayuno está incluido en el precio?" },
      { ru: "В номерах есть бесплатный вайфай?", uk: "У номерах є безкоштовний вайфай?", es: "¿Hay wifi gratis en las habitaciones?" },
      { ru: "В отеле есть очень большой бассейн.", uk: "В готелі є дуже великий басейн.", es: "El hotel tiene una piscina muy grande." },
      { ru: "Во сколько открывается ресторан отеля?", uk: "О котрій відкривається ресторан готелю?", es: "¿A qué hora abre el restaurante del hotel?" },
      { ru: "Кондиционер работает очень хорошо здесь.", uk: "Кондиціонер працює дуже добре тут.", es: "El aire acondicionado funciona muy bien aquí." },
      { ru: "Я предпочитаю отель с частной парковкой.", uk: "Я віддаю перевагу готелю з приватною парковкою.", es: "Prefiero un hotel con aparcamiento privado." }
    ],
  },
  {
    id: "w12_l3",
    tab: "reserva",
    title: "Llegada y Llaves",
    phrases: [
      { ru: "Во сколько заселение в отель?", uk: "О котрій заселення в готель?", es: "¿A qué hora es el registro de entrada?" },
      { ru: "Вот ключ от вашего номера.", uk: "Ось ключ від вашого номера.", es: "Aquí tiene la llave de su habitación." },
      { ru: "Администратор даёт мне магнитную карту.", uk: "Адміністратор дає мені магнітну картку.", es: "El recepcionista me da la tarjeta magnética." },
      { ru: "Мы поздно прибыли в отель из-за поезда.", uk: "Ми пізно прибули в готель через потяг.", es: "Llegamos tarde al hotel por el tren." },
      { ru: "Мы можем оставить багаж на стойке регистрации?", uk: "Ми можемо залишити багаж на стійці реєстрації?", es: "¿Podemos dejar el equipaje en la recepción?" },
      { ru: "Выезд из отеля в двенадцать часов.", uk: "Виїзд з готелю о дванадцятій годині.", es: "La salida del hotel es a las doce." }
    ],
  },
  { id: "w12_m1", tab: "reserva", exam: true, mini: true, title: "Mini-examen: Reserva" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: PROBLEMAS Y RECEPCIÓN
  // ═══════════════════════════════════════════════════════
  {
    id: "w12_l4",
    tab: "problemas",
    title: "Problemas en la Habitación",
    phrases: [
      { ru: "В моем номере не работает кондиционер.", uk: "У моєму номері не працює кондиціонер.", es: "No funciona el aire acondicionado en mi habitación." },
      { ru: "Номер грязный и нет полотенец.", uk: "Номер брудний і немає рушників.", es: "La habitación está sucia y no hay toallas." },
      { ru: "Есть проблема с душем в ванной.", uk: "Є проблема з душем у ванній.", es: "Hay un problema con la ducha del baño." },
      { ru: "У нас нет горячей воды сегодня ночью.", uk: "У нас немає гарячої води сьогодні вночі.", es: "No tenemos agua caliente esta noche." },
      { ru: "Окно не закрывается и заходит много шума.", uk: "Вікно не зачиняється і заходить багато шуму.", es: "La ventana no cierra y entra mucho ruido." },
      { ru: "Свет не работает в коридоре.", uk: "Світло не працює в коридорі.", es: "La luz no funciona en el pasillo." }
    ],
  },
  {
    id: "w12_l5",
    tab: "problemas",
    title: "Quejas y Peticiones",
    phrases: [
      { ru: "Извините, я мог бы поменять номер сегодня?", uk: "Вибачте, я міг би поміняти номер сьогодні?", es: "Perdón, ¿podría cambiar de habitación hoy?" },
      { ru: "Мог бы я попросить о переводе в другой номер, пожалуйста?", uk: "Чи міг би я попросити про переведення в інший номер, будь ласка?", es: "¿Podría pedir un traslado de habitación, por favor?" },
      { ru: "Я хотел бы поговорить с администратором сейчас.", uk: "Я хотів би поговорити з адміністратором зараз.", es: "Me gustaría hablar con el recepcionista ahora." },
      { ru: "Вы можете убрать номер сегодня утром?", uk: "Ви можете прибрати номер сьогодні вранці?", es: "¿Pueden limpiar la habitación esta mañana?" },
      { ru: "Нам нужны чистые полотенца для ванной комнаты.", uk: "Нам потрібні чисті рушники для ванної кімнати.", es: "Necesitamos toallas limpias para el baño." },
      { ru: "Мы хотим решить эту проблему в ближайшее время.", uk: "Ми хочемо вирішити цю проблему найближчим часом.", es: "Queremos solucionar este problema pronto." }
    ],
  },
  {
    id: "w12_l6",
    tab: "problemas",
    title: "En la Recepción",
    phrases: [
      { ru: "Администратор помогает мне с чемоданом.", uk: "Адміністратор допомагає мені з валізою.", es: "El recepcionista me ayuda con la maleta." },
      { ru: "Мне очень жаль, мы меняем ваш номер сейчас.", uk: "Мені дуже шкода, ми міняємо ваш номер зараз.", es: "Lo siento mucho, cambiamos su habitación ahora." },
      { ru: "Вчера я говорил с администратором о шуме.", uk: "Вчора я говорив з адміністраторкою про шум.", es: "Ayer hablé con la recepcionista sobre el ruido." },
      { ru: "Она отправила человека убрать кухню.", uk: "Вона відправила людину прибрати кухню.", es: "Ella envió a una persona a limpiar la cocina." },
      { ru: "Не могли бы вы дать мне другой ключ, пожалуйста?", uk: "Чи не могли б ви дати мені інший ключ, будь ласка?", es: "¿Podría darme otra llave, por favor?" },
      { ru: "Большое спасибо за решение проблемы.", uk: "Дуже дякую за вирішення проблеми.", es: "Muchas gracias por solucionar el problema." }
    ],
  },
  { id: "w12_m2", tab: "problemas", exam: true, mini: true, title: "Mini-examen: Problemas" },
  // ═══════════════════════════════════════════════════════
  // TAB 3: RESTAURANTE
  // ═══════════════════════════════════════════════════════
  {
    id: "w12_l7",
    tab: "restaurante",
    title: "Entrar y Pedir",
    phrases: [
      { ru: "Мы входим в ресторан и просим столик.", uk: "Ми заходимо до ресторану і просимо столик.", es: "Entramos al restaurante y pedimos la mesa." },
      { ru: "Перед едой официант приносит столовые приборы.", uk: "Перед їжею офіціант приносить столові прибори.", es: "Antes de comer, el camarero trae los cubiertos." },
      { ru: "Чтобы вытереть рот, мы используем салфетку.", uk: "Щоб витерти рот, ми використовуємо серветку.", es: "Para limpiar la boca usamos la servilleta." },
      { ru: "Перед основным блюдом мы заказываем закуски.", uk: "Перед основною стравою ми замовляємо закуски.", es: "Antes del plato principal pedimos los entrantes." },
      { ru: "Сначала мы едим первое блюдо.", uk: "Спочатку ми їмо першу страву.", es: "Primero comemos el primer plato." },
      { ru: "После первого блюда мы едим второе.", uk: "Після першої страви ми їмо другу.", es: "Después del primer plato comemos el segundo plato." }
    ],
  },
  {
    id: "w12_l8",
    tab: "restaurante",
    title: "Postre, Cuenta y Propina",
    phrases: [
      { ru: "После второго блюда мы заказываем десерт.", uk: "Після другої страви ми замовляємо десерт.", es: "Después del segundo plato pedimos el postre." },
      { ru: "В конце обеда мы просим счёт.", uk: "Наприкінці обіду ми просимо рахунок.", es: "Al final de la comida pedimos la cuenta." },
      { ru: "После оплаты мы оставляем чаевые, если мы довольны.", uk: "Після оплати ми залишаємо чайові, якщо ми задоволені.", es: "Después de pagar, dejamos la propina si estamos contentos." },
      { ru: "Мы оставляем чаевые, если нам понравилось обслуживание.", uk: "Ми залишаємо чайові, якщо нам сподобалося обслуговування.", es: "Dejamos la propina si nos gustó el servicio." },
      { ru: "На завтрашний вечер мы делаем бронь.", uk: "На завтрашній вечір ми робимо бронювання.", es: "Para mañana por la noche hacemos la reserva." },
      { ru: "Мы заказываем комплексный обед, чтобы сэкономить.", uk: "Ми замовляємо комплексний обід, щоб заощадити.", es: "Pedimos el menú del día para ahorrar." }
    ],
  },
  { id: "w12_m3", tab: "restaurante", exam: true, mini: true, title: "Mini-examen: Restaurante" },  { id: "w12_exam", exam: true, title: "Examen de la Semana 12" },
];

export default {
  id: "week12",
  type: "sentences",
  title: "Week 12: Hoteles",
  description: "Hotel bookings, amenities, and polite problem-solving at reception.",
  legacy: false,
  theory: {
    title: "Hoteles y Estancias",
    subtitle: "Reservas, servicios y cómo gestionar quejas amables",
    sections: [
      {
        type: "paragraph",
        text: "En la Semana 12 aprendemos a gestionar reservas hoteleras, consultar comodidades y resolver incidencias de manera cortés y eficaz en la recepción."
      },
      {
        type: "heading",
        text: "1. Vocabulario esencial de hotel"
      },
      {
        type: "paragraph",
        text: "Para reservar habitación y entender los servicios ofrecidos, domina estas expresiones básicas:"
      },
      {
        type: "table",
        caption: "Términos indispensables en el hotel",
        headers: ["Español", "Traducción", "Ejemplo práctico"],
        rows: [
          ["habitación individual / doble", "single / double room", "Me gustaría reservar una habitación doble."],
          ["desayuno incluido", "breakfast included", "¿El desayuno está incluido en el precio?"],
          ["aire acondicionado", "air conditioning", "El aire acondicionado funciona muy bien aquí."],
          ["la piscina", "swimming pool", "El hotel tiene una piscina muy grande."],
          ["la reserva", "reservation / booking", "Tengo una reserva a nombre de Juan."],
          ["el / la recepcionista", "receptionist", "Me gustaría hablar con el recepcionista."],
          ["el registro de entrada / la salida", "check-in / check-out", "¿A qué hora es el registro de entrada?"]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "Para formular peticiones con cortesía en español, utiliza 'Me gustaría + infinitivo' (I would like...) o '¿Podría + infinitivo...?' (Could you / Could I...?): '¿Podría pedir un traslado de habitación?'"
      },
      {
        type: "heading",
        text: "2. Gestión de incidencias y quejas amables"
      },
      {
        type: "paragraph",
        text: "Si algo no funciona en la habitación, comunícalo en recepción con estas fórmulas claras y educadas:"
      },
      {
        type: "table",
        caption: "Frases para reportar problemas",
        headers: ["Estructura", "Uso", "Ejemplo"],
        rows: [
          ["No funciona el / la...", "Aparato averiado", "No funciona el aire acondicionado en mi habitación."],
          ["Hay un problema con...", "Incidencia general", "Hay un problema con la ducha del baño."],
          ["La habitación está sucia", "Estado de limpieza", "La habitación está sucia y no hay toallas."],
          ["Pedir un traslado de habitación", "Solicitar cambio", "¿Podría pedir un traslado de habitación, por favor?"],
          ["Solucionar el problema", "Resolver incidencia", "Queremos solucionar este problema pronto."]
        ]
      },
      {
        type: "callout",
        style: "important",
        text: "Recuerda la diferencia entre 'ser' y 'estar': el precio ES caro (característica propia), pero la habitación ESTÁ sucia o ESTÁ libre (estado temporal)."
      }
    ]
  },
  tabs: [
    { id: 'reserva', label: 'Reserva' },
    { id: 'problemas', label: 'Problemas y Recepción' },
    { id: 'restaurante', label: 'Restaurante' }
  ],
  lessons: week12Lessons
};
