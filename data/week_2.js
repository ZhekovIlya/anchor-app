const week2Lessons = [
  {
    id: "w2_l1",
    title: "Lesson 1: Survival & Intentions (Hablar & Querer)",
    phrases: [
      {
        ru: "Я говорю немного по-испански",
        es: "Yo hablo poco español",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "hablo", type: "verb"},
          {text: " ", type: "space"},
          {text: "poco español", type: "object"}
        ],
        meta: {id: "hablar_pres_yo_poco", lemma: "hablar", person: "yo", polarity: "affirmative", tense: "present", tags: ["survival"]}
      },
      {
        ru: "Я не говорю хорошо",
        es: "Yo no hablo bien",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "no", type: "negation"},
          {text: " ", type: "space"},
          {text: "hablo", type: "verb"},
          {text: " ", type: "space"},
          {text: "bien", type: "object"}
        ],
        meta: {id: "hablar_pres_yo_neg_bien", lemma: "hablar", person: "yo", polarity: "negative", tense: "present", tags: ["survival"]}
      },
      {
        ru: "Я хочу посмотреть квартиру",
        es: "Yo quiero ver el piso",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "quiero", type: "verb"},
          {text: " ", type: "space"},
          {text: "ver", type: "verb_infinitive"},
          {text: " ", type: "space"},
          {text: "el piso", type: "object"}
        ],
        meta: {id: "querer_pres_yo_ver_piso", lemma: "querer", person: "yo", polarity: "affirmative", tense: "present", tags: ["intention", "real_estate"]}
      },
      {
        ru: "Мы хотим арендовать",
        es: "Nosotros queremos alquilar",
        tokens: [
          {text: "Nosotros", type: "subject"},
          {text: " ", type: "space"},
          {text: "queremos", type: "verb"},
          {text: " ", type: "space"},
          {text: "alquilar", type: "verb_infinitive"}
        ],
        meta: {id: "querer_pres_nosotros_alquilar", lemma: "querer", person: "nosotros", polarity: "affirmative", tense: "present", tags: ["intention", "real_estate"]}
      }
    ]
  },
  {
    id: "w2_l2",
    title: "Lesson 2: Apartment Viewing - Appliances (Tener)",
    phrases: [
      {
        ru: "В квартире есть отопление?",
        es: "¿El piso tiene calefacción?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "El piso", type: "subject"},
          {text: " ", type: "space"},
          {text: "tiene", type: "verb"},
          {text: " ", type: "space"},
          {text: "calefacción?", type: "object"}
        ],
        meta: {id: "tener_pres_el_calefaccion", lemma: "tener", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate", "appliances"]}
      },
      {
        ru: "В квартире есть кондиционер?",
        es: "¿El piso tiene aire acondicionado?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "El piso", type: "subject"},
          {text: " ", type: "space"},
          {text: "tiene", type: "verb"},
          {text: " ", type: "space"},
          {text: "aire acondicionado?", type: "object"}
        ],
        meta: {id: "tener_pres_el_aire", lemma: "tener", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate", "appliances"]}
      },
      {
        ru: "На кухне есть холодильник?",
        es: "¿La cocina tiene nevera?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "La cocina", type: "subject"},
          {text: " ", type: "space"},
          {text: "tiene", type: "verb"},
          {text: " ", type: "space"},
          {text: "nevera?", type: "object"}
        ],
        meta: {id: "tener_pres_ella_nevera", lemma: "tener", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate", "appliances"]}
      },
      {
        ru: "На кухне есть посудомоечная машина?",
        es: "¿La cocina tiene lavavajillas?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "La cocina", type: "subject"},
          {text: " ", type: "space"},
          {text: "tiene", type: "verb"},
          {text: " ", type: "space"},
          {text: "lavavajillas?", type: "object"}
        ],
        meta: {id: "tener_pres_ella_lavavajillas", lemma: "tener", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate", "appliances"]}
      },
      {
        ru: "Здесь есть стиральная машина?",
        es: "¿Aquí tiene lavadora?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Aquí", type: "object"},
          {text: " ", type: "space"},
          {text: "tiene", type: "verb"},
          {text: " ", type: "space"},
          {text: "lavadora?", type: "object"}
        ],
        meta: {id: "tener_pres_el_lavadora", lemma: "tener", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate", "appliances"]}
      }
    ]
  },
  {
    id: "w2_l3",
    title: "Lesson 3: Apartment Viewing - Costs (Ser, Estar, Poder)",
    phrases: [
      {
        ru: "Комуналка (расходы) включена?",
        es: "¿Los gastos están incluidos?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Los gastos", type: "subject"},
          {text: " ", type: "space"},
          {text: "están", type: "verb"},
          {text: " ", type: "space"},
          {text: "incluidos?", type: "object"}
        ],
        meta: {id: "estar_pres_ellos_incluidos", lemma: "estar", person: "ellos", polarity: "interrogative", tense: "present", tags: ["real_estate", "finance"]}
      },
      {
        ru: "Сколько стоит комуналка?",
        es: "¿Cuánto son los gastos?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Cuánto", type: "object"},
          {text: " ", type: "space"},
          {text: "son", type: "verb"},
          {text: " ", type: "space"},
          {text: "los gastos?", type: "subject"}
        ],
        meta: {id: "ser_pres_ellos_gastos", lemma: "ser", person: "ellos", polarity: "interrogative", tense: "present", tags: ["real_estate", "finance"]}
      },
      {
        ru: "Сколько всего чтобы заехать?",
        es: "¿Cuánto es el total para entrar?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Cuánto", type: "object"},
          {text: " ", type: "space"},
          {text: "es", type: "verb"},
          {text: " ", type: "space"},
          {text: "el total para entrar?", type: "subject"}
        ],
        meta: {id: "ser_pres_el_total", lemma: "ser", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate", "finance"]}
      },
      {
        ru: "Я могу заплатить",
        es: "Yo puedo pagar",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "puedo", type: "verb"},
          {text: " ", type: "space"},
          {text: "pagar", type: "verb_infinitive"}
        ],
        meta: {id: "poder_pres_yo_pagar", lemma: "poder", person: "yo", polarity: "affirmative", tense: "present", tags: ["finance"]}
      }
    ]
  },
  {
    id: "w2_l4",
    title: "Lesson 4: The Intercom & Arrival (Estar, Ser, Ir)",
    phrases: [
      {
        ru: "Я нахожусь здесь",
        es: "Yo estoy aquí",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "estoy", type: "verb"},
          {text: " ", type: "space"},
          {text: "aquí", type: "object"}
        ],
        meta: {id: "estar_pres_yo_aqui", lemma: "estar", person: "yo", polarity: "affirmative", tense: "present", tags: ["location"]}
      },
      {
        ru: "Я нахожусь на улице",
        es: "Yo estoy en la calle",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "estoy", type: "verb"},
          {text: " ", type: "space"},
          {text: "en la calle", type: "object"}
        ],
        meta: {id: "estar_pres_yo_calle", lemma: "estar", person: "yo", polarity: "affirmative", tense: "present", tags: ["location"]}
      },
      {
        ru: "Куда я иду?",
        es: "¿A dónde voy?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "A dónde", type: "object"},
          {text: " ", type: "space"},
          {text: "voy?", type: "verb"}
        ],
        meta: {id: "ir_pres_yo_donde", lemma: "ir", person: "yo", polarity: "interrogative", tense: "present", tags: ["motion", "direction"]}
      },
      {
        ru: "Какой это этаж?",
        es: "¿Qué piso es?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Qué piso", type: "subject"},
          {text: " ", type: "space"},
          {text: "es?", type: "verb"}
        ],
        meta: {id: "ser_pres_el_piso", lemma: "ser", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate"]}
      },
      {
        ru: "Какая это дверь?",
        es: "¿Qué puerta es?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Qué puerta", type: "subject"},
          {text: " ", type: "space"},
          {text: "es?", type: "verb"}
        ],
        meta: {id: "ser_pres_la_puerta", lemma: "ser", person: "el", polarity: "interrogative", tense: "present", tags: ["real_estate"]}
      }
    ]
  },
  {
    id: "w2_l5",
    title: "Lesson 5: The Bank (Tener, Querer, Necesitar)",
    phrases: [
      {
        ru: "У меня есть счет",
        es: "Yo tengo una cuenta",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "tengo", type: "verb"},
          {text: " ", type: "space"},
          {text: "una cuenta", type: "object"}
        ],
        meta: {id: "tener_pres_yo_cuenta", lemma: "tener", person: "yo", polarity: "affirmative", tense: "present", tags: ["finance"]}
      },
      {
        ru: "Мне нужно обновить документы",
        es: "Yo necesito actualizar los documentos",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "necesito", type: "verb"},
          {text: " ", type: "space"},
          {text: "actualizar", type: "verb_infinitive"},
          {text: " ", type: "space"},
          {text: "los documentos", type: "object"}
        ],
        meta: {id: "necesitar_pres_yo_actualizar", lemma: "necesitar", person: "yo", polarity: "affirmative", tense: "present", tags: ["bureaucracy"]}
      },
      {
        ru: "У меня есть наличные",
        es: "Yo tengo dinero en efectivo",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "tengo", type: "verb"},
          {text: " ", type: "space"},
          {text: "dinero en efectivo", type: "object"}
        ],
        meta: {id: "tener_pres_yo_efectivo", lemma: "tener", person: "yo", polarity: "affirmative", tense: "present", tags: ["finance"]}
      },
      {
        ru: "Я хочу положить (внести) наличные",
        es: "Yo quiero ingresar dinero en efectivo",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "quiero", type: "verb"},
          {text: " ", type: "space"},
          {text: "ingresar", type: "verb_infinitive"},
          {text: " ", type: "space"},
          {text: "dinero en efectivo", type: "object"}
        ],
        meta: {id: "querer_pres_yo_ingresar", lemma: "querer", person: "yo", polarity: "affirmative", tense: "present", tags: ["finance"]}
      }
    ]
  },
  {
    id: "w2_l6",
    title: "Lesson 6: Bureaucracy (Tener, Necesitar, Poder, Hacer)",
    phrases: [
      {
        ru: "У меня контракт в процессе",
        es: "Yo tengo un contrato en proceso",
        tokens: [
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "tengo", type: "verb"},
          {text: " ", type: "space"},
          {text: "un contrato en proceso", type: "object"}
        ],
        meta: {id: "tener_pres_yo_contrato", lemma: "tener", person: "yo", polarity: "affirmative", tense: "present", tags: ["bureaucracy"]}
      },
      {
        ru: "Мне нужна страховка?",
        es: "¿Yo necesito un seguro?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Yo", type: "subject"},
          {text: " ", type: "space"},
          {text: "necesito", type: "verb"},
          {text: " ", type: "space"},
          {text: "un seguro?", type: "object"}
        ],
        meta: {id: "necesitar_pres_yo_seguro", lemma: "necesitar", person: "yo", polarity: "interrogative", tense: "present", tags: ["bureaucracy", "finance"]}
      },
      {
        ru: "Ты можешь помочь?",
        es: "¿Tú puedes ayudar?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Tú", type: "subject"},
          {text: " ", type: "space"},
          {text: "puedes", type: "verb"},
          {text: " ", type: "space"},
          {text: "ayudar?", type: "verb_infinitive"}
        ],
        meta: {id: "poder_pres_tu_ayudar", lemma: "poder", person: "tu", polarity: "interrogative", tense: "present", tags: ["survival"]}
      },
      {
        ru: "Что мы делаем сейчас?",
        es: "¿Qué hacemos ahora?",
        tokens: [
          {text: "¿", type: "space"},
          {text: "Qué", type: "object"},
          {text: " ", type: "space"},
          {text: "hacemos", type: "verb"},
          {text: " ", type: "space"},
          {text: "ahora?", type: "object"}
        ],
        meta: {id: "hacer_pres_nosotros_ahora", lemma: "hacer", person: "nosotros", polarity: "interrogative", tense: "present", tags: ["survival"]}
      }
    ]
  },
  {
    id: "w2_exam",
    title: "🏆 Week 2 Final Exam",
    exam: true,
    phrases: []
  }
];

window.AnchorData.push({
  id: "week_2",
  title: "Week 2: Survival Scenarios",
  description: "Apartments, Banks, and Next Steps using Core Verbs.",
  legacy: false,
  lessons: week2Lessons
});
