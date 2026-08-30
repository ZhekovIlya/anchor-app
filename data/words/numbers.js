// ========================
// WORDS: NUMBERS 1–1000
// ========================
export default {
  id: "words_numbers",
  type: "words",
  title: "Numbers 1–1000",
  icon: "tag",
  description: "Count in Spanish — from uno to mil",
  theory: {
    title: "El Sistema Numérico (1–1000)",
    subtitle: "Reglas de formación: 16–29 en una sola palabra, 30+ con 'y', regla de 'un/una' y centenas",
    sections: [
      {
        type: "heading",
        text: "1. La base: del 0 al 15 (Formas únicas memorizadas)"
      },
      {
        type: "paragraph",
        text: "Los primeros quince números no siguen una regla combinatoria regular; cada uno tiene una forma propia e imprescindible:"
      },
      {
        type: "table",
        caption: "Números fundamentales del 0 al 15",
        headers: ["Nº", "Español", "Nº", "Español", "Nº", "Español"],
        rows: [
          ["0", "cero", "6", "seis", "11", "once"],
          ["1", "uno", "7", "siete", "12", "doce"],
          ["2", "dos", "8", "ocho", "13", "trece"],
          ["3", "tres", "9", "nueve", "14", "catorce"],
          ["4", "cuatro", "10", "diez", "15", "quince"],
          ["5", "cinco", "—", "—", "—", "—"]
        ]
      },
      {
        type: "heading",
        text: "2. Las tres reglas de oro para números del 16 al 99"
      },
      {
        type: "table",
        caption: "Reglas de fusión y separación",
        headers: ["Rango", "Fórmula", "Ejemplos en una o dos palabras"],
        rows: [
          ["16 a 19", "dieci + unidad (1 palabra)", "dieciséis, diecisiete, dieciocho, diecinueve"],
          ["20 a 29", "veinti + unidad (1 palabra)", "veintiuno, veintidós, veinticinco, veintiocho"],
          ["30 a 99", "decena + 'y' + unidad (3 palabras)", "treinta y uno, cuarenta y dos, noventa y nueve"]
        ]
      },
      {
        type: "heading",
        text: "3. ⚠️ La regla del '1' (un / una / veintiún / veintiuna)"
      },
      {
        type: "paragraph",
        text: "El número `uno` y todos sus compuestos (21, 31, 41...) cambian según el género del sustantivo al que acompañan:"
      },
      {
        type: "table",
        caption: "Concordancia de 'uno' con sustantivos",
        headers: ["Género", "Cambio", "Ejemplo práctico", "Traducción (UK)"],
        rows: [
          ["Masculino", "uno → un / veintiún", "Tengo un pastel / Tengo veintiún años.", "Я маю 21 рік."],
          ["Femenino", "uno → una / veintiuna", "Tengo una vela / Tiene veintiuna flores.", "Вона має 21 квітку."],
          ["Centenas masc.", "-cientos", "doscientos euros / quinientos pisos", "200 євро / 500 квартир"],
          ["Centenas fem.", "-cientas", "doscientas personas / trescientas casas", "200 людей / 300 будинків"]
        ]
      },
      {
        type: "heading",
        text: "4. Las centenas y números mayores"
      },
      {
        type: "table",
        caption: "Centenas y millares (¡ojo con las 3 irregulares!)",
        headers: ["Número", "Español", "Nota gramatical"],
        rows: [
          ["100", "cien", "Solo ante sustantivo o aislado"],
          ["101+", "ciento uno...", "Se usa 'ciento' para compuestos"],
          ["200 / 300 / 400", "doscientos / trescientos / cuatrocientos", "Regulares"],
          ["500", "quinientos", "⚠️ Irregular (no *cincocientos*)"],
          ["600", "seiscientos", "Regular"],
          ["700", "setecientos", "⚠️ Irregular (no *sietecientos*)"],
          ["800", "ochocientos", "Regular"],
          ["900", "novecientos", "⚠️ Irregular (no *nuevecientos*)"],
          ["1000", "mil", "Invariable (dos mil, diez mil)"]
        ]
      },
      {
        type: "heading",
        text: "5. Uso de números para direcciones y descripciones"
      },
      {
        type: "table",
        caption: "Estructuras prácticas en la vida real",
        headers: ["Contexto", "Estructura", "Ejemplo en contexto"],
        rows: [
          ["Número de la calle", "calle + Nombre, número + Nº", "Vivo en la calle Sol, número 21."],
          ["Número de la casa", "Mi casa es el número...", "Mi casa es el número 32."],
          ["Apartamento / piso", "piso / apartamento + Nº", "Vivo en el apartamento 43."],
          ["Contar con HAY", "Hay + Nº + sustantivo", "En mi clase hay veintidós estudiantes."]
        ]
      }
    ]
  },
  lessons: [
    { id: "wn_l1", title: "Unique: 1–12", words: [
      { ru: "один", uk: "один", es: "uno" },
      { ru: "два", uk: "два", es: "dos" },
      { ru: "три", uk: "три", es: "tres" },
      { ru: "четыре", uk: "чотири", es: "cuatro" },
      { ru: "пять", uk: "п'ять", es: "cinco" },
      { ru: "шесть", uk: "шість", es: "seis" },
      { ru: "семь", uk: "сім", es: "siete" },
      { ru: "восемь", uk: "вісім", es: "ocho" },
      { ru: "девять", uk: "дев'ять", es: "nueve" },
      { ru: "десять", uk: "десять", es: "diez" },
      { ru: "одиннадцать", uk: "одинадцять", es: "once" },
      { ru: "двенадцать", uk: "дванадцять", es: "doce" },
    ]},
    { id: "wn_l2", title: "Unique: 13–20 & Twenties", words: [
      { ru: "тринадцать", uk: "тринадцять", es: "trece" },
      { ru: "четырнадцать", uk: "чотирнадцять", es: "catorce" },
      { ru: "пятнадцать", uk: "п'ятнадцять", es: "quince" },
      { ru: "шестнадцать", uk: "шістнадцять", es: "dieciséis" },
      { ru: "семнадцать", uk: "сімнадцять", es: "diecisiete" },
      { ru: "восемнадцать", uk: "вісімнадцять", es: "dieciocho" },
      { ru: "девятнадцать", uk: "дев'ятнадцять", es: "diecinueve" },
      { ru: "двадцать", uk: "двадцять", es: "veinte" },
      { ru: "двадцать один", uk: "двадцять один", es: "veintiuno" },
      { ru: "двадцать два", uk: "двадцять два", es: "veintidós" },
      { ru: "двадцать пять", uk: "двадцять п'ять", es: "veinticinco" },
      { ru: "двадцать девять", uk: "двадцять дев'ять", es: "veintinueve" },
    ]},
    { id: "wn_l3", title: "The Tens: 30–100", words: [
      { ru: "тридцать", uk: "тридцять", es: "treinta" },
      { ru: "тридцать один", uk: "тридцять один", es: "treinta y uno" },
      { ru: "сорок", uk: "сорок", es: "cuarenta" },
      { ru: "сорок пять", uk: "сорок п'ять", es: "cuarenta y cinco" },
      { ru: "пятьдесят", uk: "п'ятдесят", es: "cincuenta" },
      { ru: "шестьдесят", uk: "шістдесят", es: "sesenta" },
      { ru: "семьдесят", uk: "сімдесят", es: "setenta" },
      { ru: "восемьдесят", uk: "вісімдесят", es: "ochenta" },
      { ru: "девяносто", uk: "дев'яносто", es: "noventa" },
      { ru: "девяносто девять", uk: "дев'яносто дев'ять", es: "noventa y nueve" },
      { ru: "сто", uk: "сто", es: "cien" },
      { ru: "сто один", uk: "сто один", es: "ciento uno" },
    ]},
    { id: "wn_l4", title: "Hundreds: 200–1000", words: [
      { ru: "двести", uk: "двісті", es: "doscientos" },
      { ru: "триста", uk: "триста", es: "trescientos" },
      { ru: "четыреста", uk: "чотириста", es: "cuatrocientos" },
      { ru: "пятьсот", uk: "п'ятсот", es: "quinientos" },
      { ru: "шестьсот", uk: "шістсот", es: "seiscientos" },
      { ru: "семьсот", uk: "сімсот", es: "setecientos" },
      { ru: "восемьсот", uk: "вісімсот", es: "ochocientos" },
      { ru: "девятьсот", uk: "дев'ятсот", es: "novecientos" },
      { ru: "тысяча", uk: "тисяча", es: "mil" },
      { ru: "сто пятьдесят", uk: "сто п'ятдесят", es: "ciento cincuenta" },
      { ru: "пятьсот двенадцать", uk: "п'ятсот дванадцять", es: "quinientos doce" },
      { ru: "тысяча один", uk: "тисяча один", es: "mil uno" },
    ]},
    { id: "wn_exam", title: "🏆 Numbers Exam", exam: true },
  ],
};
