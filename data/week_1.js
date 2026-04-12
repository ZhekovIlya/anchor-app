window.AnchorData = window.AnchorData || [];

const week1Lessons = [
  // ========================================================
  // PHASE 1: PURE CONJUGATION (Subject + Verb / Subject + no + Verb)
  // ========================================================

  // --- GROUP A: Ser + Estar + Ir ---
  {
    id: "w1_l1", title: "1. Ser + Estar + Ir — Yo (I)",
    phrases: [
      {ru:"Я (есть)",uk:"Я (є)",es:"Yo soy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"}],meta:{id:"ser_pres_yo_aff",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Я не (есть)",uk:"Я не (є)",es:"Yo no soy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"}],meta:{id:"ser_pres_yo_neg",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Я нахожусь",uk:"Я знаходжусь",es:"Yo estoy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"}],meta:{id:"estar_pres_yo_aff",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Я не нахожусь",uk:"Я не знаходжусь",es:"Yo no estoy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"}],meta:{id:"estar_pres_yo_neg",lemma:"estar",person:"yo",polarity:"negative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Я иду",uk:"Я йду",es:"Yo voy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"}],meta:{id:"ir_pres_yo_aff",lemma:"ir",person:"yo",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Я не иду",uk:"Я не йду",es:"Yo no voy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"voy",type:"verb"}],meta:{id:"ir_pres_yo_neg",lemma:"ir",person:"yo",polarity:"negative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l2a", title: "1A. Ser + Estar + Ir — Tú / Usted",
    phrases: [
      {ru:"Ты (есть)",uk:"Ти (є)",es:"Tú eres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"}],meta:{id:"ser_pres_tu_aff",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Вы (есть)",uk:"Ви (є)",es:"Usted es",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_usted_aff",lemma:"ser",person:"usted",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Ты находишься",uk:"Ти знаходишся",es:"Tú estás",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"}],meta:{id:"estar_pres_tu_aff",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Вы находитесь",uk:"Ви знаходитесь",es:"Usted está",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_usted_aff",lemma:"estar",person:"usted",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Ты идешь",uk:"Ти йдеш",es:"Tú vas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"}],meta:{id:"ir_pres_tu_aff",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Вы идете",uk:"Ви йдете",es:"Usted va",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_usted_aff",lemma:"ir",person:"usted",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l2b", title: "1B. Ser + Estar + Ir — Él / Ella",
    phrases: [
      {ru:"Он (есть)",uk:"Він (є)",es:"Él es",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_el_aff",lemma:"ser",person:"el",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Она (есть)",uk:"Вона (є)",es:"Ella es",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_ella_aff",lemma:"ser",person:"ella",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Он находится",uk:"Він знаходиться",es:"Él está",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_el_aff",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Она находится",uk:"Вона знаходиться",es:"Ella está",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_ella_aff",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Он идет",uk:"Він йде",es:"Él va",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_el_aff",lemma:"ir",person:"el",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Она идет",uk:"Вона йде",es:"Ella va",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_ella_aff",lemma:"ir",person:"ella",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l3", title: "1C. Ser + Estar + Ir — Nosotros (We)",
    phrases: [
      {ru:"Мы (есть)",uk:"Ми (є)",es:"Nosotros somos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"}],meta:{id:"ser_pres_nos_aff",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы не (есть)",uk:"Ми не (є)",es:"Nosotros no somos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"}],meta:{id:"ser_pres_nos_neg",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы находимся",uk:"Ми знаходимось",es:"Nosotros estamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"}],meta:{id:"estar_pres_nos_aff",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Мы не находимся",uk:"Ми не знаходимось",es:"Nosotros no estamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"}],meta:{id:"estar_pres_nos_neg",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Мы идем",uk:"Ми йдемо",es:"Nosotros vamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"}],meta:{id:"ir_pres_nos_aff",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Мы не идем",uk:"Ми не йдемо",es:"Nosotros no vamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vamos",type:"verb"}],meta:{id:"ir_pres_nos_neg",lemma:"ir",person:"nosotros",polarity:"negative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l3b", title: "1D. Ser + Estar + Ir — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (мужской род) (есть)",uk:"Вони (чоловічий рід) (є)",es:"Ellos son",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"}],meta:{id:"ser_pres_ellos_aff",lemma:"ser",person:"ellos",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Они (женский род) (есть)",uk:"Вони (жіночий рід) (є)",es:"Ellas son",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"}],meta:{id:"ser_pres_ellas_aff",lemma:"ser",person:"ellas",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Вы находитесь",uk:"Ви знаходитесь",es:"Ustedes están",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"}],meta:{id:"estar_pres_ustedes_aff",lemma:"estar",person:"ustedes",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Они (мужской род) находятся",uk:"Вони (чоловічий рід) знаходяться",es:"Ellos están",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"}],meta:{id:"estar_pres_ellos_aff",lemma:"estar",person:"ellos",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Они (женский род) идут",uk:"Вони (жіночий рід) йдуть",es:"Ellas van",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"}],meta:{id:"ir_pres_ellas_aff",lemma:"ir",person:"ellas",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Вы идете",uk:"Ви йдете",es:"Ustedes van",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"}],meta:{id:"ir_pres_ustedes_aff",lemma:"ir",person:"ustedes",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },

  // --- GROUP B: Tener + Hacer + Decir ---
  {
    id: "w1_l4", title: "2. Tener + Hacer + Decir — Yo (I)",
    phrases: [
      {ru:"У меня есть",uk:"Я маю",es:"Yo tengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"}],meta:{id:"tener_pres_yo_aff",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня нет",uk:"Я не маю",es:"Yo no tengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tengo",type:"verb"}],meta:{id:"tener_pres_yo_neg",lemma:"tener",person:"yo",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Я делаю",uk:"Я роблю",es:"Yo hago",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"hago",type:"verb"}],meta:{id:"hacer_pres_yo_aff",lemma:"hacer",person:"yo",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Я не делаю",uk:"Я не роблю",es:"Yo no hago",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"hago",type:"verb"}],meta:{id:"hacer_pres_yo_neg",lemma:"hacer",person:"yo",polarity:"negative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Я говорю (сказать)",uk:"Я кажу",es:"Yo digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"digo",type:"verb"}],meta:{id:"decir_pres_yo_aff",lemma:"decir",person:"yo",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Я не говорю (сказать)",uk:"Я не кажу",es:"Yo no digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"digo",type:"verb"}],meta:{id:"decir_pres_yo_neg",lemma:"decir",person:"yo",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l5a", title: "2A. Tener + Hacer + Decir — Tú / Usted",
    phrases: [
      {ru:"У тебя есть",uk:"Ти маєш",es:"Tú tienes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"}],meta:{id:"tener_pres_tu_aff",lemma:"tener",person:"tu",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас есть",uk:"Ви маєте",es:"Usted tiene",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_usted_aff",lemma:"tener",person:"usted",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Ты делаешь",uk:"Ти робиш",es:"Tú haces",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"haces",type:"verb"}],meta:{id:"hacer_pres_tu_aff",lemma:"hacer",person:"tu",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Вы делаете",uk:"Ви робите",es:"Usted hace",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_usted_aff",lemma:"hacer",person:"usted",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Ты говоришь (сказать)",uk:"Ти кажеш",es:"Tú dices",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"dices",type:"verb"}],meta:{id:"decir_pres_tu_aff",lemma:"decir",person:"tu",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Вы говорите (сказать)",uk:"Ви кажете",es:"Usted dice",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_usted_aff",lemma:"decir",person:"usted",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l5b", title: "2B. Tener + Hacer + Decir — Él / Ella",
    phrases: [
      {ru:"У него есть",uk:"Він має",es:"Él tiene",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_el_aff",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть",uk:"Вона має",es:"Ella tiene",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_ella_aff",lemma:"tener",person:"ella",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Он делает",uk:"Він робить",es:"Él hace",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_el_aff",lemma:"hacer",person:"el",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Она делает",uk:"Вона робить",es:"Ella hace",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_ella_aff",lemma:"hacer",person:"ella",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Он говорит (сказать)",uk:"Він каже",es:"Él dice",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_el_aff",lemma:"decir",person:"el",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Она говорит (сказать)",uk:"Вона каже",es:"Ella dice",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_ella_aff",lemma:"decir",person:"ella",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l6", title: "2C. Tener + Hacer + Decir — Nosotros (We)",
    phrases: [
      {ru:"У нас есть",uk:"Ми маємо",es:"Nosotros tenemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"}],meta:{id:"tener_pres_nos_aff",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас нет",uk:"Ми не маємо",es:"Nosotros no tenemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"}],meta:{id:"tener_pres_nos_neg",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Мы делаем",uk:"Ми робимо",es:"Nosotros hacemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"hacemos",type:"verb"}],meta:{id:"hacer_pres_nos_aff",lemma:"hacer",person:"nosotros",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Мы не делаем",uk:"Ми не робимо",es:"Nosotros no hacemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"hacemos",type:"verb"}],meta:{id:"hacer_pres_nos_neg",lemma:"hacer",person:"nosotros",polarity:"negative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Мы говорим (сказать)",uk:"Ми кажемо",es:"Nosotros decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"decir_pres_nos_aff",lemma:"decir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Мы не говорим (сказать)",uk:"Ми не кажемо",es:"Nosotros no decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"decir_pres_nos_neg",lemma:"decir",person:"nosotros",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l6b", title: "2D. Tener + Hacer + Decir — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"У них (мужской род) есть",uk:"Вони (чоловічий рід) мають",es:"Ellos tienen",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"}],meta:{id:"tener_pres_ellos_aff",lemma:"tener",person:"ellos",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У них (женский род) есть",uk:"Вони (жіночий рід) мають",es:"Ellas tienen",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"}],meta:{id:"tener_pres_ellas_aff",lemma:"tener",person:"ellas",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Вы делаете",uk:"Ви робите",es:"Ustedes hacen",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"hacen",type:"verb"}],meta:{id:"hacer_pres_ustedes_aff",lemma:"hacer",person:"ustedes",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Они (мужской род) делают",uk:"Вони (чоловічий рід) роблять",es:"Ellos hacen",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"hacen",type:"verb"}],meta:{id:"hacer_pres_ellos_aff",lemma:"hacer",person:"ellos",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Они (женский род) говорят",uk:"Вони (жіночий рід) кажуть",es:"Ellas dicen",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"dicen",type:"verb"}],meta:{id:"decir_pres_ellas_aff",lemma:"decir",person:"ellas",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Вы говорите",uk:"Ви кажете",es:"Ustedes dicen",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"dicen",type:"verb"}],meta:{id:"decir_pres_ustedes_aff",lemma:"decir",person:"ustedes",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },

  // ========================================================
  // PHASE 2: SENTENCE BUILDING (Subject + Verb + Object)
  // ========================================================

  // --- Ser Sentences ---
  {
    id: "w1_l7", title: "3. Ser Sentences — Yo (I)",
    phrases: [
      {ru:"Я хороший",uk:"Я хороший",es:"Yo soy bueno",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_yo_aff_bueno",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я не плохой",uk:"Я не поганий",es:"Yo no soy malo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_yo_neg_malo",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я большой",uk:"Я великий",es:"Yo soy grande",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_yo_aff_grande",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я не маленький",uk:"Я не маленький",es:"Yo no soy pequeño",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"pequeño",type:"object"}],meta:{id:"ser_pres_yo_neg_pequeno",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я умный",uk:"Я розумний",es:"Yo soy inteligente",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_yo_aff_inteligente",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я не глупый",uk:"Я не дурний",es:"Yo no soy tonto",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"tonto",type:"object"}],meta:{id:"ser_pres_yo_neg_tonto",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l8a", title: "3A. Ser Sentences — Tú / Usted",
    phrases: [
      {ru:"Ты хороший",uk:"Ти хороший",es:"Tú eres bueno",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_tu_aff_bueno",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы хороший",uk:"Ви хороший",es:"Usted es bueno",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_usted_aff_bueno",lemma:"ser",person:"usted",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Ты не плохой",uk:"Ти не поганий",es:"Tú no eres malo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_tu_neg_malo",lemma:"ser",person:"tu",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы не плохой",uk:"Ви не поганий",es:"Usted no es malo",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_usted_neg_malo",lemma:"ser",person:"usted",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Ты умный",uk:"Ти розумний",es:"Tú eres inteligente",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_tu_aff_inteligente",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы умный",uk:"Ви розумний",es:"Usted es inteligente",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_usted_aff_inteligente",lemma:"ser",person:"usted",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l8b", title: "3B. Ser Sentences — Él / Ella",
    phrases: [
      {ru:"Он большой",uk:"Він великий",es:"Él es grande",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_el_aff_grande",lemma:"ser",person:"el",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Она большая",uk:"Вона велика",es:"Ella es grande",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_ella_aff_grande",lemma:"ser",person:"ella",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он не маленький",uk:"Він не маленький",es:"Él no es pequeño",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"pequeño",type:"object"}],meta:{id:"ser_pres_el_neg_pequeno",lemma:"ser",person:"el",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Она не маленькая",uk:"Вона не маленька",es:"Ella no es pequeña",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"pequeña",type:"object"}],meta:{id:"ser_pres_ella_neg_pequena",lemma:"ser",person:"ella",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он не глупый",uk:"Він не дурний",es:"Él no es tonto",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"tonto",type:"object"}],meta:{id:"ser_pres_el_neg_tonto",lemma:"ser",person:"el",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Она не глупая",uk:"Вона не дурна",es:"Ella no es tonta",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"tonta",type:"object"}],meta:{id:"ser_pres_ella_neg_tonta",lemma:"ser",person:"ella",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l9", title: "3C. Ser Sentences — Nosotros (We)",
    phrases: [
      {ru:"Мы хорошие",uk:"Ми хороші",es:"Nosotros somos buenos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"buenos",type:"object"}],meta:{id:"ser_pres_nos_aff_buenos",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не плохие",uk:"Ми не погані",es:"Nosotros no somos malos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"malos",type:"object"}],meta:{id:"ser_pres_nos_neg_malos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы большие",uk:"Ми великі",es:"Nosotros somos grandes",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"grandes",type:"object"}],meta:{id:"ser_pres_nos_aff_grandes",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не маленькие",uk:"Ми не маленькі",es:"Nosotros no somos pequeños",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"pequeños",type:"object"}],meta:{id:"ser_pres_nos_neg_pequenos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы умные",uk:"Ми розумні",es:"Nosotros somos inteligentes",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"inteligentes",type:"object"}],meta:{id:"ser_pres_nos_aff_inteligentes",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не глупые",uk:"Ми не дурні",es:"Nosotros no somos tontos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"tontos",type:"object"}],meta:{id:"ser_pres_nos_neg_tontos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l9b", title: "3D. Ser Sentences — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (мужской род) хорошие",uk:"Вони (чоловічий рід) хороші",es:"Ellos son buenos",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"buenos",type:"object"}],meta:{id:"ser_pres_ellos_aff_buenos",lemma:"ser",person:"ellos",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Они (женский род) маленькие",uk:"Вони (жіночий рід) маленькі",es:"Ellas son pequeñas",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"pequeñas",type:"object"}],meta:{id:"ser_pres_ellas_aff_pequenas",lemma:"ser",person:"ellas",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы большие",uk:"Ви великі",es:"Ustedes son grandes",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"grandes",type:"object"}],meta:{id:"ser_pres_ustedes_aff_grandes",lemma:"ser",person:"ustedes",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Они (мужской род) не глупые",uk:"Вони (чоловічий рід) не дурні",es:"Ellos no son tontos",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"tontos",type:"object"}],meta:{id:"ser_pres_ellos_neg_tontos",lemma:"ser",person:"ellos",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Они (женский род) не плохие",uk:"Вони (жіночий рід) не погані",es:"Ellas no son malas",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"malas",type:"object"}],meta:{id:"ser_pres_ellas_neg_malas",lemma:"ser",person:"ellas",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы умные",uk:"Ви розумні",es:"Ustedes son inteligentes",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"inteligentes",type:"object"}],meta:{id:"ser_pres_ustedes_aff_inteligentes",lemma:"ser",person:"ustedes",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },

  // --- Estar Sentences ---
  {
    id: "w1_l10", title: "4. Estar Sentences — Yo (I)",
    phrases: [
      {ru:"Мне хорошо",uk:"Мені добре",es:"Yo estoy bien",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_yo_aff_bien",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мне плохо",uk:"Мені погано",es:"Yo estoy mal",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_yo_aff_mal",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Я здесь",uk:"Я тут",es:"Yo estoy aquí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_yo_aff_aqui",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Я не здесь",uk:"Я не тут",es:"Yo no estoy aquí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_yo_neg_aqui",lemma:"estar",person:"yo",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Я готов",uk:"Я готовий",es:"Yo estoy listo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_yo_aff_listo",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Я не готов",uk:"Я не готовий",es:"Yo no estoy listo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_yo_neg_listo",lemma:"estar",person:"yo",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l11a", title: "4A. Estar Sentences — Tú / Usted",
    phrases: [
      {ru:"Тебе хорошо",uk:"Тобі добре",es:"Tú estás bien",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_tu_aff_bien",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вам хорошо",uk:"Вам добре",es:"Usted está bien",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_usted_aff_bien",lemma:"estar",person:"usted",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Ты готов",uk:"Ти готовий",es:"Tú estás listo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_tu_aff_listo",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы готовы",uk:"Ви готові",es:"Usted está listo",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_usted_aff_listo",lemma:"estar",person:"usted",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l11b", title: "4B. Estar Sentences — Él / Ella",
    phrases: [
      {ru:"Ему плохо",uk:"Йому погано",es:"Él está mal",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_el_aff_mal",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Ей плохо",uk:"Їй погано",es:"Ella está mal",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_ella_aff_mal",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Он здесь",uk:"Він тут",es:"Él está aquí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_el_aff_aqui",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Она здесь",uk:"Вона тут",es:"Ella está aquí",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ella_aff_aqui",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Он не здесь",uk:"Він не тут",es:"Él no está aquí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_el_neg_aqui",lemma:"estar",person:"el",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Она не здесь",uk:"Вона не тут",es:"Ella no está aquí",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ella_neg_aqui",lemma:"estar",person:"ella",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Он не готов",uk:"Він не готовий",es:"Él no está listo",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_el_neg_listo",lemma:"estar",person:"el",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Она не готова",uk:"Вона не готова",es:"Ella no está lista",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"lista",type:"object"}],meta:{id:"estar_pres_ella_neg_lista",lemma:"estar",person:"ella",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l12", title: "4C. Estar Sentences — Nosotros (We)",
    phrases: [
      {ru:"Нам хорошо",uk:"Нам добре",es:"Nosotros estamos bien",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_nos_aff_bien",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Нам плохо",uk:"Нам погано",es:"Nosotros estamos mal",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_nos_aff_mal",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы здесь",uk:"Ми тут",es:"Nosotros estamos aquí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_nos_aff_aqui",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Мы не здесь",uk:"Ми не тут",es:"Nosotros no estamos aquí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_nos_neg_aqui",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Мы готовы",uk:"Ми готові",es:"Nosotros estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_nos_aff_listos",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы не готовы",uk:"Ми не готові",es:"Nosotros no estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_nos_neg_listos",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l12b", title: "4D. Estar Sentences — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Им (мужской род) хорошо",uk:"Їм (чоловічий рід) добре",es:"Ellos están bien",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_ellos_aff_bien",lemma:"estar",person:"ellos",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Им (женский род) плохо",uk:"Їм (жіночий рід) погано",es:"Ellas están mal",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_ellas_aff_mal",lemma:"estar",person:"ellas",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы здесь",uk:"Ви тут",es:"Ustedes están aquí",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ustedes_aff_aqui",lemma:"estar",person:"ustedes",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Они (мужской род) не здесь",uk:"Вони (чоловічий рід) не тут",es:"Ellos no están aquí",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ellos_neg_aqui",lemma:"estar",person:"ellos",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Они (женский род) готовы",uk:"Вони (жіночий рід) готові",es:"Ellas están listas",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"listas",type:"object"}],meta:{id:"estar_pres_ellas_aff_listas",lemma:"estar",person:"ellas",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы не готовы",uk:"Ви не готові",es:"Ustedes no están listos",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_ustedes_neg_listos",lemma:"estar",person:"ustedes",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },

  // --- Ir + Tener Sentences ---
  {
    id: "w1_l13", title: "5. Ir + Tener Sentences — Yo (I)",
    phrases: [
      {ru:"Я иду туда",uk:"Я йду туди",es:"Yo voy allí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_yo_aff_alli",lemma:"ir",person:"yo",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Я не иду туда",uk:"Я не йду туди",es:"Yo no voy allí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_yo_neg_alli",lemma:"ir",person:"yo",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Я иду домой",uk:"Я йду додому",es:"Yo voy a casa",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_yo_aff_casa",lemma:"ir",person:"yo",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У меня есть время",uk:"В мене є час",es:"Yo tengo tiempo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_yo_aff_tiempo",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня нет времени",uk:"Я не маю часу",es:"Yo no tengo tiempo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_yo_neg_tiempo",lemma:"tener",person:"yo",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня есть деньги",uk:"В мене є гроші",es:"Yo tengo dinero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_yo_aff_dinero",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l14a", title: "5A. Ir + Tener Sentences — Tú / Usted",
    phrases: [
      {ru:"Ты идешь туда",uk:"Ти йдеш туди",es:"Tú vas allí",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_tu_aff_alli",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Вы идете туда",uk:"Ви йдете туди",es:"Usted va allí",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_usted_aff_alli",lemma:"ir",person:"usted",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Ты идешь домой",uk:"Ти йдеш додому",es:"Tú vas a casa",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_tu_aff_casa",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Вы идете домой",uk:"Ви йдете додому",es:"Usted va a casa",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_usted_aff_casa",lemma:"ir",person:"usted",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У тебя нет времени",uk:"Ти не маєш часу",es:"Tú no tienes tiempo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_tu_neg_tiempo",lemma:"tener",person:"tu",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас нет времени",uk:"Ви не маєте часу",es:"Usted no tiene tiempo",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_usted_neg_tiempo",lemma:"tener",person:"usted",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l14b", title: "5B. Ir + Tener Sentences — Él / Ella",
    phrases: [
      {ru:"Он не идет туда",uk:"Він не йде туди",es:"Él no va allí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_el_neg_alli",lemma:"ir",person:"el",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Она не идет туда",uk:"Вона не йде туди",es:"Ella no va allí",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_ella_neg_alli",lemma:"ir",person:"ella",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У него есть время",uk:"Він має час",es:"Él tiene tiempo",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_el_aff_tiempo",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть время",uk:"Вона має час",es:"Ella tiene tiempo",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_ella_aff_tiempo",lemma:"tener",person:"ella",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У него есть деньги",uk:"Він має гроші",es:"Él tiene dinero",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_el_aff_dinero",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть деньги",uk:"Вона має гроші",es:"Ella tiene dinero",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_ella_aff_dinero",lemma:"tener",person:"ella",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l15", title: "5C. Ir + Tener Sentences — Nosotros (We)",
    phrases: [
      {ru:"Мы идем туда",uk:"Ми йдемо туди",es:"Nosotros vamos allí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_nos_aff_alli",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Мы не идем туда",uk:"Ми не йдемо туди",es:"Nosotros no vamos allí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_nos_neg_alli",lemma:"ir",person:"nosotros",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Мы идем домой",uk:"Ми йдемо додому",es:"Nosotros vamos a casa",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_nos_aff_casa",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У нас есть время",uk:"Ми маємо час",es:"Nosotros tenemos tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_nos_aff_tiempo",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас нет времени",uk:"Ми не маємо часу",es:"Nosotros no tenemos tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_nos_neg_tiempo",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас есть деньги",uk:"Ми маємо гроші",es:"Nosotros tenemos dinero",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_nos_aff_dinero",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l15b", title: "5D. Ir + Tener Sentences — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (мужской род) идут туда",uk:"Вони (чоловічий рід) йдуть туди",es:"Ellos van allí",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_ellos_aff_alli",lemma:"ir",person:"ellos",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Они (женский род) не идут туда",uk:"Вони (жіночий рід) не йдуть туди",es:"Ellas no van allí",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"van",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_ellas_neg_alli",lemma:"ir",person:"ellas",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Вы идете домой",uk:"Ви йдете додому",es:"Ustedes van a casa",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_ustedes_aff_casa",lemma:"ir",person:"ustedes",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У них (мужской род) есть время",uk:"Вони (чоловічий рід) мають час",es:"Ellos tienen tiempo",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_ellos_aff_tiempo",lemma:"tener",person:"ellos",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У них (женский род) нет времени",uk:"Вони (жіночий рід) не мають часу",es:"Ellas no tienen tiempo",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_ellas_neg_tiempo",lemma:"tener",person:"ellas",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас есть деньги",uk:"Ви маєте гроші",es:"Ustedes tienen dinero",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_ustedes_aff_dinero",lemma:"tener",person:"ustedes",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },

  // ========================================================
  // FINAL EXAM — auto-populated by app.js at runtime
  // ========================================================
  {
    id: "w1_exam", title: "🏆 Week 1 Final Exam", exam: true, phrases: []
  }
];

window.AnchorData.push({
  id: "week_1",
  title: "Week 1: Identity & Core Verbs",
  description: "Ser, Estar, Ir, Tener, Hacer, Decir (Yo, Tú/Usted, Él/Ella, Nosotros, Ellos/Ellas/Ustedes)",
  legacy: false,
  lessons: week1Lessons
});
