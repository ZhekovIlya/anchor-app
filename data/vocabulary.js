// ========================
// SPANISH VOCABULARY DICTIONARY
// ========================
// Maps Spanish words → part-of-speech type.
// Used by the runtime tokenizer to auto-generate colored tokens.
// Words are stored lowercase; lookups are case-insensitive.
//
// For AMBIGUOUS words (e.g. "limpio" = verb OR adjective),
// the tokenizer uses positional heuristics to disambiguate.

const vocabulary = {
  // ── Subjects / Pronouns ──────────────────────────────
  yo: 'subject',
  tú: 'subject',
  él: 'subject',
  ella: 'subject',
  usted: 'subject',
  nosotros: 'subject',
  ellos: 'subject',
  ellas: 'subject',
  ustedes: 'subject',

  // ── Articles ─────────────────────────────────────────
  el: 'article',
  la: 'article',
  los: 'article',
  las: 'article',
  un: 'article',
  una: 'article',

  // ── Negation ─────────────────────────────────────────
  no: 'negation',

  // ── Conjunctions ─────────────────────────────────────
  y: 'conjunction',
  o: 'conjunction',

  // ── Prepositions ─────────────────────────────────────
  a: 'preposition',
  al: 'preposition',
  con: 'preposition',
  de: 'preposition',
  del: 'preposition',
  en: 'preposition',
  para: 'preposition',
  por: 'preposition',
  sin: 'preposition',

  // ── Question Words ───────────────────────────────────
  cuándo: 'question',
  cuánto: 'question',
  cómo: 'question',
  dónde: 'question',
  qué: 'question',
  quién: 'question',

  // ── Adverbs ──────────────────────────────────────────
  ahora: 'adverb',
  allí: 'adverb',
  aquí: 'adverb',
  ayer: 'adverb',
  bien: 'adverb',
  hoy: 'adverb',
  mal: 'adverb',
  mañana: 'adverb',
  pronto: 'adverb',
  tarde: 'adverb',

  // ── Verbs (conjugated) ───────────────────────────────
  // ser
  soy: 'verb', eres: 'verb', es: 'verb', somos: 'verb', son: 'verb',
  // estar
  estoy: 'verb', estás: 'verb', está: 'verb', estamos: 'verb', están: 'verb',
  // ir
  voy: 'verb', vas: 'verb', va: 'verb', vamos: 'verb', van: 'verb',
  // tener
  tengo: 'verb', tienes: 'verb', tiene: 'verb', tenemos: 'verb', tienen: 'verb',
  // querer
  quiero: 'verb', quieres: 'verb', quiere: 'verb', queremos: 'verb', quieren: 'verb',
  // poder
  puedo: 'verb', puedes: 'verb', puede: 'verb', podemos: 'verb', pueden: 'verb',
  // necesitar
  necesito: 'verb', necesitas: 'verb', necesita: 'verb', necesitamos: 'verb', necesitan: 'verb',
  // hacer
  hago: 'verb', haces: 'verb', hace: 'verb', hacemos: 'verb', hacen: 'verb',
  // decir
  digo: 'verb', dices: 'verb', dice: 'verb', decimos: 'verb', dicen: 'verb',
  // lavar
  lavo: 'verb', lavas: 'verb', lava: 'verb', lavamos: 'verb', lavan: 'verb',
  // secar
  seco: 'verb', secas: 'verb', seca: 'verb', secamos: 'verb', secan: 'verb',
  // limpiar
  limpio: 'verb', limpias: 'verb', limpia: 'verb', limpiamos: 'verb', limpian: 'verb',
  // abrir
  abro: 'verb', abres: 'verb', abre: 'verb', abrimos: 'verb', abren: 'verb',
  // cerrar
  cierro: 'verb', cierras: 'verb', cierra: 'verb', cerramos: 'verb', cierran: 'verb',
  // usar
  uso: 'verb', usas: 'verb', usa: 'verb', usamos: 'verb', usan: 'verb',
  // ladrar
  ladro: 'verb', ladras: 'verb', ladra: 'verb', ladramos: 'verb', ladran: 'verb',
  // morder
  muerdo: 'verb', muerdes: 'verb', muerde: 'verb', mordemos: 'verb', muerden: 'verb',
  // jugar
  juegas: 'verb', juega: 'verb', jugamos: 'verb',
  // pagar
  pago: 'verb', pagas: 'verb', paga: 'verb', pagamos: 'verb', pagan: 'verb',
  // costar
  cuesta: 'verb', cuestan: 'verb',
  // comprar
  compro: 'verb', compras: 'verb', compra: 'verb', compramos: 'verb', compran: 'verb',
  // hablar
  hablo: 'verb', hablas: 'verb', habla: 'verb', hablamos: 'verb', hablan: 'verb',
  // comer
  como: 'verb', comes: 'verb', come: 'verb', comemos: 'verb', comen: 'verb',
  // beber
  bebo: 'verb', bebes: 'verb', bebe: 'verb', bebemos: 'verb', beben: 'verb',
  // vivir
  vivo: 'verb', vives: 'verb', vive: 'verb', vivimos: 'verb', viven: 'verb',

  // ── Past Tense (Pretérito Indefinido) ─────────────────
  // comprar (past)
  compré: 'verb', compró: 'verb',
  // hablar (past)
  hablé: 'verb', habló: 'verb',
  // comer (past)
  comí: 'verb', comió: 'verb',
  // beber (past)
  bebí: 'verb', bebió: 'verb',
  // vivir (past)
  viví: 'verb', vivió: 'verb',
  // pagar (past)
  pagué: 'verb', pagó: 'verb',

  // ── Verb Infinitives ─────────────────────────────────
  abrir: 'verb_infinitive',
  alquilar: 'verb_infinitive',
  ayudar: 'verb_infinitive',
  beber: 'verb_infinitive',
  cerrar: 'verb_infinitive',
  comer: 'verb_infinitive',
  comprar: 'verb_infinitive',
  hablar: 'verb_infinitive',
  hacer: 'verb_infinitive',
  ir: 'verb_infinitive',
  jugar: 'verb_infinitive',
  ladrar: 'verb_infinitive',
  lavar: 'verb_infinitive',
  limpiar: 'verb_infinitive',
  morder: 'verb_infinitive',
  pagar: 'verb_infinitive',
  secar: 'verb_infinitive',
  usar: 'verb_infinitive',
  vivir: 'verb_infinitive',

  // ── Adjectives ───────────────────────────────────────
  amistosas: 'adjective', amistoso: 'adjective', amistosos: 'adjective',
  barata: 'adjective', barato: 'adjective', baratos: 'adjective',
  bonita: 'adjective', bonitas: 'adjective', bonito: 'adjective',
  bueno: 'adjective', buenos: 'adjective',
  cara: 'adjective', caro: 'adjective',
  grande: 'adjective', grandes: 'adjective',
  hembra: 'adjective', hembras: 'adjective',
  inteligente: 'adjective', inteligentes: 'adjective',
  limpios: 'adjective',
  linda: 'adjective', lindo: 'adjective', lindos: 'adjective',
  lista: 'adjective', listas: 'adjective', listo: 'adjective', listos: 'adjective',
  macho: 'adjective', machos: 'adjective',
  mala: 'adjective', malas: 'adjective', malo: 'adjective', malos: 'adjective',
  pequeñas: 'adjective', pequeño: 'adjective', pequeños: 'adjective',
  ruidosa: 'adjective', ruidosas: 'adjective', ruidoso: 'adjective', ruidosos: 'adjective',
  sucias: 'adjective', sucio: 'adjective',
  tonta: 'adjective', tonto: 'adjective', tontos: 'adjective',

  // ── Nouns / Objects ──────────────────────────────────
  agua: 'object',
  alquiler: 'object',
  baño: 'object',
  café: 'object',
  carne: 'object',
  casa: 'object',
  cocina: 'object',
  comida: 'object',
  contrato: 'object',
  correa: 'object',
  dinero: 'object',
  ducha: 'object',
  fruta: 'object',
  habitación: 'object',
  habitaciones: 'object',
  jabón: 'object',
  jardín: 'object',
  lavadora: 'object',
  leche: 'object',
  llave: 'object',
  llaves: 'object',
  nevera: 'object',
  pan: 'object',
  parque: 'object',
  patas: 'object',
  perro: 'object',
  piso: 'object',
  puerta: 'object',
  tienda: 'object',
  tiempo: 'object',
  toalla: 'object',
  ventana: 'object',
};

export default vocabulary;
