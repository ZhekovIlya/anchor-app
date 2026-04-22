const week2Lessons = [
  {
    id: "w2_l1",
    person: "yo",
    title: "Apartment Intentions",
    phrases: [
      {
        ru: "Я хочу квартиру",
        uk: "Я хочу квартиру",
        es: "Yo quiero el piso",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiero",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_yo_piso_aff",
          lemma: "querer",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не хочу квартиру",
        uk: "Я не хочу квартиру",
        es: "Yo no quiero el piso",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiero",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_yo_piso_neg",
          lemma: "querer",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я готов",
        uk: "Я готовий",
        es: "Yo estoy listo",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "estoy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listo",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_yo_listo_aff",
          lemma: "estar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Я готов?",
        uk: "Я готовий?",
        es: "¿Yo estoy listo?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "estoy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listo?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_yo_listo_int",
          lemma: "estar",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Я хочу арендовать",
        uk: "Я хочу орендувати",
        es: "Yo quiero alquilar",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiero",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_yo_alquilar_aff",
          lemma: "querer",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не хочу арендовать",
        uk: "Я не хочу орендувати",
        es: "Yo no quiero alquilar",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiero",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_yo_alquilar_neg",
          lemma: "querer",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l2",
    person: "tu",
    title: "Apartment Intentions",
    phrases: [
      {
        ru: "Ты хочешь квартиру?",
        uk: "Ти хочеш квартиру?",
        es: "¿Tú quieres el piso?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_tu_piso_int",
          lemma: "querer",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не хочешь квартиру",
        uk: "Ти не хочеш квартиру",
        es: "Tú no quieres el piso",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_tu_piso_neg",
          lemma: "querer",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты хочешь арендовать?",
        uk: "Ти хочеш орендувати?",
        es: "¿Tú quieres alquilar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_tu_alquilar_int",
          lemma: "querer",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты готов",
        uk: "Ти готовий",
        es: "Tú estás listo",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "estás",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listo",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_tu_listo_aff",
          lemma: "estar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Ты не готов",
        uk: "Ти не готовий",
        es: "Tú no estás listo",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "estás",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listo",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_tu_listo_neg",
          lemma: "estar",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Ты хочешь квартиру",
        uk: "Ти хочеш квартиру",
        es: "Tú quieres el piso",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_tu_piso_aff",
          lemma: "querer",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l3",
    person: "el_ella_usted",
    title: "Apartment Intentions",
    phrases: [
      {
        ru: "Он хочет квартиру",
        uk: "Він хоче квартиру",
        es: "Él quiere el piso",
        tokens: [
          {
            text: "Él",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiere",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_el_piso_aff",
          lemma: "querer",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Она не хочет квартиру",
        uk: "Вона не хоче квартиру",
        es: "Ella no quiere el piso",
        tokens: [
          {
            text: "Ella",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiere",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_ella_piso_neg",
          lemma: "querer",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы (вежливо) хотите арендовать?",
        uk: "Ви (ввічливо) хочете орендувати?",
        es: "¿Usted quiere alquilar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Usted",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quiere",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_usted_alquilar_int",
          lemma: "querer",
          person: "usted",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Она готова",
        uk: "Вона готова",
        es: "Ella está lista",
        tokens: [
          {
            text: "Ella",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "está",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "lista",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_ella_lista_aff",
          lemma: "estar",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Он маленький?",
        uk: "Він маленький?",
        es: "¿Él es pequeño?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Él",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pequeño?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_ser_el_pequeno_int",
          lemma: "ser",
          person: "el",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Вы (вежливо) хороший?",
        uk: "Ви (ввічливо) добрий?",
        es: "¿Usted es bueno?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Usted",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bueno?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_ser_usted_bueno_int",
          lemma: "ser",
          person: "usted",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      }
    ]
  },
  {
    id: "w2_l4",
    person: "nosotros",
    title: "Apartment Intentions",
    phrases: [
      {
        ru: "Мы хотим квартиру",
        uk: "Ми хочемо квартиру",
        es: "Nosotros queremos el piso",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "queremos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_nos_piso_aff",
          lemma: "querer",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не хотим квартиру",
        uk: "Ми не хочемо квартиру",
        es: "Nosotros no queremos el piso",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "queremos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_nos_piso_neg",
          lemma: "querer",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы хотим арендовать?",
        uk: "Ми хочемо орендувати?",
        es: "¿Nosotros queremos alquilar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "queremos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_nos_alquilar_int",
          lemma: "querer",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы готовы",
        uk: "Ми готові",
        es: "Nosotros estamos listos",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "estamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_nos_listos_aff",
          lemma: "estar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Мы хорошие?",
        uk: "Ми добрі?",
        es: "¿Nosotros somos buenos?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "somos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "buenos?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_ser_nos_buenos_int",
          lemma: "ser",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы хотим арендовать",
        uk: "Ми хочемо орендувати",
        es: "Nosotros queremos alquilar",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "queremos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_nos_alquilar_aff",
          lemma: "querer",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l5",
    person: "ellos_ellas_ustedes",
    title: "Apartment Intentions",
    phrases: [
      {
        ru: "Они (м.р.) хотят квартиру?",
        uk: "Вони (ч.р.) хочуть квартиру?",
        es: "¿Ellos quieren el piso?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ellos",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieren",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_ellos_piso_int",
          lemma: "querer",
          person: "ellos",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (ж.р.) не хотят арендовать",
        uk: "Вони (ж.р.) не хочуть орендувати",
        es: "Ellas no quieren alquilar",
        tokens: [
          {
            text: "Ellas",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieren",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_ellas_alquilar_neg",
          lemma: "querer",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы (мн.ч.) хотите квартиру?",
        uk: "Ви (мн.) хочете квартиру?",
        es: "¿Ustedes quieren el piso?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ustedes",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieren",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el piso?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_querer_ustedes_piso_int",
          lemma: "querer",
          person: "ustedes",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "real_estate"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (м.р.) готовы?",
        uk: "Вони (ч.р.) готові?",
        es: "¿Ellos están listos?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ellos",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "están",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listos?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_estar_ellos_listos_int",
          lemma: "estar",
          person: "ellos",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Они (ж.р.) большие",
        uk: "Вони (ж.р.) великі",
        es: "Ellas son grandes",
        tokens: [
          {
            text: "Ellas",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "son",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "grandes",
            type: "adjective"
          }
        ],
        meta: {
          id: "w2_ser_ellas_grandes_aff",
          lemma: "ser",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Вы (мн.ч.) хотите арендовать",
        uk: "Ви (мн.) хочете орендувати",
        es: "Ustedes quieren alquilar",
        tokens: [
          {
            text: "Ustedes",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "quieren",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "alquilar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_querer_ustedes_alquilar_aff",
          lemma: "querer",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l6",
    person: "yo",
    title: "Capabilities & Tools",
    phrases: [
      {
        ru: "Я могу заплатить",
        uk: "Я можу заплатити",
        es: "Yo puedo pagar",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_yo_pagar_aff",
          lemma: "poder",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не могу заплатить",
        uk: "Я не можу заплатити",
        es: "Yo no puedo pagar",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_yo_pagar_neg",
          lemma: "poder",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У меня есть деньги",
        uk: "У мене є гроші",
        es: "Yo tengo el dinero",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tengo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el dinero",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_yo_dinero_aff",
          lemma: "tener",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У меня есть стиральная машина?",
        uk: "У мене є пральна машина?",
        es: "¿Yo tengo la lavadora?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tengo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "la lavadora?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_yo_lavadora_int",
          lemma: "tener",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У меня нет холодильника",
        uk: "У мене немає холодильника",
        es: "Yo no tengo nevera",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tengo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "nevera",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_yo_nevera_neg",
          lemma: "tener",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я могу пойти туда?",
        uk: "Я можу піти туди?",
        es: "¿Yo puedo ir allí?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ir",
            type: "verb_infinitive"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí?",
            type: "adverb"
          }
        ],
        meta: {
          id: "w2_poder_yo_ir_int",
          lemma: "poder",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l7",
    person: "tu",
    title: "Capabilities & Tools",
    phrases: [
      {
        ru: "Ты можешь заплатить",
        uk: "Ти можеш заплатити",
        es: "Tú puedes pagar",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_tu_pagar_aff",
          lemma: "poder",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не можешь заплатить",
        uk: "Ти не можеш заплатити",
        es: "Tú no puedes pagar",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_tu_pagar_neg",
          lemma: "poder",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У тебя есть время",
        uk: "У тебе є час",
        es: "Tú tienes el tiempo",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tienes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_tu_tiempo_aff",
          lemma: "tener",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У тебя есть стиральная машина?",
        uk: "У тебе є пральна машина?",
        es: "¿Tú tienes la lavadora?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tienes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "la lavadora?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_tu_lavadora_int",
          lemma: "tener",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты можешь пойти домой?",
        uk: "Ти можеш піти додому?",
        es: "¿Tú puedes ir a casa?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ir",
            type: "verb_infinitive"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a casa?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_poder_tu_ir_casa_int",
          lemma: "poder",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не можешь пойти",
        uk: "Ти не можеш піти",
        es: "Tú no puedes ir",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ir",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_tu_ir_neg",
          lemma: "poder",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l8",
    person: "el_ella_usted",
    title: "Capabilities & Tools",
    phrases: [
      {
        ru: "Он может заплатить?",
        uk: "Він може заплатити?",
        es: "¿Él puede pagar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Él",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puede",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_el_pagar_int",
          lemma: "poder",
          person: "el",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Она не может заплатить",
        uk: "Вона не може заплатити",
        es: "Ella no puede pagar",
        tokens: [
          {
            text: "Ella",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puede",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_ella_pagar_neg",
          lemma: "poder",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы (вежливо) можете заплатить?",
        uk: "Ви (ввічливо) можете заплатити?",
        es: "¿Usted puede pagar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Usted",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puede",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_usted_pagar_int",
          lemma: "poder",
          person: "usted",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нее есть стиральная машина?",
        uk: "У неї є пральна машина?",
        es: "¿Ella tiene la lavadora?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ella",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tiene",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "la lavadora?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_ella_lavadora_int",
          lemma: "tener",
          person: "ella",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У него нет холодильника",
        uk: "У нього немає холодильника",
        es: "Él no tiene nevera",
        tokens: [
          {
            text: "Él",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tiene",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "nevera",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_el_nevera_neg",
          lemma: "tener",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы (вежливо) имеете холодильник?",
        uk: "Ви (ввічливо) маєте холодильник?",
        es: "¿Usted tiene nevera?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Usted",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tiene",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "nevera?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_usted_nevera_int",
          lemma: "tener",
          person: "usted",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l9",
    person: "nosotros",
    title: "Capabilities & Tools",
    phrases: [
      {
        ru: "Мы можем заплатить",
        uk: "Ми можемо заплатити",
        es: "Nosotros podemos pagar",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "podemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_nos_pagar_aff",
          lemma: "poder",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не можем заплатить",
        uk: "Ми не можемо заплатити",
        es: "Nosotros no podemos pagar",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "podemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_nos_pagar_neg",
          lemma: "poder",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нас есть время",
        uk: "У нас є час",
        es: "Nosotros tenemos el tiempo",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tenemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_nos_tiempo_aff",
          lemma: "tener",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нас есть стиральная машина?",
        uk: "У нас є пральна машина?",
        es: "¿Nosotros tenemos la lavadora?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tenemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "la lavadora?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_nos_lavadora_int",
          lemma: "tener",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нас нет холодильника",
        uk: "У нас немає холодильника",
        es: "Nosotros no tenemos nevera",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tenemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "nevera",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_nos_nevera_neg",
          lemma: "tener",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы можем пойти домой?",
        uk: "Ми можемо піти додому?",
        es: "¿Nosotros podemos ir a casa?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "podemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ir",
            type: "verb_infinitive"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a casa?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_poder_nos_ir_casa_int",
          lemma: "poder",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l10",
    person: "ellos_ellas_ustedes",
    title: "Capabilities & Tools",
    phrases: [
      {
        ru: "Они (м.р.) могут заплатить?",
        uk: "Вони (ч.р.) можуть заплатити?",
        es: "¿Ellos pueden pagar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ellos",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pueden",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_ellos_pagar_int",
          lemma: "poder",
          person: "ellos",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (ж.р.) не могут заплатить",
        uk: "Вони (ж.р.) не можуть заплатити",
        es: "Ellas no pueden pagar",
        tokens: [
          {
            text: "Ellas",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pueden",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pagar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_ellas_pagar_neg",
          lemma: "poder",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability",
            "finance"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У них (м.р.) есть деньги",
        uk: "У них (ч.р.) є гроші",
        es: "Ellos tienen el dinero",
        tokens: [
          {
            text: "Ellos",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tienen",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el dinero",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_ellos_dinero_aff",
          lemma: "tener",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У вас (мн.ч.) есть стиральная машина?",
        uk: "У вас (мн.) є пральна машина?",
        es: "¿Ustedes tienen la lavadora?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ustedes",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tienen",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "la lavadora?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_ustedes_lavadora_int",
          lemma: "tener",
          person: "ustedes",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (ж.р.) не имеют холодильника",
        uk: "Вони (ж.р.) не мають холодильника",
        es: "Ellas no tienen nevera",
        tokens: [
          {
            text: "Ellas",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tienen",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "nevera",
            type: "object"
          }
        ],
        meta: {
          id: "w2_tener_ellas_nevera_neg",
          lemma: "tener",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession",
            "appliances"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы (мн.ч.) можете пойти туда?",
        uk: "Ви (мн.) можете піти туди?",
        es: "¿Ustedes pueden ir allí?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ustedes",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pueden",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ir",
            type: "verb_infinitive"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí?",
            type: "adverb"
          }
        ],
        meta: {
          id: "w2_poder_ustedes_ir_int",
          lemma: "poder",
          person: "ustedes",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l11",
    person: "yo",
    title: "Needs & Documents",
    phrases: [
      {
        ru: "Мне нужен контракт",
        uk: "Мені потрібен контракт",
        es: "Yo necesito el contrato",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesito",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_yo_contrato_aff",
          lemma: "necesitar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мне нужен контракт?",
        uk: "Мені потрібен контракт?",
        es: "¿Yo necesito el contrato?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesito",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_yo_contrato_int",
          lemma: "necesitar",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мне нужно помочь",
        uk: "Мені потрібно допомогти",
        es: "Yo necesito ayudar",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesito",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ayudar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_necesitar_yo_ayudar_aff",
          lemma: "necesitar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я могу сделать",
        uk: "Я можу зробити",
        es: "Yo puedo hacer",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedo",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "hacer",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_yo_hacer_aff",
          lemma: "poder",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не говорю",
        uk: "Я не кажу",
        es: "Yo no digo",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "digo",
            type: "verb"
          }
        ],
        meta: {
          id: "w2_decir_yo_neg",
          lemma: "decir",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мне нужно время",
        uk: "Мені потрібен час",
        es: "Yo necesito tiempo",
        tokens: [
          {
            text: "Yo",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesito",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_yo_tiempo_aff",
          lemma: "necesitar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l12",
    person: "tu",
    title: "Needs & Documents",
    phrases: [
      {
        ru: "Тебе нужен контракт",
        uk: "Тобі потрібен контракт",
        es: "Tú necesitas el contrato",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_tu_contrato_aff",
          lemma: "necesitar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Тебе не нужен контракт",
        uk: "Тобі не потрібен контракт",
        es: "Tú no necesitas el contrato",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_tu_contrato_neg",
          lemma: "necesitar",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты можешь помочь?",
        uk: "Ти можеш допомогти?",
        es: "¿Tú puedes ayudar?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ayudar?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_tu_ayudar_int",
          lemma: "poder",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты можешь сделать",
        uk: "Ти можеш зробити",
        es: "Tú puedes hacer",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "hacer",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_tu_hacer_aff",
          lemma: "poder",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не можешь помочь",
        uk: "Ти не можеш допомогти",
        es: "Tú no puedes ayudar",
        tokens: [
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "puedes",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ayudar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_tu_ayudar_neg",
          lemma: "poder",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Тебе нужны деньги?",
        uk: "Тобі потрібні гроші?",
        es: "¿Tú necesitas dinero?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Tú",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "dinero?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_tu_dinero_int",
          lemma: "necesitar",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "finance"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l13",
    person: "el_ella_usted",
    title: "Needs & Documents",
    phrases: [
      {
        ru: "Ему нужен контракт",
        uk: "Йому потрібен контракт",
        es: "Él necesita el contrato",
        tokens: [
          {
            text: "Él",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesita",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_el_contrato_aff",
          lemma: "necesitar",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ей нужен контракт?",
        uk: "Їй потрібен контракт?",
        es: "¿Ella necesita el contrato?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ella",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesita",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_ella_contrato_int",
          lemma: "necesitar",
          person: "ella",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вам (вежливо) нужен контракт?",
        uk: "Вам (ввічливо) потрібен контракт?",
        es: "¿Usted necesita el contrato?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Usted",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesita",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_usted_contrato_int",
          lemma: "necesitar",
          person: "usted",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ей нужно помочь",
        uk: "Їй потрібно допомогти",
        es: "Ella necesita ayudar",
        tokens: [
          {
            text: "Ella",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesita",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ayudar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_necesitar_ella_ayudar_aff",
          lemma: "necesitar",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Он не говорит",
        uk: "Він не каже",
        es: "Él no dice",
        tokens: [
          {
            text: "Él",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "dice",
            type: "verb"
          }
        ],
        meta: {
          id: "w2_decir_el_neg",
          lemma: "decir",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы (вежливо) кажете",
        uk: "Ви (ввічливо) кажете",
        es: "Usted dice",
        tokens: [
          {
            text: "Usted",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "dice",
            type: "verb"
          }
        ],
        meta: {
          id: "w2_decir_usted_aff",
          lemma: "decir",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l14",
    person: "nosotros",
    title: "Needs & Documents",
    phrases: [
      {
        ru: "Нам нужен контракт",
        uk: "Нам потрібен контракт",
        es: "Nosotros necesitamos el contrato",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_nos_contrato_aff",
          lemma: "necesitar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Нам нужен контракт?",
        uk: "Нам потрібен контракт?",
        es: "¿Nosotros necesitamos el contrato?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_nos_contrato_int",
          lemma: "necesitar",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Нам нужно помочь",
        uk: "Нам потрібно допомогти",
        es: "Nosotros necesitamos ayudar",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ayudar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_necesitar_nos_ayudar_aff",
          lemma: "necesitar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы можем сделать",
        uk: "Ми можемо зробити",
        es: "Nosotros podemos hacer",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "podemos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "hacer",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_nos_hacer_aff",
          lemma: "poder",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не говорим",
        uk: "Ми не кажемо",
        es: "Nosotros no decimos",
        tokens: [
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "decimos",
            type: "verb"
          }
        ],
        meta: {
          id: "w2_decir_nos_neg",
          lemma: "decir",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Нам нужны деньги?",
        uk: "Нам потрібні гроші?",
        es: "¿Nosotros necesitamos dinero?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Nosotros",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "dinero?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_nos_dinero_int",
          lemma: "necesitar",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "finance"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w2_l15",
    person: "ellos_ellas_ustedes",
    title: "Needs & Documents",
    phrases: [
      {
        ru: "Им (м.р.) нужен контракт",
        uk: "Їм (ч.р.) потрібен контракт",
        es: "Ellos necesitan el contrato",
        tokens: [
          {
            text: "Ellos",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitan",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_ellos_contrato_aff",
          lemma: "necesitar",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Им (ж.р.) нужен контракт?",
        uk: "Їм (ж.р.) потрібен контракт?",
        es: "¿Ellas necesitan el contrato?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ellas",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitan",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el contrato?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_ellas_contrato_int",
          lemma: "necesitar",
          person: "ellas",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "bureaucracy"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вам (мн.ч.) нужно помочь",
        uk: "Вам (мн.) потрібно допомогти",
        es: "Ustedes necesitan ayudar",
        tokens: [
          {
            text: "Ustedes",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitan",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ayudar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_necesitar_ustedes_ayudar_aff",
          lemma: "necesitar",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (м.р.) могут сделать?",
        uk: "Вони (ч.р.) можуть зробити?",
        es: "¿Ellos pueden hacer?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ellos",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pueden",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "hacer?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w2_poder_ellos_hacer_int",
          lemma: "poder",
          person: "ellos",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (ж.р.) не говорят",
        uk: "Вони (ж.р.) не кажуть",
        es: "Ellas no dicen",
        tokens: [
          {
            text: "Ellas",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "dicen",
            type: "verb"
          }
        ],
        meta: {
          id: "w2_decir_ellas_neg",
          lemma: "decir",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вам (мн.ч.) нужно время?",
        uk: "Вам (мн.) потрібен час?",
        es: "¿Ustedes necesitan tiempo?",
        tokens: [
          {
            text: "¿",
            type: "space"
          },
          {
            text: "Ustedes",
            type: "subject"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "necesitan",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tiempo?",
            type: "object"
          }
        ],
        meta: {
          id: "w2_necesitar_ustedes_tiempo_int",
          lemma: "necesitar",
          person: "ustedes",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need"
          ],
          confusable_with: null
        }
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

export default {
  id: "week_2",
  title: "Week 2: Intention & Apartment Viewing",
  description: "Querer, Poder, Necesitar applied to Real Estate.",
  legacy: false,
  lessons: week2Lessons,
};
