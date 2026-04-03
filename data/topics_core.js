window.AnchorData = window.AnchorData || [];
const lessons = [
    {
      id: "lesson_c3_1",
      title: "Identity & Location (Irregular) - Yo (I)",
      phrases: [
        {ru:"Я есть (описание)",es:"Yo soy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"soy",type:"verb"}]},
        {ru:"Я не (описание)",es:"Yo no soy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"soy",type:"verb"}]},
        {ru:"Я нахожусь",es:"Yo estoy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"estoy",type:"verb"}]},
        {ru:"Я не нахожусь",es:"Yo no estoy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"estoy",type:"verb"}]},
        {ru:"Я иду",es:"Yo voy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"voy",type:"verb"}]},
        {ru:"Я не иду",es:"Yo no voy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"voy",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c3_2",
      title: "Identity & Location (Irregular) - Tú/Él",
      phrases: [
        {ru:"Ты есть (описание)",es:"Tú eres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"eres",type:"verb"}]},
        {ru:"Он есть (описание)",es:"Él es",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"es",type:"verb"}]},
        {ru:"Ты находишься",es:"Tú estás",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"estás",type:"verb"}]},
        {ru:"Он находится",es:"Él está",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"está",type:"verb"}]},
        {ru:"Ты идешь",es:"Tú vas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vas",type:"verb"}]},
        {ru:"Он идет",es:"Él va",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"va",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c4_1",
      title: "Possession & Action (Core) - Yo (I)",
      phrases: [
        {ru:"У меня есть",es:"Yo tengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tengo",type:"verb"}]},
        {ru:"У меня нет",es:"Yo no tengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tengo",type:"verb"}]},
        {ru:"Я делаю",es:"Yo hago",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"hago",type:"verb"}]},
        {ru:"Я не делаю",es:"Yo no hago",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"hago",type:"verb"}]},
        {ru:"Я говорю (сказать)",es:"Yo digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"digo",type:"verb"}]},
        {ru:"Я не говорю",es:"Yo no digo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"digo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c4_2",
      title: "Possession & Action (Core) - Tú/Él",
      phrases: [
        {ru:"У тебя есть",es:"Tú tienes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tienes",type:"verb"}]},
        {ru:"У него есть",es:"Él tiene",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"tiene",type:"verb"}]},
        {ru:"Ты делаешь",es:"Tú haces",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"haces",type:"verb"}]},
        {ru:"Он делает",es:"Él hace",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"hace",type:"verb"}]},
        {ru:"Ты говоришь (сказать)",es:"Tú dices",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"dices",type:"verb"}]},
        {ru:"Он говорит",es:"Él dice",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"dice",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c5_1",
      title: "Everyday Actions (-AR) - Yo (I)",
      phrases: [
        {ru:"Я беру/пью",es:"Yo tomo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"tomo",type:"verb"}]},
        {ru:"Я не беру/пью",es:"Yo no tomo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"tomo",type:"verb"}]},
        {ru:"Я несу",es:"Yo llevo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"llevo",type:"verb"}]},
        {ru:"Я не несу",es:"Yo no llevo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"llevo",type:"verb"}]},
        {ru:"Я оставляю",es:"Yo dejo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"dejo",type:"verb"}]},
        {ru:"Я не оставляю",es:"Yo no dejo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"dejo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c5_2",
      title: "Everyday Actions (-AR) - Tú/Él",
      phrases: [
        {ru:"Ты берешь/пьешь",es:"Tú tomas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"tomas",type:"verb"}]},
        {ru:"Он берет/пьет",es:"Él toma",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"toma",type:"verb"}]},
        {ru:"Ты несешь",es:"Tú llevas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"llevas",type:"verb"}]},
        {ru:"Он несет",es:"Él lleva",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"lleva",type:"verb"}]},
        {ru:"Ты оставляешь",es:"Tú dejas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"dejas",type:"verb"}]},
        {ru:"Он оставляет",es:"Él deja",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"deja",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c6_1",
      title: "Social & Time (-AR) - Yo (I)",
      phrases: [
        {ru:"Я звоню",es:"Yo llamo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"llamo",type:"verb"}]},
        {ru:"Я не звоню",es:"Yo no llamo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"llamo",type:"verb"}]},
        {ru:"Я прохожу",es:"Yo paso",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"paso",type:"verb"}]},
        {ru:"Я не прохожу",es:"Yo no paso",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"paso",type:"verb"}]},
        {ru:"Я остаюсь",es:"Yo quedo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quedo",type:"verb"}]},
        {ru:"Я не остаюсь",es:"Yo no quedo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quedo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c6_2",
      title: "Social & Time (-AR) - Tú/Él",
      phrases: [
        {ru:"Ты звонишь",es:"Tú llamas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"llamas",type:"verb"}]},
        {ru:"Он звонит",es:"Él llama",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"llama",type:"verb"}]},
        {ru:"Ты проходишь",es:"Tú pasas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"pasas",type:"verb"}]},
        {ru:"Он проходит",es:"Él pasa",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"pasa",type:"verb"}]},
        {ru:"Ты остаешься",es:"Tú quedas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"quedas",type:"verb"}]},
        {ru:"Он остается",es:"Él queda",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"queda",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c7_1",
      title: "Needs & Help (-AR) - Yo (I)",
      phrases: [
        {ru:"Мне нужно",es:"Yo necesito",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"necesito",type:"verb"}]},
        {ru:"Мне не нужно",es:"Yo no necesito",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"necesito",type:"verb"}]},
        {ru:"Я помогаю",es:"Yo ayudo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"ayudo",type:"verb"}]},
        {ru:"Я не помогаю",es:"Yo no ayudo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"ayudo",type:"verb"}]},
        {ru:"Я жду",es:"Yo espero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"espero",type:"verb"}]},
        {ru:"Я не жду",es:"Yo no espero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"espero",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c7_2",
      title: "Needs & Help (-AR) - Tú/Él",
      phrases: [
        {ru:"Тебе нужно",es:"Tú necesitas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"necesitas",type:"verb"}]},
        {ru:"Ему нужно",es:"Él necesita",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"necesita",type:"verb"}]},
        {ru:"Ты помогаешь",es:"Tú ayudas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"ayudas",type:"verb"}]},
        {ru:"Он помогает",es:"Él ayuda",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"ayuda",type:"verb"}]},
        {ru:"Ты ждешь",es:"Tú esperas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"esperas",type:"verb"}]},
        {ru:"Он ждет",es:"Él espera",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"espera",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c8_1",
      title: "Looking & Searching (-AR) - Yo (I)",
      phrases: [
        {ru:"Я смотрю",es:"Yo miro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"miro",type:"verb"}]},
        {ru:"Я не смотрю",es:"Yo no miro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"miro",type:"verb"}]},
        {ru:"Я ищу",es:"Yo busco",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"busco",type:"verb"}]},
        {ru:"Я не ищу",es:"Yo no busco",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"busco",type:"verb"}]},
        {ru:"Я вхожу",es:"Yo entro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"entro",type:"verb"}]},
        {ru:"Я не вхожу",es:"Yo no entro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"entro",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c8_2",
      title: "Looking & Searching (-AR) - Tú/Él",
      phrases: [
        {ru:"Ты смотришь",es:"Tú miras",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"miras",type:"verb"}]},
        {ru:"Он смотрит",es:"Él mira",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"mira",type:"verb"}]},
        {ru:"Ты ищешь",es:"Tú buscas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"buscas",type:"verb"}]},
        {ru:"Он ищет",es:"Él busca",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"busca",type:"verb"}]},
        {ru:"Ты входишь",es:"Tú entras",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"entras",type:"verb"}]},
        {ru:"Он входит",es:"Él entra",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"entra",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c9_1",
      title: "Thought & Senses (-ER/-IR) - Yo (I)",
      phrases: [
        {ru:"Я верю",es:"Yo creo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"creo",type:"verb"}]},
        {ru:"Я не верю",es:"Yo no creo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"creo",type:"verb"}]},
        {ru:"Я понимаю (суть)",es:"Yo comprendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"comprendo",type:"verb"}]},
        {ru:"Я не понимаю",es:"Yo no comprendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"comprendo",type:"verb"}]},
        {ru:"Я учусь",es:"Yo aprendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"aprendo",type:"verb"}]},
        {ru:"Я не учусь",es:"Yo no aprendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"aprendo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c9_2",
      title: "Thought & Senses (-ER/-IR) - Tú/Él",
      phrases: [
        {ru:"Ты веришь",es:"Tú crees",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"crees",type:"verb"}]},
        {ru:"Он верит",es:"Él cree",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"cree",type:"verb"}]},
        {ru:"Ты понимаешь",es:"Tú comprendes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"comprendes",type:"verb"}]},
        {ru:"Он понимает",es:"Él comprende",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"comprende",type:"verb"}]},
        {ru:"Ты учишься",es:"Tú aprendes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"aprendes",type:"verb"}]},
        {ru:"Он учится",es:"Él aprende",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"aprende",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c10_1",
      title: "Interaction (-ER/-IR) - Yo (I)",
      phrases: [
        {ru:"Я продаю",es:"Yo vendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"vendo",type:"verb"}]},
        {ru:"Я не продаю",es:"Yo no vendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vendo",type:"verb"}]},
        {ru:"Я пишу",es:"Yo escribo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"escribo",type:"verb"}]},
        {ru:"Я не пишу",es:"Yo no escribo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"escribo",type:"verb"}]},
        {ru:"Я получаю",es:"Yo recibo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"recibo",type:"verb"}]},
        {ru:"Я не получаю",es:"Yo no recibo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"recibo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c10_2",
      title: "Interaction (-ER/-IR) - Tú/Él",
      phrases: [
        {ru:"Ты продаешь",es:"Tú vendes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vendes",type:"verb"}]},
        {ru:"Он продает",es:"Él vende",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"vende",type:"verb"}]},
        {ru:"Ты пишешь",es:"Tú escribes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"escribes",type:"verb"}]},
        {ru:"Он пишет",es:"Él escribe",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"escribe",type:"verb"}]},
        {ru:"Ты получаешь",es:"Tú recibes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"recibes",type:"verb"}]},
        {ru:"Он получает",es:"Él recibe",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"recibe",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c11_1",
      title: "Action & Motion (-ER/-IR) - Yo (I)",
      phrases: [
        {ru:"Я открываю",es:"Yo abro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"abro",type:"verb"}]},
        {ru:"Я не открываю",es:"Yo no abro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"abro",type:"verb"}]},
        {ru:"Я поднимаюсь",es:"Yo subo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"subo",type:"verb"}]},
        {ru:"Я не поднимаюсь",es:"Yo no subo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"subo",type:"verb"}]},
        {ru:"Я разрешаю",es:"Yo permito",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"permito",type:"verb"}]},
        {ru:"Я не разрешаю",es:"Yo no permito",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"permito",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c11_2",
      title: "Action & Motion (-ER/-IR) - Tú/Él",
      phrases: [
        {ru:"Ты открываешь",es:"Tú abres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"abres",type:"verb"}]},
        {ru:"Он открывает",es:"Él abre",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"abre",type:"verb"}]},
        {ru:"Ты поднимаешься",es:"Tú subes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"subes",type:"verb"}]},
        {ru:"Он поднимается",es:"Él sube",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"sube",type:"verb"}]},
        {ru:"Ты разрешаешь",es:"Tú permites",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"permites",type:"verb"}]},
        {ru:"Он разрешает",es:"Él permite",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"permite",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c12_1",
      title: "Placement & Leaving (Irregular 'Yo') - Yo (I)",
      phrases: [
        {ru:"Я кладу",es:"Yo pongo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"pongo",type:"verb"}]},
        {ru:"Я не кладу",es:"Yo no pongo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"pongo",type:"verb"}]},
        {ru:"Я выхожу",es:"Yo salgo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"salgo",type:"verb"}]},
        {ru:"Я не выхожу",es:"Yo no salgo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"salgo",type:"verb"}]},
        {ru:"Я падаю",es:"Yo caigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"caigo",type:"verb"}]},
        {ru:"Я не падаю",es:"Yo no caigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"caigo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c12_2",
      title: "Placement & Leaving (Irregular 'Yo') - Tú/Él",
      phrases: [
        {ru:"Ты кладешь",es:"Tú pones",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"pones",type:"verb"}]},
        {ru:"Он кладет",es:"Él pone",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"pone",type:"verb"}]},
        {ru:"Ты выходишь",es:"Tú sales",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"sales",type:"verb"}]},
        {ru:"Он выходит",es:"Él sale",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"sale",type:"verb"}]},
        {ru:"Ты падаешь",es:"Tú caes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"caes",type:"verb"}]},
        {ru:"Он падает",es:"Él cae",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"cae",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c13_1",
      title: "Knowledge & Sight (Irregular 'Yo') - Yo (I)",
      phrases: [
        {ru:"Я знаю (факт)",es:"Yo sé",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"sé",type:"verb"}]},
        {ru:"Я не знаю",es:"Yo no sé",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"sé",type:"verb"}]},
        {ru:"Я знаю (человека)",es:"Yo conozco",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"conozco",type:"verb"}]},
        {ru:"Я не знаю",es:"Yo no conozco",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"conozco",type:"verb"}]},
        {ru:"Я вижу",es:"Yo veo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"veo",type:"verb"}]},
        {ru:"Я не вижу",es:"Yo no veo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"veo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c13_2",
      title: "Knowledge & Sight (Irregular 'Yo') - Tú/Él",
      phrases: [
        {ru:"Ты знаешь",es:"Tú sabes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"sabes",type:"verb"}]},
        {ru:"Он знает",es:"Él sabe",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"sabe",type:"verb"}]},
        {ru:"Ты знаешь",es:"Tú conoces",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"conoces",type:"verb"}]},
        {ru:"Он знает",es:"Él conoce",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"conoce",type:"verb"}]},
        {ru:"Ты видишь",es:"Tú ves",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"ves",type:"verb"}]},
        {ru:"Он видит",es:"Él ve",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"ve",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c14_1",
      title: "Giving & Bringing (Irregular 'Yo') - Yo (I)",
      phrases: [
        {ru:"Я даю",es:"Yo doy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"doy",type:"verb"}]},
        {ru:"Я не даю",es:"Yo no doy",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"doy",type:"verb"}]},
        {ru:"Я приношу",es:"Yo traigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"traigo",type:"verb"}]},
        {ru:"Я не приношу",es:"Yo no traigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"traigo",type:"verb"}]},
        {ru:"Я прихожу",es:"Yo vengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"vengo",type:"verb"}]},
        {ru:"Я не прихожу",es:"Yo no vengo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vengo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c14_2",
      title: "Giving & Bringing (Irregular 'Yo') - Tú/Él",
      phrases: [
        {ru:"Ты даешь",es:"Tú das",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"das",type:"verb"}]},
        {ru:"Он дает",es:"Él da",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"da",type:"verb"}]},
        {ru:"Ты приносишь",es:"Tú traes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"traes",type:"verb"}]},
        {ru:"Он приносит",es:"Él trae",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"trae",type:"verb"}]},
        {ru:"Ты приходишь",es:"Tú vienes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vienes",type:"verb"}]},
        {ru:"Он приходит",es:"Él viene",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"viene",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c15_1",
      title: "Thinking & Wanting (E -> IE) - Yo (I)",
      phrases: [
        {ru:"Я хочу",es:"Yo quiero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"quiero",type:"verb"}]},
        {ru:"Я не хочу",es:"Yo no quiero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"quiero",type:"verb"}]},
        {ru:"Я думаю",es:"Yo pienso",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"pienso",type:"verb"}]},
        {ru:"Я не думаю",es:"Yo no pienso",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"pienso",type:"verb"}]},
        {ru:"Я понимаю (смысл)",es:"Yo entiendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"entiendo",type:"verb"}]},
        {ru:"Я не понимаю",es:"Yo no entiendo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"entiendo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c15_2",
      title: "Thinking & Wanting (E -> IE) - Tú/Él",
      phrases: [
        {ru:"Ты хочешь",es:"Tú quieres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"quieres",type:"verb"}]},
        {ru:"Он хочет",es:"Él quiere",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"quiere",type:"verb"}]},
        {ru:"Ты думаешь",es:"Tú piensas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"piensas",type:"verb"}]},
        {ru:"Он думает",es:"Él piensa",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"piensa",type:"verb"}]},
        {ru:"Ты понимаешь",es:"Tú entiendes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"entiendes",type:"verb"}]},
        {ru:"Он понимает",es:"Él entiende",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"entiende",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c16_1",
      title: "Feelings & Senses (E -> IE) - Yo (I)",
      phrases: [
        {ru:"Я чувствую",es:"Yo siento",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"siento",type:"verb"}]},
        {ru:"Я не чувствую",es:"Yo no siento",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"siento",type:"verb"}]},
        {ru:"Я предпочитаю",es:"Yo prefiero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"prefiero",type:"verb"}]},
        {ru:"Я не предпочитаю",es:"Yo no prefiero",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"prefiero",type:"verb"}]},
        {ru:"Я начинаю",es:"Yo empiezo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"empiezo",type:"verb"}]},
        {ru:"Я не начинаю",es:"Yo no empiezo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"empiezo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c16_2",
      title: "Feelings & Senses (E -> IE) - Tú/Él",
      phrases: [
        {ru:"Ты чувствуешь",es:"Tú sientes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"sientes",type:"verb"}]},
        {ru:"Он чувствует",es:"Él siente",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"siente",type:"verb"}]},
        {ru:"Ты предпочитаешь",es:"Tú prefieres",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"prefieres",type:"verb"}]},
        {ru:"Он предпочитает",es:"Él prefiere",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"prefiere",type:"verb"}]},
        {ru:"Ты начинаешь",es:"Tú empiezas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"empiezas",type:"verb"}]},
        {ru:"Он начинает",es:"Él empieza",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"empieza",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c17_1",
      title: "Loss & Closure (E -> IE) - Yo (I)",
      phrases: [
        {ru:"Я теряю",es:"Yo pierdo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"pierdo",type:"verb"}]},
        {ru:"Я не теряю",es:"Yo no pierdo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"pierdo",type:"verb"}]},
        {ru:"Я закрываю",es:"Yo cierro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"cierro",type:"verb"}]},
        {ru:"Я не закрываю",es:"Yo no cierro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"cierro",type:"verb"}]},
        {ru:"Я просыпаюсь",es:"Yo despierto",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"despierto",type:"verb"}]},
        {ru:"Я не просыпаюсь",es:"Yo no despierto",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"despierto",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c17_2",
      title: "Loss & Closure (E -> IE) - Tú/Él",
      phrases: [
        {ru:"Ты теряешь",es:"Tú pierdes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"pierdes",type:"verb"}]},
        {ru:"Он теряет",es:"Él pierde",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"pierde",type:"verb"}]},
        {ru:"Ты закрываешь",es:"Tú cierras",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"cierras",type:"verb"}]},
        {ru:"Он закрывает",es:"Él cierra",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"cierra",type:"verb"}]},
        {ru:"Ты просыпаешься",es:"Tú despiertas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"despiertas",type:"verb"}]},
        {ru:"Он просыпается",es:"Él despierta",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"despierta",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c18_1",
      title: "Action & Memory (O -> UE) - Yo (I)",
      phrases: [
        {ru:"Я могу",es:"Yo puedo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"puedo",type:"verb"}]},
        {ru:"Я не могу",es:"Yo no puedo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"puedo",type:"verb"}]},
        {ru:"Я возвращаюсь",es:"Yo vuelvo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"vuelvo",type:"verb"}]},
        {ru:"Я не возвращаюсь",es:"Yo no vuelvo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"vuelvo",type:"verb"}]},
        {ru:"Я помню",es:"Yo recuerdo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"recuerdo",type:"verb"}]},
        {ru:"Я не помню",es:"Yo no recuerdo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"recuerdo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c18_2",
      title: "Action & Memory (O -> UE) - Tú/Él",
      phrases: [
        {ru:"Ты можешь",es:"Tú puedes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"puedes",type:"verb"}]},
        {ru:"Он может",es:"Él puede",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"puede",type:"verb"}]},
        {ru:"Ты возвращаешься",es:"Tú vuelves",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"vuelves",type:"verb"}]},
        {ru:"Он возвращается",es:"Él vuelve",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"vuelve",type:"verb"}]},
        {ru:"Ты помнишь",es:"Tú recuerdas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"recuerdas",type:"verb"}]},
        {ru:"Он помнит",es:"Él recuerda",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"recuerda",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c19_1",
      title: "Action/Math (O -> UE) - Yo (I)",
      phrases: [
        {ru:"Я нахожу",es:"Yo encuentro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"encuentro",type:"verb"}]},
        {ru:"Я не нахожу",es:"Yo no encuentro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"encuentro",type:"verb"}]},
        {ru:"Я рассказываю",es:"Yo cuento",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"cuento",type:"verb"}]},
        {ru:"Я не рассказываю",es:"Yo no cuento",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"cuento",type:"verb"}]},
        {ru:"Я играю",es:"Yo juego",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"juego",type:"verb"}]},
        {ru:"Я не играю",es:"Yo no juego",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"juego",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c19_2",
      title: "Action/Math (O -> UE) - Tú/Él",
      phrases: [
        {ru:"Ты находишь",es:"Tú encuentras",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"encuentras",type:"verb"}]},
        {ru:"Он находит",es:"Él encuentra",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"encuentra",type:"verb"}]},
        {ru:"Ты рассказываешь",es:"Tú cuentas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"cuentas",type:"verb"}]},
        {ru:"Он рассказывает",es:"Él cuenta",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"cuenta",type:"verb"}]},
        {ru:"Ты играешь",es:"Tú juegas",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"juegas",type:"verb"}]},
        {ru:"Он играет",es:"Él juega",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"juega",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c20_1",
      title: "Rest (O -> UE) - Yo (I)",
      phrases: [
        {ru:"Я сплю",es:"Yo duermo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"duermo",type:"verb"}]},
        {ru:"Я не сплю",es:"Yo no duermo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"duermo",type:"verb"}]},
        {ru:"Я показываю",es:"Yo muestro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"muestro",type:"verb"}]},
        {ru:"Я не показываю",es:"Yo no muestro",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"muestro",type:"verb"}]},
        {ru:"Я двигаю",es:"Yo muevo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"muevo",type:"verb"}]},
        {ru:"Я не двигаю",es:"Yo no muevo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"muevo",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c20_2",
      title: "Rest (O -> UE) - Tú/Él",
      phrases: [
        {ru:"Ты спишь",es:"Tú duermes",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"duermes",type:"verb"}]},
        {ru:"Он спит",es:"Él duerme",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"duerme",type:"verb"}]},
        {ru:"Ты показываешь",es:"Tú muestras",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"muestras",type:"verb"}]},
        {ru:"Он показывает",es:"Él muestra",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"muestra",type:"verb"}]},
        {ru:"Ты двигаешь",es:"Tú mueves",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"mueves",type:"verb"}]},
        {ru:"Он двигает",es:"Él mueve",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"mueve",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c21_1",
      title: "Requests & Repetition (E -> I) - Yo (I)",
      phrases: [
        {ru:"Я прошу",es:"Yo pido",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"pido",type:"verb"}]},
        {ru:"Я не прошу",es:"Yo no pido",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"pido",type:"verb"}]},
        {ru:"Я служу/подаю",es:"Yo sirvo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"sirvo",type:"verb"}]},
        {ru:"Я не служу",es:"Yo no sirvo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"sirvo",type:"verb"}]},
        {ru:"Я повторяю",es:"Yo repito",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"repito",type:"verb"}]},
        {ru:"Я не повторяю",es:"Yo no repito",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"repito",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c21_2",
      title: "Requests & Repetition (E -> I) - Tú/Él",
      phrases: [
        {ru:"Ты просишь",es:"Tú pides",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"pides",type:"verb"}]},
        {ru:"Он просит",es:"Él pide",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"pide",type:"verb"}]},
        {ru:"Ты служишь",es:"Tú sirves",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"sirves",type:"verb"}]},
        {ru:"Он служит",es:"Él sirve",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"sirve",type:"verb"}]},
        {ru:"Ты повторяешь",es:"Tú repites",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"repites",type:"verb"}]},
        {ru:"Он повторяет",es:"Él repite",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"repite",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c22_1",
      title: "Continuing (E -> I) - Yo (I)",
      phrases: [
        {ru:"Я продолжаю",es:"Yo sigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"sigo",type:"verb"}]},
        {ru:"Я не продолжаю",es:"Yo no sigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"sigo",type:"verb"}]},
        {ru:"Я достигаю",es:"Yo consigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"consigo",type:"verb"}]},
        {ru:"Я не достигаю",es:"Yo no consigo",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"consigo",type:"verb"}]},
        {ru:"Я измеряю",es:"Yo mido",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"mido",type:"verb"}]},
        {ru:"Я не измеряю",es:"Yo no mido",tokens:[{text:"Yo",type:"subject"},{text:" ",type:"space"},{text:"no",type:"negation"},{text:" ",type:"space"},{text:"mido",type:"verb"}]}
      ]
    },
    {
      id: "lesson_c22_2",
      title: "Continuing (E -> I) - Tú/Él",
      phrases: [
        {ru:"Ты продолжаешь",es:"Tú sigues",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"sigues",type:"verb"}]},
        {ru:"Он продолжает",es:"Él sigue",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"sigue",type:"verb"}]},
        {ru:"Ты достигаешь",es:"Tú consigues",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"consigues",type:"verb"}]},
        {ru:"Он достигает",es:"Él consigue",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"consigue",type:"verb"}]},
        {ru:"Ты измеряешь",es:"Tú mides",tokens:[{text:"Tú",type:"subject"},{text:" ",type:"space"},{text:"mides",type:"verb"}]},
        {ru:"Он измеряет",es:"Él mide",tokens:[{text:"Él",type:"subject"},{text:" ",type:"space"},{text:"mide",type:"verb"}]}
      ]
    }
];

window.AnchorData.push({
  id: "verb_specialties",
  title: "Verb Specialties",
  description: "Master all core irregular, stem-changing, and vital everyday verbs.",
  lessons: lessons
});
