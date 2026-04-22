const week1Lessons = [
  {
    id: "w1_l1",
    person: "yo",
    title: "Identity & Motion",
    phrases: [
      {
        ru: "Я (есть)",
        uk: "Я (є)",
        es: "Yo soy",
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
            text: "soy",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_yo_aff",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я не (есть)",
        uk: "Я не (є)",
        es: "Yo no soy",
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
            text: "soy",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_yo_neg",
          lemma: "ser",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я нахожусь",
        uk: "Я знаходжусь",
        es: "Yo estoy",
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
          }
        ],
        meta: {
          id: "estar_pres_yo_aff",
          lemma: "estar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Я не нахожусь",
        uk: "Я не знаходжусь",
        es: "Yo no estoy",
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
            text: "estoy",
            type: "verb"
          }
        ],
        meta: {
          id: "estar_pres_yo_neg",
          lemma: "estar",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Я иду",
        uk: "Я йду",
        es: "Yo voy",
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
            text: "voy",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_yo_aff",
          lemma: "ir",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не иду",
        uk: "Я не йду",
        es: "Yo no voy",
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
            text: "voy",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_yo_neg",
          lemma: "ir",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l2a",
    person: "tu",
    title: "Identity & Motion",
    phrases: [
      {
        ru: "Ты (есть)",
        uk: "Ти (є)",
        es: "Tú eres",
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
            text: "eres",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_tu_aff",
          lemma: "ser",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты не (есть)",
        uk: "Ти не (є)",
        es: "Tú no eres",
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
            text: "eres",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_tu_neg",
          lemma: "ser",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты находишься",
        uk: "Ти знаходишся",
        es: "Tú estás",
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
          }
        ],
        meta: {
          id: "estar_pres_tu_aff",
          lemma: "estar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Ты не находишься",
        uk: "Ти не знаходишся",
        es: "Tú no estás",
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
          }
        ],
        meta: {
          id: "estar_pres_tu_neg",
          lemma: "estar",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Ты идешь",
        uk: "Ти йдеш",
        es: "Tú vas",
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
            text: "vas",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_tu_aff",
          lemma: "ir",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не идешь",
        uk: "Ти не йдеш",
        es: "Tú no vas",
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
            text: "vas",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_tu_neg",
          lemma: "ir",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l2b",
    person: "el_ella_usted",
    title: "Identity & Motion",
    phrases: [
      {
        ru: "Он (есть)",
        uk: "Він (є)",
        es: "Él es",
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
            text: "es",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_el_aff",
          lemma: "ser",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Она находилась",
        uk: "Вона знаходиться",
        es: "Ella está",
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
          }
        ],
        meta: {
          id: "estar_pres_ella_aff",
          lemma: "estar",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Вы идет (вежливо)",
        uk: "Ви йдете (ввічливо)",
        es: "Usted va",
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
            text: "va",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_usted_aff",
          lemma: "ir",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Он не находится",
        uk: "Він не знаходиться",
        es: "Él no está",
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
            text: "está",
            type: "verb"
          }
        ],
        meta: {
          id: "estar_pres_el_neg",
          lemma: "estar",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Она не идет",
        uk: "Вона не йду",
        es: "Ella no va",
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
            text: "va",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_ella_neg",
          lemma: "ir",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы не (есть) (вежливо)",
        uk: "Ви не (є) (ввічливо)",
        es: "Usted no es",
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
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "es",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_usted_neg",
          lemma: "ser",
          person: "usted",
          polarity: "negative",
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
    id: "w1_l3",
    person: "nosotros",
    title: "Identity & Motion",
    phrases: [
      {
        ru: "Мы (есть)",
        uk: "Ми (є)",
        es: "Nosotros somos",
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
            text: "somos",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_nos_aff",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы не (есть)",
        uk: "Ми не (є)",
        es: "Nosotros no somos",
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
            text: "somos",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_nos_neg",
          lemma: "ser",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы находимся",
        uk: "Ми знаходимось",
        es: "Nosotros estamos",
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
          }
        ],
        meta: {
          id: "estar_pres_nos_aff",
          lemma: "estar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Мы не находимся",
        uk: "Ми не знаходимось",
        es: "Nosotros no estamos",
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
            text: "estamos",
            type: "verb"
          }
        ],
        meta: {
          id: "estar_pres_nos_neg",
          lemma: "estar",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Мы идем",
        uk: "Ми йдемо",
        es: "Nosotros vamos",
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
            text: "vamos",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_nos_aff",
          lemma: "ir",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не идем",
        uk: "Ми не йдемо",
        es: "Nosotros no vamos",
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
            text: "vamos",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_nos_neg",
          lemma: "ir",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l3b",
    person: "ellos_ellas_ustedes",
    title: "Identity & Motion",
    phrases: [
      {
        ru: "Они (мужской род) (есть)",
        uk: "Вони (чоловічий рід) (є)",
        es: "Ellos son",
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
            text: "son",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_ellos_aff",
          lemma: "ser",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Они (женский род) находятся",
        uk: "Вони (жіночий рід) знаходяться",
        es: "Ellas están",
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
            text: "están",
            type: "verb"
          }
        ],
        meta: {
          id: "estar_pres_ellas_aff",
          lemma: "estar",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Вы идите (вежливо)",
        uk: "Ви йдете (ввічливо)",
        es: "Ustedes van",
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
            text: "van",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_ustedes_aff",
          lemma: "ir",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (мужской род) не (есть)",
        uk: "Вони (ч.р.) не (є)",
        es: "Ellos no son",
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
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "son",
            type: "verb"
          }
        ],
        meta: {
          id: "ser_pres_ellos_neg",
          lemma: "ser",
          person: "ellos",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Они (женский род) не находятся",
        uk: "Вони (ж.р.) не знаходяться",
        es: "Ellas no están",
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
            text: "están",
            type: "verb"
          }
        ],
        meta: {
          id: "estar_pres_ellas_neg",
          lemma: "estar",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "state",
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Вы не идете (вежливо)",
        uk: "Ви не йдете (ввічливо)",
        es: "Ustedes no van",
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
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "van",
            type: "verb"
          }
        ],
        meta: {
          id: "ir_pres_ustedes_neg",
          lemma: "ir",
          person: "ustedes",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l4",
    person: "yo",
    title: "Core Actions",
    phrases: [
      {
        ru: "У меня есть",
        uk: "Я маю",
        es: "Yo tengo",
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
          }
        ],
        meta: {
          id: "tener_pres_yo_aff",
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
        ru: "У меня нет",
        uk: "Я не маю",
        es: "Yo no tengo",
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
          }
        ],
        meta: {
          id: "tener_pres_yo_neg",
          lemma: "tener",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я делаю",
        uk: "Я роблю",
        es: "Yo hago",
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
            text: "hago",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_yo_aff",
          lemma: "hacer",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не делаю",
        uk: "Я не роблю",
        es: "Yo no hago",
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
            text: "hago",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_yo_neg",
          lemma: "hacer",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я говорю (сказать)",
        uk: "Я кажу",
        es: "Yo digo",
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
            text: "digo",
            type: "verb"
          }
        ],
        meta: {
          id: "decir_pres_yo_aff",
          lemma: "decir",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не говорю (сказать)",
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
          id: "decir_pres_yo_neg",
          lemma: "decir",
          person: "yo",
          polarity: "negative",
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
    id: "w1_l5a",
    person: "tu",
    title: "Core Actions",
    phrases: [
      {
        ru: "У тебя есть",
        uk: "Ти маєш",
        es: "Tú tienes",
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
          }
        ],
        meta: {
          id: "tener_pres_tu_aff",
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
        ru: "У тебя нет",
        uk: "Ти не маєш",
        es: "Tú no tienes",
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
            text: "tienes",
            type: "verb"
          }
        ],
        meta: {
          id: "tener_pres_tu_neg",
          lemma: "tener",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты делаешь",
        uk: "Ти робиш",
        es: "Tú haces",
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
            text: "haces",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_tu_aff",
          lemma: "hacer",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не делаешь",
        uk: "Ти не робиш",
        es: "Tú no haces",
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
            text: "haces",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_tu_neg",
          lemma: "hacer",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты говоришь (сказать)",
        uk: "Ти кажеш",
        es: "Tú dices",
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
            text: "dices",
            type: "verb"
          }
        ],
        meta: {
          id: "decir_pres_tu_aff",
          lemma: "decir",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не говоришь",
        uk: "Ти не кажеш",
        es: "Tú no dices",
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
            text: "dices",
            type: "verb"
          }
        ],
        meta: {
          id: "decir_pres_tu_neg",
          lemma: "decir",
          person: "tu",
          polarity: "negative",
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
    id: "w1_l5b",
    person: "el_ella_usted",
    title: "Core Actions",
    phrases: [
      {
        ru: "У него есть",
        uk: "Він має",
        es: "Él tiene",
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
            text: "tiene",
            type: "verb"
          }
        ],
        meta: {
          id: "tener_pres_el_aff",
          lemma: "tener",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нее есть",
        uk: "У неї є",
        es: "Ella tiene",
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
            text: "tiene",
            type: "verb"
          }
        ],
        meta: {
          id: "tener_pres_ella_aff",
          lemma: "tener",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У вас есть (вежливо)",
        uk: "Ви маєте (ввічливо)",
        es: "Usted tiene",
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
            text: "tiene",
            type: "verb"
          }
        ],
        meta: {
          id: "tener_pres_usted_aff",
          lemma: "tener",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Он не делает",
        uk: "Він не робить",
        es: "Él no hace",
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
            text: "hace",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_el_neg",
          lemma: "hacer",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Она не говорит",
        uk: "Вона не каже",
        es: "Ella no dice",
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
            text: "dice",
            type: "verb"
          }
        ],
        meta: {
          id: "decir_pres_ella_neg",
          lemma: "decir",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы не делаете",
        uk: "Ви не робите",
        es: "Usted no hace",
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
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "hace",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_usted_neg",
          lemma: "hacer",
          person: "usted",
          polarity: "negative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l6",
    person: "nosotros",
    title: "Core Actions",
    phrases: [
      {
        ru: "У нас есть",
        uk: "Ми маємо",
        es: "Nosotros tenemos",
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
          }
        ],
        meta: {
          id: "tener_pres_nos_aff",
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
        ru: "У нас нет",
        uk: "Ми не маємо",
        es: "Nosotros no tenemos",
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
          }
        ],
        meta: {
          id: "tener_pres_nos_neg",
          lemma: "tener",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы делаем",
        uk: "Ми робимо",
        es: "Nosotros hacemos",
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
            text: "hacemos",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_nos_aff",
          lemma: "hacer",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не делаем",
        uk: "Ми не робимо",
        es: "Nosotros no hacemos",
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
            text: "hacemos",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_nos_neg",
          lemma: "hacer",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы говорим (сказать)",
        uk: "Ми кажемо",
        es: "Nosotros decimos",
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
            text: "decimos",
            type: "verb"
          }
        ],
        meta: {
          id: "decir_pres_nos_aff",
          lemma: "decir",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не говорим (сказать)",
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
          id: "decir_pres_nos_neg",
          lemma: "decir",
          person: "nosotros",
          polarity: "negative",
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
    id: "w1_l6b",
    person: "ellos_ellas_ustedes",
    title: "Core Actions",
    phrases: [
      {
        ru: "Они (мужской род) имеют",
        uk: "Вони (чоловічий рід) мають",
        es: "Ellos tienen",
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
          }
        ],
        meta: {
          id: "tener_pres_ellos_aff",
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
        ru: "Они (женский род) делают",
        uk: "Вони (жіночий рід) роблять",
        es: "Ellas hacen",
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
            text: "hacen",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_ellas_aff",
          lemma: "hacer",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы говорите (вежливо)",
        uk: "Ви кажете (ввічливо)",
        es: "Ustedes dicen",
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
            text: "dicen",
            type: "verb"
          }
        ],
        meta: {
          id: "decir_pres_ustedes_aff",
          lemma: "decir",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "speech"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (мужской род) не делают",
        uk: "Вони (ч.р.) не роблять",
        es: "Ellos no hacen",
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
            text: "no",
            type: "negation"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "hacen",
            type: "verb"
          }
        ],
        meta: {
          id: "hacer_pres_ellos_neg",
          lemma: "hacer",
          person: "ellos",
          polarity: "negative",
          tense: "present",
          tags: [
            "action"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (женский род) не имеют",
        uk: "Вони (ж.р.) не мають",
        es: "Ellas no tienen",
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
          }
        ],
        meta: {
          id: "tener_pres_ellas_neg",
          lemma: "tener",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы не говорите (вежливо)",
        uk: "Ви не кажете (ввічливо)",
        es: "Ustedes no dicen",
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
          id: "decir_pres_ustedes_neg",
          lemma: "decir",
          person: "ustedes",
          polarity: "negative",
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
    id: "w1_l7",
    person: "yo",
    title: "Identity Sentences",
    phrases: [
      {
        ru: "Я хороший",
        uk: "Я добрий",
        es: "Yo soy bueno",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bueno",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_yo_aff_bueno",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я не плохой",
        uk: "Я не поганий",
        es: "Yo no soy malo",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "malo",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_yo_neg_malo",
          lemma: "ser",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я большой",
        uk: "Я великий",
        es: "Yo soy grande",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "grande",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_yo_aff_grande",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я не маленький",
        uk: "Я не малий",
        es: "Yo no soy pequeño",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pequeño",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_yo_neg_pequeno",
          lemma: "ser",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я умный",
        uk: "Я розумний",
        es: "Yo soy inteligente",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "inteligente",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_yo_aff_inteligente",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Я не глупый",
        uk: "Я не дурний",
        es: "Yo no soy tonto",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tonto",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_yo_neg_tonto",
          lemma: "ser",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      }
    ]
  },
  {
    id: "w1_l8a",
    person: "tu",
    title: "Identity Sentences",
    phrases: [
      {
        ru: "Ты хороший",
        uk: "Ти добрий",
        es: "Tú eres bueno",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bueno",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_tu_aff_bueno",
          lemma: "ser",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты не хороший",
        uk: "Ти не добрий",
        es: "Tú no eres bueno",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bueno",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_tu_neg_bueno",
          lemma: "ser",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты не плохой",
        uk: "Ти не поганий",
        es: "Tú no eres malo",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "malo",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_tu_neg_malo",
          lemma: "ser",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты умный",
        uk: "Ти розумний",
        es: "Tú eres inteligente",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "inteligente",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_tu_aff_inteligente",
          lemma: "ser",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты не умный",
        uk: "Ти не розумний",
        es: "Tú no eres inteligente",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "inteligente",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_tu_neg_inteligente",
          lemma: "ser",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Ты большой",
        uk: "Ти великий",
        es: "Tú eres grande",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "grande",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_tu_aff_grande",
          lemma: "ser",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      }
    ]
  },
  {
    id: "w1_l8b",
    person: "el_ella_usted",
    title: "Identity Sentences",
    phrases: [
      {
        ru: "Он большой",
        uk: "Він великий",
        es: "Él es grande",
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
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "grande",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_el_aff_grande",
          lemma: "ser",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Она большая",
        uk: "Вона велика",
        es: "Ella es grande",
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
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "grande",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ella_aff_grande",
          lemma: "ser",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Вы умны (вежливо)",
        uk: "Ви розумні (ввічливо)",
        es: "Usted es inteligente",
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
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "inteligente",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_usted_aff_inteligente",
          lemma: "ser",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Он не маленький",
        uk: "Він не маленький",
        es: "Él no es pequeño",
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
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pequeño",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_el_neg_pequeno",
          lemma: "ser",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Она не глупая",
        uk: "Вона не дурна",
        es: "Ella no es tonta",
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
            text: "es",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tonta",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ella_neg_tonta",
          lemma: "ser",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Вы не плохой",
        uk: "Ви не поганий",
        es: "Usted no es malo",
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
            text: "no",
            type: "negation"
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
            text: "malo",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_usted_neg_malo",
          lemma: "ser",
          person: "usted",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      }
    ]
  },
  {
    id: "w1_l9",
    person: "nosotros",
    title: "Identity Sentences",
    phrases: [
      {
        ru: "Мы хорошие",
        uk: "Ми хороші",
        es: "Nosotros somos buenos",
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
            text: "somos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "buenos",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_nos_aff_buenos",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы не плохие",
        uk: "Ми не погані",
        es: "Nosotros no somos malos",
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
            text: "somos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "malos",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_nos_neg_malos",
          lemma: "ser",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы большие",
        uk: "Ми великі",
        es: "Nosotros somos grandes",
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
            text: "somos",
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
          id: "ser_pres_nos_aff_grandes",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы не маленькие",
        uk: "Ми не малі",
        es: "Nosotros no somos pequeños",
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
            text: "somos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "pequeños",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_nos_neg_pequenos",
          lemma: "ser",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы умные",
        uk: "Ми розумні",
        es: "Nosotros somos inteligentes",
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
            text: "somos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "inteligentes",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_nos_aff_inteligentes",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Мы не глупые",
        uk: "Ми не дурні",
        es: "Nosotros no somos tontos",
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
            text: "somos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "tontos",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_nos_neg_tontos",
          lemma: "ser",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      }
    ]
  },
  {
    id: "w1_l9b",
    person: "ellos_ellas_ustedes",
    title: "Identity Sentences",
    phrases: [
      {
        ru: "Они (м.р.) хорошие",
        uk: "Вони (ч.р.) хороші",
        es: "Ellos son buenos",
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
            text: "son",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "buenos",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ellos_aff_buenos",
          lemma: "ser",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Они (ж.р.) маленькие",
        uk: "Вони (ж.р.) малі",
        es: "Ellas son pequeñas",
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
            text: "pequeñas",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ellas_aff_pequenas",
          lemma: "ser",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Вы умны (вежливо)",
        uk: "Ви розумні (ввічливо)",
        es: "Ustedes son inteligentes",
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
            text: "son",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "inteligentes",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ustedes_aff_inteligentes",
          lemma: "ser",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Они (м.р.) не глупые",
        uk: "Вони (ч.р.) не дурні",
        es: "Ellos no son tontos",
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
            text: "no",
            type: "negation"
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
            text: "tontos",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ellos_neg_tontos",
          lemma: "ser",
          person: "ellos",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Они (ж.р.) не плохие",
        uk: "Вони (ж.р.) не погані",
        es: "Ellas no son malas",
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
            text: "son",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "malas",
            type: "adjective"
          }
        ],
        meta: {
          id: "ser_pres_ellas_neg_malas",
          lemma: "ser",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      },
      {
        ru: "Вы не большие",
        uk: "Ви не великі",
        es: "Ustedes no son grandes",
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
            text: "no",
            type: "negation"
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
          id: "ser_pres_ustedes_neg_grandes",
          lemma: "ser",
          person: "ustedes",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "adjective"
          ],
          confusable_with: "estar"
        }
      }
    ]
  },
  {
    id: "w1_l10",
    person: "yo",
    title: "State & Location",
    phrases: [
      {
        ru: "Мне хорошо",
        uk: "Мені добре",
        es: "Yo estoy bien",
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
            text: "bien",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_yo_aff_bien",
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
        ru: "Мне плохо",
        uk: "Мені погано",
        es: "Yo estoy mal",
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
            text: "mal",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_yo_aff_mal",
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
        ru: "Я здесь",
        uk: "Я тут",
        es: "Yo estoy aquí",
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
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_yo_aff_aqui",
          lemma: "estar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Я не здесь",
        uk: "Я не тут",
        es: "Yo no estoy aquí",
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
            text: "estoy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_yo_neg_aqui",
          lemma: "estar",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
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
          id: "estar_pres_yo_aff_listo",
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
        ru: "Я не готов",
        uk: "Я не готовий",
        es: "Yo no estoy listo",
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
          id: "estar_pres_yo_neg_listo",
          lemma: "estar",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      }
    ]
  },
  {
    id: "w1_l11a",
    person: "tu",
    title: "State & Location",
    phrases: [
      {
        ru: "Тебе хорошо",
        uk: "Тобі добре",
        es: "Tú estás bien",
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
            text: "bien",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_tu_aff_bien",
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
        ru: "Тебе не хорошо",
        uk: "Тобі не добре",
        es: "Tú no estás bien",
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
            text: "bien",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_tu_neg_bien",
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
          id: "estar_pres_tu_aff_listo",
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
          id: "estar_pres_tu_neg_listo",
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
        ru: "Ты здесь",
        uk: "Ти тут",
        es: "Tú estás aquí",
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
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_tu_aff_aqui",
          lemma: "estar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Ты не здесь",
        uk: "Ти не тут",
        es: "Tú no estás aquí",
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
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_tu_neg_aqui",
          lemma: "estar",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      }
    ]
  },
  {
    id: "w1_l11b",
    person: "el_ella_usted",
    title: "State & Location",
    phrases: [
      {
        ru: "Он здесь",
        uk: "Він тут",
        es: "Él está aquí",
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
            text: "está",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_el_aff_aqui",
          lemma: "estar",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
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
          id: "estar_pres_ella_aff_lista",
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
        ru: "С вами все в порядке (вежливо)",
        uk: "З вами все гаразд (ввічливо)",
        es: "Usted está bien",
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
            text: "está",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bien",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_usted_aff_bien",
          lemma: "estar",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Он не здесь",
        uk: "Він не тут",
        es: "Él no está aquí",
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
            text: "está",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_el_neg_aqui",
          lemma: "estar",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Она не здесь",
        uk: "Вона не тут",
        es: "Ella no está aquí",
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
            text: "está",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_ella_neg_aqui",
          lemma: "estar",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Вы не здесь (вежливо)",
        uk: "Ви не тут (ввічливо)",
        es: "Usted no está aquí",
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
            text: "no",
            type: "negation"
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
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_usted_neg_aqui",
          lemma: "estar",
          person: "usted",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      }
    ]
  },
  {
    id: "w1_l12",
    person: "nosotros",
    title: "State & Location",
    phrases: [
      {
        ru: "Нам хорошо",
        uk: "Нам добре",
        es: "Nosotros estamos bien",
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
            text: "bien",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_nos_aff_bien",
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
        ru: "Нам плохо",
        uk: "Нам погано",
        es: "Nosotros estamos mal",
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
            text: "mal",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_nos_aff_mal",
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
        ru: "Мы здесь",
        uk: "Ми тут",
        es: "Nosotros estamos aquí",
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
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_nos_aff_aqui",
          lemma: "estar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Мы не здесь",
        uk: "Ми не тут",
        es: "Nosotros no estamos aquí",
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
            text: "estamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_nos_neg_aqui",
          lemma: "estar",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
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
          id: "estar_pres_nos_aff_listos",
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
        ru: "Мы не готовы",
        uk: "Ми не готові",
        es: "Nosotros no estamos listos",
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
          id: "estar_pres_nos_neg_listos",
          lemma: "estar",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      }
    ]
  },
  {
    id: "w1_l12b",
    person: "ellos_ellas_ustedes",
    title: "State & Location",
    phrases: [
      {
        ru: "Им (мужской род) хорошо",
        uk: "Їм (ч.р.) добре",
        es: "Ellos están bien",
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
            text: "están",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bien",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_ellos_aff_bien",
          lemma: "estar",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Им (женский род) плохо",
        uk: "Їм (ж.р.) погано",
        es: "Ellas están mal",
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
            text: "están",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "mal",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_ellas_aff_mal",
          lemma: "estar",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Вы здесь (вежливо)",
        uk: "Ви тут (ввічливо)",
        es: "Ustedes están aquí",
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
            text: "están",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_ustedes_aff_aqui",
          lemma: "estar",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Они (м.р.) не здесь",
        uk: "Вони (ч.р.) не тут",
        es: "Ellos no están aquí",
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
            text: "no",
            type: "negation"
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
            text: "aquí",
            type: "adverb"
          }
        ],
        meta: {
          id: "estar_pres_ellos_neg_aqui",
          lemma: "estar",
          person: "ellos",
          polarity: "negative",
          tense: "present",
          tags: [
            "location"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Они (ж.р.) не готовы",
        uk: "Вони (ж.р.) не готові",
        es: "Ellas no están listas",
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
            text: "están",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "listas",
            type: "adjective"
          }
        ],
        meta: {
          id: "estar_pres_ellas_neg_listas",
          lemma: "estar",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      },
      {
        ru: "Вы не готовы (вежливо)",
        uk: "Ви не готові (ввічливо)",
        es: "Ustedes no están listos",
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
            text: "no",
            type: "negation"
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
            text: "listos",
            type: "adjective"
          }
        ],
        meta: {
          id: "estar_pres_ustedes_neg_listos",
          lemma: "estar",
          person: "ustedes",
          polarity: "negative",
          tense: "present",
          tags: [
            "state"
          ],
          confusable_with: "ser"
        }
      }
    ]
  },
  {
    id: "w1_l13",
    person: "yo",
    title: "Possession & Direction",
    phrases: [
      {
        ru: "Я иду туда",
        uk: "Я йду туди",
        es: "Yo voy allí",
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
            text: "voy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_yo_aff_alli",
          lemma: "ir",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я не иду туда",
        uk: "Я не йду туди",
        es: "Yo no voy allí",
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
            text: "voy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_yo_neg_alli",
          lemma: "ir",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Я иду домой",
        uk: "Я йду додому",
        es: "Yo voy a casa",
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
            text: "voy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_yo_aff_casa",
          lemma: "ir",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У меня есть время",
        uk: "У мене є час",
        es: "Yo tengo tiempo",
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
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_yo_aff_tiempo",
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
        ru: "У меня нет времени",
        uk: "У мене немає часу",
        es: "Yo no tengo tiempo",
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
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_yo_neg_tiempo",
          lemma: "tener",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У меня есть деньги",
        uk: "У мене є гроші",
        es: "Yo tengo dinero",
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
            text: "dinero",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_yo_aff_dinero",
          lemma: "tener",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l14a",
    person: "tu",
    title: "Possession & Direction",
    phrases: [
      {
        ru: "Ты идешь туда",
        uk: "Ти йдеш туди",
        es: "Tú vas allí",
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
            text: "vas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_tu_aff_alli",
          lemma: "ir",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты не идешь туда",
        uk: "Ти не йдеш туди",
        es: "Tú no vas allí",
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
            text: "vas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_tu_neg_alli",
          lemma: "ir",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Ты идешь домой",
        uk: "Ти йдеш додому",
        es: "Tú vas a casa",
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
            text: "vas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_tu_aff_casa",
          lemma: "ir",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У тебя есть время",
        uk: "У тебе є час",
        es: "Tú tienes tiempo",
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
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_tu_aff_tiempo",
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
        ru: "У тебя нет времени",
        uk: "У тебе немає часу",
        es: "Tú no tienes tiempo",
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
            text: "tienes",
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
          id: "tener_pres_tu_neg_tiempo",
          lemma: "tener",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У тебя есть деньги",
        uk: "Ти маєш гроші",
        es: "Tú tienes dinero",
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
            text: "dinero",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_tu_aff_dinero",
          lemma: "tener",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l14b",
    person: "el_ella_usted",
    title: "Possession & Direction",
    phrases: [
      {
        ru: "Он не идет туда",
        uk: "Він не іде туди",
        es: "Él no va allí",
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
            text: "va",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_el_neg_alli",
          lemma: "ir",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Она не идет туда",
        uk: "Вона не іде туди",
        es: "Ella no va allí",
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
            text: "va",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_ella_neg_alli",
          lemma: "ir",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У вас есть время (вежливо)",
        uk: "У вас є час (ввічливо)",
        es: "Usted tiene tiempo",
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
            text: "tiene",
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
          id: "tener_pres_usted_aff_tiempo",
          lemma: "tener",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Он идет домой",
        uk: "Він йде додому",
        es: "Él va a casa",
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
            text: "va",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_el_aff_casa",
          lemma: "ir",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Она идет домой",
        uk: "Вона йде додому",
        es: "Ella va a casa",
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
            text: "va",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_ella_aff_casa",
          lemma: "ir",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы идете домой (вежливо)",
        uk: "Ви йдете додому (ввічливо)",
        es: "Usted va a casa",
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
            text: "va",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_usted_aff_casa",
          lemma: "ir",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l15",
    person: "nosotros",
    title: "Possession & Direction",
    phrases: [
      {
        ru: "Мы идем туда",
        uk: "Ми йдемо туди",
        es: "Nosotros vamos allí",
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
            text: "vamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_nos_aff_alli",
          lemma: "ir",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы не идем туда",
        uk: "Ми не йдемо туди",
        es: "Nosotros no vamos allí",
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
            text: "vamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_nos_neg_alli",
          lemma: "ir",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Мы идем домой",
        uk: "Ми йдемо додому",
        es: "Nosotros vamos a casa",
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
            text: "vamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_nos_aff_casa",
          lemma: "ir",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нас есть время",
        uk: "У нас є час",
        es: "Nosotros tenemos tiempo",
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
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_nos_aff_tiempo",
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
        ru: "У нас нет времени",
        uk: "У нас немає часу",
        es: "Nosotros no tenemos tiempo",
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
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_nos_neg_tiempo",
          lemma: "tener",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "У нас есть деньги",
        uk: "У нас є гроші",
        es: "Nosotros tenemos dinero",
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
            text: "dinero",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_nos_aff_dinero",
          lemma: "tener",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_l15b",
    person: "ellos_ellas_ustedes",
    title: "Possession & Direction",
    phrases: [
      {
        ru: "Они (м.р.) идут туда",
        uk: "Вони (ч.р.) йдуть туди",
        es: "Ellos van allí",
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
            text: "van",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_ellos_aff_alli",
          lemma: "ir",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (ж.р.) не идут туда",
        uk: "Вони (ж.р.) не йдуть туди",
        es: "Ellas no van allí",
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
            text: "van",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "allí",
            type: "adverb"
          }
        ],
        meta: {
          id: "ir_pres_ellas_neg_alli",
          lemma: "ir",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы идете домой (вежливо)",
        uk: "Ви йдете додому (ввічливо)",
        es: "Ustedes van a casa",
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
            text: "van",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "a",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "casa",
            type: "object"
          }
        ],
        meta: {
          id: "ir_pres_ustedes_aff_casa",
          lemma: "ir",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "direction"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (м.р.) не имеют времени",
        uk: "Вони (ч.р.) не мають часу",
        es: "Ellos no tienen tiempo",
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
            text: "tiempo",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_ellos_neg_tiempo",
          lemma: "tener",
          person: "ellos",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Они (ж.р.) имеют деньги",
        uk: "Вони (ж.р.) мають гроші",
        es: "Ellas tienen dinero",
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
            text: "tienen",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "dinero",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_ellas_aff_dinero",
          lemma: "tener",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      },
      {
        ru: "Вы не имеете денег (вежливо)",
        uk: "Ви не маєте грошей (ввічливо)",
        es: "Ustedes no tienen dinero",
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
            text: "dinero",
            type: "object"
          }
        ],
        meta: {
          id: "tener_pres_ustedes_neg_dinero",
          lemma: "tener",
          person: "ustedes",
          polarity: "negative",
          tense: "present",
          tags: [
            "possession"
          ],
          confusable_with: null
        }
      }
    ]
  },
  {
    id: "w1_exam",
    title: "🏆 Week 1 Final Exam",
    exam: true,
    phrases: []
  }
];

export default {
  id: "week_1",
  title: "Week 1: Identity & Core Verbs",
  description: "Ser, Estar, Ir, Tener, Hacer, Decir",
  legacy: false,
  lessons: week1Lessons,
};
