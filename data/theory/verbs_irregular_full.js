// ========================
// THEORY: IRREGULAR VERBS — FULL CONJUGATION (PART 2)
// ========================
// Standalone theory article for the Theory tab.
// Covers all major irregular verbs with FULL conjugation tables.
// Target audience: Russian/Ukrainian speakers learning Spanish.

export default {
  id: "theory_irregular_verbs",
  type: "theory",
  title: "Неправильные глаголы — полные таблицы",
  icon: "psychology",
  description: "QUERER, PODER, DECIR, SABER, CONOCER, PONER, SALIR, VENIR, EMPEZAR — полное спряжение всех ключевых неправильных глаголов.",
  sections: [
    {
      type: "heading",
      text: "⚡ Почему неправильные глаголы?"
    },
    {
      type: "paragraph",
      text: "Неправильные глаголы — это самые ЧАСТЫЕ глаголы испанского языка. Именно поэтому они изменились исторически: их так много использовали, что они «стёрлись» и приобрели особые формы. Хорошая новость: их всего около 30 штук. Выучи их — и ты покрываешь 80% разговорной речи."
    },
    {
      type: "callout",
      style: "important",
      text: "Стратегия: не пытайся выучить все формы за раз. Сначала — форму «Yo» (она самая уникальная). Остальные формы у большинства из них почти правильные."
    },
    {
      type: "heading",
      text: "❤️ QUERER — хотеть (e→ie)"
    },
    {
      type: "paragraph",
      text: "QUERER — глагол с чередованием гласных: e→ie (кроме Nosotros и Vosotros). Один из самых нужных глаголов в языке."
    },
    {
      type: "table",
      caption: "QUERER (хотеть / любить)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "quiero", "Quiero aprender español. — Я хочу учить испанский."],
        ["Tú", "quieres", "¿Qué quieres comer? — Что ты хочешь есть?"],
        ["Él/Ella/Usted", "quiere", "Ella quiere un café. — Она хочет кофе."],
        ["Nosotros", "queremos", "Queremos viajar. — Мы хотим путешествовать."],
        ["Vosotros", "queréis", "¿Queréis venir? — Вы хотите прийти?"],
        ["Ellos/Ustedes", "quieren", "Quieren hablar contigo. — Они хотят поговорить с тобой."],
      ]
    },
    {
      type: "heading",
      text: "💪 PODER — мочь / уметь (o→ue)"
    },
    {
      type: "paragraph",
      text: "PODER — глагол с чередованием o→ue. Используется, чтобы выразить возможность или разрешение. Очень частый в разговоре."
    },
    {
      type: "table",
      caption: "PODER (мочь / уметь)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "puedo", "No puedo ir hoy. — Я не могу пойти сегодня."],
        ["Tú", "puedes", "¿Puedes ayudarme? — Можешь мне помочь?"],
        ["Él/Ella/Usted", "puede", "Puede ser. — Может быть."],
        ["Nosotros", "podemos", "Podemos hacerlo. — Мы можем это сделать."],
        ["Vosotros", "podéis", "¿Podéis venir mañana? — Вы можете прийти завтра?"],
        ["Ellos/Ustedes", "pueden", "No pueden esperar. — Они не могут ждать."],
      ]
    },
    {
      type: "heading",
      text: "🗣️ DECIR — говорить / сказать (e→i + YO неправильный)"
    },
    {
      type: "table",
      caption: "DECIR (говорить / сказать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "digo", "¿Qué digo ahora? — Что мне сейчас говорить?"],
        ["Tú", "dices", "¿Qué dices? — Что ты говоришь?"],
        ["Él/Ella/Usted", "dice", "Dice que sí. — Он говорит, что да."],
        ["Nosotros", "decimos", "Lo decimos en serio. — Мы говорим серьёзно."],
        ["Vosotros", "decís", "¿Qué decís? — Что вы говорите?"],
        ["Ellos/Ustedes", "dicen", "Dicen que es verdad. — Говорят, что это правда."],
      ]
    },
    {
      type: "heading",
      text: "🧠 SABER — знать (факты) vs CONOCER — знать (людей/места)"
    },
    {
      type: "paragraph",
      text: "Два глагола «знать» — одна из частых путаниц. SABER = знать информацию, факты, уметь что-то делать. CONOCER = быть знакомым с человеком или местом."
    },
    {
      type: "table",
      caption: "SABER (знать факты / уметь)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "sé", "No lo sé. — Я не знаю."],
        ["Tú", "sabes", "¿Sabes hablar ruso? — Ты умеешь говорить по-русски?"],
        ["Él/Ella/Usted", "sabe", "Ella sabe cocinar muy bien. — Она умеет хорошо готовить."],
        ["Nosotros", "sabemos", "Sabemos dónde está. — Мы знаем, где это."],
        ["Vosotros", "sabéis", "¿Lo sabéis? — Вы это знаете?"],
        ["Ellos/Ustedes", "saben", "No saben la respuesta. — Они не знают ответа."],
      ]
    },
    {
      type: "table",
      caption: "CONOCER (знать людей / быть знакомым с местами)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "conozco", "Conozco a María. — Я знаком с Марией."],
        ["Tú", "conoces", "¿Conoces Barcelona? — Ты знаешь Барселону?"],
        ["Él/Ella/Usted", "conoce", "No conoce a nadie aquí. — Он никого здесь не знает."],
        ["Nosotros", "conocemos", "Conocemos el barrio bien. — Мы хорошо знаем район."],
        ["Vosotros", "conocéis", "¿Conocéis a mis amigos? — Вы знакомы с моими друзьями?"],
        ["Ellos/Ustedes", "conocen", "Se conocen desde hace años. — Они знакомы уже много лет."],
      ]
    },
    {
      type: "callout",
      style: "warning",
      text: "SABER vs CONOCER: 'Sé francés' = Я знаю (умею) французский. 'Conozco Francia' = Я бывал во Франции / Я знаком с Францией. 'Sé dónde vive' = Я знаю, где он живёт. 'Conozco a su mujer' = Я знаком с его женой."
    },
    {
      type: "heading",
      text: "📦 PONER — класть / ставить (YO: pongo)"
    },
    {
      type: "table",
      caption: "PONER (класть / ставить / включать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "pongo", "Pongo la mesa. — Я накрываю на стол."],
        ["Tú", "pones", "¿Dónde pones las llaves? — Куда ты кладёшь ключи?"],
        ["Él/Ella/Usted", "pone", "Pone la tele siempre. — Он всегда включает телевизор."],
        ["Nosotros", "ponemos", "Ponemos música. — Мы включаем музыку."],
        ["Vosotros", "ponéis", "¿Dónde ponéis los abrigos? — Куда вы кладёте пальто?"],
        ["Ellos/Ustedes", "ponen", "Ponen muchas condiciones. — Они ставят много условий."],
      ]
    },
    {
      type: "heading",
      text: "🚪 SALIR — выходить / выступать (YO: salgo)"
    },
    {
      type: "table",
      caption: "SALIR (выходить / уходить / встречаться)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "salgo", "Salgo a las ocho. — Я выхожу в восемь."],
        ["Tú", "sales", "¿A qué hora sales? — В котором часу ты выходишь?"],
        ["Él/Ella/Usted", "sale", "Sale tarde del trabajo. — Он поздно уходит с работы."],
        ["Nosotros", "salimos", "Salimos a tomar algo. — Мы идём выпить чего-нибудь."],
        ["Vosotros", "salís", "¿Salís esta noche? — Вы выходите сегодня вечером?"],
        ["Ellos/Ustedes", "salen", "Salen mucho los fines de semana. — Они часто выходят на выходных."],
      ]
    },
    {
      type: "heading",
      text: "🏃 VENIR — приходить / приезжать (YO: vengo)"
    },
    {
      type: "table",
      caption: "VENIR (приходить / приезжать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "vengo", "Vengo ahora mismo. — Я иду прямо сейчас."],
        ["Tú", "vienes", "¿Cuándo vienes? — Когда ты придёшь?"],
        ["Él/Ella/Usted", "viene", "Viene de Ucrania. — Он из Украины."],
        ["Nosotros", "venimos", "Venimos todos los días. — Мы приходим каждый день."],
        ["Vosotros", "venís", "¿Venís a la fiesta? — Вы придёте на вечеринку?"],
        ["Ellos/Ustedes", "vienen", "Vienen a las tres. — Они придут в три."],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "IR vs VENIR: IR = идти ОТСЮДА (туда). VENIR = идти ТУДА (сюда, к слушателю). 'Voy al banco' = Я иду в банк. 'Vengo del banco' = Я иду [сюда] из банка. Используй VENIR когда движение — К слушателю."
    },
    {
      type: "heading",
      text: "🌱 EMPEZAR — начинать (e→ie)"
    },
    {
      type: "table",
      caption: "EMPEZAR (начинать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "empiezo", "Empiezo mañana. — Я начинаю завтра."],
        ["Tú", "empiezas", "¿Cuándo empiezas? — Когда ты начинаешь?"],
        ["Él/Ella/Usted", "empieza", "La clase empieza a las diez. — Урок начинается в десять."],
        ["Nosotros", "empezamos", "Empezamos a estudiar. — Мы начинаем учить."],
        ["Vosotros", "empezáis", "¿Cuándo empezáis? — Когда вы начинаете?"],
        ["Ellos/Ustedes", "empiezan", "Empiezan tarde. — Они начинают поздно."],
      ]
    },
    {
      type: "heading",
      text: "💤 DORMIR — спать (o→ue)"
    },
    {
      type: "table",
      caption: "DORMIR (спать)",
      headers: ["Лицо", "Форма", "Пример"],
      rows: [
        ["Yo", "duermo", "Duermo ocho horas. — Я сплю восемь часов."],
        ["Tú", "duermes", "¿Cuánto duermes? — Сколько ты спишь?"],
        ["Él/Ella/Usted", "duerme", "El bebé duerme bien. — Малыш хорошо спит."],
        ["Nosotros", "dormimos", "Dormimos tarde los fines de semana. — Мы спим допоздна на выходных."],
        ["Vosotros", "dormís", "¿Dormís bien? — Вы хорошо спите?"],
        ["Ellos/Ustedes", "duermen", "Los niños duermen a las nueve. — Дети спят в девять."],
      ]
    },
    {
      type: "heading",
      text: "📊 Шпаргалка: типы неправильных глаголов"
    },
    {
      type: "table",
      caption: "Как запомнить паттерны",
      headers: ["Тип изменения", "Глаголы", "Пример (Yo → Tú)"],
      rows: [
        ["-GO в форме Yo", "tener, hacer, decir, poner, salir, venir", "tengo → tienes, salgo → sales"],
        ["e → ie (чередование)", "querer, empezar, entender, cerrar", "quiero → quieres, empieza"],
        ["o → ue (чередование)", "poder, dormir, volver, costar", "puedo → puedes, duerme"],
        ["Особые формы (Yo)", "saber (sé), conocer (conozco)", "sé → sabes, conozco → conoces"],
        ["Полностью неправильные", "ser, estar, ir", "soy/eres, estoy/estás, voy/vas"],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "Помни: Nosotros и Vosotros почти НИКОГДА не меняют гласную при чередовании. Если видишь e→ie или o→ue, это только в Yo/Tú/Él/Ellos. Nosotros и Vosotros — правильные! (queremos, podéis — без изменений)"
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/BFmmvdANZl0",
      title: "Spanish Irregular Verbs — Complete Guide"
    }
  ]
};
