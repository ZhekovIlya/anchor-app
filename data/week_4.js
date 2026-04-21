const week4Lessons = [
  // ==========================================
  // BLOCK 1: ROUTINE — Lavar, Secar, Patas, Agua, Jabón, Toalla, Sucio/a
  // ==========================================
  {
    id: "w4_l1", person: "yo", title: "Routine: Washing",
    phrases: [
      {
        ru: "Я мою грязные лапы мылом", uk: "Я мию брудні лапи милом", es: "Yo lavo las patas sucias con el jabón",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"lavo",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"sucias",type:"adjective"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el jabón",type:"object"}],
        meta: {id:"w4_lavar_yo_patas_jabon", lemma:"lavar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Я сушу собаку полотенцем", uk: "Я сушу собаку рушником", es: "Yo seco el perro con la toalla",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"seco",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_secar_yo_perro_toalla", lemma:"secar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Я хочу воду и мыло", uk: "Я хочу воду і мило", es: "Yo quiero el agua y el jabón",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"el agua y el jabón",type:"object"}],
        meta: {id:"w4_querer_yo_agua_jabon", lemma:"querer", person:"yo", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "У меня есть полотенце для собаки", uk: "У мене є рушник для собаки", es: "Yo tengo la toalla para el perro",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"la toalla",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"el perro",type:"object"}],
        meta: {id:"w4_tener_yo_toalla_perro", lemma:"tener", person:"yo", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Я иду мыть грязную собаку", uk: "Я йду мити брудну собаку", es: "Yo voy a lavar el perro sucio",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"a",type:"preposition"},{text:" ",type:"space"},{text:"lavar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"sucio",type:"adjective"}],
        meta: {id:"w4_ir_yo_lavar_perro_sucio", lemma:"ir", person:"yo", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Я готов мыть лапы", uk: "Я готовий мити лапи", es: "Yo estoy listo para lavar las patas",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"lavar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"las patas",type:"object"}],
        meta: {id:"w4_estar_yo_listo_lavar", lemma:"estar", person:"yo", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l2", person: "tu", title: "Routine: Washing",
    phrases: [
      {
        ru: "Ты моешь грязные лапы водой", uk: "Ти миєш брудні лапи водою", es: "Tú lavas las patas sucias con el agua",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"lavas",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"sucias",type:"adjective"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el agua",type:"object"}],
        meta: {id:"w4_lavar_tu_patas_agua", lemma:"lavar", person:"tu", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Ты сушишь собаку полотенцем", uk: "Ти сушиш собаку рушником", es: "Tú secas el perro con la toalla",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"secas",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_secar_tu_perro_toalla", lemma:"secar", person:"tu", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Тебе нужно мыло для лап", uk: "Тобі потрібне мило для лап", es: "Tú necesitas el jabón para las patas",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"},{text:" ",type:"space"},{text:"el jabón",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"las patas",type:"object"}],
        meta: {id:"w4_necesitar_tu_jabon_patas", lemma:"necesitar", person:"tu", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "У тебя есть полотенце и мыло?", uk: "У тебе є рушник і мило?", es: "¿Tú tienes la toalla y el jabón?",
        tokens: [{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"la toalla y el jabón?",type:"object"}],
        meta: {id:"w4_tener_tu_toalla_jabon", lemma:"tener", person:"tu", polarity:"interrogative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Ты не моешь грязную собаку", uk: "Ти не миєш брудну собаку", es: "Tú no lavas el perro sucio",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"lavas",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"sucio",type:"adjective"}],
        meta: {id:"w4_lavar_tu_perro_sucio_neg", lemma:"lavar", person:"tu", polarity:"negative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Ты идешь сушить собаку", uk: "Ти йдеш сушити собаку", es: "Tú vas a secar el perro",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"a",type:"preposition"},{text:" ",type:"space"},{text:"secar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"el perro",type:"object"}],
        meta: {id:"w4_ir_tu_secar_perro", lemma:"ir", person:"tu", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l3", person: "el_ella_usted", title: "Routine: Washing",
    phrases: [
      {
        ru: "Он моет грязную собаку мылом", uk: "Він миє брудну собаку милом", es: "Él lava el perro sucio con el jabón",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"lava",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"sucio",type:"adjective"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el jabón",type:"object"}],
        meta: {id:"w4_lavar_el_perro_jabon", lemma:"lavar", person:"el", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Она сушит лапы полотенцем", uk: "Вона сушить лапи рушником", es: "Ella seca las patas con la toalla",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"seca",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_secar_ella_patas_toalla", lemma:"secar", person:"ella", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Собака грязная после парка", uk: "Собака брудна після парку", es: "El perro está sucio del parque",
        tokens: [{text:"El perro",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"sucio",type:"adjective"},{text:" ",type:"space"},{text:"del parque",type:"object"}],
        meta: {id:"w4_estar_perro_sucio_parque", lemma:"estar", person:"el", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Он не хочет воду", uk: "Він не хоче воду", es: "Él no quiere el agua",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"el agua",type:"object"}],
        meta: {id:"w4_querer_el_agua_neg", lemma:"querer", person:"el", polarity:"negative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Ей нужно полотенце для лап", uk: "Їй потрібен рушник для лап", es: "Ella necesita la toalla para las patas",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"la toalla",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"las patas",type:"object"}],
        meta: {id:"w4_necesitar_ella_toalla_patas", lemma:"necesitar", person:"ella", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Она здесь с водой и мылом", uk: "Вона тут з водою і милом", es: "Ella está aquí con el agua y el jabón",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el agua y el jabón",type:"object"}],
        meta: {id:"w4_estar_ella_aqui_agua_jabon", lemma:"estar", person:"ella", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l4", person: "nosotros", title: "Routine: Washing",
    phrases: [
      {
        ru: "Мы моем грязную собаку водой", uk: "Ми миємо брудну собаку водою", es: "Nosotros lavamos el perro sucio con el agua",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"lavamos",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"sucio",type:"adjective"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el agua",type:"object"}],
        meta: {id:"w4_lavar_nos_perro_agua", lemma:"lavar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Мы сушим лапы полотенцем", uk: "Ми сушимо лапи рушником", es: "Nosotros secamos las patas con la toalla",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"secamos",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_secar_nos_patas_toalla", lemma:"secar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "У нас есть мыло и полотенце", uk: "У нас є мило і рушник", es: "Nosotros tenemos el jabón y la toalla",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"el jabón y la toalla",type:"object"}],
        meta: {id:"w4_tener_nos_jabon_toalla", lemma:"tener", person:"nosotros", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Мы не хотим грязные лапы", uk: "Ми не хочемо брудні лапи", es: "Nosotros no queremos las patas sucias",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"sucias",type:"adjective"}],
        meta: {id:"w4_querer_nos_patas_sucias_neg", lemma:"querer", person:"nosotros", polarity:"negative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Мы идем мыть собаку в парке", uk: "Ми йдемо мити собаку в парку", es: "Nosotros vamos a lavar el perro en el parque",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"a",type:"preposition"},{text:" ",type:"space"},{text:"lavar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"en el parque",type:"object"}],
        meta: {id:"w4_ir_nos_lavar_perro_parque", lemma:"ir", person:"nosotros", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Мы готовы мыть лапы", uk: "Ми готові мити лапи", es: "Nosotros estamos listos para lavar las patas",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"lavar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"las patas",type:"object"}],
        meta: {id:"w4_estar_nos_listos_lavar", lemma:"estar", person:"nosotros", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l5", person: "ellos_ellas_ustedes", title: "Routine: Washing",
    phrases: [
      {
        ru: "Они моют грязные лапы водой", uk: "Вони миють брудні лапи водою", es: "Ellos lavan las patas sucias con el agua",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"lavan",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"sucias",type:"adjective"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el agua",type:"object"}],
        meta: {id:"w4_lavar_ellos_patas_agua", lemma:"lavar", person:"ellos", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "Они сушат собаку полотенцем", uk: "Вони сушать собаку рушником", es: "Ellos secan el perro con la toalla",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"secan",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_secar_ellos_perro_toalla", lemma:"secar", person:"ellos", polarity:"affirmative", tense:"present", tags:["new","routine"]}
      },
      {
        ru: "У них есть вода и мыло для собаки", uk: "У них є вода і мило для собаки", es: "Ellos tienen el agua y el jabón para el perro",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"el agua y el jabón",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"el perro",type:"object"}],
        meta: {id:"w4_tener_ellos_agua_jabon_perro", lemma:"tener", person:"ellos", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Им нужно полотенце для лап", uk: "Їм потрібен рушник для лап", es: "Ellos necesitan la toalla para las patas",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"la toalla",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"las patas",type:"object"}],
        meta: {id:"w4_necesitar_ellos_toalla_patas", lemma:"necesitar", person:"ellos", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Они не хотят грязную собаку", uk: "Вони не хочуть брудну собаку", es: "Ellos no quieren el perro sucio",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"sucio",type:"adjective"}],
        meta: {id:"w4_querer_ellos_perro_sucio_neg", lemma:"querer", person:"ellos", polarity:"negative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Они здесь с полотенцем", uk: "Вони тут з рушником", es: "Ellos están aquí con la toalla",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_estar_ellos_aqui_toalla", lemma:"estar", person:"ellos", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },

  // ==========================================
  // BLOCK 2: TOOLS — Usar, Ducha, Llave, Puerta, Abrir, Cerrar, Ventana
  // ==========================================
  {
    id: "w4_l6", person: "yo", title: "Tools: Access",
    phrases: [
      {
        ru: "Я использую ключ чтобы открыть дверь", uk: "Я використовую ключ щоб відкрити двері", es: "Yo uso la llave para abrir la puerta",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"uso",type:"verb"},{text:" ",type:"space"},{text:"la llave",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"abrir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_usar_yo_llave_abrir_puerta", lemma:"usar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Я закрываю окно и дверь", uk: "Я закриваю вікно і двері", es: "Yo cierro la ventana y la puerta",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"cierro",type:"verb"},{text:" ",type:"space"},{text:"la ventana y la puerta",type:"object"}],
        meta: {id:"w4_cerrar_yo_ventana_puerta", lemma:"cerrar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Я открываю дверь парка", uk: "Я відкриваю двері парку", es: "Yo abro la puerta del parque",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"abro",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"},{text:" ",type:"space"},{text:"del parque",type:"object"}],
        meta: {id:"w4_abrir_yo_puerta_parque", lemma:"abrir", person:"yo", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Я хочу использовать душ", uk: "Я хочу використати душ", es: "Yo quiero usar la ducha",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"usar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la ducha",type:"object"}],
        meta: {id:"w4_querer_yo_usar_ducha", lemma:"querer", person:"yo", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Я мою лапы в душе", uk: "Я мию лапи в душі", es: "Yo lavo las patas en la ducha",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"lavo",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"la ducha",type:"object"}],
        meta: {id:"w4_recap_yo_lavar_ducha", lemma:"lavar", person:"yo", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Я готов открыть дверь", uk: "Я готовий відкрити двері", es: "Yo estoy listo para abrir la puerta",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"abrir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_estar_yo_listo_abrir", lemma:"estar", person:"yo", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l7", person: "tu", title: "Tools: Access",
    phrases: [
      {
        ru: "Ты открываешь дверь ключом", uk: "Ти відкриваєш двері ключем", es: "Tú abres la puerta con la llave",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"abres",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la llave",type:"object"}],
        meta: {id:"w4_abrir_tu_puerta_llave", lemma:"abrir", person:"tu", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Ты закрываешь окно и используешь душ", uk: "Ти закриваєш вікно і використовуєш душ", es: "Tú cierras la ventana y usas la ducha",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"cierras",type:"verb"},{text:" ",type:"space"},{text:"la ventana",type:"object"},{text:" ",type:"space"},{text:"y",type:"preposition"},{text:" ",type:"space"},{text:"usas",type:"verb"},{text:" ",type:"space"},{text:"la ducha",type:"object"}],
        meta: {id:"w4_cerrar_tu_ventana_usar_ducha", lemma:"cerrar", person:"tu", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Ты не закрываешь дверь", uk: "Ти не закриваєш двері", es: "Tú no cierras la puerta",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"cierras",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_cerrar_tu_puerta_neg", lemma:"cerrar", person:"tu", polarity:"negative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "У тебя есть ключ от двери?", uk: "У тебе є ключ від дверей?", es: "¿Tú tienes la llave de la puerta?",
        tokens: [{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"la llave de la puerta?",type:"object"}],
        meta: {id:"w4_tener_tu_llave_puerta", lemma:"tener", person:"tu", polarity:"interrogative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Тебе нужен душ для парка", uk: "Тобі потрібен душ для парку", es: "Tú necesitas la ducha para el parque",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"},{text:" ",type:"space"},{text:"la ducha",type:"object"},{text:" ",type:"space"},{text:"para el parque",type:"object"}],
        meta: {id:"w4_necesitar_tu_ducha_parque", lemma:"necesitar", person:"tu", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Ты идешь открывать окно", uk: "Ти йдеш відкривати вікно", es: "Tú vas a abrir la ventana",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"a",type:"preposition"},{text:" ",type:"space"},{text:"abrir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la ventana",type:"object"}],
        meta: {id:"w4_ir_tu_abrir_ventana", lemma:"ir", person:"tu", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l8", person: "el_ella_usted", title: "Tools: Access",
    phrases: [
      {
        ru: "Он использует ключ для двери", uk: "Він використовує ключ для дверей", es: "Él usa la llave para la puerta",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"usa",type:"verb"},{text:" ",type:"space"},{text:"la llave",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_usar_el_llave_puerta", lemma:"usar", person:"el", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Она открывает окно и закрывает дверь", uk: "Вона відкриває вікно і закриває двері", es: "Ella abre la ventana y cierra la puerta",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"abre",type:"verb"},{text:" ",type:"space"},{text:"la ventana",type:"object"},{text:" ",type:"space"},{text:"y",type:"preposition"},{text:" ",type:"space"},{text:"cierra",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_abrir_ella_ventana_cerrar_puerta", lemma:"abrir", person:"ella", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Он не использует душ", uk: "Він не використовує душ", es: "Él no usa la ducha",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"usa",type:"verb"},{text:" ",type:"space"},{text:"la ducha",type:"object"}],
        meta: {id:"w4_usar_el_ducha_neg", lemma:"usar", person:"el", polarity:"negative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Она хочет открыть дверь", uk: "Вона хоче відкрити двері", es: "Ella quiere abrir la puerta",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"abrir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_querer_ella_abrir_puerta", lemma:"querer", person:"ella", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Ей нужен ключ от двери", uk: "Їй потрібен ключ від дверей", es: "Ella necesita la llave de la puerta",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"la llave de la puerta",type:"object"}],
        meta: {id:"w4_necesitar_ella_llave_puerta", lemma:"necesitar", person:"ella", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Он здесь с ключом", uk: "Він тут з ключем", es: "Él está aquí con la llave",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la llave",type:"object"}],
        meta: {id:"w4_estar_el_aqui_llave", lemma:"estar", person:"el", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l9", person: "nosotros", title: "Tools: Access",
    phrases: [
      {
        ru: "Мы используем ключи для двери", uk: "Ми використовуємо ключі для дверей", es: "Nosotros usamos las llaves para la puerta",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"usamos",type:"verb"},{text:" ",type:"space"},{text:"las llaves",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_usar_nos_llaves_puerta", lemma:"usar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Мы открываем окно и закрываем дверь", uk: "Ми відкриваємо вікно і закриваємо двері", es: "Nosotros abrimos la ventana y cerramos la puerta",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"abrimos",type:"verb"},{text:" ",type:"space"},{text:"la ventana",type:"object"},{text:" ",type:"space"},{text:"y",type:"preposition"},{text:" ",type:"space"},{text:"cerramos",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_abrir_nos_ventana_cerrar_puerta", lemma:"abrir", person:"nosotros", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Мы моем лапы в душе", uk: "Ми миємо лапи в душі", es: "Nosotros lavamos las patas en la ducha",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"lavamos",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"la ducha",type:"object"}],
        meta: {id:"w4_recap_nos_lavar_ducha", lemma:"lavar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мы не закрываем окно", uk: "Ми не закриваємо вікно", es: "Nosotros no cerramos la ventana",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"cerramos",type:"verb"},{text:" ",type:"space"},{text:"la ventana",type:"object"}],
        meta: {id:"w4_cerrar_nos_ventana_neg", lemma:"cerrar", person:"nosotros", polarity:"negative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "У нас есть ключи и полотенце", uk: "У нас є ключі і рушник", es: "Nosotros tenemos las llaves y la toalla",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"las llaves y la toalla",type:"object"}],
        meta: {id:"w4_tener_nos_llaves_toalla", lemma:"tener", person:"nosotros", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Мы готовы закрыть дверь", uk: "Ми готові закрити двері", es: "Nosotros estamos listos para cerrar la puerta",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"cerrar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_estar_nos_listos_cerrar", lemma:"estar", person:"nosotros", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l10", person: "ellos_ellas_ustedes", title: "Tools: Access",
    phrases: [
      {
        ru: "Они используют душ после парка", uk: "Вони використовують душ після парку", es: "Ellos usan la ducha del parque",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"usan",type:"verb"},{text:" ",type:"space"},{text:"la ducha",type:"object"},{text:" ",type:"space"},{text:"del parque",type:"object"}],
        meta: {id:"w4_usar_ellos_ducha_parque", lemma:"usar", person:"ellos", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Они закрывают дверь и окно", uk: "Вони закривають двері і вікно", es: "Ellos cierran la puerta y la ventana",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"cierran",type:"verb"},{text:" ",type:"space"},{text:"la puerta y la ventana",type:"object"}],
        meta: {id:"w4_cerrar_ellos_puerta_ventana", lemma:"cerrar", person:"ellos", polarity:"affirmative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Они не открывают дверь без ключа", uk: "Вони не відкривають двері без ключа", es: "Ellos no abren la puerta sin la llave",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"abren",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"},{text:" ",type:"space"},{text:"sin",type:"preposition"},{text:" ",type:"space"},{text:"la llave",type:"object"}],
        meta: {id:"w4_abrir_ellos_puerta_llave_neg", lemma:"abrir", person:"ellos", polarity:"negative", tense:"present", tags:["new","tools"]}
      },
      {
        ru: "Они сушат лапы полотенцем", uk: "Вони сушать лапи рушником", es: "Ellos secan las patas con la toalla",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"secan",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"la toalla",type:"object"}],
        meta: {id:"w4_recap_ellos_secar_patas", lemma:"secar", person:"ellos", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Они хотят открыть окно", uk: "Вони хочуть відкрити вікно", es: "Ellos quieren abrir la ventana",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"abrir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la ventana",type:"object"}],
        meta: {id:"w4_querer_ellos_abrir_ventana", lemma:"querer", person:"ellos", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Они здесь с ключами", uk: "Вони тут з ключами", es: "Ellos están aquí con las llaves",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"las llaves",type:"object"}],
        meta: {id:"w4_estar_ellos_aqui_llaves", lemma:"estar", person:"ellos", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },

  // ==========================================
  // BLOCK 3: PROPERTY — Limpiar, Casa, Cocina, Baño, Habitación, Jardín, Limpio/a
  // ==========================================
  {
    id: "w4_l11", person: "yo", title: "Property: Cleaning",
    phrases: [
      {
        ru: "Я убираю кухню и ванную", uk: "Я прибираю кухню і ванну", es: "Yo limpio la cocina y el baño",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"limpio",type:"verb"},{text:" ",type:"space"},{text:"la cocina y el baño",type:"object"}],
        meta: {id:"w4_limpiar_yo_cocina_bano", lemma:"limpiar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Я убираю комнату и сад", uk: "Я прибираю кімнату і сад", es: "Yo limpio la habitación y el jardín",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"limpio",type:"verb"},{text:" ",type:"space"},{text:"la habitación y el jardín",type:"object"}],
        meta: {id:"w4_limpiar_yo_habitacion_jardin", lemma:"limpiar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Я открываю дверь в сад", uk: "Я відкриваю двері в сад", es: "Yo abro la puerta del jardín",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"abro",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"},{text:" ",type:"space"},{text:"del jardín",type:"object"}],
        meta: {id:"w4_recap_yo_abrir_jardin", lemma:"abrir", person:"yo", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Я мою собаку в ванной", uk: "Я мию собаку у ванній", es: "Yo lavo el perro en el baño",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"lavo",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"el baño",type:"object"}],
        meta: {id:"w4_recap_yo_lavar_bano", lemma:"lavar", person:"yo", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Я хочу чистый дом", uk: "Я хочу чистий будинок", es: "Yo quiero la casa limpia",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"la casa",type:"object"},{text:" ",type:"space"},{text:"limpia",type:"adjective"}],
        meta: {id:"w4_querer_yo_casa_limpia", lemma:"querer", person:"yo", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Дом чистый после уборки", uk: "Будинок чистий після прибирання", es: "La casa está limpia",
        tokens: [{text:"La casa",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"limpia",type:"adjective"}],
        meta: {id:"w4_estar_casa_limpia", lemma:"estar", person:"ella", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l12", person: "tu", title: "Property: Cleaning",
    phrases: [
      {
        ru: "Ты убираешь кухню и комнату", uk: "Ти прибираєш кухню і кімнату", es: "Tú limpias la cocina y la habitación",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"limpias",type:"verb"},{text:" ",type:"space"},{text:"la cocina y la habitación",type:"object"}],
        meta: {id:"w4_limpiar_tu_cocina_habitacion", lemma:"limpiar", person:"tu", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Ты не убираешь сад и ванную", uk: "Ти не прибираєш сад і ванну", es: "Tú no limpias el jardín y el baño",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"limpias",type:"verb"},{text:" ",type:"space"},{text:"el jardín y el baño",type:"object"}],
        meta: {id:"w4_limpiar_tu_jardin_bano_neg", lemma:"limpiar", person:"tu", polarity:"negative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Ты закрываешь дверь в комнату", uk: "Ти закриваєш двері в кімнату", es: "Tú cierras la puerta de la habitación",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"cierras",type:"verb"},{text:" ",type:"space"},{text:"la puerta de la habitación",type:"object"}],
        meta: {id:"w4_recap_tu_cerrar_habitacion", lemma:"cerrar", person:"tu", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Ты сушишь собаку в ванной", uk: "Ти сушиш собаку у ванній", es: "Tú secas el perro en el baño",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"secas",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"el baño",type:"object"}],
        meta: {id:"w4_recap_tu_secar_bano", lemma:"secar", person:"tu", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Тебе нужен чистый дом", uk: "Тобі потрібен чистий будинок", es: "Tú necesitas la casa limpia",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"},{text:" ",type:"space"},{text:"la casa",type:"object"},{text:" ",type:"space"},{text:"limpia",type:"adjective"}],
        meta: {id:"w4_necesitar_tu_casa_limpia", lemma:"necesitar", person:"tu", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Собака в саду", uk: "Собака в саду", es: "El perro está en el jardín",
        tokens: [{text:"El perro",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"el jardín",type:"object"}],
        meta: {id:"w4_estar_perro_jardin", lemma:"estar", person:"el", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l13", person: "el_ella_usted", title: "Property: Cleaning",
    phrases: [
      {
        ru: "Он убирает дом и сад", uk: "Він прибирає будинок і сад", es: "Él limpia la casa y el jardín",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"limpia",type:"verb"},{text:" ",type:"space"},{text:"la casa y el jardín",type:"object"}],
        meta: {id:"w4_limpiar_el_casa_jardin", lemma:"limpiar", person:"el", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Она убирает ванную и комнату", uk: "Вона прибирає ванну і кімнату", es: "Ella limpia el baño y la habitación",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"limpia",type:"verb"},{text:" ",type:"space"},{text:"el baño y la habitación",type:"object"}],
        meta: {id:"w4_limpiar_ella_bano_habitacion", lemma:"limpiar", person:"ella", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Он открывает окно в комнате", uk: "Він відкриває вікно в кімнаті", es: "Él abre la ventana de la habitación",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"abre",type:"verb"},{text:" ",type:"space"},{text:"la ventana de la habitación",type:"object"}],
        meta: {id:"w4_recap_el_abrir_ventana_habitacion", lemma:"abrir", person:"el", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Она моет кухню с водой", uk: "Вона миє кухню з водою", es: "Ella lava la cocina con el agua",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"lava",type:"verb"},{text:" ",type:"space"},{text:"la cocina",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el agua",type:"object"}],
        meta: {id:"w4_recap_ella_lavar_cocina_agua", lemma:"lavar", person:"ella", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Ему нужен чистый сад для собаки", uk: "Йому потрібен чистий сад для собаки", es: "Él necesita el jardín limpio para el perro",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"el jardín",type:"object"},{text:" ",type:"space"},{text:"limpio",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"el perro",type:"object"}],
        meta: {id:"w4_necesitar_el_jardin_limpio_perro", lemma:"necesitar", person:"el", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Комната чистая", uk: "Кімната чиста", es: "La habitación está limpia",
        tokens: [{text:"La habitación",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"limpia",type:"adjective"}],
        meta: {id:"w4_estar_habitacion_limpia", lemma:"estar", person:"ella", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l14", person: "nosotros", title: "Property: Cleaning",
    phrases: [
      {
        ru: "Мы убираем кухню и ванную", uk: "Ми прибираємо кухню і ванну", es: "Nosotros limpiamos la cocina y el baño",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"limpiamos",type:"verb"},{text:" ",type:"space"},{text:"la cocina y el baño",type:"object"}],
        meta: {id:"w4_limpiar_nos_cocina_bano", lemma:"limpiar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Мы не убираем сад собаки", uk: "Ми не прибираємо сад собаки", es: "Nosotros no limpiamos el jardín del perro",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"limpiamos",type:"verb"},{text:" ",type:"space"},{text:"el jardín del perro",type:"object"}],
        meta: {id:"w4_limpiar_nos_jardin_perro_neg", lemma:"limpiar", person:"nosotros", polarity:"negative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Мы используем воду для ванной", uk: "Ми використовуємо воду для ванної", es: "Nosotros usamos el agua para el baño",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"usamos",type:"verb"},{text:" ",type:"space"},{text:"el agua",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"el baño",type:"object"}],
        meta: {id:"w4_recap_nos_usar_agua_bano", lemma:"usar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мы моем собаку в саду", uk: "Ми миємо собаку в саду", es: "Nosotros lavamos el perro en el jardín",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"lavamos",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"el jardín",type:"object"}],
        meta: {id:"w4_recap_nos_lavar_perro_jardin", lemma:"lavar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мы хотим чистую комнату", uk: "Ми хочемо чисту кімнату", es: "Nosotros queremos la habitación limpia",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"la habitación",type:"object"},{text:" ",type:"space"},{text:"limpia",type:"adjective"}],
        meta: {id:"w4_querer_nos_habitacion_limpia", lemma:"querer", person:"nosotros", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Мы готовы убирать дом", uk: "Ми готові прибирати будинок", es: "Nosotros estamos listos para limpiar la casa",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"limpiar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la casa",type:"object"}],
        meta: {id:"w4_estar_nos_listos_limpiar", lemma:"estar", person:"nosotros", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l15", person: "ellos_ellas_ustedes", title: "Property: Cleaning",
    phrases: [
      {
        ru: "Они убирают комнаты и ванную", uk: "Вони прибирають кімнати і ванну", es: "Ellos limpian las habitaciones y el baño",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"limpian",type:"verb"},{text:" ",type:"space"},{text:"las habitaciones y el baño",type:"object"}],
        meta: {id:"w4_limpiar_ellos_habitaciones_bano", lemma:"limpiar", person:"ellos", polarity:"affirmative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Они не убирают сад", uk: "Вони не прибирають сад", es: "Ellos no limpian el jardín",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"limpian",type:"verb"},{text:" ",type:"space"},{text:"el jardín",type:"object"}],
        meta: {id:"w4_limpiar_ellos_jardin_neg", lemma:"limpiar", person:"ellos", polarity:"negative", tense:"present", tags:["new","property"]}
      },
      {
        ru: "Они сушат собаку в ванной", uk: "Вони сушать собаку у ванній", es: "Ellos secan el perro en el baño",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"secan",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"el baño",type:"object"}],
        meta: {id:"w4_recap_ellos_secar_bano", lemma:"secar", person:"ellos", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Они закрывают дверь в сад", uk: "Вони закривають двері в сад", es: "Ellos cierran la puerta del jardín",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"cierran",type:"verb"},{text:" ",type:"space"},{text:"la puerta del jardín",type:"object"}],
        meta: {id:"w4_recap_ellos_cerrar_jardin", lemma:"cerrar", person:"ellos", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Им нужна чистая кухня", uk: "Їм потрібна чиста кухня", es: "Ellos necesitan la cocina limpia",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"la cocina",type:"object"},{text:" ",type:"space"},{text:"limpia",type:"adjective"}],
        meta: {id:"w4_necesitar_ellos_cocina_limpia", lemma:"necesitar", person:"ellos", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Дом и сад чистые", uk: "Будинок і сад чисті", es: "La casa y el jardín están limpios",
        tokens: [{text:"La casa y el jardín",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"limpios",type:"adjective"}],
        meta: {id:"w4_estar_casa_jardin_limpios", lemma:"estar", person:"ellos", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },

  // ==========================================
  // BLOCK 4: FINANCE — Costar, Cuánto, Pagar, Alquiler, Caro, Barato, Contrato
  // ==========================================
  {
    id: "w4_l16", person: "yo", title: "Finance: Costs",
    phrases: [
      {
        ru: "Я плачу за аренду дома", uk: "Я плачу за оренду будинку", es: "Yo pago el alquiler de la casa",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"pago",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"de la casa",type:"object"}],
        meta: {id:"w4_pagar_yo_alquiler_casa", lemma:"pagar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Сколько стоит контракт?", uk: "Скільки коштує контракт?", es: "¿Cuánto cuesta el contrato?",
        tokens: [{text:"¿",type:"space"},{text:"Cuánto",type:"question"},{text:" ",type:"space"},{text:"cuesta",type:"verb"},{text:" ",type:"space"},{text:"el contrato?",type:"object"}],
        meta: {id:"w4_costar_contrato_int", lemma:"costar", person:"el", polarity:"interrogative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Аренда дорогая, не дешевая", uk: "Оренда дорога, не дешева", es: "El alquiler es caro, no es barato",
        tokens: [{text:"El alquiler",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"caro",type:"adjective"},{text:", ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_ser_alquiler_caro_barato", lemma:"ser", person:"el", polarity:"affirmative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Я убираю дом для контракта", uk: "Я прибираю будинок для контракту", es: "Yo limpio la casa para el contrato",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"limpio",type:"verb"},{text:" ",type:"space"},{text:"la casa",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],
        meta: {id:"w4_recap_yo_limpiar_contrato", lemma:"limpiar", person:"yo", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мне нужен дешевый контракт", uk: "Мені потрібен дешевий контракт", es: "Yo necesito el contrato barato",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"necesito",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_necesitar_yo_contrato_barato", lemma:"necesitar", person:"yo", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Я хочу платить за аренду", uk: "Я хочу платити за оренду", es: "Yo quiero pagar el alquiler",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"el alquiler",type:"object"}],
        meta: {id:"w4_querer_yo_pagar_alquiler", lemma:"querer", person:"yo", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l17", person: "tu", title: "Finance: Costs",
    phrases: [
      {
        ru: "Сколько стоит аренда?", uk: "Скільки коштує оренда?", es: "¿Cuánto cuesta el alquiler?",
        tokens: [{text:"¿",type:"space"},{text:"Cuánto",type:"question"},{text:" ",type:"space"},{text:"cuesta",type:"verb"},{text:" ",type:"space"},{text:"el alquiler?",type:"object"}],
        meta: {id:"w4_costar_alquiler_int", lemma:"costar", person:"el", polarity:"interrogative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Ты платишь за дорогой контракт", uk: "Ти платиш за дорогий контракт", es: "Tú pagas el contrato caro",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"pagas",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"},{text:" ",type:"space"},{text:"caro",type:"adjective"}],
        meta: {id:"w4_pagar_tu_contrato_caro", lemma:"pagar", person:"tu", polarity:"affirmative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Ты не хочешь дорогую аренду", uk: "Ти не хочеш дорогу оренду", es: "Tú no quieres el alquiler caro",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quieres",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"caro",type:"adjective"}],
        meta: {id:"w4_querer_tu_alquiler_caro_neg", lemma:"querer", person:"tu", polarity:"negative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Ты используешь ключ для двери", uk: "Ти використовуєш ключ для дверей", es: "Tú usas la llave para la puerta",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"usas",type:"verb"},{text:" ",type:"space"},{text:"la llave",type:"object"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"la puerta",type:"object"}],
        meta: {id:"w4_recap_tu_usar_llave_puerta", lemma:"usar", person:"tu", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Тебе нужен дешевый дом", uk: "Тобі потрібен дешевий будинок", es: "Tú necesitas la casa barata",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"},{text:" ",type:"space"},{text:"la casa",type:"object"},{text:" ",type:"space"},{text:"barata",type:"adjective"}],
        meta: {id:"w4_necesitar_tu_casa_barata", lemma:"necesitar", person:"tu", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Аренда дешевая", uk: "Оренда дешева", es: "El alquiler es barato",
        tokens: [{text:"El alquiler",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_ser_alquiler_barato", lemma:"ser", person:"el", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l18", person: "el_ella_usted", title: "Finance: Costs",
    phrases: [
      {
        ru: "Сколько стоит дом?", uk: "Скільки коштує будинок?", es: "¿Cuánto cuesta la casa?",
        tokens: [{text:"¿",type:"space"},{text:"Cuánto",type:"question"},{text:" ",type:"space"},{text:"cuesta",type:"verb"},{text:" ",type:"space"},{text:"la casa?",type:"object"}],
        meta: {id:"w4_costar_casa_int", lemma:"costar", person:"el", polarity:"interrogative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Он платит за дорогую аренду", uk: "Він платить за дорогу оренду", es: "Él paga el alquiler caro",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"paga",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"caro",type:"adjective"}],
        meta: {id:"w4_pagar_el_alquiler_caro", lemma:"pagar", person:"el", polarity:"affirmative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Она не платит за контракт", uk: "Вона не платить за контракт", es: "Ella no paga el contrato",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"paga",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],
        meta: {id:"w4_pagar_ella_contrato_neg", lemma:"pagar", person:"ella", polarity:"negative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Он убирает кухню в доме", uk: "Він прибирає кухню в будинку", es: "Él limpia la cocina de la casa",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"limpia",type:"verb"},{text:" ",type:"space"},{text:"la cocina de la casa",type:"object"}],
        meta: {id:"w4_recap_el_limpiar_cocina_casa", lemma:"limpiar", person:"el", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Ей нужен дешевый контракт", uk: "Їй потрібен дешевий контракт", es: "Ella necesita el contrato barato",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_necesitar_ella_contrato_barato", lemma:"necesitar", person:"ella", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Контракт дорогой", uk: "Контракт дорогий", es: "El contrato es caro",
        tokens: [{text:"El contrato",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"caro",type:"adjective"}],
        meta: {id:"w4_ser_contrato_caro", lemma:"ser", person:"el", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l19", person: "nosotros", title: "Finance: Costs",
    phrases: [
      {
        ru: "Мы платим за аренду и контракт", uk: "Ми платимо за оренду і контракт", es: "Nosotros pagamos el alquiler y el contrato",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"pagamos",type:"verb"},{text:" ",type:"space"},{text:"el alquiler y el contrato",type:"object"}],
        meta: {id:"w4_pagar_nos_alquiler_contrato", lemma:"pagar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Сколько стоят ключи?", uk: "Скільки коштують ключі?", es: "¿Cuánto cuestan las llaves?",
        tokens: [{text:"¿",type:"space"},{text:"Cuánto",type:"question"},{text:" ",type:"space"},{text:"cuestan",type:"verb"},{text:" ",type:"space"},{text:"las llaves?",type:"object"}],
        meta: {id:"w4_costar_llaves_int", lemma:"costar", person:"ellos", polarity:"interrogative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Мы не хотим дорогой дом", uk: "Ми не хочемо дорогий будинок", es: "Nosotros no queremos la casa cara",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"la casa",type:"object"},{text:" ",type:"space"},{text:"cara",type:"adjective"}],
        meta: {id:"w4_querer_nos_casa_cara_neg", lemma:"querer", person:"nosotros", polarity:"negative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Мы убираем комнаты дома", uk: "Ми прибираємо кімнати будинку", es: "Nosotros limpiamos las habitaciones de la casa",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"limpiamos",type:"verb"},{text:" ",type:"space"},{text:"las habitaciones de la casa",type:"object"}],
        meta: {id:"w4_recap_nos_limpiar_habitaciones", lemma:"limpiar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "У нас есть дешевый контракт", uk: "У нас є дешевий контракт", es: "Nosotros tenemos el contrato barato",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_tener_nos_contrato_barato", lemma:"tener", person:"nosotros", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Мы готовы платить", uk: "Ми готові платити", es: "Nosotros estamos listos para pagar",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"adjective"},{text:" ",type:"space"},{text:"para",type:"preposition"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],
        meta: {id:"w4_estar_nos_listos_pagar", lemma:"estar", person:"nosotros", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l20", person: "ellos_ellas_ustedes", title: "Finance: Costs",
    phrases: [
      {
        ru: "Сколько стоит душ?", uk: "Скільки коштує душ?", es: "¿Cuánto cuesta la ducha?",
        tokens: [{text:"¿",type:"space"},{text:"Cuánto",type:"question"},{text:" ",type:"space"},{text:"cuesta",type:"verb"},{text:" ",type:"space"},{text:"la ducha?",type:"object"}],
        meta: {id:"w4_costar_ducha_int", lemma:"costar", person:"el", polarity:"interrogative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Они не платят за дорогую аренду", uk: "Вони не платять за дорогу оренду", es: "Ellos no pagan el alquiler caro",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"pagan",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"caro",type:"adjective"}],
        meta: {id:"w4_pagar_ellos_alquiler_caro_neg", lemma:"pagar", person:"ellos", polarity:"negative", tense:"present", tags:["new","finance"]}
      },
      {
        ru: "Они хотят дешевый контракт", uk: "Вони хочуть дешевий контракт", es: "Ellos quieren el contrato barato",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_querer_ellos_contrato_barato", lemma:"querer", person:"ellos", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Они моют кухню водой", uk: "Вони миють кухню водою", es: "Ellos lavan la cocina con el agua",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"lavan",type:"verb"},{text:" ",type:"space"},{text:"la cocina",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el agua",type:"object"}],
        meta: {id:"w4_recap_ellos_lavar_cocina_agua", lemma:"lavar", person:"ellos", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Им нужна дешевая аренда", uk: "Їм потрібна дешева оренда", es: "Ellos necesitan el alquiler barato",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"barato",type:"adjective"}],
        meta: {id:"w4_necesitar_ellos_alquiler_barato", lemma:"necesitar", person:"ellos", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Аренда и контракт дешевые", uk: "Оренда і контракт дешеві", es: "El alquiler y el contrato son baratos",
        tokens: [{text:"El alquiler y el contrato",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"baratos",type:"adjective"}],
        meta: {id:"w4_ser_alquiler_contrato_baratos", lemma:"ser", person:"ellos", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },

  // ==========================================
  // BLOCK 5: QUESTIONS & TIME — Dónde, Cuándo, Ahora, Hoy, Mañana, Pronto, Tarde
  // ==========================================
  {
    id: "w4_l21", person: "yo", title: "Questions: Time",
    phrases: [
      {
        ru: "Где я сейчас?", uk: "Де я зараз?", es: "¿Dónde estoy yo ahora?",
        tokens: [{text:"¿",type:"space"},{text:"Dónde",type:"question"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"yo",type:"subject"},{text:" ",type:"space"},{text:"ahora?",type:"adverb"}],
        meta: {id:"w4_donde_yo_ahora_int", lemma:"estar", person:"yo", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Сегодня я мою лапы, завтра — нет", uk: "Сьогодні я мию лапи, завтра — ні", es: "Hoy yo lavo las patas, mañana no",
        tokens: [{text:"Hoy",type:"adverb"},{text:" ",type:"space"},{text:"yo",type:"subject"},{text:" ",type:"space"},{text:"lavo",type:"verb"},{text:" ",type:"space"},{text:"las patas",type:"object"},{text:", ",type:"space"},{text:"mañana",type:"adverb"},{text:" ",type:"space"},{text:"no",type:"negation"}],
        meta: {id:"w4_hoy_yo_lavar_manana", lemma:"lavar", person:"yo", polarity:"affirmative", tense:"present", tags:["new","time"]}
      },
      {
        ru: "Я скоро плачу за аренду", uk: "Я скоро плачу за оренду", es: "Yo pago el alquiler pronto",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"pago",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"pronto",type:"adverb"}],
        meta: {id:"w4_recap_yo_pagar_pronto", lemma:"pagar", person:"yo", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Я сейчас убираю кухню", uk: "Я зараз прибираю кухню", es: "Yo limpio la cocina ahora",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"limpio",type:"verb"},{text:" ",type:"space"},{text:"la cocina",type:"object"},{text:" ",type:"space"},{text:"ahora",type:"adverb"}],
        meta: {id:"w4_recap_yo_limpiar_ahora", lemma:"limpiar", person:"yo", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Я хочу играть в парке сегодня", uk: "Я хочу грати в парку сьогодні", es: "Yo quiero jugar en el parque hoy",
        tokens: [{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"jugar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"en el parque",type:"object"},{text:" ",type:"space"},{text:"hoy",type:"adverb"}],
        meta: {id:"w4_querer_yo_jugar_hoy", lemma:"querer", person:"yo", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Уже поздно, я здесь", uk: "Вже пізно, я тут", es: "Es tarde, yo estoy aquí",
        tokens: [{text:"Es",type:"verb"},{text:" ",type:"space"},{text:"tarde",type:"adverb"},{text:", ",type:"space"},{text:"yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],
        meta: {id:"w4_ser_tarde_estar_yo_aqui", lemma:"estar", person:"yo", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l22", person: "tu", title: "Questions: Time",
    phrases: [
      {
        ru: "Когда ты идешь в парк?", uk: "Коли ти йдеш до парку?", es: "¿Cuándo tú vas al parque?",
        tokens: [{text:"¿",type:"space"},{text:"Cuándo",type:"question"},{text:" ",type:"space"},{text:"tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"al parque?",type:"object"}],
        meta: {id:"w4_cuando_tu_ir_parque", lemma:"ir", person:"tu", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Где ключ от двери?", uk: "Де ключ від дверей?", es: "¿Dónde está la llave de la puerta?",
        tokens: [{text:"¿",type:"space"},{text:"Dónde",type:"question"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"la llave de la puerta?",type:"object"}],
        meta: {id:"w4_donde_llave_puerta_int", lemma:"estar", person:"ella", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Ты сушишь собаку сейчас?", uk: "Ти сушиш собаку зараз?", es: "¿Tú secas el perro ahora?",
        tokens: [{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"secas",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"ahora?",type:"adverb"}],
        meta: {id:"w4_recap_tu_secar_ahora", lemma:"secar", person:"tu", polarity:"interrogative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Ты платишь завтра или сегодня?", uk: "Ти платиш завтра чи сьогодні?", es: "¿Tú pagas mañana o hoy?",
        tokens: [{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"pagas",type:"verb"},{text:" ",type:"space"},{text:"mañana",type:"adverb"},{text:" ",type:"space"},{text:"o",type:"preposition"},{text:" ",type:"space"},{text:"hoy?",type:"adverb"}],
        meta: {id:"w4_recap_tu_pagar_manana_hoy", lemma:"pagar", person:"tu", polarity:"interrogative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Ты скоро закрываешь дверь", uk: "Ти скоро закриваєш двері", es: "Tú cierras la puerta pronto",
        tokens: [{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"cierras",type:"verb"},{text:" ",type:"space"},{text:"la puerta",type:"object"},{text:" ",type:"space"},{text:"pronto",type:"adverb"}],
        meta: {id:"w4_recap_tu_cerrar_pronto", lemma:"cerrar", person:"tu", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Уже поздно, ты здесь?", uk: "Вже пізно, ти тут?", es: "¿Es tarde, tú estás aquí?",
        tokens: [{text:"¿",type:"space"},{text:"Es",type:"verb"},{text:" ",type:"space"},{text:"tarde",type:"adverb"},{text:", ",type:"space"},{text:"tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"aquí?",type:"object"}],
        meta: {id:"w4_ser_tarde_estar_tu_aqui", lemma:"estar", person:"tu", polarity:"interrogative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l23", person: "el_ella_usted", title: "Questions: Time",
    phrases: [
      {
        ru: "Где собака сейчас?", uk: "Де собака зараз?", es: "¿Dónde está el perro ahora?",
        tokens: [{text:"¿",type:"space"},{text:"Dónde",type:"question"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"ahora?",type:"adverb"}],
        meta: {id:"w4_donde_perro_ahora_int", lemma:"estar", person:"el", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Когда он платит за аренду?", uk: "Коли він платить за оренду?", es: "¿Cuándo él paga el alquiler?",
        tokens: [{text:"¿",type:"space"},{text:"Cuándo",type:"question"},{text:" ",type:"space"},{text:"él",type:"subject"},{text:" ",type:"space"},{text:"paga",type:"verb"},{text:" ",type:"space"},{text:"el alquiler?",type:"object"}],
        meta: {id:"w4_cuando_el_pagar_alquiler", lemma:"pagar", person:"el", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Он скоро моет собаку", uk: "Він скоро миє собаку", es: "Él lava el perro pronto",
        tokens: [{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"lava",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"pronto",type:"adverb"}],
        meta: {id:"w4_recap_el_lavar_pronto", lemma:"lavar", person:"el", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Она убирает дом сегодня", uk: "Вона прибирає будинок сьогодні", es: "Ella limpia la casa hoy",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"limpia",type:"verb"},{text:" ",type:"space"},{text:"la casa",type:"object"},{text:" ",type:"space"},{text:"hoy",type:"adverb"}],
        meta: {id:"w4_recap_ella_limpiar_hoy", lemma:"limpiar", person:"ella", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Она хочет открыть окно завтра", uk: "Вона хоче відкрити вікно завтра", es: "Ella quiere abrir la ventana mañana",
        tokens: [{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"abrir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"la ventana",type:"object"},{text:" ",type:"space"},{text:"mañana",type:"adverb"}],
        meta: {id:"w4_querer_ella_abrir_ventana_manana", lemma:"querer", person:"ella", polarity:"affirmative", tense:"present", from_week:2, tags:["review"]}
      },
      {
        ru: "Уже поздно, он здесь с собакой", uk: "Вже пізно, він тут з собакою", es: "Es tarde, él está aquí con el perro",
        tokens: [{text:"Es",type:"verb"},{text:" ",type:"space"},{text:"tarde",type:"adverb"},{text:", ",type:"space"},{text:"él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el perro",type:"object"}],
        meta: {id:"w4_ser_tarde_estar_el_aqui_perro", lemma:"estar", person:"el", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l24", person: "nosotros", title: "Questions: Time",
    phrases: [
      {
        ru: "Когда мы идем в парк сегодня?", uk: "Коли ми йдемо до парку сьогодні?", es: "¿Cuándo nosotros vamos al parque hoy?",
        tokens: [{text:"¿",type:"space"},{text:"Cuándo",type:"question"},{text:" ",type:"space"},{text:"nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"al parque",type:"object"},{text:" ",type:"space"},{text:"hoy?",type:"adverb"}],
        meta: {id:"w4_cuando_nos_ir_parque_hoy", lemma:"ir", person:"nosotros", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Мы скоро моем собаку в саду", uk: "Ми скоро миємо собаку в саду", es: "Nosotros lavamos el perro en el jardín pronto",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"lavamos",type:"verb"},{text:" ",type:"space"},{text:"el perro",type:"object"},{text:" ",type:"space"},{text:"en",type:"preposition"},{text:" ",type:"space"},{text:"el jardín",type:"object"},{text:" ",type:"space"},{text:"pronto",type:"adverb"}],
        meta: {id:"w4_recap_nos_lavar_jardin_pronto", lemma:"lavar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мы сейчас закрываем окно", uk: "Ми зараз закриваємо вікно", es: "Nosotros cerramos la ventana ahora",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"cerramos",type:"verb"},{text:" ",type:"space"},{text:"la ventana",type:"object"},{text:" ",type:"space"},{text:"ahora",type:"adverb"}],
        meta: {id:"w4_recap_nos_cerrar_ahora", lemma:"cerrar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мы платим за аренду завтра", uk: "Ми платимо за оренду завтра", es: "Nosotros pagamos el alquiler mañana",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"pagamos",type:"verb"},{text:" ",type:"space"},{text:"el alquiler",type:"object"},{text:" ",type:"space"},{text:"mañana",type:"adverb"}],
        meta: {id:"w4_recap_nos_pagar_manana", lemma:"pagar", person:"nosotros", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Мы хотим играть в парке сегодня", uk: "Ми хочемо грати в парку сьогодні", es: "Nosotros queremos jugar en el parque hoy",
        tokens: [{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"jugar",type:"verb_infinitive"},{text:" ",type:"space"},{text:"en el parque",type:"object"},{text:" ",type:"space"},{text:"hoy",type:"adverb"}],
        meta: {id:"w4_querer_nos_jugar_parque_hoy", lemma:"querer", person:"nosotros", polarity:"affirmative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Уже поздно, мы здесь", uk: "Вже пізно, ми тут", es: "Es tarde, nosotros estamos aquí",
        tokens: [{text:"Es",type:"verb"},{text:" ",type:"space"},{text:"tarde",type:"adverb"},{text:", ",type:"space"},{text:"nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],
        meta: {id:"w4_ser_tarde_estar_nos_aqui", lemma:"estar", person:"nosotros", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },
  {
    id: "w4_l25", person: "ellos_ellas_ustedes", title: "Questions: Time",
    phrases: [
      {
        ru: "Где они сейчас?", uk: "Де вони зараз?", es: "¿Dónde están ellos ahora?",
        tokens: [{text:"¿",type:"space"},{text:"Dónde",type:"question"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"ellos",type:"subject"},{text:" ",type:"space"},{text:"ahora?",type:"adverb"}],
        meta: {id:"w4_donde_ellos_ahora_int", lemma:"estar", person:"ellos", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Когда они моют собаку?", uk: "Коли вони миють собаку?", es: "¿Cuándo ellos lavan el perro?",
        tokens: [{text:"¿",type:"space"},{text:"Cuándo",type:"question"},{text:" ",type:"space"},{text:"ellos",type:"subject"},{text:" ",type:"space"},{text:"lavan",type:"verb"},{text:" ",type:"space"},{text:"el perro?",type:"object"}],
        meta: {id:"w4_cuando_ellos_lavar_perro", lemma:"lavar", person:"ellos", polarity:"interrogative", tense:"present", tags:["new","question"]}
      },
      {
        ru: "Они скоро убирают сад", uk: "Вони скоро прибирають сад", es: "Ellos limpian el jardín pronto",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"limpian",type:"verb"},{text:" ",type:"space"},{text:"el jardín",type:"object"},{text:" ",type:"space"},{text:"pronto",type:"adverb"}],
        meta: {id:"w4_recap_ellos_limpiar_pronto", lemma:"limpiar", person:"ellos", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Они платят за контракт сегодня", uk: "Вони платять за контракт сьогодні", es: "Ellos pagan el contrato hoy",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"pagan",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"},{text:" ",type:"space"},{text:"hoy",type:"adverb"}],
        meta: {id:"w4_recap_ellos_pagar_hoy", lemma:"pagar", person:"ellos", polarity:"affirmative", tense:"present", tags:["recap"]}
      },
      {
        ru: "Они не хотят идти завтра", uk: "Вони не хочуть йти завтра", es: "Ellos no quieren ir mañana",
        tokens: [{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"ir",type:"verb_infinitive"},{text:" ",type:"space"},{text:"mañana",type:"adverb"}],
        meta: {id:"w4_querer_ellos_ir_manana_neg", lemma:"querer", person:"ellos", polarity:"negative", tense:"present", from_week:3, tags:["review"]}
      },
      {
        ru: "Уже поздно, они здесь с собакой", uk: "Вже пізно, вони тут з собакою", es: "Es tarde, ellos están aquí con el perro",
        tokens: [{text:"Es",type:"verb"},{text:" ",type:"space"},{text:"tarde",type:"adverb"},{text:", ",type:"space"},{text:"ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"},{text:" ",type:"space"},{text:"con",type:"preposition"},{text:" ",type:"space"},{text:"el perro",type:"object"}],
        meta: {id:"w4_ser_tarde_estar_ellos_aqui_perro", lemma:"estar", person:"ellos", polarity:"affirmative", tense:"present", from_week:1, tags:["review"]}
      }
    ]
  },

  {
    id: "w4_exam", title: "🏆 Week 4 Final Exam", exam: true, phrases: []
  }
];

export default {
  id: "week_4",
  title: "Week 4: The Functional Leap",
  description: "Washing, Tools, Cleaning, Finance, and critical questions for dog owners.",
  legacy: false,
  lessons: week4Lessons
};