// ========================
// THEORY REGISTRY
// ========================
// Unified catalog of all 30 theory modules across Standalone, Sentences, and Word Drills.
// Pure logic — Node.js compatible, DOM-free.

import week1Data from '../../data/sentences/week_1.js';
import week2Data from '../../data/sentences/week_2.js';
import week3Data from '../../data/sentences/week_3.js';
import week4Data from '../../data/sentences/week_4.js';
import week5Data from '../../data/sentences/week_5.js';
import week6Data from '../../data/sentences/week_6.js';
import week7Data from '../../data/sentences/week7.js';
import week8Data from '../../data/sentences/week_8.js';
import week9Data from '../../data/sentences/week_9.js';
import week10Data from '../../data/sentences/week_10.js';
import week11Data from '../../data/sentences/week_11.js';
import week12Data from '../../data/sentences/week_12.js';
import week13Data from '../../data/sentences/week_13.js';
import week14Data from '../../data/sentences/week_14.js';

import theoryVerbs from '../../data/theory/verbs_and_irregulars.js';
import theoryIrregularFull from '../../data/theory/verbs_irregular_full.js';
import theoryReflexiveSpecial from '../../data/theory/verbs_reflexive_special.js';
import theoryDemonstratives from '../../data/theory/demonstrative_pronouns.js';
import theoryBridge from '../../data/theory/the_bridge.js';
import theoryCatalan from '../../data/theory/catalan_vs_castellano.js';

import wordsNumbers from '../../data/words/numbers.js';
import wordsTime from '../../data/words/time_calendar.js';
import wordsWeather from '../../data/words/weather.js';
import wordsColors from '../../data/words/colors.js';
import wordsQuestionWords from '../../data/words/question_words.js';
import wordsRutina from '../../data/words/rutina.js';
import wordsTiempo from '../../data/words/tiempo_frecuencia.js';
import wordsDirecciones from '../../data/words/direcciones.js';
import wordsProfesiones from '../../data/words/profesiones.js';
import wordsGustos from '../../data/words/gustos.js';

export const THEORY_CATEGORIES = [
  {
    id: 'fundamentos',
    label: 'Fundamentos',
    fullLabel: 'Fundamentos y Núcleo',
    icon: 'account_balance',
    description: 'Fonética, pronombres, artículos, demostrativos y conexiones latinas.'
  },
  {
    id: 'pasado',
    label: 'El Pasado',
    fullLabel: 'El Pasado (Pretérito)',
    icon: 'history',
    description: 'Pretérito regular, verbos irregulares, contraste pasado vs presente.'
  },
  {
    id: 'verbos',
    label: 'Verbos y Mecánicas',
    fullLabel: 'Verbos y Mecánicas',
    icon: 'manufacturing',
    description: 'Conjugación regular, modales, diptongos, ser/estar y libros de verbos.'
  },
  {
    id: 'reflexivos',
    label: 'Reflexivos y Gustos',
    fullLabel: 'Reflexivos y Gustos',
    icon: 'favorite',
    description: 'Acciones habituales, verbos tipo gustar, rutina diaria y sentimientos.'
  },
  {
    id: 'vocabulario',
    label: 'Vocabulario',
    fullLabel: 'Vocabulario y Patrones',
    icon: 'explore',
    description: 'Números, fechas, hora, clima, direcciones, profesiones y colores.'
  },
  {
    id: 'regional',
    label: 'Inmersión y Síntesis',
    fullLabel: 'Inmersión y Síntesis',
    icon: 'travel_explore',
    description: 'Gran mapa gramatical y guía de supervivencia Catalán vs Castellano.'
  }
];

export const POPULAR_TAGS = [
  { id: 'all', label: 'Todos' },
  { id: 'pasado', label: '⏳ Pasado' },
  { id: 'verbos', label: '⚙️ Verbos' },
  { id: 'ser-estar', label: '⚖️ Ser / Estar' },
  { id: 'reflexivos', label: '🔄 Reflexivos' },
  { id: 'vocabulario', label: '🧭 Vocabulario' },
  { id: 'curriculum', label: '📚 Semanas (1-14)' }
];

/**
 * Raw definition table mapping all 30 theory modules with category metadata.
 */
