window.AnchorData = window.AnchorData || [];

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
    id: "w1_l2", title: "2. Ser + Estar + Ir — Tú / Él",
    phrases: [
      {ru:"Ты (есть)",es:"Tú eres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"}],meta:{id:"ser_pres_tu_aff",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Он (есть)",es:"Él es",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}],meta:{id:"ser_pres_el_aff",lemma:"ser",person:"el",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Ты находишься",es:"Tú estás",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"}],meta:{id:"estar_pres_tu_aff",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Он находится",es:"Él está",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}],meta:{id:"estar_pres_el_aff",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Ты идешь",es:"Tú vas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"}],meta:{id:"ir_pres_tu_aff",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Он идет",es:"Él va",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}],meta:{id:"ir_pres_el_aff",lemma:"ir",person:"el",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l3", title: "3. Ser + Estar + Ir — Nosotros (We)",
    phrases: [
      {ru:"Мы (есть)",es:"Nosotros somos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"}],meta:{id:"ser_pres_nos_aff",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы не (есть)",es:"Nosotros no somos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"}],meta:{id:"ser_pres_nos_neg",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы находимся",es:"Nosotros estamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"}],meta:{id:"estar_pres_nos_aff",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Мы не находимся",es:"Nosotros no estamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"}],meta:{id:"estar_pres_nos_neg",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["state","location"],confusable_with:"ser"}},
      {ru:"Мы идем",es:"Nosotros vamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"}],meta:{id:"ir_pres_nos_aff",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion"],confusable_with:null}},
      {ru:"Мы не идем",es:"Nosotros no vamos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vamos",type:"verb"}],meta:{id:"ir_pres_nos_neg",lemma:"ir",person:"nosotros",polarity:"negative",tense:"present",tags:["motion"],confusable_with:null}}
    ]
  },

  // --- GROUP B: Tener + Hacer + Decir ---
  {
    id: "w1_l4", title: "4. Tener + Hacer + Decir — Yo (I)",
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
    id: "w1_l5", title: "5. Tener + Hacer + Decir — Tú / Él",
    phrases: [
      {ru:"У тебя есть",es:"Tú tienes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"}],meta:{id:"tener_pres_tu_aff",lemma:"tener",person:"tu",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У него есть",es:"Él tiene",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}],meta:{id:"tener_pres_el_aff",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Ты делаешь",es:"Tú haces",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"haces",type:"verb"}],meta:{id:"hacer_pres_tu_aff",lemma:"hacer",person:"tu",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Он делает",es:"Él hace",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}],meta:{id:"hacer_pres_el_aff",lemma:"hacer",person:"el",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Ты говоришь (сказать)",es:"Tú dices",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"dices",type:"verb"}],meta:{id:"decir_pres_tu_aff",lemma:"decir",person:"tu",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Он говорит (сказать)",es:"Él dice",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"decir_pres_el_aff",lemma:"decir",person:"el",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l6", title: "6. Tener + Hacer + Decir — Nosotros (We)",
    phrases: [
      {ru:"У нас есть",es:"Nosotros tenemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"}],meta:{id:"tener_pres_nos_aff",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас нет",es:"Nosotros no tenemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"}],meta:{id:"tener_pres_nos_neg",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"Мы делаем",es:"Nosotros hacemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"hacemos",type:"verb"}],meta:{id:"hacer_pres_nos_aff",lemma:"hacer",person:"nosotros",polarity:"affirmative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Мы не делаем",es:"Nosotros no hacemos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"hacemos",type:"verb"}],meta:{id:"hacer_pres_nos_neg",lemma:"hacer",person:"nosotros",polarity:"negative",tense:"present",tags:["action"],confusable_with:null}},
      {ru:"Мы говорим (сказать)",es:"Nosotros decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"decir_pres_nos_aff",lemma:"decir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Мы не говорим (сказать)",es:"Nosotros no decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"decir_pres_nos_neg",lemma:"decir",person:"nosotros",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}}
    ]
  },

  // ========================================================
  // PHASE 2: SENTENCE BUILDING (Subject + Verb + Object)
  // ========================================================

  // --- Ser Sentences ---
  {
    id: "w1_l7", title: "7. Ser Sentences — Yo (I)",
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
    id: "w1_l8", title: "8. Ser Sentences — Tú / Él",
    phrases: [
      {ru:"Ты хороший",es:"Tú eres bueno",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"bueno",type:"object"}],meta:{id:"ser_pres_tu_aff_bueno",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Ты не плохой",es:"Tú no eres malo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"malo",type:"object"}],meta:{id:"ser_pres_tu_neg_malo",lemma:"ser",person:"tu",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он большой",es:"Él es grande",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"grande",type:"object"}],meta:{id:"ser_pres_el_aff_grande",lemma:"ser",person:"el",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он не маленький",es:"Él no es pequeño",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"pequeño",type:"object"}],meta:{id:"ser_pres_el_neg_pequeno",lemma:"ser",person:"el",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Ты умный",es:"Tú eres inteligente",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"},{text:" ",type:"space"},{text:"inteligente",type:"object"}],meta:{id:"ser_pres_tu_aff_inteligente",lemma:"ser",person:"tu",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Он не глупый",es:"Él no es tonto",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"tonto",type:"object"}],meta:{id:"ser_pres_el_neg_tonto",lemma:"ser",person:"el",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },
  {
    id: "w1_l9", title: "9. Ser Sentences — Nosotros (We)",
    phrases: [
      {ru:"Мы хорошие",es:"Nosotros somos buenos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"buenos",type:"object"}],meta:{id:"ser_pres_nos_aff_buenos",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не плохие",es:"Nosotros no somos malos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"malos",type:"object"}],meta:{id:"ser_pres_nos_neg_malos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы большие",es:"Nosotros somos grandes",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"grandes",type:"object"}],meta:{id:"ser_pres_nos_aff_grandes",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не маленькие",es:"Nosotros no somos pequeños",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"pequeños",type:"object"}],meta:{id:"ser_pres_nos_neg_pequenos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы умные",es:"Nosotros somos inteligentes",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"inteligentes",type:"object"}],meta:{id:"ser_pres_nos_aff_inteligentes",lemma:"ser",person:"nosotros",polarity:"affirmative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}},
      {ru:"Мы не глупые",es:"Nosotros no somos tontos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"tontos",type:"object"}],meta:{id:"ser_pres_nos_neg_tontos",lemma:"ser",person:"nosotros",polarity:"negative",tense:"present",tags:["identity","adjective"],confusable_with:"estar"}}
    ]
  },

  // --- Estar Sentences ---
  {
    id: "w1_l10", title: "10. Estar Sentences — Yo (I)",
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
    id: "w1_l11", title: "11. Estar Sentences — Tú / Él",
    phrases: [
      {ru:"Тебе хорошо",es:"Tú estás bien",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_tu_aff_bien",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Ему плохо",es:"Él está mal",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_el_aff_mal",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Он здесь",es:"Él está aquí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_el_aff_aqui",lemma:"estar",person:"el",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Он не здесь",es:"Él no está aquí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_el_neg_aqui",lemma:"estar",person:"el",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Ты готов",es:"Tú estás listo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_tu_aff_listo",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Он не готов",es:"Él no está listo",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"estar_pres_el_neg_listo",lemma:"estar",person:"el",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },
  {
    id: "w1_l12", title: "12. Estar Sentences — Nosotros (We)",
    phrases: [
      {ru:"Нам хорошо",es:"Nosotros estamos bien",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"bien",type:"object"}],meta:{id:"estar_pres_nos_aff_bien",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Нам плохо",es:"Nosotros estamos mal",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"mal",type:"object"}],meta:{id:"estar_pres_nos_aff_mal",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы здесь",es:"Nosotros estamos aquí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_nos_aff_aqui",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Мы не здесь",es:"Nosotros no estamos aquí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"aquí",type:"object"}],meta:{id:"estar_pres_nos_neg_aqui",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["location"],confusable_with:"ser"}},
      {ru:"Мы готовы",es:"Nosotros estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_nos_aff_listos",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы не готовы",es:"Nosotros no estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"estar_pres_nos_neg_listos",lemma:"estar",person:"nosotros",polarity:"negative",tense:"present",tags:["state"],confusable_with:"ser"}}
    ]
  },

  // --- Ir + Tener Sentences ---
  {
    id: "w1_l13", title: "13. Ir + Tener Sentences — Yo (I)",
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
    id: "w1_l14", title: "14. Ir + Tener Sentences — Tú / Él",
    phrases: [
      {ru:"Ты идешь туда",es:"Tú vas allí",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_tu_aff_alli",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Он не идет туда",es:"Él no va allí",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"va",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_el_neg_alli",lemma:"ir",person:"el",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Ты идешь домой",es:"Tú vas a casa",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_tu_aff_casa",lemma:"ir",person:"tu",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У него есть время",es:"Él tiene tiempo",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_el_aff_tiempo",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У тебя нет времени",es:"Tú no tienes tiempo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_tu_neg_tiempo",lemma:"tener",person:"tu",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У него есть деньги",es:"Él tiene dinero",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_el_aff_dinero",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
    ]
  },
  {
    id: "w1_l15", title: "15. Ir + Tener Sentences — Nosotros (We)",
    phrases: [
      {ru:"Мы идем туда",es:"Nosotros vamos allí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_nos_aff_alli",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Мы не идем туда",es:"Nosotros no vamos allí",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"allí",type:"object"}],meta:{id:"ir_pres_nos_neg_alli",lemma:"ir",person:"nosotros",polarity:"negative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"Мы идем домой",es:"Nosotros vamos a casa",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"vamos",type:"verb"},{text:" ",type:"space"},{text:"a casa",type:"object"}],meta:{id:"ir_pres_nos_aff_casa",lemma:"ir",person:"nosotros",polarity:"affirmative",tense:"present",tags:["motion","direction"],confusable_with:null}},
      {ru:"У нас есть время",es:"Nosotros tenemos tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_nos_aff_tiempo",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас нет времени",es:"Nosotros no tenemos tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"tener_pres_nos_neg_tiempo",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас есть деньги",es:"Nosotros tenemos dinero",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"dinero",type:"object"}],meta:{id:"tener_pres_nos_aff_dinero",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}}
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
  description: "Ser, Estar, Ir, Tener, Hacer, Decir — Present Tense (Yo/Tú/Él/Nosotros)",
  legacy: false,
  lessons: week1Lessons
});
