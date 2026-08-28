// ========================
// WEEK 13 — "Barrios y la Ciudad"
// ========================
// Level: Intermediate.
// Focus: Neighborhood types, urban adjectives, comparing places to live, and expressing residential preferences.
// ========================

const week13Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: TIPOS DE BARRIO
  // ═══════════════════════════════════════════════════════
  {
    id: "w13_l1",
    tab: "tipos_de_barrio",
    title: "Tipos de Barrio",
    phrases: [
      { ru: "Мой друг живёт в жилом районе.", uk: "Мій друг живе в житловому районі.", es: "Mi amigo vive en un barrio residencial." },
      { ru: "В историческом центре очень узкие улицы.", uk: "В історичному центрі дуже вузькі вулиці.", es: "El centro histórico tiene calles muy estrechas." },
      { ru: "Это коммерческий район со множеством магазинов.", uk: "Це комерційний район з багатьма магазинами.", es: "Es un barrio comercial con muchas tiendas." },
      { ru: "Фабрика находится в промышленной зоне.", uk: "Фабрика знаходиться в промисловій зоні.", es: "La fábrica está en la zona industrial." },
      { ru: "Мне нравится гулять по старому району.", uk: "Мені подобається гуляти старим районом.", es: "Me gusta pasear por el barrio antiguo." },
      { ru: "В этом современном районе есть высокие здания.", uk: "У цьому сучасному районі є високі будівлі.", es: "Este barrio moderno tiene edificios altos." }
    ],
  },
  {
    id: "w13_l2",
    tab: "tipos_de_barrio",
    title: "Cómo es tu Barrio",
    phrases: [
      { ru: "Наш район очень спокойный и зелёный.", uk: "Наш район дуже спокійний і зелений.", es: "Nuestro barrio es muy tranquilo y verde." },
      { ru: "Центральный район довольно шумный по ночам.", uk: "Центральний район досить шумний ночами.", es: "El barrio céntrico es bastante ruidoso por la noche." },
      { ru: "Этот район города очень безопасный.", uk: "Цей район міста дуже безпечний.", es: "Esta zona de la ciudad es muy segura." },
      { ru: "В рабочем районе мало парков.", uk: "У робітничому районі мало парків.", es: "Hay pocos parques en el barrio obrero." },
      { ru: "Улицы моего района всегда чистые.", uk: "Вулиці мого району завжди чисті.", es: "Las calles de mi barrio están siempre limpias." },
      { ru: "Это опасный район, чтобы гулять одному.", uk: "Це небезпечний район, щоб гуляти самому.", es: "Es un barrio peligroso para caminar solo." }
    ],
  },
  {
    id: "w13_l3",
    tab: "tipos_de_barrio",
    title: "Vida de Barrio",
    phrases: [
      { ru: "На площадях района очень оживленная атмосфера.", uk: "На площах району дуже жвава атмосфера.", es: "Hay mucho ambiente en las plazas del barrio." },
      { ru: "Соседи по моей улице очень дружелюбные.", uk: "Сусіди по моїй вулиці дуже доброзичливі.", es: "Los vecinos de mi calle son muy amables." },
      { ru: "Общественный транспорт работает хорошо в этом районе.", uk: "Громадський транспорт працює добре в цьому районі.", es: "El transporte público funciona bien en esta zona." },
      { ru: "Рядом с моим домом есть традиционный рынок.", uk: "Поруч з моїм будинком є традиційний ринок.", es: "Cerca de mi casa hay un mercado tradicional." },
      { ru: "Мы живём далеко от центра, но мы довольны.", uk: "Ми живемо далеко від центру, але ми задоволені.", es: "Vivimos lejos del centro, pero estamos contentos." },
      { ru: "Я знаю почти всех официантов района.", uk: "Я знаю майже всіх офіціантів району.", es: "Conozco a casi todos los camareros del barrio." }
    ],
  },
  { id: "w13_m1", tab: "tipos_de_barrio", exam: true, mini: true, title: "Mini-examen: Tipos de Barrio" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: COMPARAR Y PREFERIR
  // ═══════════════════════════════════════════════════════
  {
    id: "w13_l4",
    tab: "comparar",
    title: "Comparaciones Urbanas",
    phrases: [
      { ru: "Центр более шумный, чем окраина.", uk: "Центр більш шумний, ніж околиця.", es: "El centro es más ruidoso que las afueras." },
      { ru: "Эта квартира менее дорогая, чем другая.", uk: "Ця квартира менш дорога, ніж інша.", es: "Este piso es menos caro que el otro." },
      { ru: "Мой район такой же спокойный, как твой.", uk: "Мій район такий самий спокійний, як твій.", es: "Mi barrio es tan tranquilo como el tuyo." },
      { ru: "У исторического района больше шарма, чем у нового.", uk: "В історичного району більше шарму, ніж у нового.", es: "El barrio histórico tiene más encanto que el nuevo." },
      { ru: "Здесь меньше дорожного движения, чем на проспекте.", uk: "Тут менше дорожнього руху, ніж на проспекті.", es: "Aquí hay menos tráfico que en la avenida." },
      { ru: "Жизнь здесь лучше, чем в большом городе.", uk: "Життя тут краще, ніж у великому місті.", es: "La vida aquí es mejor que en la gran ciudad." }
    ],
  },
  {
    id: "w13_l5",
    tab: "comparar",
    title: "Preferencias de Vivienda",
    phrases: [
      { ru: "Я предпочитаю жить в центре, потому что там больше услуг.", uk: "Я віддаю перевагу жити в центрі, тому що там більше послуг.", es: "Prefiero vivir en el centro porque hay más servicios." },
      { ru: "Она предпочитает жилой район для своих детей.", uk: "Вона віддає перевагу житловому району для своїх дітей.", es: "Ella prefiere un barrio residencial para sus hijos." },
      { ru: "Мы предпочитаем снимать квартиру рядом с метро.", uk: "Ми віддаємо перевагу орендувати квартиру поруч з метро.", es: "Nosotros preferimos alquilar un piso cerca del metro." },
      { ru: "Почему ты предпочитаешь этот район города?", uk: "Чому ти віддаєш перевагу цьому району міста?", es: "¿Por qué prefieres esta zona de la ciudad?" },
      { ru: "Я предпочитаю платить больше за аренду, чтобы иметь больше света.", uk: "Я віддаю перевагу платити більше за оренду, щоб мати більше світла.", es: "Prefiero pagar más alquiler por tener más luz." },
      { ru: "Они предпочитают спокойствие сельской местности.", uk: "Вони віддають перевагу спокою сільської місцевості.", es: "Ellos prefieren la tranquilidad del campo." }
    ],
  },
  {
    id: "w13_l6",
    tab: "comparar",
    title: "Pros y Contras",
    phrases: [
      { ru: "Лучшее в жизни здесь — центральное расположение.", uk: "Найкраще в житті тут — центральне розташування.", es: "Lo mejor de vivir aquí es la ubicación céntrica." },
      { ru: "Худшее в районе — нехватка парковки.", uk: "Найгірше в районі — нестача парковки.", es: "Lo peor del barrio es la falta de aparcamiento." },
      { ru: "Большое преимущество — иметь супермаркет рядом.", uk: "Велика перевага — мати супермаркет поруч.", es: "Una gran ventaja es tener el supermercado al lado." },
      { ru: "Главный недостаток — стоимость аренды.", uk: "Головний недолік — вартість оренди.", es: "El inconveniente principal es el precio del alquiler." },
      { ru: "Я обожаю это место из-за его солнечных террас.", uk: "Я обожнюю це місце через його сонячні тераси.", es: "Me encanta este lugar por sus terrazas soleadas." },
      { ru: "Мне не нравится шум машин по утрам.", uk: "Мені не подобається шум машин вранці.", es: "No me gusta el ruido de los coches por la mañana." }
    ],
  },
  { id: "w13_m2", tab: "comparar", exam: true, mini: true, title: "Mini-examen: Comparar" },
  { id: "w13_exam", exam: true, title: "Examen de la Semana 13" },
];

