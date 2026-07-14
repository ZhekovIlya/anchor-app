// ════════════════════════════════════════════════════════════════════
// WEEK 7 — "Romper la barrera de hablar" (Breaking the speaking barrier)
// ────────────────────────────────────────────────────────────────────
// Level: A2 → B1. Goal: stop freezing and actually CONVERSE. This is the
// conversational machinery that gets you off the intermediate plateau —
// fillers, reactions, opinions, narrating, repair, and socializing.
//
// STRUCTURE (matches your schema):
//   • 6 tabs × 3 lessons (6 phrases each) = 18 lessons
//   • 1 MINI-EXAM after each tab            = 6 mini-exams
//   • 1 FULL EXAM at the end                = 1 exam
//   • A `theory` block ("Grammar expansion") embedded on the week object.
//
// NOTES FOR INTEGRATION:
//   1. New `tab` keys used: ganar_tiempo, reaccionar, opinar, contar,
//      rescate, quedar. If your dashboard maps tab keys → labels/icons,
//      add these keys there.
//   2. Mini-exams use { exam: true, mini: true, tab: "..." }. If your
//      engine only checks `exam: true`, they still behave as exams —
//      `mini` and `tab` are just grouping/label hints. The full exam is
//      the same { exam: true } object you already use.
//   3. THEORY: if Week 6 stores its "Grammar expansion" theory as a
//      separate file in /public/theory (HTML or an infographic image)
//      rather than on the week object, move the `theory` content below
//      into that file / format. The content is the same either way.
// ════════════════════════════════════════════════════════════════════

