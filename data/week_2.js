const week2Lessons = [
  // ========================================================
  // BLOCK 1: Querer + Apartment (Wanting & Adjectives)
  // ========================================================
  {
    id: "w2_l1", title: "1. Querer + El Piso — Yo",
    phrases: [
      {ru:"Я хочу квартиру",es:"Yo quiero el piso",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_yo_piso_aff",lemma:"querer",person:"yo",polarity:"affirmative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Я не хочу квартиру",es:"Yo no quiero el piso",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_yo_piso_neg",lemma:"querer",person:"yo",polarity:"negative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Я готов",es:"Yo estoy listo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"w2_estar_yo_listo_aff",lemma:"estar",person:"yo",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Я готов?",es:"¿Yo estoy listo?",tokens:[{text:"¿",type:"space"},{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"},{text:" ",type:"space"},{text:"listo?",type:"object"}],meta:{id:"w2_estar_yo_listo_int",lemma:"estar",person:"yo",polarity:"interrogative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Я хочу арендовать",es:"Yo quiero alquilar",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"alquilar",type:"verb_infinitive"}],meta:{id:"w2_querer_yo_alquilar_aff",lemma:"querer",person:"yo",polarity:"affirmative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Я не хочу арендовать",es:"Yo no quiero alquilar",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quiero",type:"verb"},{text:" ",type:"space"},{text:"alquilar",type:"verb_infinitive"}],meta:{id:"w2_querer_yo_alquilar_neg",lemma:"querer",person:"yo",polarity:"negative",tense:"present",tags:["intention","real_estate"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l2", title: "1A. Querer + El Piso — Tú / Usted",
    phrases: [
      {ru:"Ты хочешь квартиру?",es:"¿Tú quieres el piso?",tokens:[{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"quieres",type:"verb"},{text:" ",type:"space"},{text:"el piso?",type:"object"}],meta:{id:"w2_querer_tu_piso_int",lemma:"querer",person:"tu",polarity:"interrogative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Ты не хочешь квартиру",es:"Tú no quieres el piso",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quieres",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_tu_piso_neg",lemma:"querer",person:"tu",polarity:"negative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Вы (вежливо) хотите арендовать?",es:"¿Usted quiere alquilar?",tokens:[{text:"¿",type:"space"},{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"alquilar?",type:"verb_infinitive"}],meta:{id:"w2_querer_usted_alquilar_int",lemma:"querer",person:"usted",polarity:"interrogative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Ты готов",es:"Tú estás listo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"},{text:" ",type:"space"},{text:"listo",type:"object"}],meta:{id:"w2_estar_tu_listo_aff",lemma:"estar",person:"tu",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Вы (вежливо) хороший?",es:"¿Usted es bueno?",tokens:[{text:"¿",type:"space"},{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"bueno?",type:"object"}],meta:{id:"w2_ser_usted_bueno_int",lemma:"ser",person:"usted",polarity:"interrogative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Вы (вежливо) хотите квартиру",es:"Usted quiere el piso",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_usted_piso_aff",lemma:"querer",person:"usted",polarity:"affirmative",tense:"present",tags:["intention","real_estate"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l3", title: "1B. Querer + El Piso — Él / Ella",
    phrases: [
      {ru:"Он хочет квартиру",es:"Él quiere el piso",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_el_piso_aff",lemma:"querer",person:"el",polarity:"affirmative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Она не хочет квартиру",es:"Ella no quiere el piso",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_ella_piso_neg",lemma:"querer",person:"ella",polarity:"negative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Он хочет арендовать?",es:"¿Él quiere alquilar?",tokens:[{text:"¿",type:"space"},{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"alquilar?",type:"verb_infinitive"}],meta:{id:"w2_querer_el_alquilar_int",lemma:"querer",person:"el",polarity:"interrogative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Она готова",es:"Ella está lista",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"},{text:" ",type:"space"},{text:"lista",type:"object"}],meta:{id:"w2_estar_ella_lista_aff",lemma:"estar",person:"ella",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Он маленький?",es:"¿Él es pequeño?",tokens:[{text:"¿",type:"space"},{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"},{text:" ",type:"space"},{text:"pequeño?",type:"object"}],meta:{id:"w2_ser_el_pequeno_int",lemma:"ser",person:"el",polarity:"interrogative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Она хочет арендовать",es:"Ella quiere alquilar",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"},{text:" ",type:"space"},{text:"alquilar",type:"verb_infinitive"}],meta:{id:"w2_querer_ella_alquilar_aff",lemma:"querer",person:"ella",polarity:"affirmative",tense:"present",tags:["intention"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l4", title: "1C. Querer + El Piso — Nosotros",
    phrases: [
      {ru:"Мы хотим квартиру",es:"Nosotros queremos el piso",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_nos_piso_aff",lemma:"querer",person:"nosotros",polarity:"affirmative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Мы не хотим квартиру",es:"Nosotros no queremos el piso",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"el piso",type:"object"}],meta:{id:"w2_querer_nos_piso_neg",lemma:"querer",person:"nosotros",polarity:"negative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Мы хотим арендовать?",es:"¿Nosotros queremos alquilar?",tokens:[{text:"¿",type:"space"},{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"alquilar?",type:"verb_infinitive"}],meta:{id:"w2_querer_nos_alquilar_int",lemma:"querer",person:"nosotros",polarity:"interrogative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Мы готовы",es:"Nosotros estamos listos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"estamos",type:"verb"},{text:" ",type:"space"},{text:"listos",type:"object"}],meta:{id:"w2_estar_nos_listos_aff",lemma:"estar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Мы хорошие?",es:"¿Nosotros somos buenos?",tokens:[{text:"¿",type:"space"},{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"somos",type:"verb"},{text:" ",type:"space"},{text:"buenos?",type:"object"}],meta:{id:"w2_ser_nos_buenos_int",lemma:"ser",person:"nosotros",polarity:"interrogative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Мы хотим арендовать",es:"Nosotros queremos alquilar",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"queremos",type:"verb"},{text:" ",type:"space"},{text:"alquilar",type:"verb_infinitive"}],meta:{id:"w2_querer_nos_alquilar_aff",lemma:"querer",person:"nosotros",polarity:"affirmative",tense:"present",tags:["intention"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l5", title: "1D. Querer + El Piso — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (м.р.) хотят квартиру?",es:"¿Ellos quieren el piso?",tokens:[{text:"¿",type:"space"},{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"el piso?",type:"object"}],meta:{id:"w2_querer_ellos_piso_int",lemma:"querer",person:"ellos",polarity:"interrogative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Они (ж.р.) не хотят арендовать",es:"Ellas no quieren alquilar",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"alquilar",type:"verb_infinitive"}],meta:{id:"w2_querer_ellas_alquilar_neg",lemma:"querer",person:"ellas",polarity:"negative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Вы (мн.ч.) хотите квартиру?",es:"¿Ustedes quieren el piso?",tokens:[{text:"¿",type:"space"},{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"el piso?",type:"object"}],meta:{id:"w2_querer_ustedes_piso_int",lemma:"querer",person:"ustedes",polarity:"interrogative",tense:"present",tags:["intention","real_estate"],confusable_with:null}},
      {ru:"Они (м.р.) готовы?",es:"¿Ellos están listos?",tokens:[{text:"¿",type:"space"},{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"están",type:"verb"},{text:" ",type:"space"},{text:"listos?",type:"object"}],meta:{id:"w2_estar_ellos_listos_int",lemma:"estar",person:"ellos",polarity:"interrogative",tense:"present",tags:["state"],confusable_with:"ser"}},
      {ru:"Они (ж.р.) большие",es:"Ellas son grandes",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"son",type:"verb"},{text:" ",type:"space"},{text:"grandes",type:"object"}],meta:{id:"w2_ser_ellas_grandes_aff",lemma:"ser",person:"ellas",polarity:"affirmative",tense:"present",tags:["identity"],confusable_with:"estar"}},
      {ru:"Вы (мн.ч.) хотите арендовать",es:"Ustedes quieren alquilar",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"quieren",type:"verb"},{text:" ",type:"space"},{text:"alquilar",type:"verb_infinitive"}],meta:{id:"w2_querer_ustedes_alquilar_aff",lemma:"querer",person:"ustedes",polarity:"affirmative",tense:"present",tags:["intention"],confusable_with:null}}
    ]
  },

  // ========================================================
  // BLOCK 2: Poder + Appliances / Features
  // ========================================================
  {
    id: "w2_l6", title: "2. Poder + Appliances — Yo",
    phrases: [
      {ru:"Я могу заплатить",es:"Yo puedo pagar",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"puedo",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_yo_pagar_aff",lemma:"poder",person:"yo",polarity:"affirmative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"Я не могу заплатить",es:"Yo no puedo pagar",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"puedo",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_yo_pagar_neg",lemma:"poder",person:"yo",polarity:"negative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"У меня есть деньги",es:"Yo tengo el dinero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"el dinero",type:"object"}],meta:{id:"w2_tener_yo_dinero_aff",lemma:"tener",person:"yo",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У меня есть стиральная машина?",es:"¿Yo tengo la lavadora?",tokens:[{text:"¿",type:"space"},{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"la lavadora?",type:"object"}],meta:{id:"w2_tener_yo_lavadora_int",lemma:"tener",person:"yo",polarity:"interrogative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"У меня нет холодильника",es:"Yo no tengo nevera",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tengo",type:"verb"},{text:" ",type:"space"},{text:"nevera",type:"object"}],meta:{id:"w2_tener_yo_nevera_neg",lemma:"tener",person:"yo",polarity:"negative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"Я могу пойти туда?",es:"¿Yo puedo ir allí?",tokens:[{text:"¿",type:"space"},{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"puedo",type:"verb"},{text:" ",type:"space"},{text:"ir allí?",type:"object"}],meta:{id:"w2_poder_yo_ir_int",lemma:"poder",person:"yo",polarity:"interrogative",tense:"present",tags:["ability","motion"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l7", title: "2A. Poder + Appliances — Tú / Usted",
    phrases: [
      {ru:"Ты можешь заплатить",es:"Tú puedes pagar",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"puedes",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_tu_pagar_aff",lemma:"poder",person:"tu",polarity:"affirmative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"Вы (вежливо) можете заплатить?",es:"¿Usted puede pagar?",tokens:[{text:"¿",type:"space"},{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"puede",type:"verb"},{text:" ",type:"space"},{text:"pagar?",type:"verb_infinitive"}],meta:{id:"w2_poder_usted_pagar_int",lemma:"poder",person:"usted",polarity:"interrogative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"У тебя есть время",es:"Tú tienes el tiempo",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"el tiempo",type:"object"}],meta:{id:"w2_tener_tu_tiempo_aff",lemma:"tener",person:"tu",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У тебя есть стиральная машина?",es:"¿Tú tienes la lavadora?",tokens:[{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"},{text:" ",type:"space"},{text:"la lavadora?",type:"object"}],meta:{id:"w2_tener_tu_lavadora_int",lemma:"tener",person:"tu",polarity:"interrogative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"У вас (вежливо) есть холодильник?",es:"¿Usted tiene nevera?",tokens:[{text:"¿",type:"space"},{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"nevera?",type:"object"}],meta:{id:"w2_tener_usted_nevera_int",lemma:"tener",person:"usted",polarity:"interrogative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"Ты можешь пойти домой?",es:"¿Tú puedes ir a casa?",tokens:[{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"puedes",type:"verb"},{text:" ",type:"space"},{text:"ir a casa?",type:"object"}],meta:{id:"w2_poder_tu_ir_casa_int",lemma:"poder",person:"tu",polarity:"interrogative",tense:"present",tags:["ability","motion"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l8", title: "2B. Poder + Appliances — Él / Ella",
    phrases: [
      {ru:"Он может заплатить?",es:"¿Él puede pagar?",tokens:[{text:"¿",type:"space"},{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"puede",type:"verb"},{text:" ",type:"space"},{text:"pagar?",type:"verb_infinitive"}],meta:{id:"w2_poder_el_pagar_int",lemma:"poder",person:"el",polarity:"interrogative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"Она не может заплатить",es:"Ella no puede pagar",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"puede",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_ella_pagar_neg",lemma:"poder",person:"ella",polarity:"negative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"У него есть деньги",es:"Él tiene el dinero",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"el dinero",type:"object"}],meta:{id:"w2_tener_el_dinero_aff",lemma:"tener",person:"el",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нее есть стиральная машина?",es:"¿Ella tiene la lavadora?",tokens:[{text:"¿",type:"space"},{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"la lavadora?",type:"object"}],meta:{id:"w2_tener_ella_lavadora_int",lemma:"tener",person:"ella",polarity:"interrogative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"У него нет холодильника",es:"Él no tiene nevera",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tiene",type:"verb"},{text:" ",type:"space"},{text:"nevera",type:"object"}],meta:{id:"w2_tener_el_nevera_neg",lemma:"tener",person:"el",polarity:"negative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"Она может пойти туда?",es:"¿Ella puede ir allí?",tokens:[{text:"¿",type:"space"},{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"puede",type:"verb"},{text:" ",type:"space"},{text:"ir allí?",type:"object"}],meta:{id:"w2_poder_ella_ir_int",lemma:"poder",person:"ella",polarity:"interrogative",tense:"present",tags:["ability","motion"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l9", title: "2C. Poder + Appliances — Nosotros",
    phrases: [
      {ru:"Мы можем заплатить",es:"Nosotros podemos pagar",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"podemos",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_nos_pagar_aff",lemma:"poder",person:"nosotros",polarity:"affirmative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"Мы не можем заплатить",es:"Nosotros no podemos pagar",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"podemos",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_nos_pagar_neg",lemma:"poder",person:"nosotros",polarity:"negative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"У нас есть время",es:"Nosotros tenemos el tiempo",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"el tiempo",type:"object"}],meta:{id:"w2_tener_nos_tiempo_aff",lemma:"tener",person:"nosotros",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У нас есть стиральная машина?",es:"¿Nosotros tenemos la lavadora?",tokens:[{text:"¿",type:"space"},{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"la lavadora?",type:"object"}],meta:{id:"w2_tener_nos_lavadora_int",lemma:"tener",person:"nosotros",polarity:"interrogative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"У нас нет холодильника",es:"Nosotros no tenemos nevera",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tenemos",type:"verb"},{text:" ",type:"space"},{text:"nevera",type:"object"}],meta:{id:"w2_tener_nos_nevera_neg",lemma:"tener",person:"nosotros",polarity:"negative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"Мы можем пойти домой?",es:"¿Nosotros podemos ir a casa?",tokens:[{text:"¿",type:"space"},{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"podemos",type:"verb"},{text:" ",type:"space"},{text:"ir a casa?",type:"object"}],meta:{id:"w2_poder_nos_ir_casa_int",lemma:"poder",person:"nosotros",polarity:"interrogative",tense:"present",tags:["ability","motion"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l10", title: "2D. Poder + Appliances — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Они (м.р.) могут заплатить?",es:"¿Ellos pueden pagar?",tokens:[{text:"¿",type:"space"},{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"pueden",type:"verb"},{text:" ",type:"space"},{text:"pagar?",type:"verb_infinitive"}],meta:{id:"w2_poder_ellos_pagar_int",lemma:"poder",person:"ellos",polarity:"interrogative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"Они (ж.р.) не могут заплатить",es:"Ellas no pueden pagar",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"pueden",type:"verb"},{text:" ",type:"space"},{text:"pagar",type:"verb_infinitive"}],meta:{id:"w2_poder_ellas_pagar_neg",lemma:"poder",person:"ellas",polarity:"negative",tense:"present",tags:["ability","finance"],confusable_with:null}},
      {ru:"У них (м.р.) есть деньги",es:"Ellos tienen el dinero",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"el dinero",type:"object"}],meta:{id:"w2_tener_ellos_dinero_aff",lemma:"tener",person:"ellos",polarity:"affirmative",tense:"present",tags:["possession"],confusable_with:null}},
      {ru:"У вас (мн.ч.) есть стиральная машина?",es:"¿Ustedes tienen la lavadora?",tokens:[{text:"¿",type:"space"},{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"la lavadora?",type:"object"}],meta:{id:"w2_tener_ustedes_lavadora_int",lemma:"tener",person:"ustedes",polarity:"interrogative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"У них (ж.р.) нет холодильника",es:"Ellas no tienen nevera",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tienen",type:"verb"},{text:" ",type:"space"},{text:"nevera",type:"object"}],meta:{id:"w2_tener_ellas_nevera_neg",lemma:"tener",person:"ellas",polarity:"negative",tense:"present",tags:["possession","appliances"],confusable_with:null}},
      {ru:"Вы (мн.ч.) можете пойти туда?",es:"¿Ustedes pueden ir allí?",tokens:[{text:"¿",type:"space"},{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"pueden",type:"verb"},{text:" ",type:"space"},{text:"ir allí?",type:"object"}],meta:{id:"w2_poder_ustedes_ir_int",lemma:"poder",person:"ustedes",polarity:"interrogative",tense:"present",tags:["ability","motion"],confusable_with:null}}
    ]
  },

  // ========================================================
  // BLOCK 3: Necesitar + Bureaucracy
  // ========================================================
  {
    id: "w2_l11", title: "3. Necesitar + Bureaucracy — Yo",
    phrases: [
      {ru:"Мне нужен контракт",es:"Yo necesito el contrato",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"necesito",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],meta:{id:"w2_necesitar_yo_contrato_aff",lemma:"necesitar",person:"yo",polarity:"affirmative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Мне нужен контракт?",es:"¿Yo necesito el contrato?",tokens:[{text:"¿",type:"space"},{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"necesito",type:"verb"},{text:" ",type:"space"},{text:"el contrato?",type:"object"}],meta:{id:"w2_necesitar_yo_contrato_int",lemma:"necesitar",person:"yo",polarity:"interrogative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Мне нужно помочь",es:"Yo necesito ayudar",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"necesito",type:"verb"},{text:" ",type:"space"},{text:"ayudar",type:"verb_infinitive"}],meta:{id:"w2_necesitar_yo_ayudar_aff",lemma:"necesitar",person:"yo",polarity:"affirmative",tense:"present",tags:["need"],confusable_with:null}},
      {ru:"Я могу сделать",es:"Yo puedo hacer",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"puedo",type:"verb"},{text:" ",type:"space"},{text:"hacer",type:"verb_infinitive"}],meta:{id:"w2_poder_yo_hacer_aff",lemma:"poder",person:"yo",polarity:"affirmative",tense:"present",tags:["ability"],confusable_with:null}},
      {ru:"Я не говорю",es:"Yo no digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"digo",type:"verb"}],meta:{id:"w2_decir_yo_neg",lemma:"decir",person:"yo",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Мне нужно время",es:"Yo necesito tiempo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"necesito",type:"verb"},{text:" ",type:"space"},{text:"tiempo",type:"object"}],meta:{id:"w2_necesitar_yo_tiempo_aff",lemma:"necesitar",person:"yo",polarity:"affirmative",tense:"present",tags:["need"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l12", title: "3A. Necesitar + Bureaucracy — Tú / Usted",
    phrases: [
      {ru:"Тебе нужен контракт",es:"Tú necesitas el contrato",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],meta:{id:"w2_necesitar_tu_contrato_aff",lemma:"necesitar",person:"tu",polarity:"affirmative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Вам (вежливо) нужен контракт?",es:"¿Usted necesita el contrato?",tokens:[{text:"¿",type:"space"},{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"el contrato?",type:"object"}],meta:{id:"w2_necesitar_usted_contrato_int",lemma:"necesitar",person:"usted",polarity:"interrogative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Ты можешь помочь?",es:"¿Tú puedes ayudar?",tokens:[{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"puedes",type:"verb"},{text:" ",type:"space"},{text:"ayudar?",type:"verb_infinitive"}],meta:{id:"w2_poder_tu_ayudar_int",lemma:"poder",person:"tu",polarity:"interrogative",tense:"present",tags:["ability"],confusable_with:null}},
      {ru:"Ты можешь сделать",es:"Tú puedes hacer",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"puedes",type:"verb"},{text:" ",type:"space"},{text:"hacer",type:"verb_infinitive"}],meta:{id:"w2_poder_tu_hacer_aff",lemma:"poder",person:"tu",polarity:"affirmative",tense:"present",tags:["ability"],confusable_with:null}},
      {ru:"Вы (вежливо) говорите",es:"Usted dice",tokens:[{text:"Usted",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"w2_decir_usted_aff",lemma:"decir",person:"usted",polarity:"affirmative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Тебе нужны деньги?",es:"¿Tú necesitas dinero?",tokens:[{text:"¿",type:"space"},{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"},{text:" ",type:"space"},{text:"dinero?",type:"object"}],meta:{id:"w2_necesitar_tu_dinero_int",lemma:"necesitar",person:"tu",polarity:"interrogative",tense:"present",tags:["need","finance"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l13", title: "3B. Necesitar + Bureaucracy — Él / Ella",
    phrases: [
      {ru:"Ему нужен контракт",es:"Él necesita el contrato",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],meta:{id:"w2_necesitar_el_contrato_aff",lemma:"necesitar",person:"el",polarity:"affirmative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Ей нужен контракт?",es:"¿Ella necesita el contrato?",tokens:[{text:"¿",type:"space"},{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"el contrato?",type:"object"}],meta:{id:"w2_necesitar_ella_contrato_int",lemma:"necesitar",person:"ella",polarity:"interrogative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Ей нужно помочь",es:"Ella necesita ayudar",tokens:[{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"ayudar",type:"verb_infinitive"}],meta:{id:"w2_necesitar_ella_ayudar_aff",lemma:"necesitar",person:"ella",polarity:"affirmative",tense:"present",tags:["need"],confusable_with:null}},
      {ru:"Он может сделать?",es:"¿Él puede hacer?",tokens:[{text:"¿",type:"space"},{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"puede",type:"verb"},{text:" ",type:"space"},{text:"hacer?",type:"verb_infinitive"}],meta:{id:"w2_poder_el_hacer_int",lemma:"poder",person:"el",polarity:"interrogative",tense:"present",tags:["ability"],confusable_with:null}},
      {ru:"Он не говорит",es:"Él no dice",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"dice",type:"verb"}],meta:{id:"w2_decir_el_neg",lemma:"decir",person:"el",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Ей нужно время?",es:"¿Ella necesita tiempo?",tokens:[{text:"¿",type:"space"},{text:"Ella",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"},{text:" ",type:"space"},{text:"tiempo?",type:"object"}],meta:{id:"w2_necesitar_ella_tiempo_int",lemma:"necesitar",person:"ella",polarity:"interrogative",tense:"present",tags:["need"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l14", title: "3C. Necesitar + Bureaucracy — Nosotros",
    phrases: [
      {ru:"Нам нужен контракт",es:"Nosotros necesitamos el contrato",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"necesitamos",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],meta:{id:"w2_necesitar_nos_contrato_aff",lemma:"necesitar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Нам нужен контракт?",es:"¿Nosotros necesitamos el contrato?",tokens:[{text:"¿",type:"space"},{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"necesitamos",type:"verb"},{text:" ",type:"space"},{text:"el contrato?",type:"object"}],meta:{id:"w2_necesitar_nos_contrato_int",lemma:"necesitar",person:"nosotros",polarity:"interrogative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Нам нужно помочь",es:"Nosotros necesitamos ayudar",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"necesitamos",type:"verb"},{text:" ",type:"space"},{text:"ayudar",type:"verb_infinitive"}],meta:{id:"w2_necesitar_nos_ayudar_aff",lemma:"necesitar",person:"nosotros",polarity:"affirmative",tense:"present",tags:["need"],confusable_with:null}},
      {ru:"Мы можем сделать",es:"Nosotros podemos hacer",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"podemos",type:"verb"},{text:" ",type:"space"},{text:"hacer",type:"verb_infinitive"}],meta:{id:"w2_poder_nos_hacer_aff",lemma:"poder",person:"nosotros",polarity:"affirmative",tense:"present",tags:["ability"],confusable_with:null}},
      {ru:"Мы не говорим",es:"Nosotros no decimos",tokens:[{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"decimos",type:"verb"}],meta:{id:"w2_decir_nos_neg",lemma:"decir",person:"nosotros",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Нам нужны деньги?",es:"¿Nosotros necesitamos dinero?",tokens:[{text:"¿",type:"space"},{text:"Nosotros",type:"subject"},{text:" ",type:"space"},{text:"necesitamos",type:"verb"},{text:" ",type:"space"},{text:"dinero?",type:"object"}],meta:{id:"w2_necesitar_nos_dinero_int",lemma:"necesitar",person:"nosotros",polarity:"interrogative",tense:"present",tags:["need","finance"],confusable_with:null}}
    ]
  },
  {
    id: "w2_l15", title: "3D. Necesitar + Bureaucracy — Ellos / Ellas / Ustedes",
    phrases: [
      {ru:"Им (м.р.) нужен контракт",es:"Ellos necesitan el contrato",tokens:[{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"el contrato",type:"object"}],meta:{id:"w2_necesitar_ellos_contrato_aff",lemma:"necesitar",person:"ellos",polarity:"affirmative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Им (ж.р.) нужен контракт?",es:"¿Ellas necesitan el contrato?",tokens:[{text:"¿",type:"space"},{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"el contrato?",type:"object"}],meta:{id:"w2_necesitar_ellas_contrato_int",lemma:"necesitar",person:"ellas",polarity:"interrogative",tense:"present",tags:["need","bureaucracy"],confusable_with:null}},
      {ru:"Вам (мн.ч.) нужно помочь",es:"Ustedes necesitan ayudar",tokens:[{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"ayudar",type:"verb_infinitive"}],meta:{id:"w2_necesitar_ustedes_ayudar_aff",lemma:"necesitar",person:"ustedes",polarity:"affirmative",tense:"present",tags:["need"],confusable_with:null}},
      {ru:"Они (м.р.) могут сделать?",es:"¿Ellos pueden hacer?",tokens:[{text:"¿",type:"space"},{text:"Ellos",type:"subject"},{text:" ",type:"space"},{text:"pueden",type:"verb"},{text:" ",type:"space"},{text:"hacer?",type:"verb_infinitive"}],meta:{id:"w2_poder_ellos_hacer_int",lemma:"poder",person:"ellos",polarity:"interrogative",tense:"present",tags:["ability"],confusable_with:null}},
      {ru:"Они (ж.р.) не говорят",es:"Ellas no dicen",tokens:[{text:"Ellas",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"dicen",type:"verb"}],meta:{id:"w2_decir_ellas_neg",lemma:"decir",person:"ellas",polarity:"negative",tense:"present",tags:["speech"],confusable_with:null}},
      {ru:"Вам (мн.ч.) нужно время?",es:"¿Ustedes necesitan tiempo?",tokens:[{text:"¿",type:"space"},{text:"Ustedes",type:"subject"},{text:" ",type:"space"},{text:"necesitan",type:"verb"},{text:" ",type:"space"},{text:"tiempo?",type:"object"}],meta:{id:"w2_necesitar_ustedes_tiempo_int",lemma:"necesitar",person:"ustedes",polarity:"interrogative",tense:"present",tags:["need"],confusable_with:null}}
    ]
  },
  
  // ========================================================
  // FINAL EXAM
  // ========================================================
  {
    id: "w2_exam", title: "🏆 Week 2 Final Exam", exam: true, phrases: []
  }
];

export default {
  id: "week_2",
  title: "Week 2: Intention & Apartment Viewing",
  description: "Querer, Poder, Necesitar applied to Real Estate, plus Week 1 review.",
  legacy: false,
  lessons: week2Lessons,
};