export default {
  id: "week13",
  type: "sentences",
  title: "Week 13: Barrios y la Ciudad",
  description: "Neighborhood types, urban comparisons, and residential preferences.",
  legacy: false,
  theory: {
    title: "Barrios y Comparaciones Urbanas",
    subtitle: "Describir zonas de la ciudad y comparar dónde vivir",
    sections: [
      {
        type: "paragraph",
        text: "En la Semana 13 aprenderás a describir con precisión cualquier zona urbana, valorar los pros y contras de un barrio y construir comparaciones naturales en español."
      },
      {
        type: "heading",
        text: "1. Tipos de barrio y adjetivos descriptivos"
      },
      {
        type: "paragraph",
        text: "En las ciudades hispanohablantes distinguimos varios tipos de zonas según su actividad y trazado urbanístico:"
      },
      {
        type: "table",
        caption: "Tipos de barrio en español",
        headers: ["Español", "Traducción", "Ejemplo práctico"],
        rows: [
          ["barrio residencial", "residential neighborhood", "Mi amigo vive en un barrio residencial."],
          ["barrio histórico / antiguo", "historic / old quarter", "El centro histórico tiene calles muy estrechas."],
          ["barrio comercial", "commercial / shopping area", "Es un barrio comercial con muchas tiendas."],
          ["zona industrial", "industrial area / zone", "La fábrica está en la zona industrial."],
          ["barrio obrero", "working-class neighborhood", "Hay pocos parques en el barrio obrero."],
          ["céntrico / ruidoso / tranquilo", "central / noisy / quiet", "El barrio céntrico es bastante ruidoso."]
        ]
      },
      {
        type: "heading",
        text: "2. Estructuras de comparación"
      },
      {
        type: "paragraph",
        text: "Para contrastar dos barrios o viviendas utilizamos estructuras comparativas de superioridad, inferioridad e igualdad:"
      },
      {
        type: "table",
        caption: "Comparativos de adjetivos y sustantivos",
        headers: ["Estructura", "Significado", "Ejemplo"],
        rows: [
          ["más + adjetivo + que", "more ... than", "El centro es más ruidoso que las afueras."],
          ["menos + adjetivo + que", "less ... than", "Este piso es menos caro que el otro."],
          ["tan + adjetivo + como", "as ... as", "Mi barrio es tan tranquilo como el tuyo."],
          ["más / menos + sustantivo + que", "more / fewer ... than", "Aquí hay menos tráfico que en la avenida."],
          ["mejor que / peor que", "better than / worse than", "La vida aquí es mejor que en la gran ciudad."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "¡Ojo con los comparativos irregulares! 'Bueno' → 'mejor que' (no *más bueno*), 'malo' → 'peor que' (no *más malo*)."
      },
      {
        type: "heading",
        text: "3. Expresar ventajas, inconvenientes y preferencias"
      },
      {
        type: "paragraph",
        text: "Para justificar por qué prefieres vivir en un sitio concreto, combina 'prefiero ... porque' con el artículo neutro 'lo':"
      },
      {
        type: "table",
        caption: "Expresar pros y contras",
        headers: ["Fórmula", "Traducción", "Ejemplo"],
        rows: [
          ["Lo mejor de...", "The best thing about...", "Lo mejor de vivir aquí es la ubicación céntrica."],
          ["Lo peor de...", "The worst thing about...", "Lo peor del barrio es la falta de aparcamiento."],
          ["Una gran ventaja", "A major advantage", "Una gran ventaja es tener el supermercado al lado."],
          ["El inconveniente principal", "The main drawback", "El inconveniente principal es el precio del alquiler."],
          ["Prefiero... porque...", "I prefer... because...", "Prefiero vivir en el centro porque hay más servicios."]
        ]
      },
      {
        type: "callout",
        style: "important",
        text: "El artículo neutro 'lo' se usa con adjetivos superlativos relativos para sustantivar la cualidad: 'lo mejor' (the best thing), 'lo peor' (the worst thing), 'lo más importante' (the most important thing)."
      }
    ]
  },
  tabs: [
    { id: 'tipos_de_barrio', label: 'Tipos de Barrio' },
    { id: 'comparar', label: 'Comparar y Preferir' }
  ],
  lessons: week13Lessons
};