const THEORY_DEFINITIONS = [
  // --- 1. FUNDAMENTOS ---
  {
    id: 'week_1_theory',
    source: 'sentences',
    sourceId: 'week_1',
    sourceLabel: 'Semana 1',
    category: 'fundamentos',
    icon: 'school',
    tags: ['fundamentos', 'fonetica', 'pronombres', 'ser-estar', 'semana1', 'curriculum'],
    getData: () => week1Data.theory
  },
  {
    id: 'week_2_theory',
    source: 'sentences',
    sourceId: 'week_2',
    sourceLabel: 'Semana 2',
    category: 'fundamentos',
    icon: 'badge',
    tags: ['fundamentos', 'articulos', 'genero', 'semana2', 'curriculum'],
    getData: () => week2Data.theory
  },
  {
    id: 'theory_demonstratives',
    source: 'standalone',
    sourceId: 'theory_demonstratives',
    sourceLabel: 'Guía Gramatical',
    category: 'fundamentos',
    icon: 'touch_app',
    tags: ['fundamentos', 'pronombres', 'demostrativos', 'este-ese-aquel'],
    getData: () => theoryDemonstratives
  },
  {
    id: 'words_question_words_theory',
    source: 'words',
    sourceId: 'words_question_words',
    sourceLabel: 'Vocabulario',
    category: 'fundamentos',
    icon: 'help_center',
    tags: ['fundamentos', 'preguntas', 'interrogativos', 'tildes', 'vocabulario'],
    getData: () => wordsQuestionWords.theory
  },
  {
    id: 'theory_bridge',
    source: 'standalone',
    sourceId: 'theory_bridge',
    sourceLabel: 'Inmersión',
    category: 'fundamentos',
    icon: 'alt_route',
    tags: ['fundamentos', 'latin', 'patrones', 'vocabulario', 'bridge'],
    getData: () => theoryBridge
  },

  // --- 2. EL PASADO ---
  {
    id: 'week_6_theory',
    source: 'sentences',
    sourceId: 'week_6',
    sourceLabel: 'Semana 6',
    category: 'pasado',
    icon: 'history',
    tags: ['pasado', 'preterito', 'regular', 'ar-er-ir', 'semana6', 'curriculum'],
    getData: () => week6Data.theory
  },
  {
    id: 'week_7_theory',
    source: 'sentences',
    sourceId: 'week_7',
    sourceLabel: 'Semana 7',
    category: 'pasado',
    icon: 'local_cafe',
    tags: ['pasado', 'preterito', 'vida-diaria', 'coloquial', 'semana7', 'curriculum'],
    getData: () => week7Data.theory
  },
  {
    id: 'week_11_theory',
    source: 'sentences',
    sourceId: 'week_11',
    sourceLabel: 'Semana 11',
    category: 'pasado',
    icon: 'timelapse',
    tags: ['pasado', 'presente-vs-pasado', 'contraste', 'semana11', 'curriculum'],
    getData: () => week11Data.theory
  },
  {
    id: 'week_12_theory',
    source: 'sentences',
    sourceId: 'week_12',
    sourceLabel: 'Semana 12',
    category: 'pasado',
    icon: 'bolt',
    tags: ['pasado', 'preterito', 'irregular', 'fui-tuve-estuve', 'semana12', 'curriculum'],
    getData: () => week12Data.theory
  },
  {
    id: 'week_13_theory',
    source: 'sentences',
    sourceId: 'week_13',
    sourceLabel: 'Semana 13',
    category: 'pasado',
    icon: 'done_all',
    tags: ['pasado', 'preterito', 'irregular', 'hice-pude-quise', 'semana13', 'curriculum'],
    getData: () => week13Data.theory
  },

  // --- 3. VERBOS Y MECÁNICAS ---
  {
    id: 'theory_verbs',
    source: 'standalone',
    sourceId: 'theory_verbs',
    sourceLabel: 'Guía Gramatical',
    category: 'verbos',
    icon: 'manufacturing',
    tags: ['verbos', 'motor', 'conjugacion', 'ser-estar-ir', 'regulares'],
    getData: () => theoryVerbs
  },
  {
    id: 'week_3_theory',
    source: 'sentences',
    sourceId: 'week_3',
    sourceLabel: 'Semana 3',
    category: 'verbos',
    icon: 'format_list_bulleted',
    tags: ['verbos', 'conjugacion', 'presente', 'regular', 'semana3', 'curriculum'],
    getData: () => week3Data.theory
  },
  {
    id: 'week_4_theory',
    source: 'sentences',
    sourceId: 'week_4',
    sourceLabel: 'Semana 4',
    category: 'verbos',
    icon: 'psychology',
    tags: ['verbos', 'modales', 'perifrasis', 'querer-poder-tener', 'semana4', 'curriculum'],
    getData: () => week4Data.theory
  },
  {
    id: 'week_5_theory',
    source: 'sentences',
    sourceId: 'week_5',
    sourceLabel: 'Semana 5',
    category: 'verbos',
    icon: 'compare_arrows',
    tags: ['verbos', 'ser-estar', 'adjetivos', 'tomar', 'semana5', 'curriculum'],
    getData: () => week5Data.theory
  },
  {
    id: 'week_9_theory',
    source: 'sentences',
    sourceId: 'week_9',
    sourceLabel: 'Semana 9',
    category: 'verbos',
    icon: 'group',
    tags: ['verbos', 'diptongo', 'e-ie', 'vosotros', 'semana9', 'curriculum'],
    getData: () => week9Data.theory
  },
  {
    id: 'theory_verbs_irregular_full',
    source: 'standalone',
    sourceId: 'theory_verbs_irregular_full',
    sourceLabel: 'Gran Libro',
    category: 'verbos',
    icon: 'auto_stories',
    tags: ['verbos', 'irregulares', 'tener', 'hacer', 'ir', 'poner', 'salir'],
    getData: () => theoryIrregularFull
  },

  // --- 4. REFLEXIVOS Y GUSTOS ---
  {
    id: 'theory_verbs_reflexive_special',
    source: 'standalone',
    sourceId: 'theory_verbs_reflexive_special',
    sourceLabel: 'Guía Gramatical',
    category: 'reflexivos',
    icon: 'swap_horiz',
    tags: ['reflexivos', 'verbos', 'gustar', 'llamarse', 'ducharse'],
    getData: () => theoryReflexiveSpecial
  },
  {
    id: 'week_8_theory',
    source: 'sentences',
    sourceId: 'week_8',
    sourceLabel: 'Semana 8',
    category: 'reflexivos',
    icon: 'favorite',
    tags: ['reflexivos', 'gustar', 'reaccion', 'encantar', 'semana8', 'curriculum'],
    getData: () => week8Data.theory
  },
  {
    id: 'words_rutina_theory',
    source: 'words',
    sourceId: 'words_rutina',
    sourceLabel: 'Vocabulario',
    category: 'reflexivos',
    icon: 'alarm',
    tags: ['reflexivos', 'rutina', 'acciones-habituales', 'vocabulario'],
    getData: () => wordsRutina.theory
  },
  {
    id: 'words_gustos_theory',
    source: 'words',
    sourceId: 'words_gustos',
    sourceLabel: 'Vocabulario',
    category: 'reflexivos',
    icon: 'sentiment_satisfied',
    tags: ['reflexivos', 'gustos', 'preferencias', 'vocabulario'],
    getData: () => wordsGustos.theory
  },

  // --- 5. VOCABULARIO Y PATRONES ---
  {
    id: 'words_numbers_theory',
    source: 'words',
    sourceId: 'words_numbers',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'pin',
    tags: ['vocabulario', 'numeros', 'concordancia', 'veintiun', 'centenas'],
    getData: () => wordsNumbers.theory
  },
  {
    id: 'words_time_calendar_theory',
    source: 'words',
    sourceId: 'words_time_calendar',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'calendar_month',
    tags: ['vocabulario', 'fechas', 'meses', 'calendario', 'estaciones'],
    getData: () => wordsTime.theory
  },
  {
    id: 'words_tiempo_frecuencia_theory',
    source: 'words',
    sourceId: 'words_tiempo_frecuencia',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'schedule',
    tags: ['vocabulario', 'frecuencia', 'hora', 'tiempo'],
    getData: () => wordsTiempo.theory
  },
  {
    id: 'words_weather_theory',
    source: 'words',
    sourceId: 'words_weather',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'thermostat',
    tags: ['vocabulario', 'clima', 'hace-hay-esta', 'tiempo-atmosferico'],
    getData: () => wordsWeather.theory
  },
  {
    id: 'words_direcciones_theory',
    source: 'words',
    sourceId: 'words_direcciones',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'signpost',
    tags: ['vocabulario', 'direcciones', 'hay-vs-esta', 'lugares', 'ciudad'],
    getData: () => wordsDirecciones.theory
  },
  {
    id: 'week_10_theory',
    source: 'sentences',
    sourceId: 'week_10',
    sourceLabel: 'Semana 10',
    category: 'vocabulario',
    icon: 'navigation',
    tags: ['vocabulario', 'viajes', 'transporte', 'direcciones', 'semana10', 'curriculum'],
    getData: () => week10Data.theory
  },
  {
    id: 'words_profesiones_theory',
    source: 'words',
    sourceId: 'words_profesiones',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'work',
    tags: ['vocabulario', 'profesiones', 'articulos', 'genero'],
    getData: () => wordsProfesiones.theory
  },
  {
    id: 'words_colors_theory',
    source: 'words',
    sourceId: 'words_colors',
    sourceLabel: 'Vocabulario',
    category: 'vocabulario',
    icon: 'palette',
    tags: ['vocabulario', 'colores', 'concordancia', 'adjetivos'],
    getData: () => wordsColors.theory
  },

  // --- 6. REGIONAL E INMERSIÓN ---
  {
    id: 'week_14_theory',
    source: 'sentences',
    sourceId: 'week_14',
    sourceLabel: 'Semana 14',
    category: 'regional',
    icon: 'workspace_premium',
    tags: ['regional', 'repaso', 'sintesis', 'mapa-gramatical', 'semana14', 'curriculum'],
    getData: () => week14Data.theory
  },
  {
    id: 'theory_catalan',
    source: 'standalone',
    sourceId: 'theory_catalan',
    sourceLabel: 'Inmersión',
    category: 'regional',
    icon: 'translate',
    tags: ['regional', 'barcelona', 'catalan', 'castellano', 'inmersion'],
    getData: () => theoryCatalan
  }
];

