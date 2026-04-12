const week1Lessons = [
  // ========================================================
  // PHASE 1: PURE CONJUGATION (Subject + Verb / Subject + no + Verb)
  // ========================================================

  // --- GROUP A: Ser + Estar + Ir ---
  {
    id: "w1_l1", title: "1. Ser + Estar + Ir — Yo (I)",
    phrases: [
      {ru:"Я (есть)",es:"Yo soy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"}],meta:{id:"ser_pres_yo_aff",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Я не (есть)",es:"Yo no soy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"}],meta:{id:"ser_pres_yo_neg",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Я нахожусь",es:"Yo estoy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"}],meta:{id:"estar_pres_yo_aff",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Я не нахожусь",es:"Yo no estoy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"}],meta:{id:"estar_pres_yo_neg",lemma:"estar",person:"yo",polarity:"negative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Я иду",es:"Yo voy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"}],meta:{id:"ir_pres_yo_aff",lemma:"ir",person:"yo",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Я не иду",es:"Yo no voy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"voy",type:"verb"}],meta:{id:"ir_pres_yo_neg",lemma:"ir",person:"yo",polarity:"negative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l2a", title: "1A. Ser + Estar + Ir — Tú / Usted",
    phrases: [
      {ru:"Ты (есть)",es:"Tú eres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"}],meta:{id:"ser_pres_tu_aff",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Вы (есть)",es:"Usted es",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_usted_aff",lemma:"ser",person:"usted",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Ты находишься",es:"Tú estás",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"}],meta:{id:"estar_pres_tu_aff",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Вы находитесь",es:"Usted está",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_usted_aff",lemma:"estar",person:"usted",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Ты идешь",es:"Tú vas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"}],meta:{id:"ir_pres_tu_aff",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Вы идете",es:"Usted va",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_usted_aff",lemma:"ir",person:"usted",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l2b", title: "1B. Ser + Estar + Ir — Él / Ella",
    phrases: [
      {ru:"Он (есть)",es:"Él es",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_el_aff",lemma:"ser",person:"el",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Она (есть)",es:"Ella es",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_ella_aff",lemma:"ser",person:"ella",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Он находится",es:"Él está",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_el_aff",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Она находится",es:"Ella está",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_ella_aff",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Он идет",es:"Él va",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_el_aff",lemma:"ir",person:"el",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Она идет",es:"Ella va",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_ella_aff",lemma:"ir",person:"ella",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l3", title: "1C. Ser + Estar + Ir — Nosotros (We)",
    phrases: [
      {ru:"Мы (есть)",es:"Nosotros somos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"}],meta:{id:"ser_pres_nos_aff",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы не (есть)",es:"Nosotros no somos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"}],meta:{id:"ser_pres_nos_neg",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы находимся",es:"Nosotros estamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"}],meta:{id:"estar_pres_nos_aff",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Мы не находимся",es:"Nosotros no estamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"}],meta:{id:"estar_pres_nos_neg",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Мы идем",es:"Nosotros vamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"}],meta:{id:"ir_pres_nos_aff",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Мы не идем",es:"Nosotros no vamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vamos",type:"verb"}],meta:{id:"ir_pres_nos_neg",lemma:"ir",person:"nosotros",polarity:"negative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l3b", title: "1D. Ser + Estar + Ir — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (мужской род) (есть)",es:"Ellos son",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"}],meta:{id:"ser_pres_ellos_aff",lemma:"ser",person:"ellos",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Они (женский род) (есть)",es:"Ellas son",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"}],meta:{id:"ser_pres_ellas_aff",lemma:"ser",person:"ellas",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Вы находитесь",es:"Ustedes están",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"}],meta:{id:"estar_pres_ustedes_aff",lemma:"estar",person:"ustedes",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Они (мужской род) находятся",es:"Ellos están",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"}],meta:{id:"estar_pres_ellos_aff",lemma:"estar",person:"ellos",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Они (женский род) идут",es:"Ellas van",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"}],meta:{id:"ir_pres_ellas_aff",lemma:"ir",person:"ellas",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Вы идете",es:"Ustedes van",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"}],meta:{id:"ir_pres_ustedes_aff",lemma:"ir",person:"ustedes",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },

  // --- GROUP B: Tener + Hacer + Decir ---
  {
    id: "w1_l4", title: "2. Tener + Hacer + Decir — Yo (I)",
    phrases: [
      {ru:"У меня есть",es:"Yo tengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"}],meta:{id:"tener_pres_yo_aff",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня нет",es:"Yo no tengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tengo",type:"verb"}],meta:{id:"tener_pres_yo_neg",lemma:"tener",person:"yo",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Я делаю",es:"Yo hago",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"hago",type:"verb"}],meta:{id:"hacer_pres_yo_aff",lemma:"hacer",person:"yo",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Я не делаю",es:"Yo no hago",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"hago",type:"verb"}],meta:{id:"hacer_pres_yo_neg",lemma:"hacer",person:"yo",polarity:"negative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Я говорю (сказать)",es:"Yo digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"digo",type:"verb"}],meta:{id:"decir_pres_yo_aff",lemma:"decir",person:"yo",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Я не говорю (сказать)",es:"Yo no digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"digo",type:"verb"}],meta:{id:"decir_pres_yo_neg",lemma:"decir",person:"yo",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l5a", title: "2A. Tener + Hacer + Decir — Tú / Usted",
    phrases: [
      {ru:"У тебя есть",es:"Tú tienes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"}],meta:{id:"tener_pres_tu_aff",lemma:"tener",person:"tu",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас есть",es:"Usted tiene",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_usted_aff",lemma:"tener",person:"usted",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Ты делаешь",es:"Tú haces",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"haces",type:"verb"}],meta:{id:"hacer_pres_tu_aff",lemma:"hacer",person:"tu",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Вы делаете",es:"Usted hace",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_usted_aff",lemma:"hacer",person:"usted",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Ты говоришь (сказать)",es:"Tú dices",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"dices",type:"verb"}],meta:{id:"decir_pres_tu_aff",lemma:"decir",person:"tu",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Вы говорите (сказать)",es:"Usted dice",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_usted_aff",lemma:"decir",person:"usted",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l5b", title: "2B. Tener + Hacer + Decir — Él / Ella",
    phrases: [
      {ru:"У него есть",es:"Él tiene",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_el_aff",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть",es:"Ella tiene",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_ella_aff",lemma:"tener",person:"ella",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Он делает",es:"Él hace",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_el_aff",lemma:"hacer",person:"el",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Она делает",es:"Ella hace",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_ella_aff",lemma:"hacer",person:"ella",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Он говорит (сказать)",es:"Él dice",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_el_aff",lemma:"decir",person:"el",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Она говорит (сказать)",es:"Ella dice",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_ella_aff",lemma:"decir",person:"ella",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l6", title: "2C. Tener + Hacer + Decir — Nosotros (We)",
    phrases: [
      {ru:"У нас есть",es:"Nosotros tenemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"}],meta:{id:"tener_pres_nos_aff",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас нет",es:"Nosotros no tenemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"}],meta:{id:"tener_pres_nos_neg",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Мы делаем",es:"Nosotros hacemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"hacemos",type:"verb"}],meta:{id:"hacer_pres_nos_aff",lemma:"hacer",person:"nosotros",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Мы не делаем",es:"Nosotros no hacemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"hacemos",type:"verb"}],meta:{id:"hacer_pres_nos_neg",lemma:"hacer",person:"nosotros",polarity:"negative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Мы говорим (сказать)",es:"Nosotros decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"decir_pres_nos_aff",lemma:"decir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Мы не говорим (сказать)",es:"Nosotros no decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"decir_pres_nos_neg",lemma:"decir",person:"nosotros",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l6b", title: "2D. Tener + Hacer + Decir — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"У них (мужской род) есть",es:"Ellos tienen",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"}],meta:{id:"tener_pres_ellos_aff",lemma:"tener",person:"ellos",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У них (женский род) есть",es:"Ellas tienen",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"}],meta:{id:"tener_pres_ellas_aff",lemma:"tener",person:"ellas",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Вы делаете",es:"Ustedes hacen",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"hacen",type:"verb"}],meta:{id:"hacer_pres_ustedes_aff",lemma:"hacer",person:"ustedes",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Они (мужской род) делают",es:"Ellos hacen",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"hacen",type:"verb"}],meta:{id:"hacer_pres_ellos_aff",lemma:"hacer",person:"ellos",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Они (женский род) говорят",es:"Ellas dicen",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"dicen",type:"verb"}],meta:{id:"decir_pres_ellas_aff",lemma:"decir",person:"ellas",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Вы говорите",es:"Ustedes dicen",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"dicen",type:"verb"}],meta:{id:"decir_pres_ustedes_aff",lemma:"decir",person:"ustedes",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },

  // ========================================================
  // PHASE 2: SENTENCE BUILDING (Subject + Verb + Object)
  // ========================================================

  // --- Ser Sentences ---
  {
    id: "w1_l7", title: "3. Ser Sentences — Yo (I)",
    phrases: [
      {ru:"Я хороший",es:"Yo soy bueno",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_yo_aff_bueno",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я не плохой",es:"Yo no soy malo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_yo_neg_malo",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я большой",es:"Yo soy grande",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_yo_aff_grande",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я не маленький",es:"Yo no soy pequeño",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"pequeño",type:"object"}],meta:{id:"ser_pres_yo_neg_pequeno",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я умный",es:"Yo soy inteligente",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_yo_aff_inteligente",lemma:"ser",person:"yo",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Я не глупый",es:"Yo no soy tonto",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"},{text:" ",type:"space"},{text:"tonto",type:"object"}],meta:{id:"ser_pres_yo_neg_tonto",lemma:"ser",person:"yo",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l8a", title: "3A. Ser Sentences — Tú / Usted",
    phrases: [
      {ru:"Ты хороший",es:"Tú eres bueno",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_tu_aff_bueno",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы хороший",es:"Usted es bueno",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_usted_aff_bueno",lemma:"ser",person:"usted",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Ты не плохой",es:"Tú no eres malo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_tu_neg_malo",lemma:"ser",person:"tu",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы не плохой",es:"Usted no es malo",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_usted_neg_malo",lemma:"ser",person:"usted",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Ты умный",es:"Tú eres inteligente",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_tu_aff_inteligente",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы умный",es:"Usted es inteligente",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_usted_aff_inteligente",lemma:"ser",person:"usted",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l8b", title: "3B. Ser Sentences — Él / Ella",
    phrases: [
      {ru:"Он большой",es:"Él es grande",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_el_aff_grande",lemma:"ser",person:"el",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Она большая",es:"Ella es grande",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_ella_aff_grande",lemma:"ser",person:"ella",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он не маленький",es:"Él no es pequeño",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"pequeño",type:"object"}],meta:{id:"ser_pres_el_neg_pequeno",lemma:"ser",person:"el",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Она не маленькая",es:"Ella no es pequeña",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"pequeña",type:"object"}],meta:{id:"ser_pres_ella_neg_pequena",lemma:"ser",person:"ella",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он не глупый",es:"Él no es tonto",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"tonto",type:"object"}],meta:{id:"ser_pres_el_neg_tonto",lemma:"ser",person:"el",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Она не глупая",es:"Ella no es tonta",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"tonta",type:"object"}],meta:{id:"ser_pres_ella_neg_tonta",lemma:"ser",person:"ella",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l9", title: "3C. Ser Sentences — Nosotros (We)",
    phrases: [
      {ru:"Мы хорошие",es:"Nosotros somos buenos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"buenos",type:"object"}],meta:{id:"ser_pres_nos_aff_buenos",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не плохие",es:"Nosotros no somos malos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"malos",type:"object"}],meta:{id:"ser_pres_nos_neg_malos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы большие",es:"Nosotros somos grandes",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"grandes",type:"object"}],meta:{id:"ser_pres_nos_aff_grandes",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не маленькие",es:"Nosotros no somos pequeños",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"pequeños",type:"object"}],meta:{id:"ser_pres_nos_neg_pequenos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы умные",es:"Nosotros somos inteligentes",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"inteligentes",type:"object"}],meta:{id:"ser_pres_nos_aff_inteligentes",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не глупые",es:"Nosotros no somos tontos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"tontos",type:"object"}],meta:{id:"ser_pres_nos_neg_tontos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l9b", title: "3D. Ser Sentences — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (мужской род) хорошие",es:"Ellos son buenos",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"buenos",type:"object"}],meta:{id:"ser_pres_ellos_aff_buenos",lemma:"ser",person:"ellos",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Они (женский род) маленькие",es:"Ellas son pequeñas",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"pequeñas",type:"object"}],meta:{id:"ser_pres_ellas_aff_pequenas",lemma:"ser",person:"ellas",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы большие",es:"Ustedes son grandes",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"grandes",type:"object"}],meta:{id:"ser_pres_ustedes_aff_grandes",lemma:"ser",person:"ustedes",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Они (мужской род) не глупые",es:"Ellos no son tontos",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"tontos",type:"object"}],meta:{id:"ser_pres_ellos_neg_tontos",lemma:"ser",person:"ellos",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Они (женский род) не плохие",es:"Ellas no son malas",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"malas",type:"object"}],meta:{id:"ser_pres_ellas_neg_malas",lemma:"ser",person:"ellas",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Вы умные",es:"Ustedes son inteligentes",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"inteligentes",type:"object"}],meta:{id:"ser_pres_ustedes_aff_inteligentes",lemma:"ser",person:"ustedes",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },

  // --- Estar Sentences ---
  {
    id: "w1_l10", title: "4. Estar Sentences — Yo (I)",
    phrases: [
      {ru:"Мне хорошо",es:"Yo estoy bien",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_yo_aff_bien",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мне плохо",es:"Yo estoy mal",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_yo_aff_mal",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Я здесь",es:"Yo estoy aquí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_yo_aff_aqui",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Я не здесь",es:"Yo no estoy aquí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_yo_neg_aqui",lemma:"estar",person:"yo",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Я готов",es:"Yo estoy listo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_yo_aff_listo",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Я не готов",es:"Yo no estoy listo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_yo_neg_listo",lemma:"estar",person:"yo",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l11a", title: "4A. Estar Sentences — Tú / Usted",
    phrases: [
      {ru:"Тебе хорошо",es:"Tú estás bien",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_tu_aff_bien",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вам хорошо",es:"Usted está bien",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_usted_aff_bien",lemma:"estar",person:"usted",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Ты готов",es:"Tú estás listo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_tu_aff_listo",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы готовы",es:"Usted está listo",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_usted_aff_listo",lemma:"estar",person:"usted",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l11b", title: "4B. Estar Sentences — Él / Ella",
    phrases: [
      {ru:"Ему плохо",es:"Él está mal",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_el_aff_mal",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Ей плохо",es:"Ella está mal",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_ella_aff_mal",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Он здесь",es:"Él está aquí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_el_aff_aqui",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Она здесь",es:"Ella está aquí",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ella_aff_aqui",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Он не здесь",es:"Él no está aquí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_el_neg_aqui",lemma:"estar",person:"el",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Она не здесь",es:"Ella no está aquí",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ella_neg_aqui",lemma:"estar",person:"ella",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Он не готов",es:"Él no está listo",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_el_neg_listo",lemma:"estar",person:"el",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Она не готова",es:"Ella no está lista",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"lista",type:"object"}],meta:{id:"estar_pres_ella_neg_lista",lemma:"estar",person:"ella",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l12", title: "4C. Estar Sentences — Nosotros (We)",
    phrases: [
      {ru:"Нам хорошо",es:"Nosotros estamos bien",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_nos_aff_bien",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Нам плохо",es:"Nosotros estamos mal",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_nos_aff_mal",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы здесь",es:"Nosotros estamos aquí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_nos_aff_aqui",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Мы не здесь",es:"Nosotros no estamos aquí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_nos_neg_aqui",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Мы готовы",es:"Nosotros estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_nos_aff_listos",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы не готовы",es:"Nosotros no estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_nos_neg_listos",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l12b", title: "4D. Estar Sentences — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Им (мужской род) хорошо",es:"Ellos están bien",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_ellos_aff_bien",lemma:"estar",person:"ellos",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Им (женский род) плохо",es:"Ellas están mal",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_ellas_aff_mal",lemma:"estar",person:"ellas",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы здесь",es:"Ustedes están aquí",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ustedes_aff_aqui",lemma:"estar",person:"ustedes",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Они (мужской род) не здесь",es:"Ellos no están aquí",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_ellos_neg_aqui",lemma:"estar",person:"ellos",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Они (женский род) готовы",es:"Ellas están listas",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"listas",type:"object"}],meta:{id:"estar_pres_ellas_aff_listas",lemma:"estar",person:"ellas",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы не готовы",es:"Ustedes no están listos",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_ustedes_neg_listos",lemma:"estar",person:"ustedes",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },

  // --- Ir + Tener Sentences ---
  {
    id: "w1_l13", title: "5. Ir + Tener Sentences — Yo (I)",
    phrases: [
      {ru:"Я иду туда",es:"Yo voy allí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_yo_aff_alli",lemma:"ir",person:"yo",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Я не иду туда",es:"Yo no voy allí",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_yo_neg_alli",lemma:"ir",person:"yo",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Я иду домой",es:"Yo voy a casa",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_yo_aff_casa",lemma:"ir",person:"yo",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У меня есть время",es:"Yo tengo tiempo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_yo_aff_tiempo",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня нет времени",es:"Yo no tengo tiempo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_yo_neg_tiempo",lemma:"tener",person:"yo",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня есть деньги",es:"Yo tengo dinero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_yo_aff_dinero",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l14a", title: "5A. Ir + Tener Sentences — Tú / Usted",
    phrases: [
      {ru:"Ты идешь туда",es:"Tú vas allí",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_tu_aff_alli",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Вы идете туда",es:"Usted va allí",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_usted_aff_alli",lemma:"ir",person:"usted",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Ты идешь домой",es:"Tú vas a casa",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_tu_aff_casa",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Вы идете домой",es:"Usted va a casa",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_usted_aff_casa",lemma:"ir",person:"usted",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У тебя нет времени",es:"Tú no tienes tiempo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_tu_neg_tiempo",lemma:"tener",person:"tu",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас нет времени",es:"Usted no tiene tiempo",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_usted_neg_tiempo",lemma:"tener",person:"usted",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l14b", title: "5B. Ir + Tener Sentences — Él / Ella",
    phrases: [
      {ru:"Он не идет туда",es:"Él no va allí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_el_neg_alli",lemma:"ir",person:"el",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Она не идет туда",es:"Ella no va allí",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_ella_neg_alli",lemma:"ir",person:"ella",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У него есть время",es:"Él tiene tiempo",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_el_aff_tiempo",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть время",es:"Ella tiene tiempo",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_ella_aff_tiempo",lemma:"tener",person:"ella",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У него есть деньги",es:"Él tiene dinero",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_el_aff_dinero",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть деньги",es:"Ella tiene dinero",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_ella_aff_dinero",lemma:"tener",person:"ella",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l15", title: "5C. Ir + Tener Sentences — Nosotros (We)",
    phrases: [
      {ru:"Мы идем туда",es:"Nosotros vamos allí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_nos_aff_alli",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Мы не идем туда",es:"Nosotros no vamos allí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_nos_neg_alli",lemma:"ir",person:"nosotros",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Мы идем домой",es:"Nosotros vamos a casa",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_nos_aff_casa",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У нас есть время",es:"Nosotros tenemos tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_nos_aff_tiempo",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас нет времени",es:"Nosotros no tenemos tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_nos_neg_tiempo",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас есть деньги",es:"Nosotros tenemos dinero",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_nos_aff_dinero",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l15b", title: "5D. Ir + Tener Sentences — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (м.р.) идут туда",es:"Ellos van allí",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_ellos_aff_alli",lemma:"ir",person:"ellos",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Они (ж.р.) не идут туда",es:"Ellas no van allí",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"van",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_ellas_neg_alli",lemma:"ir",person:"ellas",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Вы идете домой",es:"Ustedes van a casa",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"van",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_ustedes_aff_casa",lemma:"ir",person:"ustedes",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У них (м.р.) есть время",es:"Ellos tienen tiempo",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_ellos_aff_tiempo",lemma:"tener",person:"ellos",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У них (ж.р.) нет времени",es:"Ellas no tienen tiempo",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_ellas_neg_tiempo",lemma:"tener",person:"ellas",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас есть деньги",es:"Ustedes tienen dinero",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_ustedes_aff_dinero",lemma:"tener",person:"ustedes",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },

  // ========================================================
  // FINAL EXAM — auto-populated by app.js at runtime
  // ========================================================
  {
    id: "w1_exam", title: "🏆 Week 1 Final Exam", exam: true, phrases: []
  }
];

export default {
  id: "week_1",
  title: "Week 1: Identity & Core Verbs",
  description: "Ser, Estar, Ir, Tener, Hacer, Decir (Yo, Tú/Usted, Él/Ella, Nosotros, Ellos/Ellas/Ustedes)",
  legacy: false,
  lessons: week1Lessons,
};
