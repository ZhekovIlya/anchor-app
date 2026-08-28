// ========================
// WEEK 14 — "Etapas de la Vida"
// ========================
// Level: Intermediate.
// Focus: Life milestones, biography narration, and applying Pretérito Indefinido to life events.
// ========================

const week14Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: INFANCIA Y JUVENTUD
  // ═══════════════════════════════════════════════════════
  {
    id: "w14_l1",
    tab: "juventud",
    title: "Nacimiento e Infancia",
    phrases: [
      { ru: "Я родился в маленьком городе.", uk: "Я народився в маленькому місті.", es: "Yo nací en una ciudad pequeña." },
      { ru: "Моя сестра родилась в Барселоне в мае.", uk: "Моя сестра народилася в Барселоні в травні.", es: "Mi hermana nació en Barcelona en mayo." },
      { ru: "Я рос с бабушкой и дедушкой в деревне.", uk: "Я ріс з бабусею і дідусем у селі.", es: "Crecí con mis abuelos en el pueblo." },
      { ru: "Они росли вместе в одном и том же районе.", uk: "Вони росли разом в одному й тому ж районі.", es: "Ellos crecieron juntos en el mismo barrio." },
      { ru: "В десять лет моя семья переехала в Мадрид.", uk: "У десять років моя сім'я переїхала до Мадрида.", es: "A los diez años, mi familia se mudó a Madrid." },
      { ru: "Мы переехали из дома три года назад.", uk: "Ми переїхали з будинку три роки тому.", es: "Nos mudamos de casa hace tres años." }
    ],
  },
  {
    id: "w14_l2",
    tab: "juventud",
    title: "Estudios y Juventud",
    phrases: [
      { ru: "Я изучал информатику в университете.", uk: "Я вивчав інформатику в університеті.", es: "Estudié informática en la universidad." },
      { ru: "Она выпустилась с очень хорошими оценками.", uk: "Вона випустилася з дуже хорошими оцінками.", es: "Ella se graduó con muy buenas notas." },
      { ru: "Мы выпустились вместе прошлым летом.", uk: "Ми випустилися разом минулого літа.", es: "Nos graduamos juntos el verano pasado." },
      { ru: "Я начал свою первую работу в двадцать лет.", uk: "Я почав свою першу роботу у двадцять років.", es: "Empecé mi primer trabajo a los veinte años." },
      { ru: "Он завел много друзей во время учебы.", uk: "Він завів багато друзів під час навчання.", es: "Él hizo muchos amigos durante sus estudios." },
      { ru: "Я жил в студенческом общежитии.", uk: "Я жив у студентському гуртожитку.", es: "Viví en una residencia de estudiantes." }
    ],
  },
  {
    id: "w14_l3",
    tab: "juventud",
    title: "Primeros Pasos Adultos",
    phrases: [
      { ru: "Я познакомился со своим лучшим другом в школе.", uk: "Я познайомився зі своїм найкращим другом у школі.", es: "Conocí a mi mejor amigo en la escuela." },
      { ru: "Она путешествовала одна по Европе в течение года.", uk: "Вона подорожувала одна Європою протягом року.", es: "Ella viajó sola por Europa durante un año." },
      { ru: "Я снял свою первую квартиру с двумя соседями.", uk: "Я винайняв свою першу квартиру з двома сусідами.", es: "Alquilé mi primer piso con dos compañeros." },
      { ru: "Он научился водить очень молодым.", uk: "Він навчився водити дуже молодим.", es: "Él aprendió a conducir muy joven." },
      { ru: "Я решил сменить специальность через год.", uk: "Я вирішив змінити спеціальність через рік.", es: "Decidí cambiar de carrera después de un año." },
      { ru: "У нас было много незабываемых впечатлений.", uk: "У нас було багато незабутніх вражень.", es: "Tuvimos muchas experiencias inolvidables." }
    ],
  },
  { id: "w14_m1", tab: "juventud", exam: true, mini: true, title: "Mini-examen: Juventud" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: MADUREZ Y BIOGRAFÍA
  // ═══════════════════════════════════════════════════════
  {
    id: "w14_l4",
    tab: "madurez",
    title: "Familia y Madurez",
    phrases: [
      { ru: "Я познакомился со своей второй половинкой на вечеринке.", uk: "Я познайомився зі своєю другою половинкою на вечірці.", es: "Conocí a mi pareja en una fiesta." },
      { ru: "Они поженились на пляже в прошлом году.", uk: "Вони одружилися на пляжі минулого року.", es: "Ellos se casaron en la playa el año pasado." },
      { ru: "У них родился первый ребёнок пять лет назад.", uk: "У них народилася перша дитина п'ять років тому.", es: "Tuvieron su primer hijo hace cinco años." },
      { ru: "Мы купили красивый дом рядом с морем.", uk: "Ми купили гарний будинок поруч з морем.", es: "Compramos una casa bonita cerca del mar." },
      { ru: "Он сменил работу, чтобы зарабатывать больше денег.", uk: "Він змінив роботу, щоб заробляти більше грошей.", es: "Él cambió de trabajo para ganar más dinero." },
      { ru: "Они прожили десять лет в другой стране.", uk: "Вони прожили десять років в іншій країні.", es: "Vivieron diez años en otro país." }
    ],
  },
  {
    id: "w14_l5",
    tab: "madurez",
    title: "Jubilación y Recuerdos",
    phrases: [
      { ru: "Мой дедушка вышел на пенсию в шестьдесят пять лет.", uk: "Мій дідусь вийшов на пенсію в шістдесят п'ять років.", es: "Mi abuelo se jubiló a los sesenta y cinco años." },
      { ru: "Она вышла на пенсию в прошлом году после долгой карьеры.", uk: "Вона вийшла на пенсію минулого року після довгої кар'єри.", es: "Ella se jubiló el año pasado tras una larga carrera." },
      { ru: "После выхода на пенсию они много путешествовали.", uk: "Після виходу на пенсію вони багато подорожували.", es: "Después de jubilarse, ellos viajaron mucho." },
      { ru: "Мои родители отдохнули и наслаждались жизнью.", uk: "Мої батьки відпочили і насолоджувалися життям.", es: "Mis padres descansaron y disfrutaron de la vida." },
      { ru: "Она заботилась о своих внуках каждые выходные.", uk: "Вона піклувалася про своїх онуків щовихідних.", es: "Ella cuidó de sus nietos todos los fines de semana." },
      { ru: "Он прожил очень счастливую и спокойную жизнь.", uk: "Він прожив дуже щасливе і спокійне життя.", es: "Vivió una vida muy feliz y tranquila." }
    ],
  },
  {
    id: "w14_l6",
    tab: "madurez",
    title: "Biografías y Trayectoria",
    phrases: [
      { ru: "Он родился в Валенсии и умер в Севилье.", uk: "Він народився у Валенсії і помер у Севільї.", es: "Nació en Valencia y murió en Sevilla." },
      { ru: "Она посвятила всю свою жизнь медицине.", uk: "Вона присвятила все своє життя медицині.", es: "Dedicó toda su vida a la medicina." },
      { ru: "Он основал крупную компанию в девяностые годы.", uk: "Він заснував велику компанію в дев'яності роки.", es: "Fundó una empresa importante en los años noventa." },
      { ru: "В каком году ты окончил школу?", uk: "У якому році ти закінчив школу?", es: "¿En qué año te graduaste de la escuela?" },
      { ru: "Он был очень трудолюбивым и честным человеком.", uk: "Він був дуже працьовитою і чесною людиною.", es: "Fue una persona muy trabajadora y honesta." },
      { ru: "Вся его история показалась мне увлекательной.", uk: "Уся його історія здалася мені захопливою.", es: "Toda su historia me pareció fascinante." }
    ],
  },
  { id: "w14_m2", tab: "madurez", exam: true, mini: true, title: "Mini-examen: Madurez" },
  { id: "w14_exam", exam: true, title: "Examen de la Semana 14" },
];

