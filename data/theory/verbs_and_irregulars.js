// ========================
// THEORY: VERBS & IRREGULARS
// ========================
// Standalone theory article for the Theory tab.
// Teaches verb families, conjugation patterns, and the Three Rebels.

export default {
  id: "theory_verbs",
  type: "theory",
  title: "Verbs & Irregulars",
  icon: "manufacturing",
  description: "Spanish verbs as 'Motors' with 'Tails'. Master the three families and the three rebels.",
  sections: [
    {
      type: "heading",
      text: "🔧 Spanish Verbs = Motors with Tails"
    },
    {
      type: "paragraph",
      text: "Every Spanish verb in its base form (infinitive) is a motor with a detachable tail. The tail tells you which family it belongs to. Remove the tail, attach a new ending, and you've conjugated the verb."
    },
    {
      type: "callout",
      style: "tip",
      text: "Think of it like LEGO: the stem is the brick, the ending is the connector piece. Swap the connector to change who is doing the action."
    },
    {
      type: "table",
      caption: "The Three Verb Families",
      headers: ["Family", "Tail", "Example", "Stem"],
      rows: [
        ["-AR", "-ar", "hablar (to speak)", "habl-"],
        ["-ER", "-er", "comer (to eat)", "com-"],
        ["-IR", "-ir", "vivir (to live)", "viv-"],
      ]
    },
    {
      type: "paragraph",
      text: "-AR verbs are by far the most common (~70% of all Spanish verbs). If you only learn one family first, learn -AR."
    },
    {
      type: "heading",
      text: "🎯 The 'Yo' Shortcut: Everything ends in -O"
    },
    {
      type: "paragraph",
      text: "For regular verbs, the 'I' form is dead simple: drop the tail, add -O. This works for ALL three families. It's the single most useful pattern in Spanish."
    },
    {
      type: "table",
      caption: "Yo Conjugation — Universal -O Rule",
      headers: ["Infinitive", "Drop tail", "Add -O", "Result"],
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
      text: "⚡ The 'Tú' Pattern"
    },
    {
      type: "paragraph",
      text: "For 'You (informal)', the ending depends on the family — but -ER and -IR share the same ending:"
    },
    {
      type: "table",
      caption: "Tú Endings by Family",
      headers: ["Family", "Ending", "Example"],
      rows: [
        ["-AR", "-as", "hablas"],
        ["-ER", "-es", "comes"],
        ["-IR", "-es", "vives"],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "Notice: -ER and -IR share the same 'Tú' ending (-es). Two families, one pattern! This is true for most persons."
    },
    {
      type: "heading",
      text: "📋 Complete Regular Conjugation Table"
    },
    {
      type: "table",
      caption: "Present Tense — All Persons",
      headers: ["Person", "-AR (hablar)", "-ER (comer)", "-IR (vivir)"],
      rows: [
        ["Yo", "hablo", "como", "vivo"],
        ["Tú", "hablas", "comes", "vives"],
        ["Él/Ella", "habla", "come", "vive"],
        ["Nosotros", "hablamos", "comemos", "vivimos"],
        ["Ellos/Ustedes", "hablan", "comen", "viven"],
      ]
    },
    {
      type: "heading",
      text: "🏴‍☠️ The Three Rebels: SER, ESTAR, IR"
    },
    {
      type: "paragraph",
      text: "These three verbs refuse to follow rules. They are ESSENTIAL — you'll use them in nearly every sentence. Don't try to derive them — memorize them as fixed patterns."
    },
    {
      type: "table",
      caption: "The Three Rebels — Present Tense",
      headers: ["Person", "SER (to be — identity)", "ESTAR (to be — state)", "IR (to go)"],
      rows: [
        ["Yo", "soy", "estoy", "voy"],
        ["Tú", "eres", "estás", "vas"],
        ["Él/Ella", "es", "está", "va"],
        ["Nosotros", "somos", "estamos", "vamos"],
        ["Ellos/Ustedes", "son", "están", "van"],
      ]
    },
    {
      type: "callout",
      style: "warning",
      text: "SER = who/what you ARE (identity, profession, origin). ESTAR = how/where you ARE (mood, location, temporary state). Mixing them up changes meaning! 'Soy aburrido' = I'm a boring person. 'Estoy aburrido' = I'm bored right now."
    },
    {
      type: "heading",
      text: "🎓 Other High-Frequency Irregulars"
    },
    {
      type: "paragraph",
      text: "Beyond the Three Rebels, these verbs have irregular 'Yo' forms but follow normal patterns for other persons:"
    },
    {
      type: "table",
      caption: "Irregular 'Yo' Verbs",
      headers: ["Verb", "Meaning", "Yo form", "Tú form (regular)"],
      rows: [
        ["tener", "to have", "tengo", "tienes"],
        ["hacer", "to do/make", "hago", "haces"],
        ["decir", "to say/tell", "digo", "dices"],
        ["poner", "to put", "pongo", "pones"],
        ["salir", "to go out", "salgo", "sales"],
        ["venir", "to come", "vengo", "vienes"],
        ["conocer", "to know (person)", "conozco", "conoces"],
        ["saber", "to know (fact)", "sé", "sabes"],
      ]
    },
    {
      type: "callout",
      style: "tip",
      text: "Pattern: many irregular 'Yo' forms end in -GO (tengo, hago, digo, pongo, salgo, vengo). Once you spot this, they become predictable!"
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/uEYlUHii3aM",
      title: "Spanish Verb Conjugation Made Easy | AR ER IR Verbs Explained (Seño Bluemel)"
    }
  ]
};
