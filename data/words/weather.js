// ========================
// WORDS: WEATHER
// ========================
export default {
  id: "words_weather",
  type: "words",
  title: "Weather",
  icon: "wb_sunny",
  description: "Describe the weather in Spanish",
  theory: {
    title: "Weather Expressions",
    subtitle: "Hace, Está, Hay — three ways to talk about weather",
    sections: [
      { type: "heading", text: "☀️ Three Weather Formulas" },
      { type: "paragraph", text: "Spanish uses three different verbs to describe weather, depending on the phenomenon:" },
      { type: "table", caption: "Weather verb patterns", headers: ["Formula","Used for","Example"], rows: [["Hace + noun","Temperature & feel","Hace calor (It's hot)"],["Está + adj","Sky & state","Está nublado (It's cloudy)"],["Hay + noun","Visible phenomena","Hay niebla (There's fog)"]] },
      { type: "callout", style: "tip", text: "Llueve (it rains) and nieva (it snows) are standalone — they don't need hace/está/hay." },
    ]
  },
  lessons: [
    { id: "ww_l1", title: "Weather Basics", words: [
      { ru: "солнце", uk: "сонце", es: "sol" },
      { ru: "луна", uk: "місяць", es: "luna" },
      { ru: "дождь", uk: "дощ", es: "lluvia" },
      { ru: "снег", uk: "сніг", es: "nieve" },
      { ru: "ветер", uk: "вітер", es: "viento" },
      { ru: "облако", uk: "хмара", es: "nube" },
      { ru: "туман", uk: "туман", es: "niebla" },
      { ru: "гроза", uk: "гроза", es: "tormenta" },
      { ru: "жарко", uk: "спекотно", es: "calor" },
      { ru: "холодно", uk: "холодно", es: "frío" },
      { ru: "тепло", uk: "тепло", es: "templado" },
      { ru: "звезда", uk: "зірка", es: "estrella" },
    ]},
    { id: "ww_l2", title: "Weather States", words: [
      { ru: "облачно", uk: "хмарно", es: "nublado" },
      { ru: "солнечно", uk: "сонячно", es: "soleado" },
      { ru: "дождливо", uk: "дощово", es: "lluvioso" },
      { ru: "ветрено", uk: "вітряно", es: "ventoso" },
      { ru: "влажно", uk: "волого", es: "húmedo" },
      { ru: "сухо", uk: "сухо", es: "seco" },
      { ru: "ясно", uk: "ясно", es: "despejado" },
      { ru: "радуга", uk: "веселка", es: "arcoíris" },
      { ru: "молния", uk: "блискавка", es: "relámpago" },
      { ru: "гром", uk: "грім", es: "trueno" },
      { ru: "лёд", uk: "лід", es: "hielo" },
      { ru: "небо", uk: "небо", es: "cielo" },
    ]},
    { id: "ww_exam", title: "🏆 Weather Exam", exam: true },
  ],
};
