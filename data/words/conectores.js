// ========================
// WORDS: CONECTORES PARA HABLAR
// ========================
export default {
  id: "words_conectores",
  type: "words",
  title: "Conectores para hablar",
  icon: "forum",
  description: "High-frequency connectors and city vocabulary for speaking",
  theory: {
    title: "Conectores para hablar",
    subtitle: "Si / sí, soler, regresar vs volver y vocabulario para pasear por la ciudad",
    sections: [
      {
        type: "heading",
        text: "1. «si» (sin tilde) vs «sí» (con tilde)"
      },
      {
        type: "table",
        caption: "Una tilde cambia el significado",
        headers: ["Forma", "Significado", "Ejemplo"],
        rows: [
          ["si (sin tilde)", "якщо (condición)", "Si llueve, no salgo."],
          ["sí (con tilde)", "так (afirmación)", "Sí, me gusta mucho."],
          ["si no", "якщо ні / інакше", "Si no llueve, salimos."],
          ["si es así", "якщо це так", "Si es así, nos quedamos en casa."]
        ]
      },
      {
        type: "heading",
        text: "2. «si» + presente y «si» + pasado"
      },
      {
        type: "table",
        caption: "Frases con «si»",
        headers: ["Estructura", "Uso", "Ejemplo"],
        rows: [
          ["si + presente → presente / futuro próximo", "Una condición real, ahora o en el futuro", "Si llueve, no salgo. / Si llueve, vamos a quedarnos en casa."],
          ["si + pasado → presente", "Una razón que ya ocurrió", "Si nos gustó el servicio, dejamos propina."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 «como» al principio de la frase significa «оскільки» (porque): 'Como llueve, me quedo en casa.' Con «porque» la causa va después: 'Me quedo en casa porque llueve.'"
      },
      {
        type: "heading",
        text: "3. «soler» + infinitivo (hábitos)"
      },
      {
        type: "paragraph",
        text: "«Soler + infinitivo» expresa lo que haces normalmente. Es un verbo con cambio de raíz o → ue; solo «nosotros» y «vosotros» conservan la «o»."
      },
      {
        type: "table",
        caption: "Soler en presente (o → ue)",
        headers: ["Persona", "soler", "Ejemplo"],
        rows: [
          ["Yo", "suelo", "Suelo comer a las dos."],
          ["Tú", "sueles", "¿Sueles pasear por el barrio?"],
          ["Él / Ella / Usted", "suele", "Él suele volver tarde."],
          ["Nosotros / Nosotras", "solemos", "Solemos cenar en casa."],
          ["Vosotros / Vosotras", "soléis", "¿Soléis salir los sábados?"],
          ["Ellos / Ellas / Ustedes", "suelen", "Ellos suelen quedar en el centro."]
        ]
      },
      {
        type: "heading",
        text: "4. «regresar» vs «volver»"
      },
      {
        type: "table",
        caption: "Dos verbos para volver",
        headers: ["Verbo", "Significado", "Ejemplo"],
        rows: [
          ["regresar", "повертатися кудись", "Regreso a casa a las seis."],
          ["volver", "повертатися", "Vuelvo a casa a las seis."],
          ["volver a + infinitivo", "зробити щось знову", "Vuelvo a llamar mañana."]
        ]
      },
      {
        type: "heading",
        text: "5. La ciudad: ¡cuidado con los errores típicos!"
      },
      {
        type: "callout",
        style: "warning",
        text: "❌ llena de la gente → ✅ llena de gente\n❌ conocer de la ciudad → ✅ conocer la ciudad\n❌ passear → ✅ pasear (con una sola «s»)"
      }
    ]
  },
  lessons: [
    {
      id: "wcon_l1",
      title: "Si, como, soler",
      words: [
        { ru: "если", uk: "якщо", es: "si" },
        { ru: "если нет / иначе", uk: "якщо ні / інакше", es: "si no" },
        { ru: "если это так", uk: "якщо це так", es: "si es así" },
        { ru: "поскольку / так как", uk: "оскільки / як", es: "como" },
        { ru: "когда", uk: "коли", es: "cuando" },
        { ru: "потому что", uk: "тому що", es: "porque" },
        { ru: "обычно (делать)", uk: "зазвичай (робити)", es: "soler + infinitivo" },
        { ru: "тогда / итак", uk: "тоді / отже", es: "entonces" },
        { ru: "тоже, также", uk: "також", es: "también" },
        { ru: "тоже нет", uk: "теж ні", es: "tampoco" },
        { ru: "кроме того", uk: "крім того", es: "además" },
        { ru: "но", uk: "але", es: "pero" },
      ]
    },
    {
      id: "wcon_l2",
      title: "La ciudad y pasear",
      words: [
        { ru: "места", uk: "місця", es: "los lugares" },
        { ru: "много людей (полная людей)", uk: "багато людей (повна людей)", es: "llena de gente" },
        { ru: "узнать город / осмотреть город", uk: "пізнати / оглянути місто", es: "conocer la ciudad" },
        { ru: "прогуляться", uk: "прогулятися", es: "dar un paseo" },
        { ru: "гулять", uk: "гуляти", es: "pasear" },
        { ru: "возвращаться (куда-то)", uk: "повертатися (кудись)", es: "regresar" },
        { ru: "возвращаться / делать снова (volver a + inf.)", uk: "повертатися / робити знову (volver a + inf.)", es: "volver" },
        { ru: "выходить", uk: "виходити", es: "salir" },
        { ru: "встречаться с", uk: "зустрічатися з", es: "quedar con" },
        { ru: "район", uk: "район", es: "el barrio" },
        { ru: "рядом с", uk: "поруч з", es: "cerca de" },
        { ru: "далеко от", uk: "далеко від", es: "lejos de" },
      ]
    },
    { id: "wcon_exam", title: "🏆 Conectores Exam", exam: true },
  ],
};
