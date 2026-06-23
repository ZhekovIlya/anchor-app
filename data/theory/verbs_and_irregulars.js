// ========================
// THEORY: VERBS & IRREGULARS — PART 1
// ========================
// Regular verbs, three families, the Yo shortcut, and the Three Rebels.
// Emphasizes that verbs are the ENGINE of every Spanish sentence.

export default {
  id: "theory_verbs",
  type: "theory",
  title: "Глаголы: Двигатель Предложения",
  icon: "manufacturing",
  description: "Глагол — сердце любого предложения. Правильные -AR/-ER/-IR глаголы и три главных нарушителя: SER, ESTAR, IR.",
  sections: [
    {
      type: "heading",
      text: "🚀 Глагол — это двигатель предложения"
    },
    {
      type: "paragraph",
      text: "В испанском (и в любом другом языке) глагол — это главная часть предложения. Пойми глагол — поймёшь предложение. Всё остальное: подлежащее, дополнение, прилагательные — лишь детали вокруг него."
    },
    {
      type: "callout",
      style: "important",
      text: "Ключевое правило: каждое испанское предложение строится вокруг глагола. Научись распознавать и изменять глаголы — и ты сможешь понять и создать любое предложение. Освой глагол → освой предложение."
    },
    {
      type: "heading",
      text: "🔧 Испанский глагол = основа + окончание"
    },
    {
      type: "paragraph",
      text: "Каждый испанский глагол в инфинитиве (начальной форме) — это основа с отделяемым окончанием. Окончание говорит, к какому семейству принадлежит глагол. Убери окончание, прикрепи новое — и ты проспрягал глагол."
    },
    {
      type: "callout",
      style: "tip",
      text: "Думай о глаголе как о LEGO: основа — это кирпичик, окончание — коннектор. Меняй коннектор, чтобы показать, кто совершает действие."
    },
    {
      type: "table",
      caption: "Три семейства глаголов",
      headers: ["Семейство", "Окончание", "Пример", "Основа"],
      rows: [
        ["-AR", "-ar", "hablar (говорить)", "habl-"],
        ["-ER", "-er", "comer (есть)", "com-"],
        ["-IR", "-ir", "vivir (жить)", "viv-"],
      ]
    },
    {
      type: "paragraph",
      text: "-AR глаголы — самые распространённые (~70% всех испанских глаголов). Если ты учишь первое семейство — ты уже охватываешь большинство глаголов испанского языка."
    },
    {
      type: "heading",
      text: "🎯 Ярлык «Yo»: всегда оканчивается на -O"
    },
    {
      type: "paragraph",
      text: "Для правильных глаголов форма «я» (Yo) — самая простая: убери окончание, добавь -O. Это работает для ВСЕХ трёх семейств. Это самый полезный паттерн в испанском."
    },
    {
      type: "table",
      caption: "Спряжение Yo — универсальное правило -O",
      headers: ["Инфинитив", "Убрать окончание", "Добавить -O", "Результат"],
      rows: [
        ["hablar", "habl-", "+ o", "hablo"],
        ["comer", "com-", "+ o", "como"],
        ["vivir", "viv-", "+ o", "vivo"],
        ["trabajar", "trabaj-", "+ o", "trabajo"],
        ["escribir", "escrib-", "+ o", "escribo"],
      ]
    },
    {
      type: "heading",
      text: "📋 Полная таблица правильного спряжения"
    },
    {
      type: "table",
      caption: "Настоящее время — все лица",
      headers: ["Лицо", "-AR (hablar)", "-ER (comer)", "-IR (vivir)"],
      rows: [
        ["Yo (я)", "hablo", "como", "vivo"],
        ["Tú (ты)", "hablas", "comes", "vives"],
        ["Él/Ella/Usted (он/она/Вы)", "habla", "come", "vive"],
        ["Nosotros (мы)", "hablamos", "comemos", "vivimos"],
        ["Vosotros (вы, Испания)", "habláis", "coméis", "vivís"],
        ["Ellos/Ustedes (они/Вы мн.)", "hablan", "comen", "viven"],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "Заметь: -ER и -IR глаголы имеют ОДИНАКОВЫЕ окончания для Tú, Él, Nosotros, Vosotros, Ellos. Два семейства — один паттерн. Это сильно упрощает запоминание!"
    },
    {
      type: "heading",
      text: "🏴‍☠️ Три бунтаря: SER, ESTAR, IR"
    },
    {
      type: "paragraph",
      text: "Эти три глагола отказываются следовать правилам. Они ОБЯЗАТЕЛЬНЫ — ты будешь использовать их почти в каждом предложении. Не пытайся вывести их формы — запомни как фиксированные паттерны."
    },
    {
      type: "table",
      caption: "SER — быть (постоянные характеристики)",
      headers: ["Лицо", "SER", "Пример"],
      rows: [
        ["Yo", "soy", "Yo soy estudiante. — Я студент."],
        ["Tú", "eres", "Tú eres inteligente. — Ты умный."],
        ["Él/Ella/Usted", "es", "Ella es médica. — Она врач."],
        ["Nosotros", "somos", "Somos amigos. — Мы друзья."],
        ["Vosotros", "sois", "Vosotros sois de Ucrania. — Вы из Украины."],
        ["Ellos/Ustedes", "son", "Son muy simpáticos. — Они очень приятные."],
      ]
    },
    {
      type: "table",
      caption: "ESTAR — быть (состояния, местоположение)",
      headers: ["Лицо", "ESTAR", "Пример"],
      rows: [
        ["Yo", "estoy", "Estoy cansado. — Я устал."],
        ["Tú", "estás", "¿Estás bien? — Ты в порядке?"],
        ["Él/Ella/Usted", "está", "Está en casa. — Он/она дома."],
        ["Nosotros", "estamos", "Estamos en Barcelona. — Мы в Барселоне."],
        ["Vosotros", "estáis", "¿Estáis listos? — Вы готовы?"],
        ["Ellos/Ustedes", "están", "Están muy contentos. — Они очень довольны."],
      ]
    },
    {
      type: "callout",
      style: "warning",
      text: "SER vs ESTAR — самая частая ошибка! SER = кто/что ты ЕСТЬ (личность, профессия, происхождение). ESTAR = как/где ты НАХОДИШЬСЯ (настроение, местоположение, временное состояние). 'Soy aburrido' = Я скучный человек. 'Estoy aburrido' = Мне сейчас скучно."
    },
    {
      type: "table",
      caption: "IR — идти / ехать",
      headers: ["Лицо", "IR", "Пример"],
      rows: [
        ["Yo", "voy", "Voy al trabajo. — Я иду на работу."],
        ["Tú", "vas", "¿Vas al gimnasio? — Ты идёшь в спортзал?"],
        ["Él/Ella/Usted", "va", "Va al médico. — Он/она идёт к врачу."],
        ["Nosotros", "vamos", "¡Vamos! — Пошли!"],
        ["Vosotros", "vais", "¿Vais al cine? — Вы идёте в кино?"],
        ["Ellos/Ustedes", "van", "Van de vacaciones. — Они едут в отпуск."],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "IR + a + инфинитив = ближайшее будущее! 'Voy a comer' = Я собираюсь поесть. 'Vamos a hablar' = Мы собираемся поговорить. Это один из самых частых способов говорить о будущем."
    },
    {
      type: "heading",
      text: "🎓 Высокочастотные неправильные глаголы (Часть 1)"
    },
    {
      type: "paragraph",
      text: "Помимо трёх бунтарей, эти глаголы имеют неправильную форму «Yo», но следуют нормальным паттернам для остальных лиц:"
    },
    {
      type: "table",
      caption: "TENER (иметь) и HACER (делать/делать)",
      headers: ["Лицо", "TENER", "HACER"],
      rows: [
        ["Yo", "tengo", "hago"],
        ["Tú", "tienes", "haces"],
        ["Él/Ella", "tiene", "hace"],
        ["Nosotros", "tenemos", "hacemos"],
        ["Vosotros", "tenéis", "hacéis"],
        ["Ellos/Ustedes", "tienen", "hacen"],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "Паттерн -GO: многие неправильные глаголы в форме «Yo» оканчиваются на -GO (tengo, hago, digo, pongo, salgo, vengo). Как только ты заметишь это, они становятся предсказуемыми! Подробнее — в Части 2."
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/hfWcAgihqVw",
      title: "Spanish Verbs Explained — Regular Conjugation"
    }
  ]
};
