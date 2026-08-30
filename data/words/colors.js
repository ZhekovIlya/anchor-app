// ========================
// WORDS: COLORS
// ========================
export default {
  id: "words_colors",
  type: "words",
  title: "Colors",
  icon: "palette",
  description: "Learn the color vocabulary",
  theory: {
    title: "Los Colores y la Concordancia",
    subtitle: "Reglas de género y número en los colores: terminados en -o, consonante y colores flor/fruta",
    sections: [
      {
        type: "heading",
        text: "1. Colores de 4 formas (terminados en -o)"
      },
      {
        type: "paragraph",
        text: "Los colores terminados en `-o` concuerdan tanto en género (masculino/femenino) como en número (singular/plural) con el sustantivo:"
      },
      {
        type: "table",
        caption: "Colores con 4 terminaciones (-o, -a, -os, -as)",
        headers: ["Color base", "Masc. Sing.", "Fem. Sing.", "Masc. Plur.", "Fem. Plur.", "Traducción (UK)"],
        rows: [
          ["rojo", "el coche rojo", "la flor roja", "los coches rojos", "las flores rojas", "червоний"],
          ["blanco", "el papel blanco", "la mesa blanca", "los papeles blancos", "las mesas blancas", "білий"],
          ["negro", "el perro negro", "la gata negra", "los perros negros", "las gatas negras", "чорний"],
          ["amarillo", "el libro amarillo", "la casa amarilla", "los libros amarillos", "las casas amarillas", "жовтий"],
          ["morado", "el bolso morado", "la camisa morada", "los bolsos morados", "las camisas moradas", "фіолетовий"]
        ]
      },
      {
        type: "heading",
        text: "2. Colores de 2 formas (invariables en género)"
      },
      {
        type: "paragraph",
        text: "Los colores que terminan en vocal distinta de `-o` o en consonante solo cambian en número (singular/plural):"
      },
      {
        type: "table",
        caption: "Colores con 2 terminaciones (Singular / Plural)",
        headers: ["Color base", "Singular (Masc. & Fem.)", "Plural (Masc. & Fem.)", "Traducción (UK)"],
        rows: [
          ["azul", "el cielo azul / la puerta azul", "los ojos azules / las sillas azules", "синій"],
          ["verde", "el árbol verde / la manzana verde", "los árboles verdes / las manzanas verdes", "зелений"],
          ["gris", "el abrigo gris / la pared gris", "los abrigos grises / las paredes grises", "сірий"],
          ["marrón", "el zapato marrón / la bota marrón", "los zapatos marrones / las botas marrones", "коричневий"],
          ["celeste", "el mar celeste / la tela celeste", "los mares celestes / las telas celestes", "блакитний"]
        ]
      },
      {
        type: "heading",
        text: "3. Colores procedentes de frutas o flores"
      },
      {
        type: "table",
        caption: "Colores especiales (naranja, rosa)",
        headers: ["Color", "Origen", "Uso común", "Ejemplo práctico"],
        rows: [
          ["naranja", "Fruta (la naranja)", "Invariable en género", "la camiseta naranja / las cajas naranja(s)"],
          ["rosa", "Flor (la rosa)", "Invariable en género", "el vestido rosa / las flores rosa(s)"]
        ]
      }
    ]
  },
  lessons: [
    { id: "wc_l1", title: "Primary & Basic Colors", words: [
      { ru: "красный", uk: "червоний", es: "rojo" },
      { ru: "синий", uk: "синій", es: "azul" },
      { ru: "жёлтый", uk: "жовтий", es: "amarillo" },
      { ru: "зелёный", uk: "зелений", es: "verde" },
      { ru: "белый", uk: "білий", es: "blanco" },
      { ru: "чёрный", uk: "чорний", es: "negro" },
      { ru: "оранжевый", uk: "помаранчевий", es: "naranja" },
      { ru: "фиолетовый", uk: "фіолетовий", es: "morado" },
      { ru: "розовый", uk: "рожевий", es: "rosa" },
      { ru: "коричневый", uk: "коричневий", es: "marrón" },
      { ru: "серый", uk: "сірий", es: "gris" },
      { ru: "голубой", uk: "блакитний", es: "celeste" },
    ]},
    { id: "wc_exam", title: "🏆 Colors Exam", exam: true },
  ],
};