const week7Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: GANAR TIEMPO — don't go blank, buy yourself time
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l1",
    tab: "ganar_tiempo",
    title: "No te quedes en blanco",
    phrases: [
      { ru: "Ну… не знаю, дай подумать", uk: "Ну… не знаю, дай подумати", es: "Pues… no sé, déjame pensar" },
      { ru: "Так, как бы тебе объяснить?", uk: "Так, як би тобі пояснити?", es: "A ver, ¿cómo te lo explico?" },
      { ru: "Дело в том, что это немного сложно", uk: "Річ у тім, що це трохи складно", es: "Es que es un poco complicado" },
      { ru: "Ну, то, что я хочу сказать…", uk: "Ну, те, що я хочу сказати…", es: "Bueno, lo que quiero decir es…" },
      { ru: "Подожди, сейчас вспомню", uk: "Зачекай, зараз пригадаю", es: "Espera, que ahora me acuerdo" },
      { ru: "То есть, более-менее так", uk: "Тобто, більш-менш так", es: "O sea, más o menos eso" },
    ],
  },
  {
    id: "w7_l2",
    tab: "ganar_tiempo",
    title: "Suavizar y dudar",
    phrases: [
      { ru: "Я не уверен, но думаю, что да", uk: "Я не впевнений, але гадаю, що так", es: "No estoy seguro, pero creo que sí" },
      { ru: "Сказал бы, что да, более-менее", uk: "Сказав би, що так, більш-менш", es: "Diría que sí, más o menos" },
      { ru: "Зависит, честно говоря", uk: "Залежить, правду кажучи", es: "Depende, la verdad" },
      { ru: "Не знаю, как сказать это по-испански", uk: "Не знаю, як сказати це іспанською", es: "No sé cómo decirlo en español" },
      { ru: "Что-то типа того, не знаю, понятно ли", uk: "Щось таке, не знаю, чи зрозуміло", es: "Algo así, no sé si me explico" },
      { ru: "Ну, смотря как посмотреть", uk: "Ну, дивлячись як подивитися", es: "Bueno, depende de cómo lo mires" },
    ],
  },
  {
    id: "w7_l3",
    tab: "ganar_tiempo",
    title: "Pedir tiempo sin agobiarte",
    phrases: [
      { ru: "Извини, можешь повторить помедленнее?", uk: "Вибач, можеш повторити повільніше?", es: "Perdona, ¿puedes repetir más despacio?" },
      { ru: "Я тебя не очень понял, что ты сказал?", uk: "Я тебе не дуже зрозумів, що ти сказав?", es: "No te he entendido bien, ¿qué has dicho?" },
      { ru: "Дай секунду, я подумаю", uk: "Дай секунду, я подумаю", es: "Dame un segundo, que lo pienso" },
      { ru: "Что? Не улавливаю", uk: "Що? Не вловлюю", es: "¿Cómo? No te sigo" },
      { ru: "Ладно, подожди, скажу ещё раз", uk: "Гаразд, зачекай, скажу ще раз", es: "Vale, espera, lo digo otra vez" },
      { ru: "Дело в том, что я немного запутался", uk: "Річ у тім, що я трохи заплутався", es: "Es que me he liado un poco" },
    ],
  },
  { id: "w7_m1", tab: "ganar_tiempo", exam: true, mini: true, title: "Mini-examen: Ganar tiempo" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: REACCIONAR — react so the other person keeps talking
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l4",
    tab: "reaccionar",
    title: "Mostrar interés",
    phrases: [
      { ru: "Серьёзно? Да ладно!", uk: "Серйозно? Та ну!", es: "¿En serio? ¡No me digas!" },
      { ru: "Вот это да! И что потом?", uk: "Оце так! І що потім?", es: "¡Qué fuerte! ¿Y luego qué pasó?" },
      { ru: "Ого, я и понятия не имел", uk: "Овва, я й гадки не мав", es: "Anda, no tenía ni idea" },
      { ru: "Да, я тебя прекрасно понимаю", uk: "Так, я тебе чудово розумію", es: "Ya, te entiendo perfectamente" },
      { ru: "Боже мой, какое безумие!", uk: "Боже мій, яке безумство!", es: "Madre mía, ¡qué locura!" },
      { ru: "Конечно-конечно, продолжай", uk: "Звісно-звісно, продовжуй", es: "Claro, claro, sigue" },
    ],
  },
  {
    id: "w7_l5",
    tab: "reaccionar",
    title: "Buenas y malas noticias",
    phrases: [
      { ru: "Как здорово! Очень рад", uk: "Як добре! Дуже радий", es: "¡Qué bien! Me alegro un montón" },
      { ru: "Эх, как жаль, сочувствую", uk: "Ех, як шкода, співчуваю", es: "Vaya, qué pena, lo siento" },
      { ru: "Поздравляю! Ты это заслужил", uk: "Вітаю! Ти на це заслужив", es: "¡Enhorabuena! Te lo mereces" },
      { ru: "Какая досада, всё ведь так хорошо шло", uk: "Яка прикрість, адже все так добре йшло", es: "Qué rabia, con lo bien que iba" },
      { ru: "Ничего страшного, спокойно", uk: "Нічого страшного, спокійно", es: "No pasa nada, tranquilo" },
      { ru: "Слава богу! Какое облегчение", uk: "Слава богу! Яке полегшення", es: "¡Menos mal! Qué alivio" },
    ],
  },
  {
    id: "w7_l6",
    tab: "reaccionar",
    title: "Acordar y discrepar",
    phrases: [
      { ru: "Да, полностью, думаю так же", uk: "Так, цілком, думаю так само", es: "Sí, totalmente, pienso igual" },
      { ru: "Да, но я вижу это иначе", uk: "Так, але я бачу це інакше", es: "Ya, pero yo lo veo distinto" },
      { ru: "Ну, не знаю… (сомнение)", uk: "Ну, не знаю… (сумнів)", es: "Hombre, no sé yo…" },
      { ru: "Вот тут ты прав", uk: "Ось тут ти маєш рацію", es: "En eso te doy la razón" },
      { ru: "Ну, как посмотреть", uk: "Ну, як подивитися", es: "Bueno, según se mire" },
      { ru: "Честно, я не согласен", uk: "Чесно, я не згоден", es: "No estoy de acuerdo, la verdad" },
    ],
  },
  { id: "w7_m2", tab: "reaccionar", exam: true, mini: true, title: "Mini-examen: Reaccionar" },

  // ═══════════════════════════════════════════════════════
  // TAB 3: OPINAR — say what you think and back it up
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l7",
    tab: "opinar",
    title: "Introducir tu opinión",
    phrases: [
      { ru: "Для меня самое важное — семья", uk: "Для мене найважливіше — родина", es: "Para mí, lo más importante es la familia" },
      { ru: "Я думаю, ты прав", uk: "Я думаю, ти маєш рацію", es: "Yo creo que tienes razón" },
      { ru: "Мне кажется, это хорошая идея", uk: "Мені здається, це гарна ідея", es: "Me parece que es buena idea" },
      { ru: "По правде, меня это не убеждает", uk: "Правду кажучи, мене це не переконує", es: "La verdad es que no me convence" },
      { ru: "С моей точки зрения, это ошибка", uk: "З моєї точки зору, це помилка", es: "Desde mi punto de vista, es un error" },
      { ru: "Полагаю, да, хотя не уверен", uk: "Гадаю, що так, хоча не певен", es: "Supongo que sí, aunque no lo tengo claro" },
    ],
  },
  {
    id: "w7_l8",
    tab: "opinar",
    title: "Gustos y preferencias",
    phrases: [
      { ru: "Мне очень нравится гулять по району", uk: "Мені дуже подобається гуляти районом", es: "A mí me encanta pasear por el barrio" },
      { ru: "Мне совсем не нравится рано вставать", uk: "Мені зовсім не подобається рано вставати", es: "No me gusta nada madrugar" },
      { ru: "Я предпочитаю встречаться во второй половине дня", uk: "Я волію зустрічатися по обіді", es: "Prefiero quedar por la tarde" },
      { ru: "Мне всё равно, как хочешь", uk: "Мені байдуже, як хочеш", es: "Me da igual, lo que tú quieras" },
      { ru: "Со мной тоже так бывает", uk: "Зі мною теж так буває", es: "A mí también me pasa" },
      { ru: "А мне нет, вовсе нет", uk: "А мені ні, аж ніяк", es: "Pues a mí no, qué va" },
    ],
  },
  {
    id: "w7_l9",
    tab: "opinar",
    title: "Argumentar un poco",
    phrases: [
      { ru: "Говорю, потому что со мной так было", uk: "Кажу, бо зі мною так було", es: "Lo digo porque me pasó a mí" },
      { ru: "С одной стороны да, с другой — нет", uk: "З одного боку так, з іншого — ні", es: "Por un lado sí, pero por otro no" },
      { ru: "В конце концов, это дело вкуса", uk: "Зрештою, це справа смаку", es: "Al final es cuestión de gustos" },
      { ru: "То, что ты говоришь, имеет смысл", uk: "Те, що ти кажеш, має сенс", es: "Tiene sentido lo que dices" },
      { ru: "Я об этом так не думал", uk: "Я про це так не думав", es: "No lo había pensado así" },
      { ru: "Тогда что ты предлагаешь?", uk: "Тоді що ти пропонуєш?", es: "Entonces, ¿qué propones?" },
    ],
  },
  { id: "w7_m3", tab: "opinar", exam: true, mini: true, title: "Mini-examen: Dar tu opinión" },

  // ═══════════════════════════════════════════════════════
  // TAB 4: CONTAR — narrate what happened (the three pasts)
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l10",
    tab: "contar",
    title: "Tu día y tu finde",
    phrases: [
      { ru: "Сегодня у меня был сумасшедший день", uk: "Сьогодні в мене був божевільний день", es: "Hoy he tenido un día de locos" },
      { ru: "Сегодня утром я встал очень поздно", uk: "Сьогодні вранці я встав дуже пізно", es: "Esta mañana me he levantado tardísimo" },
      { ru: "На выходных я ездил на пляж с друзьями", uk: "На вихідних я їздив на пляж з друзями", es: "El finde fui a la playa con unos amigos" },
      { ru: "В итоге я ничего особенного не делал", uk: "Зрештою я нічого особливого не робив", es: "Al final no hice nada especial" },
      { ru: "Вчера я встречался с коллегами", uk: "Учора я зустрічався з колегами", es: "Ayer quedé con gente del trabajo" },
      { ru: "А у тебя как прошли выходные?", uk: "А в тебе як минули вихідні?", es: "¿Y tú qué tal el fin de semana?" },
    ],
  },
  {
    id: "w7_l11",
    tab: "contar",
    title: "Poner contexto",
    phrases: [
      { ru: "Раньше я жил в другом городе", uk: "Раніше я жив в іншому місті", es: "Antes vivía en otra ciudad" },
      { ru: "Когда я приехал, я никого не знал", uk: "Коли я приїхав, я нікого не знав", es: "Cuando llegué, no conocía a nadie" },
      { ru: "Я был уставший, поэтому остался дома", uk: "Я був втомлений, тому залишився вдома", es: "Estaba cansado, así que me quedé en casa" },
      { ru: "Было поздно, и никого не было", uk: "Було пізно, і нікого не було", es: "Era tarde y no había nadie" },
      { ru: "Пока ждал, начал читать", uk: "Поки чекав, почав читати", es: "Mientras esperaba, me puse a leer" },
      { ru: "В детстве я не любил рыбу", uk: "У дитинстві я не любив рибу", es: "De pequeño no me gustaba el pescado" },
    ],
  },
  {
    id: "w7_l12",
    tab: "contar",
    title: "Conectar la historia",
    phrases: [
      { ru: "Оказывается, в итоге никто не пришёл", uk: "Виявляється, зрештою ніхто не прийшов", es: "Resulta que al final no vino nadie" },
      { ru: "Короче, я опоздал на поезд", uk: "Коротше, я спізнився на потяг", es: "Total, que perdí el tren" },
      { ru: "Сначала поели, потом прогулялись", uk: "Спочатку поїли, потім прогулялися", es: "Primero comimos y luego dimos una vuelta" },
      { ru: "И вот тогда он мне позвонил", uk: "І ось тоді він мені зателефонував", es: "Y entonces fue cuando me llamó" },
      { ru: "То есть в итоге всё вышло хорошо", uk: "Тобто зрештою все вийшло добре", es: "O sea que al final salió bien" },
      { ru: "Ну, чтобы не растягивать…", uk: "Ну, щоб не розтягувати…", es: "Bueno, para no hacerlo largo…" },
    ],
  },
  { id: "w7_m4", tab: "contar", exam: true, mini: true, title: "Mini-examen: Contar lo que pasó" },

  // ═══════════════════════════════════════════════════════
  // TAB 5: RESCATE — when the word won't come, talk around it
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l13",
    tab: "rescate",
    title: "Pedir la palabra",
    phrases: [
      { ru: "Как это сказать по-испански?", uk: "Як це сказати іспанською?", es: "¿Cómo se dice esto en español?" },
      { ru: "Как называется то, что…?", uk: "Як називається те, що…?", es: "¿Cómo se llama eso que…?" },
      { ru: "Слово вылетело из головы", uk: "Слово вилетіло з голови", es: "Se me ha ido la palabra" },
      { ru: "Помоги, какое слово?", uk: "Допоможи, яке слово?", es: "Ayúdame, ¿cuál es la palabra?" },
      { ru: "Сейчас не могу вспомнить", uk: "Зараз не можу пригадати", es: "No me sale ahora mismo" },
      { ru: "А ты как бы это сказал?", uk: "А ти як би це сказав?", es: "¿Tú cómo lo dirías?" },
    ],
  },
  {
    id: "w7_l14",
    tab: "rescate",
    title: "Explicar con otras palabras",
    phrases: [
      { ru: "Это штука, чтобы открывать бутылки", uk: "Це штука, щоб відкривати пляшки", es: "Es una cosa para abrir botellas" },
      { ru: "Это типа бара, но поменьше", uk: "Це наче бар, але менший", es: "Es como un bar, pero más pequeño" },
      { ru: "Это то, что используют для готовки", uk: "Це те, що використовують для готування", es: "Es eso que se usa para cocinar" },
      { ru: "Это что-то вроде холодного супа", uk: "Це щось на кшталт холодного супу", es: "Es una especie de sopa fría" },
      { ru: "Это противоположность дорогому", uk: "Це протилежність дорогому", es: "Es lo contrario de caro" },
      { ru: "Не знаю точного слова, но что-то такое", uk: "Не знаю точного слова, але щось таке", es: "No sé la palabra exacta, pero es algo así" },
    ],
  },
  {
    id: "w7_l15",
    tab: "rescate",
    title: "Confirmar que te siguen",
    phrases: [
      { ru: "Понимаешь, о чём я?", uk: "Розумієш, про що я?", es: "¿Me entiendes lo que digo?" },
      { ru: "Понимаешь, что я имею в виду?", uk: "Розумієш, що я маю на увазі?", es: "¿Sabes a lo que me refiero?" },
      { ru: "Я нормально говорю или путаюсь?", uk: "Я нормально кажу чи плутаюся?", es: "¿Voy bien o me estoy liando?" },
      { ru: "Поправь меня, если я говорю неправильно", uk: "Виправ мене, якщо я кажу неправильно", es: "Corrígeme si lo digo mal" },
      { ru: "Так говорят или нет?", uk: "Так кажуть чи ні?", es: "¿Se dice así o no?" },
      { ru: "Ладно, теперь понял", uk: "Гаразд, тепер зрозумів", es: "Vale, ahora lo pillo" },
    ],
  },
  { id: "w7_m5", tab: "rescate", exam: true, mini: true, title: "Mini-examen: Cuando te falta la palabra" },

  // ═══════════════════════════════════════════════════════
  // TAB 6: QUEDAR — make plans, meet people, keep it going
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l16",
    tab: "quedar",
    title: "Proponer planes",
    phrases: [
      { ru: "Не хочешь что-нибудь выпить попозже?", uk: "Не хочеш щось випити пізніше?", es: "¿Te apetece tomar algo luego?" },
      { ru: "Встретимся в субботу?", uk: "Зустрінемося в суботу?", es: "¿Quedamos el sábado?" },
      { ru: "Тебе удобно в восемь?", uk: "Тобі зручно о восьмій?", es: "¿Te va bien a las ocho?" },
      { ru: "Могли бы сходить в кино, нет?", uk: "Могли б піти в кіно, ні?", es: "Podríamos ir al cine, ¿no?" },
      { ru: "Мне это очень подходит, честно", uk: "Мені це дуже підходить, чесно", es: "Me viene genial, la verdad" },
      { ru: "Ладно, тогда так и договоримся", uk: "Гаразд, тоді так і домовимося", es: "Vale, pues quedamos así" },
    ],
  },
  {
    id: "w7_l17",
    tab: "quedar",
    title: "Romper el hielo",
    phrases: [
      { ru: "Откуда ты? Я из Украины", uk: "Звідки ти? Я з України", es: "¿De dónde eres? Yo soy de Ucrania" },
      { ru: "Сколько ты уже в Барселоне?", uk: "Скільки ти вже в Барселоні?", es: "¿Cuánto llevas en Barcelona?" },
      { ru: "Я здесь уже девять месяцев", uk: "Я тут уже дев'ять місяців", es: "Yo llevo nueve meses aquí" },
      { ru: "Чем ты занимаешься?", uk: "Чим ти займаєшся?", es: "¿A qué te dedicas?" },
      { ru: "А что тебя сюда привело?", uk: "А що тебе сюди привело?", es: "¿Y qué te trajo aquí?" },
      { ru: "Слушай, подпишемся друг на друга в инсте?", uk: "Слухай, підпишемося в інсті?", es: "Oye, ¿nos seguimos en Instagram?" },
    ],
  },
  {
    id: "w7_l18",
    tab: "quedar",
    title: "Mantener y cerrar",
    phrases: [
      { ru: "А ты как? Расскажи", uk: "А ти як? Розкажи", es: "¿Y tú qué? Cuéntame" },
      { ru: "А это почему?", uk: "А це чому?", es: "¿Y eso por qué?" },
      { ru: "Слушай, меняя тему…", uk: "Слухай, змінюючи тему…", es: "Oye, cambiando de tema…" },
      { ru: "Я отлично провёл время, серьёзно", uk: "Я чудово провів час, серйозно", es: "Me lo he pasado genial, en serio" },
      { ru: "Может, скоро повторим", uk: "Може, скоро повторимо", es: "A ver si repetimos pronto" },
      { ru: "Давай, увидимся. Береги себя!", uk: "Давай, побачимося. Бережи себе!", es: "Venga, nos vemos. ¡Cuídate!" },
    ],
  },
  { id: "w7_m6", tab: "quedar", exam: true, mini: true, title: "Mini-examen: Quedar y seguir hablando" },

  // ═══════════════════════════════════════════════════════
  // TAB 7: VOCABULARIO NUEVO — user's new real-life words
  // hay, siempre, oscuro, encendida, volumen, sus, rico,
  // está de muerte, acabo de recordar, lo mismo, arroba,
  // enfermera, enfermedad, cuáles, llegar, tener que
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_l19",
    tab: "vocab_nuevo",
    title: "Hay y describir",
    phrases: [
      { ru: "Сегодня на рынке много людей", uk: "Сьогодні на ринку багато людей", es: "Hay mucha gente en el mercado hoy" },
      { ru: "Тут всегда шум, громкость очень высокая", uk: "Тут завжди шум, гучність дуже висока", es: "Siempre hay ruido aquí, el volumen está muy alto" },
      { ru: "Свет включён на кухне", uk: "Світло увімкнене на кухні", es: "La luz está encendida en la cocina" },
      { ru: "На улице темно, никого нет", uk: "На вулиці темно, нікого немає", es: "Está oscuro en la calle, no hay nadie" },
      { ru: "Рядом есть большой магазин", uk: "Поруч є великий магазин", es: "Hay una tienda grande cerca de aquí" },
      { ru: "Она всегда ходит в парк со своими друзьями", uk: "Вона завжди ходить у парк зі своїми друзями", es: "Ella siempre va al parque con sus amigos" },
    ],
  },
  {
    id: "w7_l20",
    tab: "vocab_nuevo",
    title: "Expresiones del día",
    phrases: [
      { ru: "Еда просто божественная, очень вкусная", uk: "Їжа просто божественна, дуже смачна", es: "La comida está de muerte, muy rica" },
      { ru: "Я только что вспомнил, мне нужно на рынок", uk: "Я щойно згадав, мені треба на ринок", es: "Acabo de recordar que tengo que ir al mercado" },
      { ru: "Я всегда покупаю одно и то же на рынке", uk: "Я завжди купую одне й те саме на ринку", es: "Siempre compro lo mismo en el mercado" },
      { ru: "У нас одни и те же проблемы с арендой", uk: "У нас одні й ті самі проблеми з орендою", es: "Tenemos los mismos problemas con el alquiler" },
      { ru: "Кофе очень вкусный, я купил его вчера", uk: "Кава дуже смачна, я купив її вчора", es: "El café está muy rico, lo compré ayer" },
      { ru: "Дай мне свой ник в Инстаграме", uk: "Дай мені свій нік в Інстаграмі", es: "Dame tu arroba de Instagram" },
    ],
  },
  {
    id: "w7_l21",
    tab: "vocab_nuevo",
    title: "Llegar y quedar",
    phrases: [
      { ru: "Медсестра всегда приходит в восемь", uk: "Медсестра завжди приходить о восьмій", es: "La enfermera llega siempre a las ocho" },
      { ru: "У него болезнь, ему нужно в больницу", uk: "У нього хвороба, йому треба до лікарні", es: "Él tiene una enfermedad, tiene que ir al hospital" },
      { ru: "Какие у вас те же проблемы?", uk: "Які у вас ті самі проблеми?", es: "¿Cuáles son los mismos problemas?" },
      { ru: "Я только что пришёл, встретимся тут или в баре?", uk: "Я щойно прийшов, зустрінемося тут чи в барі?", es: "Acabo de llegar, ¿quedamos aquí o en el bar?" },
      { ru: "В аптеке есть медсестра", uk: "В аптеці є медсестра", es: "Hay una enfermera en la farmacia" },
      { ru: "Мне нужно прийти до девяти", uk: "Мені треба прийти до дев'ятої", es: "Tengo que llegar antes de las nueve" },
    ],
  },
  { id: "w7_m7", tab: "vocab_nuevo", exam: true, mini: true, title: "Mini-examen: Vocabulario nuevo" },

  // ═══════════════════════════════════════════════════════
  // FULL EXAM — everything together
  // ═══════════════════════════════════════════════════════
  {
    id: "w7_exam",
    exam: true,
    title: "Examen final — Semana 7: Romper la barrera de hablar",
  },
];

