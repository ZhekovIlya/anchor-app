// ========================
// WORDS: GUSTOS Y PREFERENCIAS
// ========================
export default {
  id: "words_gustos",
  type: "words",
  title: "Gustos y Preferencias",
  icon: "favorite",
  description: "Things we like, dislike, and express preferences about",
  theory: {
    title: "Gustar, Encantar y Preferencias",
    subtitle: "Pronombres de objeto indirecto y concordancia de singular/plural",
    sections: [
      {
        type: "heading",
        text: "1. La estructura de GUSTAR: ¿quién manda en la frase?"
      },
      {
        type: "paragraph",
        text: "El verbo GUSTAR funciona al revés que en inglés pero exactamente igual que en ruso o ucraniano («мне нравится» / «мені подобається»). La cosa o actividad que nos gusta es el SUJETO de la frase, y la persona que experimenta el gusto recibe un pronombre de objeto indirecto (me, te, le, nos, os, les)."
      },
      {
        type: "table",
        caption: "Pronombres indirectos con el verbo Gustar",
        headers: ["Persona", "Pronombre", "Ejemplo con singular", "Ejemplo con plural"],
        rows: [
          ["A mí (yo)", "me", "Me gusta viajar.", "Me gustan los perros."],
          ["A ti (tú)", "te", "¿Te gusta el sushi?", "¿Te gustan los insectos?"],
          ["A él / ella / usted", "le", "Le gusta madrugar.", "Le gustan las matemáticas."],
          ["A nosotros / nosotras", "nos", "Nos gusta la piscina.", "Nos gustan las pelis de miedo."],
          ["A vosotros / vosotras", "os", "¿Os gusta cocinar?", "¿Os gustan los exámenes?"],
          ["A ellos / ellas / ustedes", "les", "Les gusta el teatro.", "Les gustan las tormentas de noche."]
        ]
      },
      {
        type: "callout",
        style: "important",
        text: "❌ NUNCA digas: *Yo gusto el brócoli*.\n✅ SIEMPRE di: (A mí) me gusta el brócoli."
      },
      {
        type: "heading",
        text: "2. ¿Cuándo usar GUSTA vs GUSTAN?"
      },
      {
        type: "paragraph",
        text: "Solo existen dos formas habituales del verbo en presente de indicativo: GUSTA y GUSTAN, dependiendo de lo que venga después:"
      },
      {
        type: "table",
        caption: "Regla de concordancia",
        headers: ["Forma", "Se usa con...", "Ejemplos prácticos"],
        rows: [
          ["GUSTA", "Sustantivo singular", "Me gusta la lluvia. / Me gusta el sushi."],
          ["GUSTA", "Uno o varios infinitivos", "Me gusta correr y leer. / Me gusta viajar."],
          ["GUSTAN", "Sustantivo plural", "Me gustan los perros. / Me gustan los videojuegos."]
        ]
      },
      {
        type: "callout",
        style: "tip",
        text: "💡 ¡Ojo con los infinitivos! Aunque pongas varios verbos en infinitivo juntos, el verbo siempre queda en singular: 'Me gusta correr, cocinar y viajar' (nunca *me gustan correr...*)."
      },
      {
        type: "heading",
        text: "3. ⚠️ Trampa mortal: ¿Por qué NUNCA se dice 'se gusta'?"
      },
      {
        type: "paragraph",
        text: "Uno de los errores más comunes de los estudiantes es mezclar los verbos reflexivos (llamarse, relajarse: me/te/se) con los verbos de tipo gustar (me/te/le). ¡'Se gusta' NO EXISTE en español!"
      },
      {
        type: "table",
        caption: "Comparación directa: Verbos Reflexivos (SE) vs. Tipo Gustar (LE)",
        headers: ["Pronombre sujeto", "Verbo reflexivo (Relajarse)", "Verbo tipo Gustar (Gustar)", "Regla"],
        rows: [
          ["Yo", "yo ME relajo", "a mí ME gusta", "Coinciden en 'me'"],
          ["Tú", "tú TE relajas", "a ti TE gusta", "Coinciden en 'te'"],
          ["Él / Ella / Usted", "él SE relaja", "a él LE gusta ⚠️", "❌ NUNCA *se gusta → ✅ LE gusta"],
          ["Nosotros / Nosotras", "nosotros NOS relajamos", "a nosotros NOS gusta", "Coinciden en 'nos'"],
          ["Vosotros / Vosotras", "vosotros OS relajáis", "a vosotros OS gusta", "Coinciden en 'os'"],
          ["Ellos / Ellas / Ustedes", "ellos SE relajan", "a ellos LES gusta ⚠️", "❌ NUNCA *se gustan → ✅ LES gusta"]
        ]
      },
      {
        type: "callout",
        style: "warning",
        text: "🚨 Recuerda para siempre:\n• Verbo reflexivo (acción sobre uno mismo): 'Él SE relaja en el sofá'.\n• Verbo de gusto (la cosa produce agrado a la persona): 'A él LE gusta la música clásica'."
      },
      {
        type: "heading",
        text: "4. La escala de intensidad para expresar preferencias"
      },
      {
        type: "paragraph",
        text: "Para graduar cuánto te gusta o disgusta algo, combina estas estructuras:"
      },
      {
        type: "table",
        caption: "Escala de gustos y aversiones",
        headers: ["Nivel", "Estructura", "Ejemplo"],
        rows: [
          ["Amor / Pasión", "Me encanta / Me encantan", "¡Me encanta Harry Potter!"],
          ["Gusto alto", "Me gusta mucho", "Me gusta mucho el teatro."],
          ["Gusto neutro", "Me gusta", "Me gusta el café solo."],
          ["Indiferencia", "Me da igual", "Me da igual el olor a gasolina."],
          ["Disgusto moderado", "No me gusta mucho", "No me gusta mucho madrugar."],
          ["Disgusto total", "No me gusta nada", "No me gustan nada los exámenes."],
          ["Aversión / Rechazo", "Odio / No soporto", "Odio los insectos."]
        ]
      }
    ]
  },
  lessons: [
    {
      id: "wg_l1",
      title: "Gustos y Actividades 1",
      words: [
        { ru: "брокколи", uk: "броколі", es: "el brócoli" },
        { ru: "дождь", uk: "дощ", es: "la lluvia" },
        { ru: "экзамены", uk: "іспити", es: "los exámenes" },
        { ru: "путешествовать", uk: "подорожувати", es: "viajar" },
        { ru: "рано вставать", uk: "рано вставати", es: "madrugar" },
        { ru: "Гарри Поттер", uk: "Гаррі Поттер", es: "Harry Potter" },
        { ru: "запах бензина", uk: "запах бензину", es: "el olor a gasolina" },
        { ru: "театр", uk: "театр", es: "el teatro" },
        { ru: "рисовать", uk: "малювати", es: "dibujar" },
        { ru: "насекомые", uk: "комахи", es: "los insectos" },
        { ru: "бегать", uk: "бігати", es: "correr" },
        { ru: "читать", uk: "читати", es: "leer" },
      ]
    },
    {
      id: "wg_l2",
      title: "Gustos y Preferencias 2",
      words: [
        { ru: "собаки", uk: "собаки", es: "los perros" },
        { ru: "бассейн", uk: "басейн", es: "la piscina" },
        { ru: "знакомиться с новыми людьми", uk: "знайомитися з новими людьми", es: "conocer gente nueva" },
        { ru: "готовить еду", uk: "готувати їжу", es: "cocinar" },
        { ru: "суши", uk: "суші", es: "el sushi" },
        { ru: "ночные грозы", uk: "нічні грози", es: "las tormentas de noche" },
        { ru: "фильмы ужасов", uk: "фільми жахів", es: "las pelis de miedo" },
        { ru: "математика", uk: "математика", es: "las matemáticas" },
        { ru: "чёрный кофе (без молока)", uk: "чорна кава (без молока)", es: "el café solo" },
        { ru: "видеоигры", uk: "відеоігри", es: "los videojuegos" },
        { ru: "классическая музыка", uk: "класична музика", es: "la música clásica" },
        { ru: "заниматься спортом", uk: "займатися спортом", es: "hacer deporte" },
      ]
    },
    { id: "wg_exam", title: "🏆 Gustos Exam", exam: true },
  ],
};
