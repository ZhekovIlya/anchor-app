// ========================
// WEEK 11 — "Pretérito Indefinido: Todas las Personas"
// ========================
// Level: Intermediate.
// Focus: Regular preterite endings for vosotros (-asteis/-isteis) and ellos/ellas/ustedes (-aron/-ieron),
// plus the top 5 core irregular preterite verbs: ir/ser (fue), tener (tuvo), estar (estuvo), hacer (hizo), poder (pudo).
// Note: Other irregulars (querer, venir, decir, poner, traer) are intentionally deferred to a later week to avoid overload.
// ========================

const week11Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: PERSONAS NUEVAS (Vosotros y Ellos/Ellas/Ustedes)
  // ═══════════════════════════════════════════════════════
  {
    id: "w11_l1",
    tab: "personas_nuevas",
    title: "Ellos y Ellas: Pasado Regular",
    phrases: [
      { ru: "Вчера они поговорили с администратором.", uk: "Учора вони поговорили з адміністратором.", es: "Ayer ellos hablaron con el recepcionista." },
      { ru: "Мои друзья купили билеты на поезд на прошлой неделе.", uk: "Мої друзі купили квитки на потяг минулого тижня.", es: "Mis amigos compraron billetes de tren la semana pasada." },
      { ru: "Они поели в ресторане в центре вчера вечером.", uk: "Вони поїли в ресторані в центрі вчора ввечері.", es: "Ellas comieron en un restaurante del centro anoche." },
      { ru: "Туристы прожили один год в Барселоне.", uk: "Туристи прожили один рік у Барселоні.", es: "Los turistas vivieron un año en Barcelona." },
      { ru: "Вы прибыли вовремя на станцию?", uk: "Ви прибули вчасно на станцію?", es: "¿Ustedes llegaron a tiempo a la estación?" },
      { ru: "Они открыли дверь ключом.", uk: "Вони відкрили двері ключем.", es: "Ellos abrieron la puerta con la llave." }
    ],
  },
  {
    id: "w11_l2",
    tab: "personas_nuevas",
    title: "Vosotros: Pasado Regular",
    phrases: [
      { ru: "Вы (мн.) говорили с врачом вчера?", uk: "Ви (мн.) говорили з лікарем учора?", es: "¿Vosotros hablasteis con el médico ayer?" },
      { ru: "Вы (мн.) купили хлеб в пекарне.", uk: "Ви (мн.) купили хліб у пекарні.", es: "Vosotros comprasteis el pan en la panadería." },
      { ru: "Во сколько вы (мн.) поели вчера?", uk: "О котрій годині ви (мн.) поїли вчора?", es: "¿A qué hora comisteis vosotros ayer?" },
      { ru: "Вы (мн.) прожили в этом районе три года.", uk: "Ви (мн.) прожили в цьому районі три роки.", es: "Vosotros vivisteis en este barrio tres años." },
      { ru: "Вы (мн.) вышли очень поздно с вечеринки.", uk: "Ви (мн.) вийшли дуже пізно з вечірки.", es: "Vosotros salisteis muy tarde de la fiesta." },
      { ru: "Почему вы (мн.) не ответили на моё сообщение вчера вечером?", uk: "Чому ви (мн.) не відповіли на моє повідомлення вчора ввечері?", es: "¿Por qué no respondisteis a mi mensaje anoche?" }
    ],
  },
  {
    id: "w11_l3",
    tab: "personas_nuevas",
    title: "Todas las Personas: Práctica",
    phrases: [
      { ru: "Мы ждали автобус, а они приехали на такси.", uk: "Ми чекали на автобус, а вони приїхали на таксі.", es: "Nosotros esperamos el autobús y ellos llegaron en taxi." },
      { ru: "Я купил еду, а вы (мн.) заплатили за напиток.", uk: "Я купив їжу, а ви (мн.) заплатили за напій.", es: "Yo compré la comida y vosotros pagasteis la bebida." },
      { ru: "Ты закрыл дверь, а они открыли окно.", uk: "Ти зачинив двері, а вони відчинили вікно.", es: "Tú cerraste la puerta y ellos abrieron la ventana." },
      { ru: "Вы (мн.) поняли объяснение преподавателя?", uk: "Ви (мн.) зрозуміли пояснення викладача?", es: "¿Vosotros entendisteis la explicación del profesor?" },
      { ru: "Она написала письмо, а они ответили быстро.", uk: "Вона написала листа, а вони відповіли швидко.", es: "Ella escribió una carta y ellos respondieron rápido." },
      { ru: "Мы посетили музей в прошлое воскресенье.", uk: "Ми відвідали музей минулої неділі.", es: "Nosotros visitamos el museo el domingo pasado." }
    ],
  },
  { id: "w11_m1", tab: "personas_nuevas", exam: true, mini: true, title: "Mini-examen: Personas Nuevas" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: VERBOS IRREGULARES (5 irregulares clave)
  // ═══════════════════════════════════════════════════════
  {
    id: "w11_l4",
    tab: "verbos_irregulares",
    title: "Ir, Ser y Estar en Pasado",
    phrases: [
      { ru: "Вчера я пошёл в супермаркет во второй половине дня.", uk: "Учора я пішов до супермаркету по обіді.", es: "Ayer yo fui al supermercado por la tarde." },
      { ru: "Ты ходил на пляж на выходных?", uk: "Ти ходив на пляж на вихідних?", es: "¿Tú fuiste a la playa el fin de semana?" },
      { ru: "Поездка в Мадрид была очень интересной.", uk: "Поїздка до Мадрида була дуже цікавою.", es: "El viaje a Madrid fue muy interesante." },
      { ru: "Я был дома всё воскресенье.", uk: "Я був удома всю неділю.", es: "Yo estuve en casa todo el domingo." },
      { ru: "Ты болел на прошлой неделе?", uk: "Ти хворів минулого тижня?", es: "¿Estuviste enfermo la semana pasada?" },
      { ru: "Мой брат был в больнице два дня.", uk: "Мій брат був у лікарні два дні.", es: "Mi hermano estuvo en el hospital dos días." }
    ],
  },
  {
    id: "w11_l5",
    tab: "verbos_irregulares",
    title: "Hacer y Poder en Pasado",
    phrases: [
      { ru: "Вчера я занимался спортом утром.", uk: "Учора я займався спортом вранці.", es: "Ayer yo hice deporte por la mañana." },
      { ru: "Что ты делал вчера вечером?", uk: "Що ти робив учора ввечері?", es: "¿Qué hiciste tú ayer por la noche?" },
      { ru: "Она сделала очень вкусный яблочный пирог.", uk: "Вона зробила дуже смачний яблучний пиріг.", es: "Ella hizo una tarta de manzana muy rica." },
      { ru: "Я не смог хорошо поспать из-за шума на улице.", uk: "Я не зміг добре поспати через шум на вулиці.", es: "No pude dormir bien por el ruido de la calle." },
      { ru: "Ты смог поговорить с администратором отеля?", uk: "Ти зміг поговорити з адміністратором готелю?", es: "¿Pudiste hablar con el recepcionista del hotel?" },
      { ru: "Он не смог прийти на урок, потому что был уставшим.", uk: "Він не зміг прийти на урок, тому що був втомленим.", es: "Él no pudo venir a la clase porque estuvo cansado." }
    ],
  },
  {
    id: "w11_l6",
    tab: "verbos_irregulares",
    title: "Tener y Repaso de Irregulares",
    phrases: [
      { ru: "Вчера у меня была очень долгая встреча на работе.", uk: "Учора в мене була дуже довга зустріч на роботі.", es: "Ayer tuve una reunión muy larga en el trabajo." },
      { ru: "У тебя было время отдохнуть в субботу?", uk: "У тебе був час відпочити в суботу?", es: "¿Tuviste tiempo para descansar el sábado?" },
      { ru: "У неё возникла проблема с кондиционером.", uk: "У неї виникла проблема з кондиціонером.", es: "Ella tuvo un problema con el aire acondicionado." },
      { ru: "Я был в центре, а потом пошёл в кино.", uk: "Я був у центрі, а потім пішов у кіно.", es: "Yo estuve en el centro y luego fui al cine." },
      { ru: "Кто сделал эту бронь в отеле?", uk: "Хто зробив цю бронь у готелі?", es: "¿Quién hizo esta reserva de hotel?" },
      { ru: "У нас не было проблем во время поездки.", uk: "У нас не було проблем під час поїздки.", es: "No tuvimos problemas durante el viaje." }
    ],
  },
  { id: "w11_m2", tab: "verbos_irregulares", exam: true, mini: true, title: "Mini-examen: Verbos Irregulares" },
  { id: "w11_exam", exam: true, title: "Examen de la Semana 11" },
];