// ════════════════════════════════════════════════════════════════════
// THEORY — "Grammar expansion" for this week.
// Uses sections array with type fields — rendered by theory-viewer.js
// ════════════════════════════════════════════════════════════════════
const week7Theory = {
  id: "w7_theory",
  title: "Grammar expansion: hablar sin bloquearte",
  subtitle: "Tres pasados, conectores, opiniones y mentalidad para soltarte",
  sections: [
    {
      type: "paragraph",
      text: "Esta semana no añadimos mucha gramática nueva: te damos las herramientas para SOLTARTE. Hablar con fluidez no es hablar sin errores, es no pararte. Estas estructuras te dejan ganar tiempo, opinar y contar cosas sin quedarte en blanco."
    },
    {
      type: "heading",
      text: "1. Los tres pasados (sin agobiarte)"
    },
    {
      type: "paragraph",
      text: "Para contar cosas necesitas tres pasados. No busques el perfecto perfecto a mitad de frase: elige uno y sigue. La fluidez gana a la precisión."
    },
    {
      type: "table",
      caption: "Los tres pasados — cuándo usar cada uno",
      headers: ["Tiempo", "Ejemplo", "Cuándo usarlo"],
      rows: [
        ["Pretérito perfecto", "Hoy he comido fuera.", "Hoy / esta semana / algo reciente"],
        ["Pretérito indefinido", "Ayer fui al cine.", "Terminado, con momento concreto (ayer, el lunes, en 2022)"],
        ["Pretérito imperfecto", "De pequeño jugaba al fútbol.", "Fondo, descripción, costumbres (era, había, estaba)"],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "Truco: si tienes dudas entre indefinido e imperfecto, piensa: ¿acción concreta que terminó? → indefinido. ¿Estado de fondo, descripción, hábito? → imperfecto."
    },
    {
      type: "heading",
      text: "2. Conectores que dan fluidez"
    },
    {
      type: "paragraph",
      text: "Son las 'bisagras' del habla real. Te dan medio segundo para pensar y suenan nativo."
    },
    {
      type: "table",
      caption: "Conectores esenciales",
      headers: ["Conector", "Para qué sirve"],
      rows: [
        ["pues… / a ver… / bueno…", "Empezar a hablar sin frase lista"],
        ["es que… / o sea…", "Explicar o reformular"],
        ["así que… / entonces…", "Consecuencia: 'estaba cansado, así que me fui'"],
        ["total, que… / resulta que…", "Para arrancar o resumir una historia"],
        ["por un lado… / por otro…", "Contrastar ideas"],
      ]
    },
    {
      type: "heading",
      text: "3. Frases para opinar (+ indicativo)"
    },
    {
      type: "paragraph",
      text: "Las opiniones en afirmativo van con indicativo. Memoriza los arranques y rellena lo que quieras."
    },
    {
      type: "table",
      caption: "Arranques de opinión",
      headers: ["Estructura", "Ejemplo"],
      rows: [
        ["Creo que…", "Creo que tienes razón."],
        ["Me parece que…", "Me parece que es buena idea."],
        ["Para mí…", "Para mí, lo más importante es la familia."],
        ["La verdad es que…", "La verdad es que no me convence."],
        ["Yo diría que…", "Yo diría que depende."],
      ]
    },
    {
      type: "callout",
      style: "warning",
      text: "OJO: opinión en NEGATIVO → subjuntivo. 'No creo que SEA buena idea.' (sea, no es). De momento, basta con reconocerlo cuando lo escuches."
    },
    {
      type: "heading",
      text: "4. Pronombres para no repetir (lo / la / los / las)"
    },
    {
      type: "paragraph",
      text: "Repetir el objeto suena a principiante. Sustitúyelo con un pronombre y la frase fluye."
    },
    {
      type: "table",
      caption: "Pronombres de objeto directo",
      headers: ["Pronombre", "Sustituye a…", "Ejemplo"],
      rows: [
        ["lo", "sustantivo masculino singular", "¿Tienes el libro? — Sí, lo tengo aquí."],
        ["la", "sustantivo femenino singular", "¿Has visto la peli? — Sí, la vi ayer."],
        ["los", "sustantivo masculino plural", "Los platos — ¿Los has fregado?"],
        ["las", "sustantivo femenino plural", "Las llaves — No las encuentro."],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "Te lo digo en serio. / ¿Me lo puedes explicar? — Combinar pronombres (me/te/se + lo/la) es muy común al hablar. No te agobies, empieza con uno."
    },
    {
      type: "heading",
      text: "5. La mentalidad (la barrera de verdad)"
    },
    {
      type: "paragraph",
      text: "El bloqueo es psicológico, no de vocabulario. Cuatro reglas para romperlo:"
    },
    {
      type: "table",
      caption: "Reglas para hablar sin bloqueo",
      headers: ["Regla", "Por qué funciona"],
      rows: [
        ["Habla antes de estar listo.", "Si esperas a la frase perfecta, no sale nunca."],
        ["Gana tiempo, no te calles.", "Un 'pues… a ver…' mantiene el turno; el silencio lo corta."],
        ["El error es información, no fracaso.", "Te corrigen → aprendes. Sigue."],
        ["Apunta a 'que me entiendan'.", "Comunicar > acertar la gramática."],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "Recuerda: la fluidez no es hablar sin errores. Es hablar sin pararte. Los hablantes nativos también cometen errores — simplemente siguen hablando."
    }
  ],
};

// ════════════════════════════════════════════════════════════════════
// TEMPLATE FOR FUTURE WEEKS (Week 8+)
// ════════════════════════════════════════════════════════════════════
/*
const week8Lessons = [
  { id: "w8_l1", tab: "new_topic", title: "Title", phrases: [ { ru:"", uk:"", es:"" } ] },
  { id: "w8_m1", tab: "new_topic", exam: true, mini: true, title: "Mini-examen: ..." },
  { id: "w8_exam", exam: true, title: "Examen final — Semana 8" },
];
*/

export default {
  id: "week_7",
  title: "Week 7: Romper la barrera de hablar",
  description:
    "Conversational machinery to get off the intermediate plateau and actually speak: buying time, reacting, giving opinions, narrating in the past, talking around missing words, and socializing. Level A2–B1.",
  tabs: [
    { id: "ganar_tiempo", label: "Ganar tiempo" },
    { id: "reaccionar", label: "Reaccionar" },
    { id: "opinar", label: "Opinar" },
    { id: "contar", label: "Contar" },
    { id: "rescate", label: "Rescate" },
    { id: "quedar", label: "Quedar" },
    { id: "vocab_nuevo", label: "Vocabulario nuevo" },
  ],
  theory: week7Theory,
  lessons: week7Lessons,
};
