const week3Lessons = [
  {
    id: "w3_l1",
    person: "yo",
    title: "At the Dog Park",
    phrases: [
      {
        ru: "У меня есть собака",
        uk: "У мене є собака",
        es: "Yo tengo el perro",
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
            text: "el perro",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_yo_perro_aff",
          lemma: "tener",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "У меня есть поводок",
        uk: "У мене є повідок",
        es: "Yo tengo la correa",
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
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_yo_correa_aff",
          lemma: "tener",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "Я иду в парк",
        uk: "Я йду до парку",
        es: "Yo voy al parque",
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
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_yo_parque_aff",
          lemma: "ir",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Я хочу пойти в парк?",
        uk: "Я хочу піти до парку?",
        es: "¿Yo quiero ir al parque?",
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
            text: "quiero",
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
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque?",
            type: "object"
          }
        ],
        meta: {
          id: "w3_querer_yo_ir_parque_int",
          lemma: "querer",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "motion"
          ]
        }
      },
      {
        ru: "Мне нужна собака",
        uk: "Мені потрібна собака",
        es: "Yo necesito el perro",
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
            text: "el perro",
            type: "object"
          }
        ],
        meta: {
          id: "w3_necesitar_yo_perro_aff",
          lemma: "necesitar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "dog"
          ]
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
          id: "w3_estar_yo_aqui_aff",
          lemma: "estar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location",
            "review"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l2",
    person: "tu",
    title: "At the Dog Park",
    phrases: [
      {
        ru: "У тебя есть собака?",
        uk: "У тебе є собака?",
        es: "¿Tú tienes el perro?",
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
            text: "el perro?",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_tu_perro_int",
          lemma: "tener",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "У тебя есть поводок",
        uk: "У тебе є повідок",
        es: "Tú tienes la correa",
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
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_tu_correa_aff",
          lemma: "tener",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "Ты идешь в парк?",
        uk: "Ти йдеш до парку?",
        es: "¿Tú vas al parque?",
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
            text: "vas",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque?",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_tu_parque_int",
          lemma: "ir",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Тебе нужен поводок",
        uk: "Тобі потрібен повідок",
        es: "Tú necesitas la correa",
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
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_necesitar_tu_correa_aff",
          lemma: "necesitar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "dog"
          ]
        }
      },
      {
        ru: "Ты хочешь пойти?",
        uk: "Ти хочеш піти?",
        es: "¿Tú quieres ir?",
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
            text: "ir?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_querer_tu_ir_int",
          lemma: "querer",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "motion"
          ]
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
          id: "w3_estar_tu_aqui_aff",
          lemma: "estar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location",
            "review"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l3",
    person: "el_ella_usted",
    title: "At the Dog Park",
    phrases: [
      {
        ru: "У него есть собака",
        uk: "Він має собаку",
        es: "Él tiene el perro",
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
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el perro",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_el_perro_aff",
          lemma: "tener",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "У нее есть поводок",
        uk: "Вона має повідок",
        es: "Ella tiene la correa",
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
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_ella_correa_aff",
          lemma: "tener",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "У вас (вежливо) есть поводок",
        uk: "Ви маєте повідок (ввічливо)",
        es: "Usted tiene la correa",
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
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_usted_correa_aff",
          lemma: "tener",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "Он идет в парк",
        uk: "Він іде до парку",
        es: "Él va al parque",
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
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_el_parque_aff",
          lemma: "ir",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Ей нужен поводок?",
        uk: "Їй потрібен повідок?",
        es: "¿Ella necesita la correa?",
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
            text: "la correa?",
            type: "object"
          }
        ],
        meta: {
          id: "w3_necesitar_ella_correa_int",
          lemma: "necesitar",
          person: "ella",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "need",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (вежливо) хотите пойти?",
        uk: "Ви хочете піти (ввічливо)?",
        es: "¿Usted quiere ir?",
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
            text: "ir?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_querer_usted_ir_parque_int",
          lemma: "querer",
          person: "usted",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "intention",
            "motion"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l4",
    person: "nosotros",
    title: "At the Dog Park",
    phrases: [
      {
        ru: "У нас есть собака",
        uk: "У нас є собака",
        es: "Nosotros tenemos el perro",
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
            text: "el perro",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_nos_perro_aff",
          lemma: "tener",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "У нас есть поводок",
        uk: "У нас є повідок",
        es: "Nosotros tenemos la correa",
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
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_nos_correa_aff",
          lemma: "tener",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "Мы идем в парк",
        uk: "Ми йдемо до парку",
        es: "Nosotros vamos al parque",
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
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_nos_parque_aff",
          lemma: "ir",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Мы идем в парк?",
        uk: "Ми йдемо до парку?",
        es: "¿Nosotros vamos al parque?",
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
            text: "vamos",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque?",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_nos_parque_int",
          lemma: "ir",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Нам нужна собака",
        uk: "Нам потрібна собака",
        es: "Nosotros necesitamos el perro",
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
            text: "el perro",
            type: "object"
          }
        ],
        meta: {
          id: "w3_necesitar_nos_perro_aff",
          lemma: "necesitar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "dog"
          ]
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
          id: "w3_estar_nos_aqui_aff",
          lemma: "estar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location",
            "review"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l5",
    person: "ellos_ellas_ustedes",
    title: "At the Dog Park",
    phrases: [
      {
        ru: "Они (м.р.) имеют собаку?",
        uk: "Вони (ч.р.) мають собаку?",
        es: "¿Ellos tienen el perro?",
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
            text: "tienen",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "el perro?",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_ellos_perro_int",
          lemma: "tener",
          person: "ellos",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "Они (ж.р.) имеют поводок",
        uk: "Вони (ж.р.) мають повідок",
        es: "Ellas tienen la correa",
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
            text: "la correa",
            type: "object"
          }
        ],
        meta: {
          id: "w3_tener_ellas_correa_aff",
          lemma: "tener",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "possession",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (мн.ч.) идете в парк",
        uk: "Ви (мн.) йдете до парку",
        es: "Ustedes van al parque",
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
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_ustedes_parque_aff",
          lemma: "ir",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Им (м.р.) нужна собака",
        uk: "Їм (ч.р.) потрібна собака",
        es: "Ellos necesitan el perro",
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
            text: "el perro",
            type: "object"
          }
        ],
        meta: {
          id: "w3_necesitar_ellos_perro_aff",
          lemma: "necesitar",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "need",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (мн.ч.) не идете в парк",
        uk: "Ви (мн.) не йдете до парку",
        es: "Ustedes no van al parque",
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
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "al",
            type: "preposition"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "parque",
            type: "object"
          }
        ],
        meta: {
          id: "w3_ir_ustedes_parque_neg",
          lemma: "ir",
          person: "ustedes",
          polarity: "negative",
          tense: "present",
          tags: [
            "motion",
            "location"
          ]
        }
      },
      {
        ru: "Вы (мн.ч.) здесь",
        uk: "Ви (мн.) тут",
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
          id: "w3_estar_ustedes_aqui_aff",
          lemma: "estar",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "location",
            "review"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l6",
    person: "yo",
    title: "Dog Behavior",
    phrases: [
      {
        ru: "Я лаю",
        uk: "Я гавкаю",
        es: "Yo ladro",
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
            text: "ladro",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_yo_aff",
          lemma: "ladrar",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Я не лаю",
        uk: "Я не гавкаю",
        es: "Yo no ladro",
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
            text: "ladro",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_yo_neg",
          lemma: "ladrar",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Я шумный",
        uk: "Я гучний",
        es: "Yo soy ruidoso",
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
            text: "ruidoso",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_yo_ruidoso_aff",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Я хочу играть",
        uk: "Я хочу грати",
        es: "Yo quiero jugar",
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
            text: "jugar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_querer_yo_jugar_aff",
          lemma: "querer",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "action"
          ]
        }
      },
      {
        ru: "Я милый",
        uk: "Я милий",
        es: "Yo soy lindo",
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
            text: "lindo",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_yo_lindo_aff",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Я красивый",
        uk: "Я гарний",
        es: "Yo soy bonito",
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
            text: "bonito",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_yo_bonito_aff",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "review"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l7",
    person: "tu",
    title: "Dog Behavior",
    phrases: [
      {
        ru: "Ты лаешь",
        uk: "Ти гавкаєш",
        es: "Tú ladras",
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
            text: "ladras",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_tu_aff",
          lemma: "ladrar",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Ты не лаешь",
        uk: "Ти не гавкаєш",
        es: "Tú no ladras",
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
            text: "ladras",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_tu_neg",
          lemma: "ladrar",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Ты милый?",
        uk: "Ти милий?",
        es: "¿Tú eres lindo?",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "lindo?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_tu_lindo_int",
          lemma: "ser",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Ты шумный",
        uk: "Ти гучний",
        es: "Tú eres ruidoso",
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
            text: "ruidoso",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_tu_ruidoso_aff",
          lemma: "ser",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Ты играешь?",
        uk: "Ти граєш?",
        es: "¿Tú juegas?",
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
            text: "juegas?",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_jugar_tu_int",
          lemma: "jugar",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Ты красивая",
        uk: "Ти гарна",
        es: "Tú eres bonita",
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
            text: "bonita",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_tu_bonita_aff",
          lemma: "ser",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "review"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l8",
    person: "el_ella_usted",
    title: "Dog Behavior",
    phrases: [
      {
        ru: "Он лает",
        uk: "Він гавкає",
        es: "Él ladra",
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
            text: "ladra",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_el_aff",
          lemma: "ladrar",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Она шумная",
        uk: "Вона гучна",
        es: "Ella es ruidosa",
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
            text: "ruidosa",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ella_ruidosa_aff",
          lemma: "ser",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (вежливо) не лаете",
        uk: "Ви не гавкаєте (ввічливо)",
        es: "Usted no ladra",
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
            text: "ladra",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_usted_neg",
          lemma: "ladrar",
          person: "usted",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (вежливо) шумный",
        uk: "Ви гучний (ввічливо)",
        es: "Usted es ruidoso",
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
            text: "ruidoso",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_usted_ruidoso_aff",
          lemma: "ser",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Она красивая",
        uk: "Вона гарна",
        es: "Ella es bonita",
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
            text: "bonita",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ella_bonita_aff",
          lemma: "ser",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Он не лает",
        uk: "Він не гавкає",
        es: "Él no ladra",
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
            text: "ladra",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_el_neg",
          lemma: "ladrar",
          person: "el",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l9",
    person: "nosotros",
    title: "Dog Behavior",
    phrases: [
      {
        ru: "Мы лаем",
        uk: "Ми гавкаємо",
        es: "Nosotros ladramos",
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
            text: "ladramos",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_nos_aff",
          lemma: "ladrar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Мы не лаем",
        uk: "Ми не гавкаємо",
        es: "Nosotros no ladramos",
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
            text: "ladramos",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_nos_neg",
          lemma: "ladrar",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Мы милые",
        uk: "Ми милі",
        es: "Nosotros somos lindos",
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
            text: "lindos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_nos_lindos_aff",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Мы шумные",
        uk: "Ми гучні",
        es: "Nosotros somos ruidosos",
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
            text: "ruidosos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_nos_ruidosos_aff",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Мы играем",
        uk: "Ми граємо",
        es: "Nosotros jugamos",
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
            text: "jugamos",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_jugar_nos_aff",
          lemma: "jugar",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "review"
          ]
        }
      },
      {
        ru: "Мы хотим лаять",
        uk: "Ми хочемо гавкати",
        es: "Nosotros queremos ladrar",
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
            text: "ladrar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_querer_nos_ladrar_aff",
          lemma: "querer",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l10",
    person: "ellos_ellas_ustedes",
    title: "Dog Behavior",
    phrases: [
      {
        ru: "Они (м.р.) лают",
        uk: "Вони (ч.р.) гавкають",
        es: "Ellos ladran",
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
            text: "ladran",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_ellos_aff",
          lemma: "ladrar",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Они (ж.р.) шумные",
        uk: "Вони (ж.р.) гучні",
        es: "Ellas son ruidosas",
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
            text: "ruidosas",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ellas_ruidosas_aff",
          lemma: "ser",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (мн.ч.) милые",
        uk: "Ви (мн.) милі",
        es: "Ustedes son lindos",
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
            text: "lindos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ustedes_lindos_aff",
          lemma: "ser",
          person: "ustedes",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Они (м.р.) хотят лаять",
        uk: "Вони (ч.р.) хочуть гавкати",
        es: "Ellos quieren ladrar",
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
            text: "quieren",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "ladrar",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_querer_ellos_ladrar_aff",
          lemma: "querer",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "intention",
            "action"
          ]
        }
      },
      {
        ru: "Они (ж.р.) красивые?",
        uk: "Вони (ж.р.) гарні?",
        es: "¿Ellas son bonitas?",
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
            text: "son",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "bonitas?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ellas_bonitas_int",
          lemma: "ser",
          person: "ellas",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "review"
          ]
        }
      },
      {
        ru: "Вы (мн.ч.) не лаете",
        uk: "Ви (мн.) не гавкаєте",
        es: "Ustedes no ladran",
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
            text: "ladran",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_ladrar_ustedes_neg",
          lemma: "ladrar",
          person: "ustedes",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l11",
    person: "yo",
    title: "Temperament",
    phrases: [
      {
        ru: "Я кусаю",
        uk: "Я кусаю",
        es: "Yo muerdo",
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
            text: "muerdo",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_yo_aff",
          lemma: "morder",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Я не кусаю",
        uk: "Я не кусаю",
        es: "Yo no muerdo",
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
            text: "muerdo",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_yo_neg",
          lemma: "morder",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Я дружелюбный",
        uk: "Я дружній",
        es: "Yo soy amistoso",
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
            text: "amistoso",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_yo_amistoso_aff",
          lemma: "ser",
          person: "yo",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Я самец?",
        uk: "Я самець?",
        es: "¿Yo soy macho?",
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
            text: "soy",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "macho?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_yo_macho_int",
          lemma: "ser",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Я не самец",
        uk: "Я не самець",
        es: "Yo no soy macho",
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
            text: "macho",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_yo_macho_neg",
          lemma: "ser",
          person: "yo",
          polarity: "negative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Я могу кусать?",
        uk: "Я можу кусати?",
        es: "¿Yo puedo morder?",
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
            text: "morder?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_poder_yo_morder_int",
          lemma: "poder",
          person: "yo",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "action"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l12",
    person: "tu",
    title: "Temperament",
    phrases: [
      {
        ru: "Ты кусаешь",
        uk: "Ти кусаєш",
        es: "Tú muerdes",
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
            text: "muerdes",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_tu_aff",
          lemma: "morder",
          person: "tu",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Ты не кусаешь",
        uk: "Ти не кусаєш",
        es: "Tú no muerdes",
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
            text: "muerdes",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_tu_neg",
          lemma: "morder",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Ты дружелюбный?",
        uk: "Ти дружній?",
        es: "¿Tú eres amistoso?",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "amistoso?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_tu_amistoso_int",
          lemma: "ser",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Ты самец?",
        uk: "Ти самець?",
        es: "¿Tú eres macho?",
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
            text: "eres",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "macho?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_tu_macho_int",
          lemma: "ser",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Ты можешь кусать?",
        uk: "Ти можеш кусати?",
        es: "¿Tú puedes morder?",
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
            text: "morder?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_poder_tu_morder_int",
          lemma: "poder",
          person: "tu",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "action"
          ]
        }
      },
      {
        ru: "Ты не можешь кусать",
        uk: "Ти не можеш кусати",
        es: "Tú no puedes morder",
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
            text: "morder",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_poder_tu_morder_neg",
          lemma: "poder",
          person: "tu",
          polarity: "negative",
          tense: "present",
          tags: [
            "ability"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l13",
    person: "el_ella_usted",
    title: "Temperament",
    phrases: [
      {
        ru: "Он кусает?",
        uk: "Він кусає?",
        es: "¿Él muerde?",
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
            text: "muerde?",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_el_int",
          lemma: "morder",
          person: "el",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Она не кусает",
        uk: "Вона не кусає",
        es: "Ella no muerde",
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
            text: "muerde",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_ella_neg",
          lemma: "morder",
          person: "ella",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (вежливо) не кусаете",
        uk: "Ви не кусаєте (ввічливо)",
        es: "Usted no muerde",
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
            text: "muerde",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_usted_neg",
          lemma: "morder",
          person: "usted",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Он дружелюбный",
        uk: "Він дружній",
        es: "Él es amistoso",
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
            text: "amistoso",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_el_amistoso_aff",
          lemma: "ser",
          person: "el",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Вы (вежливо) дружелюбный",
        uk: "Ви дружній (ввічливо)",
        es: "Usted es amistoso",
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
            text: "amistoso",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_usted_amistoso_aff",
          lemma: "ser",
          person: "usted",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Она самка",
        uk: "Вона самка",
        es: "Ella es hembra",
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
            text: "hembra",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ella_hembra_aff",
          lemma: "ser",
          person: "ella",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l14",
    person: "nosotros",
    title: "Temperament",
    phrases: [
      {
        ru: "Мы кусаем",
        uk: "Ми кусаємо",
        es: "Nosotros mordemos",
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
            text: "mordemos",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_nos_aff",
          lemma: "morder",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Мы не кусаем",
        uk: "Ми не кусаємо",
        es: "Nosotros no mordemos",
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
            text: "mordemos",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_nos_neg",
          lemma: "morder",
          person: "nosotros",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Мы дружелюбные",
        uk: "Ми дружні",
        es: "Nosotros somos amistosos",
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
            text: "amistosos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_nos_amistosos_aff",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Мы самцы",
        uk: "Ми самці",
        es: "Nosotros somos machos",
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
            text: "machos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_nos_machos_aff",
          lemma: "ser",
          person: "nosotros",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Мы дружелюбные?",
        uk: "Ми дружні?",
        es: "¿Nosotros somos amistosos?",
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
            text: "amistosos?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_nos_amistosos_int",
          lemma: "ser",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Мы можем кусать?",
        uk: "Ми можемо кусати?",
        es: "¿Nosotros podemos morder?",
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
            text: "morder?",
            type: "verb_infinitive"
          }
        ],
        meta: {
          id: "w3_poder_nos_morder_int",
          lemma: "poder",
          person: "nosotros",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "ability",
            "action"
          ]
        }
      }
    ]
  },
  {
    id: "w3_l15",
    person: "ellos_ellas_ustedes",
    title: "Temperament",
    phrases: [
      {
        ru: "Они (м.р.) кусают?",
        uk: "Вони (ч.р.) кусають?",
        es: "¿Ellos muerden?",
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
            text: "muerden?",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_ellos_int",
          lemma: "morder",
          person: "ellos",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Они (ж.р.) не кусают",
        uk: "Вони (ж.р.) не кусають",
        es: "Ellas no muerden",
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
            text: "muerden",
            type: "verb"
          }
        ],
        meta: {
          id: "w3_morder_ellas_neg",
          lemma: "morder",
          person: "ellas",
          polarity: "negative",
          tense: "present",
          tags: [
            "action",
            "dog"
          ]
        }
      },
      {
        ru: "Они (м.р.) дружелюбные",
        uk: "Вони (ч.р.) дружні",
        es: "Ellos son amistosos",
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
            text: "amistosos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ellos_amistosos_aff",
          lemma: "ser",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Они (ж.р.) дружелюбные?",
        uk: "Вони (ж.р.) дружні?",
        es: "¿Ellas son amistosas?",
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
            text: "son",
            type: "verb"
          },
          {
            text: " ",
            type: "space"
          },
          {
            text: "amistosas?",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ellas_amistosas_int",
          lemma: "ser",
          person: "ellas",
          polarity: "interrogative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Они (м.р.) самцы",
        uk: "Вони (ч.р.) самці",
        es: "Ellos son machos",
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
            text: "machos",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ellos_machos_aff",
          lemma: "ser",
          person: "ellos",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      },
      {
        ru: "Они (ж.р.) самки",
        uk: "Вони (ж.р.) самки",
        es: "Ellas son hembras",
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
            text: "hembras",
            type: "adjective"
          }
        ],
        meta: {
          id: "w3_ser_ellas_hembras_aff",
          lemma: "ser",
          person: "ellas",
          polarity: "affirmative",
          tense: "present",
          tags: [
            "identity",
            "dog"
          ]
        }
      }
    ]
  },
  {
    id: "w3_exam",
    title: "🏆 Week 3 Final Exam",
    exam: true,
    phrases: []
  }
];

export default {
  id: "week_3",
  title: "Week 3: At the Park (Dog Owners)",
  description: "Practical interactions using Jugar, Morder, and dog attributes.",
  legacy: false,
  lessons: week3Lessons,
};