export default {
  id: "week11",
  type: "sentences",
  title: "Week 11: Pretérito Indefinido: Todas las Personas",
  description: "Complete regular preterite paradigm and the 5 essential irregular verbs in Spanish.",
  legacy: false,
  theory: {
    title: "Pretérito Indefinido: Paradigma Completo",
    subtitle: "Conjugación regular completa y los 5 verbos irregulares clave",
    sections: [
      {
        type: "paragraph",
        text: "En la Semana 11 completamos el paradigma del pretérito indefinido aprendiendo las terminaciones de vosotros y ellos/ellas/ustedes, junto a los 5 verbos irregulares más frecuentes del español."
      },
      {
        type: "heading",
        text: "1. Paradigma regular completo: -AR vs -ER / -IR"
      },
      {
        type: "paragraph",
        text: "Observa las terminaciones para todas las personas gramaticales. Recuerda que los verbos en -ER e -IR comparten exactamente las mismas terminaciones en pretérito indefinido."
      },
      {
        type: "table",
        caption: "Conjugación regular completa en pretérito indefinido",
        headers: ["Pronombre", "-AR (Hablar)", "-ER / -IR (Comer / Vivir)"],
        rows: [
          ["Yo", "hablé", "comí / viví"],
          ["Tú", "hablaste", "comiste / viviste"],
          ["Él / Ella / Usted", "habló", "comió / vivió"],
          ["Nosotros / Nosotras", "hablamos", "comimos / vivimos"],
          ["Vosotros / Vosotras", "hablasteis", "comisteis / vivisteis"],
          ["Ellos / Ellas / Ustedes", "hablaron", "comieron / vivieron"]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "Fíjate en los acentos escritos: solo la primera persona singular (yo hablé / comí) y la tercera persona singular (él habló / comió) llevan tilde. Las formas de vosotros (-asteis / -isteis) y ellos (-aron / -ieron) NO llevan tilde."
      },
      {
        type: "heading",
        text: "2. Los 5 verbos irregulares fundamentales"
      },
      {
        type: "paragraph",
        text: "Estos cinco verbos tienen raíces y terminaciones especiales en pretérito indefinido. No llevan tildes en sus formas irregulares:"
      },
      {
        type: "table",
        caption: "Formas de los 5 verbos irregulares clave",
        headers: ["Infinitivo", "Yo", "Tú", "Él / Ella / Usted", "Ejemplo práctico"],
        rows: [
          ["ir / ser", "fui", "fuiste", "fue", "Ayer fui al supermercado. / El viaje fue genial."],
          ["tener", "tuve", "tuviste", "tuvo", "Tuve una reunión muy larga."],
          ["estar", "estuve", "estuviste", "estuvo", "Estuve en casa todo el domingo."],
          ["hacer", "hice", "hiciste", "hizo", "Ayer hice deporte por la mañana."],
          ["poder", "pude", "pudiste", "pudo", "No pude dormir bien por el ruido."]
        ]
      },
      {
        type: "callout",
        style: "important",
        text: "Los verbos irregulares en indefinido no siguen las terminaciones regulares y no tienen reglas deductivas: se memorizan directamente como bloques léxicos de alta frecuencia."
      },
      {
        type: "callout",
        style: "tip",
        text: "Para repasar cuándo usar el pretérito indefinido frente al imperfecto o pretérito perfecto, consulta la guía de la Semana 7 (acciones completadas en un momento puntual del pasado)."
      }
    ]
  },
  tabs: [
    { id: 'personas_nuevas', label: 'Personas Nuevas' },
    { id: 'verbos_irregulares', label: 'Verbos Irregulares' }
  ],
  lessons: week11Lessons
};