export default {
  id: "week14",
  type: "sentences",
  title: "Week 14: Etapas de la Vida",
  description: "Life stages, biographical milestones, and narrating life events in pretérito indefinido.",
  legacy: false,
  theory: {
    title: "Etapas de la Vida y Biografía",
    subtitle: "Narrar hitos vitales con el pretérito indefinido",
    sections: [
      {
        type: "paragraph",
        text: "En la Semana 14 aplicamos el pretérito indefinido para construir biografías y relatar los momentos más significativos de la vida."
      },
      {
        type: "heading",
        text: "1. Hitos vitales: verbos clave en pretérito indefinido"
      },
      {
        type: "paragraph",
        text: "Para contar la historia vital de una persona utilizamos verbos de acción puntual completada:"
      },
      {
        type: "table",
        caption: "Verbos de etapas vitales",
        headers: ["Verbo", "Pretérito Indefinido (Él / Ella)", "Ejemplo en biografía"],
        rows: [
          ["nacer", "nació", "Nació en Valencia en mayo."],
          ["crecer", "creció", "Creció con sus abuelos en el pueblo."],
          ["mudarse", "se mudó", "A los diez años se mudó a Madrid."],
          ["graduarse", "se graduó", "Se graduó con muy buenas notas."],
          ["casarse", "se casó", "Se casaron en la playa el año pasado."],
          ["tener hijos", "tuvo un hijo / tuvieron hijos", "Tuvieron su primer hijo hace cinco años."],
          ["jubilarse", "se jubiló", "Se jubiló tras una larga carrera."],
          ["morir / fallecer", "murió / falleció", "Vivió muchos años y murió en Sevilla."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "Para expresar la edad en que ocurrió un evento biográfico, usamos la estructura 'A los + número + años': 'A los veinte años empezó a trabajar'."
      },
      {
        type: "heading",
        text: "2. Marcadores temporales biográficos"
      },
      {
        type: "paragraph",
        text: "Los conectores temporales ordenan cronológicamente las distintas fases de la trayectoria:"
      },
      {
        type: "table",
        caption: "Marcadores temporales indispensables",
        headers: ["Marcador", "Significado", "Ejemplo"],
        rows: [
          ["hace X años", "X years ago", "Nos mudamos de casa hace tres años."],
          ["el año pasado", "last year", "Ella se graduó el año pasado."],
          ["después de + infinitivo", "after doing...", "Después de jubilarse, viajaron mucho."],
          ["tras + sustantivo", "following / after...", "Se jubiló tras una larga carrera."],
          ["durante + periodo", "during...", "Hizo muchos amigos durante sus estudios."]
        ]
      },
      {
        type: "callout",
        style: "important",
        text: "Recuerda: 'Tener' es irregular en pretérito indefinido (yo tuve, tú tuviste, él tuvo, nosotros tuvimos, vosotros tuvisteis, ellos tuvieron)."
      }
    ]
  },
  tabs: [
    { id: 'juventud', label: 'Infancia y Juventud' },
    { id: 'madurez', label: 'Madurez y Biografía' }
  ],
  lessons: week14Lessons
};