/**
 * Hydrates all 30 theory topics into standardized objects.
 * @returns {Array<Object>}
 */
export function getAllTheoryTopics() {
  return THEORY_DEFINITIONS.map(def => {
    const rawData = def.getData() || {};
    return {
      id: def.id,
      title: rawData.title || def.id,
      subtitle: rawData.subtitle || rawData.description || '',
      description: rawData.description || rawData.subtitle || '',
      icon: rawData.icon || def.icon || 'menu_book',
      category: def.category,
      tags: def.tags || [],
      source: def.source,
      sourceId: def.sourceId,
      sourceLabel: def.sourceLabel,
      sections: Array.isArray(rawData.sections) ? rawData.sections : []
    };
  });
}

/**
 * Get a specific theory topic by ID (resolves week/word IDs too).
 * @param {string} topicId
 * @returns {Object|null}
 */
export function getTheoryTopicById(topicId) {
  const all = getAllTheoryTopics();
  return (
    all.find(t => t.id === topicId) ||
    all.find(t => t.sourceId === topicId) ||
    all.find(t => t.id === `${topicId}_theory`) ||
    null
  );
}

/**
 * Get topics grouped by category with metadata counts.
 * @returns {Array<{ category: Object, topics: Array }>}
 */
export function getGroupedTheoryCatalog() {
  const topics = getAllTheoryTopics();
  return THEORY_CATEGORIES.map(cat => ({
    category: cat,
    topics: topics.filter(t => t.category === cat.id)
  }));
}

/**
 * Filter topics by tag.
 * @param {string} tag
 * @returns {Array<Object>}
 */
export function getTheoryByTag(tag) {
  if (!tag || tag === 'all') return getAllTheoryTopics();
  return getAllTheoryTopics().filter(t => t.tags.includes(tag) || t.category === tag);
}

/**
 * Live search across title, subtitle, and section headings/texts.
 * @param {string} query
 * @returns {Array<Object>}
 */
export function searchTheoryTopics(query) {
  if (!query || !query.trim()) return getAllTheoryTopics();
  const q = query.toLowerCase().trim();

  return getAllTheoryTopics().filter(topic => {
    if (topic.title.toLowerCase().includes(q)) return true;
    if (topic.subtitle.toLowerCase().includes(q)) return true;
    if (topic.tags.some(tag => tag.toLowerCase().includes(q))) return true;

    // Deep search in section text
    return topic.sections.some(s => {
      if (s.text && s.text.toLowerCase().includes(q)) return true;
      if (s.caption && s.caption.toLowerCase().includes(q)) return true;
      if (s.headers && s.headers.some(h => h.toLowerCase().includes(q))) return true;
      return false;
    });
  });
}
