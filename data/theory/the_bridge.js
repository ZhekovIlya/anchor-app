// ========================
// THEORY: THE BRIDGE
// ========================
// Standalone theory article for the Theory tab.
// Teaches English→Spanish suffix conversion patterns (cognates).

export default {
  id: "theory_bridge",
  type: "theory",
  title: "The Bridge",
  icon: "conversion_path",
  description: "Import your English vocabulary into Spanish. Recognize patterns, unlock hundreds of words instantly.",
  sections: [
    {
      type: "heading",
      text: "🌉 You Already Know Hundreds of Spanish Words"
    },
    {
      type: "paragraph",
      text: "English and Spanish share thousands of cognates — words with the same Latin root. By learning a few suffix conversion rules, you can 'import' your existing English vocabulary and unlock Spanish words you've never studied."
    },
    {
      type: "callout",
      style: "tip",
      text: "This is the 80/20 hack: instead of memorizing words one by one, learn the PATTERN and unlock them in batches of hundreds."
    },
    {
      type: "heading",
      text: "📐 Rule 1: -TION → -CIÓN"
    },
    {
      type: "paragraph",
      text: "Any English word ending in '-tion' becomes '-ción' in Spanish. The meaning stays virtually identical. These words are always feminine (la)."
    },
    {
      type: "table",
      caption: "-TION → -CIÓN Conversions",
      headers: ["English", "Spanish", "Pronunciation hint"],
      rows: [
        ["nation", "nación", "nah-SYON"],
        ["information", "información", "in-for-mah-SYON"],
        ["situation", "situación", "see-too-ah-SYON"],
        ["education", "educación", "eh-doo-kah-SYON"],
        ["construction", "construcción", "kon-strook-SYON"],
        ["revolution", "revolución", "reh-boh-loo-SYON"],
        ["communication", "comunicación", "koh-moo-nee-kah-SYON"],
        ["operation", "operación", "oh-peh-rah-SYON"],
      ]
    },
    {
      type: "heading",
      text: "📐 Rule 2: -ITY → -DAD"
    },
    {
      type: "paragraph",
      text: "English '-ity' words become '-dad' in Spanish. These are always feminine nouns (la)."
    },
    {
      type: "table",
      caption: "-ITY → -DAD Conversions",
      headers: ["English", "Spanish"],
      rows: [
        ["city", "ciudad"],
        ["university", "universidad"],
        ["reality", "realidad"],
        ["quality", "calidad"],
        ["opportunity", "oportunidad"],
        ["activity", "actividad"],
        ["electricity", "electricidad"],
        ["personality", "personalidad"],
      ]
    },
    {
      type: "heading",
      text: "📐 Rule 3: -LY → -MENTE"
    },
    {
      type: "paragraph",
      text: "English adverbs ending in '-ly' become '-mente' in Spanish. The base is the feminine form of the adjective."
    },
    {
      type: "table",
      caption: "-LY → -MENTE Conversions",
      headers: ["English", "Spanish"],
      rows: [
        ["normally", "normalmente"],
        ["exactly", "exactamente"],
        ["completely", "completamente"],
        ["generally", "generalmente"],
        ["probably", "probablemente"],
        ["finally", "finalmente"],
      ]
    },
    {
      type: "heading",
      text: "📐 Rule 4: -OUS → -OSO"
    },
    {
      type: "paragraph",
      text: "English adjectives ending in '-ous' become '-oso' in Spanish (masculine) or '-osa' (feminine)."
    },
    {
      type: "table",
      caption: "-OUS → -OSO Conversions",
      headers: ["English", "Spanish (m/f)"],
      rows: [
        ["famous", "famoso / famosa"],
        ["nervous", "nervioso / nerviosa"],
        ["delicious", "delicioso / deliciosa"],
        ["curious", "curioso / curiosa"],
        ["generous", "generoso / generosa"],
        ["dangerous", "peligroso / peligrosa"],
      ]
    },
    {
      type: "heading",
      text: "📐 Rule 5: -AL → -AL"
    },
    {
      type: "paragraph",
      text: "Words ending in '-al' are often identical in both languages! Just adjust pronunciation."
    },
    {
      type: "table",
      caption: "-AL → -AL (same spelling!)",
      headers: ["English", "Spanish"],
      rows: [
        ["animal", "animal"],
        ["hospital", "hospital"],
        ["general", "general"],
        ["natural", "natural"],
        ["personal", "personal"],
        ["professional", "profesional"],
      ]
    },
    {
      type: "callout",
      style: "important",
      text: "These 5 patterns alone cover ~3,000+ words. You're not 'learning' them — you're RECOGNIZING them. This drastically reduces the perceived difficulty of Spanish vocabulary."
    },
    {
      type: "heading",
      text: "⚠️ False Friends (Falsos Amigos)"
    },
    {
      type: "paragraph",
      text: "Some words LOOK similar but mean different things. Be aware of these common traps:"
    },
    {
      type: "table",
      caption: "Common False Friends",
      headers: ["Spanish", "Looks like…", "Actually means…"],
      rows: [
        ["embarazada", "embarrassed", "pregnant"],
        ["éxito", "exit", "success"],
        ["librería", "library", "bookstore"],
        ["actual", "actual", "current/present"],
        ["constipado", "constipated", "having a cold"],
      ]
    },
    {
      type: "callout",
      style: "warning",
      text: "Always double-check cognates that seem too convenient — a few are traps!"
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/s2_kM5p3W8A",
      title: "Spanish Cognate Pattern: TION to CIÓN — Unlock 1000+ Words (The Spanish Dude)"
    }
  ]
};
