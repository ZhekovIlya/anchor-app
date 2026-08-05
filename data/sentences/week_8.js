// ========================
// WEEK 8 — "Mi Día y Mi Ciudad"
// ========================
// Level: Compact lesson.
// Focus: Daily routine, directions, and time expressions combined with conversational fillers.
// ========================

const week8Lessons = [
  // ═══════════════════════════════════════════════════════
  // TAB 1: RUTINA
  // ═══════════════════════════════════════════════════════
  {
    id: "w8_l1",
    tab: "rutina",
    title: "Mi mañana",
    phrases: [
      { ru: "Ну… я встаю в девять.", uk: "Ну… я встаю о дев'ятій.", es: "Pues... me levanto a las nueve." },
      { ru: "Я бы сказал, что часто принимаю душ.", uk: "Я б сказав, що часто приймаю душ.", es: "Diría que me ducho con frecuencia." },
      { ru: "По правде говоря, я почти никогда не бреюсь.", uk: "Правду кажучи, я майже ніколи не голюся.", es: "La verdad, casi nunca me afeito." },
      { ru: "Дело в том, что я иногда причесываюсь.", uk: "Річ у тім, що я інколи розчісуюсь.", es: "Es que me peino a veces." },
      { ru: "Не знаю, я всегда одеваюсь перед этим.", uk: "Не знаю, я завжди одягаюся перед цим.", es: "No sé, siempre me visto antes." },
      { ru: "Ну, зависит, в другие разы я перекусываю.", uk: "Ну, залежить, інші рази я перекушую.", es: "Bueno, depende, otras veces meriendo." }
    ],
  },
  {
    id: "w8_l2",
    tab: "rutina",
    title: "De noche",
    phrases: [
      { ru: "Серьезно? Я никогда не ужинаю в десять.", uk: "Серйозно? Я ніколи не вечеряю о десятій.", es: "¿En serio? Nunca ceno a las diez." },
      { ru: "Конечно, я всегда занимаюсь спортом после.", uk: "Звісно, я завжди займаюсь спортом після.", es: "Claro, siempre hago deporte después." },
      { ru: "Вот это да! Я не выхожу из дома.", uk: "Оце так! Я не виходжу з дому.", es: "¡Qué fuerte! No salgo de casa." },
      { ru: "Да, я возвращаюсь около восьми.", uk: "Так, я повертаюся близько восьмої.", es: "Ya, vuelvo sobre las ocho." },
      { ru: "Слава богу, иногда я забываю подметать.", uk: "Слава богу, інколи я забуваю підмітати.", es: "Menos mal, a veces olvido barrer." },
      { ru: "Как здорово! Мы поднимаемся в квартиру вместе.", uk: "Як добре! Ми піднімаємося у квартиру разом.", es: "¡Qué bien! Subimos al piso juntos." }
    ],
  },
  {
    id: "w8_l3_extra",
    tab: "rutina",
    title: "Actividades",
    phrases: [
      { ru: "Я обычно бегаю среди деревьев.", uk: "Я зазвичай бігаю серед дерев.", es: "Suelo correr entre los árboles." },
      { ru: "Я делаю паузу, чтобы посмотреть ответы.", uk: "Я роблю паузу, щоб подивитися відповіді.", es: "Hago una pausa para ver las respuestas." },
      { ru: "По пятницам мы гуляем по прибытии.", uk: "По п'ятницах ми гуляємо після прибуття.", es: "Los viernes paseamos al llegar." },
      { ru: "Если честно, не знаю, хорошая ли погода.", uk: "Якщо чесно, не знаю, чи хороша погода.", es: "La verdad, no sé si hace buen tiempo." },
      { ru: "Дело в том, что проблема в пятницах.", uk: "Річ у тім, що проблема в п'ятницях.", es: "Es que el problema son los viernes." },
      { ru: "Серьезно? Я никогда не забываю ответы.", uk: "Серйозно? Я ніколи не забуваю відповіді.", es: "¿En serio? Nunca olvido las respuestas." }
    ],
  },
  { id: "w8_m1", tab: "rutina", exam: true, mini: true, title: "Mini-examen: Rutina" },

  // ═══════════════════════════════════════════════════════
  // TAB 2: DIRECCIONES
  // ═══════════════════════════════════════════════════════
  {
    id: "w8_l3",
    tab: "direcciones",
    title: "En la calle",
    phrases: [
      { ru: "Я думаю, что я прохожу мимо банка.", uk: "Я думаю, що я проходжу повз банк.", es: "Yo creo que paso el banco." },
      { ru: "Я не уверен, но это на углу.", uk: "Я не впевнений, але це на розі.", es: "No estoy seguro, pero está en la esquina." },
      { ru: "Посмотрим, это справа.", uk: "Подивимось, це праворуч.", es: "A ver, está a la derecha." },
      { ru: "Дело в том, что это рядом с домом.", uk: "Річ у тім, що це поруч з будинком.", es: "Es que está al lado de la casa." },
      { ru: "Ну не знаю, это напротив.", uk: "Ну не знаю, це навпроти.", es: "Pues no sé, está enfrente." },
      { ru: "То есть, между банком и мостом.", uk: "Тобто, між банком і мостом.", es: "O sea, entre el banco y el puente." }
    ],
  },
  {
    id: "w8_l4",
    tab: "direcciones",
    title: "Más direcciones",
    phrases: [
      { ru: "Извини, можешь повторить, как добраться?", uk: "Вибач, можеш повторити, як дістатися?", es: "Perdona, ¿puedes repetir cómo llegar?" },
      { ru: "Дай секунду, это слева.", uk: "Дай секунду, це зліва.", es: "Dame un segundo, está a la izquierda." },
      { ru: "Я не улавливаю, рядом с чем?", uk: "Я не вловлюю, поруч із чим?", es: "No te sigo, ¿junto a qué?" },
      { ru: "Боже мой, как далеко квартира.", uk: "Боже мій, як далеко квартира.", es: "Madre mía, qué lejos está el piso." },
      { ru: "Какая досада, я иногда забываю улицу.", uk: "Яка прикрість, я інколи забуваю вулицю.", es: "Qué rabia, olvido la calle a veces." },
      { ru: "Мне жаль, я не знаю, как добраться до банка.", uk: "Мені шкода, я не знаю, як дістатися до банку.", es: "Lo siento, no sé llegar al banco." }
    ],
  },
  { id: "w8_m2", tab: "direcciones", exam: true, mini: true, title: "Mini-examen: Direcciones" },

  // ═══════════════════════════════════════════════════════
  // TAB 3: EXPRESIONES
  // ═══════════════════════════════════════════════════════
  {
    id: "w8_l5",
    tab: "expresiones",
    title: "Opiniones y estados",
    phrases: [
      { ru: "Ну, проблема в том, что я хочу спать.", uk: "Ну, проблема в тому, що я хочу спати.", es: "Bueno, el problema es que tengo sueño." },
      { ru: "Тогда я думаю, что согласен.", uk: "Тоді я думаю, що згоден.", es: "Entonces, yo creo que estoy de acuerdo." },
      { ru: "Если честно, не знаю, все ли мне равно.", uk: "Якщо чесно, не знаю, чи мені байдуже.", es: "La verdad, no sé si me da igual." },
      { ru: "Ну, никто не делает домашнюю работу со мной.", uk: "Ну, ніхто не робить домашню роботу зі мною.", es: "Pues nadie hace los deberes conmigo." },
      { ru: "Дело в том, что я рада своему отдыху.", uk: "Річ у тім, що я рада своєму відпочинку.", es: "Es que estoy contenta con mi descanso." },
      { ru: "Серьезно, она умная и очень смешная.", uk: "Серйозно, вона розумна і дуже смішна.", es: "En serio, ella es lista y muy graciosa." }
    ],
  },
  {
    id: "w8_l6",
    tab: "expresiones",
    title: "Planes juntos",
    phrases: [
      { ru: "Ничего себе, ты не готова выходить?", uk: "Оце так, ти не готова виходити?", es: "¡Qué fuerte! ¿No estás lista para salir?" },
      { ru: "Конечно, мы идем вместе на уроки английского.", uk: "Звісно, ми йдемо разом на уроки англійської.", es: "Claro, vamos juntos a las clases de inglés." },
      { ru: "Зависит от обстоятельств, честно говоря, я хочу быть с тобой.", uk: "Залежить від обставин, чесно кажучи, я хочу бути з тобою.", es: "Depende, la verdad quiero estar contigo." },
      { ru: "Как жаль, ты никогда не ужинаешь со мной ровно в это время.", uk: "Як шкода, ти ніколи не вечеряєш зі мною рівно в цей час.", es: "Qué pena, nunca cenas conmigo en punto." },
      { ru: "Слава богу, что у тебя всегда хорошая погода.", uk: "Слава богу, що в тебе завжди хороша погода.", es: "Menos mal que siempre tienes buen tiempo." },
      { ru: "Я очень рад видеть тебя в половину.", uk: "Я дуже радий бачити тебе о половині.", es: "Me alegro un montón de verte a las y media." }
    ],
  },
  { id: "w8_m3", tab: "expresiones", exam: true, mini: true, title: "Mini-examen: Expresiones" },

  // ═══════════════════════════════════════════════════════
  // EXAMEN FINAL
  // ═══════════════════════════════════════════════════════
  { id: "w8_exam", exam: true, title: "Examen Final: Semana 8" }
];

export default {
  id: "week8",
  type: "sentences",
  title: "Week 8: Mi Día y Mi Ciudad",
  description: "Compact week focusing on daily routine, directions, and time expressions.",
  theory: {
    title: "Grammar expansion",
    subtitle: "Daily routines and city navigation",
    sections: [
      {
        type: "paragraph",
        content: "This week is compact! We are focusing on combining conversational fillers from last week with your new vocabulary for daily routines, time, and navigating the city."
      }
    ]
  },
  lessons: week8Lessons
};
