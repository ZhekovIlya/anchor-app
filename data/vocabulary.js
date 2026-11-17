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
  cuáles: 'question',
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
  siempre: 'adverb',
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
  comes: 'verb', come: 'verb', comemos: 'verb', comen: 'verb',
  // beber
  bebo: 'verb', bebes: 'verb', bebe: 'verb', bebemos: 'verb', beben: 'verb',
  // vivir
  vivo: 'verb', vives: 'verb', vive: 'verb', vivimos: 'verb', viven: 'verb',
  // llegar
  llego: 'verb', llegas: 'verb', llega: 'verb', llegamos: 'verb', llegan: 'verb',
  // acabar
  acabo: 'verb',
  // hay (impersonal haber)
  hay: 'verb',

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
  // lavar (past)
  lavé: 'verb', lavó: 'verb',
  // secar (past)
  sequé: 'verb', secó: 'verb',
  // limpiar (past)
  limpié: 'verb', limpió: 'verb',
  // abrir (past)
  abrí: 'verb', abrió: 'verb',
  // cerrar (past)
  cerré: 'verb', cerró: 'verb',
  // usar (past)
  usé: 'verb', usó: 'verb',
  // ladrar (past)
  ladré: 'verb', ladró: 'verb',
  // morder (past)
  mordí: 'verb', mordió: 'verb',
  // necesitar (past)
  necesité: 'verb', necesitó: 'verb',

  // ── Verb Infinitives ─────────────────────────────────
  abrir: 'verb_infinitive',
  acabar: 'verb_infinitive',
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
  llegar: 'verb_infinitive',
  morder: 'verb_infinitive',
  pagar: 'verb_infinitive',
  recordar: 'verb_infinitive',
  secar: 'verb_infinitive',
  usar: 'verb_infinitive',
  vivir: 'verb_infinitive',

  // ── Adjectives ───────────────────────────────────────
  alta: 'adjective', alto: 'adjective',
  amistosas: 'adjective', amistoso: 'adjective', amistosos: 'adjective',
  barata: 'adjective', barato: 'adjective', baratos: 'adjective',
  bonita: 'adjective', bonitas: 'adjective', bonito: 'adjective',
  bueno: 'adjective', buenos: 'adjective',
  cara: 'adjective', caro: 'adjective',
  encendida: 'adjective', encendido: 'adjective',
  grande: 'adjective', grandes: 'adjective',
  hembra: 'adjective', hembras: 'adjective',
  inteligente: 'adjective', inteligentes: 'adjective',
  limpios: 'adjective',
  linda: 'adjective', lindo: 'adjective', lindos: 'adjective',
  lista: 'adjective', listas: 'adjective', listo: 'adjective', listos: 'adjective',
  macho: 'adjective', machos: 'adjective',
  mala: 'adjective', malas: 'adjective', malo: 'adjective', malos: 'adjective',
  misma: 'adjective', mismos: 'adjective',
  oscura: 'adjective', oscuro: 'adjective',
  pequeñas: 'adjective', pequeño: 'adjective', pequeños: 'adjective',
  rica: 'adjective', rico: 'adjective',
  ruidosa: 'adjective', ruidosas: 'adjective', ruidoso: 'adjective', ruidosos: 'adjective',
  sucias: 'adjective', sucio: 'adjective',
  tonta: 'adjective', tonto: 'adjective', tontos: 'adjective',

  // ── Possessives ────────────────────────────────────────
  sus: 'article',

  // ── Nouns / Objects ──────────────────────────────────
  agua: 'object',
  alquiler: 'object',
  arroba: 'object',
  baño: 'object',
  café: 'object',
  calle: 'object',
  carne: 'object',
  casa: 'object',
  cocina: 'object',
  comida: 'object',
  contrato: 'object',
  correa: 'object',
  dinero: 'object',
  ducha: 'object',
  enfermedad: 'object',
  enfermera: 'object',
  fruta: 'object',
  habitación: 'object',
  habitaciones: 'object',
  hospital: 'object',
  jabón: 'object',
  jardín: 'object',
  lavadora: 'object',
  leche: 'object',
  llave: 'object',
  llaves: 'object',
  luz: 'object',
  muerte: 'object',
  nevera: 'object',
  pan: 'object',
  parque: 'object',
  patas: 'object',
  perro: 'object',
  piso: 'object',
  problemas: 'object',
  puerta: 'object',
  ruido: 'object',
  tienda: 'object',
  tiempo: 'object',
  toalla: 'object',
  ventana: 'object',
  volumen: 'object',

  // ── Pronouns (unstressed, object, prepositional) ──────────────
  me: 'subject', te: 'subject', se: 'subject', lo: 'subject', le: 'subject', nos: 'subject', les: 'subject',
  os: 'subject', mí: 'subject', conmigo: 'subject', contigo: 'subject', vosotros: 'subject',
  vosotras: 'subject',

  // ── Possessives and plural indefinite article ─────────────────
  mi: 'article', mis: 'article', tu: 'article', su: 'article', nuestro: 'article', nuestra: 'article',
  nuestros: 'article', nuestras: 'article', mía: 'article', tuyo: 'article', unos: 'article', unas: 'article',

  // ── Conjunctions ──────────────────────────────────────────────
  como: 'conjunction', pero: 'conjunction', que: 'conjunction', cuando: 'conjunction',
  mientras: 'conjunction', aunque: 'conjunction', porque: 'conjunction', si: 'conjunction',
  pues: 'conjunction', ni: 'conjunction',

  // ── Prepositions ──────────────────────────────────────────────
  desde: 'preposition', durante: 'preposition', entre: 'preposition', junto: 'preposition',
  según: 'preposition', sobre: 'preposition', tras: 'preposition',

  // ── Question words ────────────────────────────────────────────
  cuál: 'question',

  // ── Adverbs (time, place, manner, quantity) ───────────────────
  antes: 'adverb', anoche: 'adverb', así: 'adverb', casi: 'adverb', cerca: 'adverb', claro: 'adverb',
  después: 'adverb', despacio: 'adverb', demasiado: 'adverb', enfrente: 'adverb', entonces: 'adverb',
  juntos: 'adverb', lejos: 'adverb', luego: 'adverb', más: 'adverb', menos: 'adverb', mucho: 'adverb',
  muy: 'adverb', nunca: 'adverb', perfectamente: 'adverb', poco: 'adverb', rápido: 'adverb', sí: 'adverb',
  tal: 'adverb', tan: 'adverb', tardísimo: 'adverb', temprano: 'adverb', también: 'adverb',
  totalmente: 'adverb', ya: 'adverb', bastante: 'adverb',

  // ── Demonstratives and indefinite determiners ─────────────────
  este: 'adjective', esta: 'adjective', esto: 'adjective', eso: 'adjective', cada: 'adjective',
  todo: 'adjective', toda: 'adjective', todos: 'adjective', mucha: 'adjective', muchas: 'adjective',
  muchos: 'adjective', pocos: 'adjective', otra: 'adjective', otro: 'adjective', otras: 'adjective',
  algunas: 'adjective', algunos: 'adjective',

  // ── Numerals and ordinals ─────────────────────────────────────
  dos: 'adjective', tres: 'adjective', cinco: 'adjective', siete: 'adjective', nueve: 'adjective',
  ocho: 'adjective', diez: 'adjective', doce: 'adjective', veinte: 'adjective', sesenta: 'adjective',
  noventa: 'adjective', primer: 'adjective', primero: 'adjective', segundo: 'adjective', media: 'adjective',

  // ── More adjectives ───────────────────────────────────────────
  acondicionado: 'adjective', altos: 'adjective', amables: 'adjective', antiguo: 'adjective',
  buen: 'adjective', buena: 'adjective', buenas: 'adjective', cansado: 'adjective', cansados: 'adjective',
  caliente: 'adjective', céntrica: 'adjective', céntrico: 'adjective', comercial: 'adjective',
  complicado: 'adjective', contenta: 'adjective', contentos: 'adjective', contrario: 'adjective',
  distinto: 'adjective', doble: 'adjective', especial: 'adjective', estrechas: 'adjective',
  exacta: 'adjective', fascinante: 'adjective', feliz: 'adjective', fría: 'adjective', fuerte: 'adjective',
  genial: 'adjective', graciosa: 'adjective', gran: 'adjective', gratis: 'adjective', histórico: 'adjective',
  honesta: 'adjective', importante: 'adjective', incluido: 'adjective', individual: 'adjective',
  industrial: 'adjective', inolvidables: 'adjective', interesante: 'adjective', joven: 'adjective',
  larga: 'adjective', largo: 'adjective', libre: 'adjective', magnética: 'adjective', mejor: 'adjective',
  mismo: 'adjective', moderno: 'adjective', nuevo: 'adjective', obrero: 'adjective', pasada: 'adjective',
  pasado: 'adjective', peligroso: 'adjective', peor: 'adjective', pequeña: 'adjective',
  principal: 'adjective', privado: 'adjective', público: 'adjective', residencial: 'adjective',
  segura: 'adjective', seguro: 'adjective', serio: 'adjective', sola: 'adjective', solo: 'adjective',
  soleadas: 'adjective', sucia: 'adjective', tradicional: 'adjective', trabajadora: 'adjective',
  tranquila: 'adjective', tranquilo: 'adjective', verde: 'adjective', igual: 'adjective',
  enfermo: 'adjective',

  // ── Verbs: present tense, new forms ───────────────────────────
  busca: 'verb', busco: 'verb', lleva: 'verb', llevo: 'verb', llevas: 'verb', pide: 'verb', pido: 'verb',
  pedimos: 'verb', funciona: 'verb', olvido: 'verb', espero: 'verb', espera: 'verb', entra: 'verb',
  entramos: 'verb', trae: 'verb', ayuda: 'verb', ducho: 'verb', levanto: 'verb', peino: 'verb',
  afeito: 'verb', meriendo: 'verb', ceno: 'verb', cenas: 'verb', salgo: 'verb', vuelvo: 'verb', suelo: 'verb',
  paso: 'verb', conozco: 'verb', cambiamos: 'verb', esperamos: 'verb', paseamos: 'verb', subimos: 'verb',
  tenéis: 'verb', compráis: 'verb', dejamos: 'verb', graduamos: 'verb', mudamos: 'verb', visitamos: 'verb',
  sale: 'verb', pasa: 'verb', parece: 'verb', resulta: 'verb', gusta: 'verb', encanta: 'verb',
  apetece: 'verb', depende: 'verb', da: 'verb', doy: 'verb', dame: 'verb', vale: 'verb', vaya: 'verb',
  venga: 'verb', anda: 'verb', mire: 'verb', mires: 'verb', sea: 'verb', oye: 'verb', viene: 'verb',
  vemos: 'verb', veo: 'verb', creo: 'verb', pienso: 'verb', prefiero: 'verb', siento: 'verb', sigo: 'verb',
  sigue: 'verb', seguimos: 'verb', supongo: 'verb', sé: 'verb', sabes: 'verb', entiendo: 'verb',
  entiendes: 'verb', mereces: 'verb', propones: 'verb', quieras: 'verb', digas: 'verb', dedicas: 'verb',
  explico: 'verb', refiero: 'verb', pillo: 'verb', alegro: 'verb', convence: 'verb', llama: 'verb',
  quedamos: 'verb', repetimos: 'verb', visto: 'verb',

  // ── Verbs: pretérito indefinido, new forms ────────────────────
  abrieron: 'verb', alquilé: 'verb', aprendió: 'verb', bebiste: 'verb', cambió: 'verb', casaron: 'verb',
  cerraste: 'verb', comieron: 'verb', comiste: 'verb', comisteis: 'verb', compraron: 'verb',
  compraste: 'verb', comprasteis: 'verb', crecí: 'verb', crecieron: 'verb', cuidó: 'verb', decidí: 'verb',
  dedicó: 'verb', descansaron: 'verb', disfrutaron: 'verb', empecé: 'verb', entendisteis: 'verb',
  envió: 'verb', escribió: 'verb', estudié: 'verb', estuve: 'verb', estuvo: 'verb', estuviste: 'verb',
  fuiste: 'verb', fundó: 'verb', graduaste: 'verb', graduó: 'verb', gustó: 'verb', hablaron: 'verb',
  hablasteis: 'verb', hizo: 'verb', hiciste: 'verb', jubiló: 'verb', llegaron: 'verb', mudó: 'verb',
  murió: 'verb', nació: 'verb', nací: 'verb', pagasteis: 'verb', pareció: 'verb', pude: 'verb',
  pudiste: 'verb', pudo: 'verb', respondieron: 'verb', respondisteis: 'verb', salisteis: 'verb', tuve: 'verb',
  tuvieron: 'verb', tuviste: 'verb', tuvo: 'verb', tuvimos: 'verb', viajaron: 'verb', viajó: 'verb',
  vivieron: 'verb', vivisteis: 'verb', conocí: 'verb', comimos: 'verb', dimos: 'verb', fue: 'verb',
  fui: 'verb', hice: 'verb', puse: 'verb', trajo: 'verb', llegué: 'verb', llamó: 'verb', pasó: 'verb',
  perdí: 'verb', quedé: 'verb', salió: 'verb', vino: 'verb',

  // ── Verbs: other forms (imperatives, imperfect, conditional, compound tenses) ───
  ayúdame: 'verb', corrígeme: 'verb', cuéntame: 'verb', cuídate: 'verb', déjame: 'verb', perdona: 'verb',
  diría: 'verb', dirías: 'verb', podríamos: 'verb', podría: 'verb', sería: 'verb', costaría: 'verb',
  gustaría: 'verb', era: 'verb', estaba: 'verb', esperaba: 'verb', gustaba: 'verb', había: 'verb',
  iba: 'verb', conocía: 'verb', tenía: 'verb', vivía: 'verb', ha: 'verb', has: 'verb', he: 'verb',
  dicho: 'verb', entendido: 'verb', pensado: 'verb', tenido: 'verb', ido: 'verb', levantado: 'verb',
  liado: 'verb', liando: 'verb', cambiando: 'verb',

  // ── Verbs: present tense paradigms (weeks 9–10) ───────────────
  piensas: 'verb', piensa: 'verb', pensamos: 'verb', pensáis: 'verb', piensan: 'verb', queréis: 'verb',
  entiende: 'verb', entendemos: 'verb', entendéis: 'verb', entienden: 'verb', cerráis: 'verb',
  empiezo: 'verb', empiezas: 'verb', empieza: 'verb', empezamos: 'verb', empezáis: 'verb', empiezan: 'verb',
  comienzo: 'verb', comienzas: 'verb', comienza: 'verb', comenzamos: 'verb', comenzáis: 'verb',
  comienzan: 'verb', pierdo: 'verb', pierdes: 'verb', pierde: 'verb', perdemos: 'verb', perdéis: 'verb',
  pierden: 'verb', prefieres: 'verb', prefiere: 'verb', preferimos: 'verb', preferís: 'verb',
  prefieren: 'verb', sientes: 'verb', siente: 'verb', sentimos: 'verb', sentís: 'verb', sienten: 'verb',
  miento: 'verb', mientes: 'verb', miente: 'verb', mentimos: 'verb', mentís: 'verb', mienten: 'verb',
  recomiendo: 'verb', recomiendas: 'verb', recomienda: 'verb', recomendamos: 'verb', recomendáis: 'verb',
  recomiendan: 'verb', despierto: 'verb', despiertas: 'verb', despierta: 'verb', despertamos: 'verb',
  despertáis: 'verb', despiertan: 'verb', conduzco: 'verb', conduces: 'verb', conduce: 'verb',
  conducimos: 'verb', conducís: 'verb', conducen: 'verb', giro: 'verb', giras: 'verb', gira: 'verb',
  giramos: 'verb', giráis: 'verb', giran: 'verb', sigues: 'verb', seguís: 'verb', siguen: 'verb',

  // ── Verb infinitives (more) ───────────────────────────────────
  ahorrar: 'verb_infinitive', barrer: 'verb_infinitive', caminar: 'verb_infinitive',
  cambiar: 'verb_infinitive', cocinar: 'verb_infinitive', correr: 'verb_infinitive', dejar: 'verb_infinitive',
  descansar: 'verb_infinitive', decir: 'verb_infinitive', dormir: 'verb_infinitive',
  encontrar: 'verb_infinitive', esperar: 'verb_infinitive', estar: 'verb_infinitive',
  ganar: 'verb_infinitive', jubilarse: 'verb_infinitive', leer: 'verb_infinitive', llevar: 'verb_infinitive',
  madrugar: 'verb_infinitive', pasear: 'verb_infinitive', pedir: 'verb_infinitive', pensar: 'verb_infinitive',
  quedar: 'verb_infinitive', repetir: 'verb_infinitive', reservar: 'verb_infinitive',
  salir: 'verb_infinitive', solucionar: 'verb_infinitive', tener: 'verb_infinitive', tomar: 'verb_infinitive',
  trabajar: 'verb_infinitive', venir: 'verb_infinitive', ver: 'verb_infinitive', darme: 'verb_infinitive',
  verte: 'verb_infinitive', decirlo: 'verb_infinitive', hacerlo: 'verb_infinitive', querer: 'verb_infinitive',
  entender: 'verb_infinitive', empezar: 'verb_infinitive', comenzar: 'verb_infinitive',
  perder: 'verb_infinitive', preferir: 'verb_infinitive', sentir: 'verb_infinitive',
  mentir: 'verb_infinitive', recomendar: 'verb_infinitive', despertar: 'verb_infinitive',
  conducir: 'verb_infinitive', girar: 'verb_infinitive', seguir: 'verb_infinitive',

  // ── Nouns: places, buildings, transport ───────────────────────
  aparcamiento: 'object', autobús: 'object', avenida: 'object', banco: 'object', bar: 'object',
  barrio: 'object', campo: 'object', ciudad: 'object', cine: 'object', centro: 'object', afueras: 'object',
  calles: 'object', coches: 'object', edificios: 'object', escuela: 'object', estación: 'object',
  fábrica: 'object', farmacia: 'object', hotel: 'object', mar: 'object', mercado: 'object', metro: 'object',
  museo: 'object', panadería: 'object', parques: 'object', pasillo: 'object', piscina: 'object',
  plazas: 'object', pueblo: 'object', recepción: 'object', residencia: 'object', restaurante: 'object',
  supermercado: 'object', taxi: 'object', tiendas: 'object', universidad: 'object', zona: 'object',
  esquina: 'object', izquierda: 'object', lugar: 'object', país: 'object', tren: 'object',

  // ── Nouns: people ─────────────────────────────────────────────
  abuelo: 'object', abuelos: 'object', amigo: 'object', amigos: 'object', camarero: 'object',
  camareros: 'object', compañeros: 'object', estudiantes: 'object', hermana: 'object', hermano: 'object',
  hijo: 'object', hijos: 'object', hombre: 'object', madre: 'object', médico: 'object', nietos: 'object',
  padres: 'object', pareja: 'object', persona: 'object', profesor: 'object', recepcionista: 'object',
  turistas: 'object', vecinos: 'object', vendedor: 'object',

  // ── Nouns: food, restaurant, objects ──────────────────────────
  bebida: 'object', bolsa: 'object', boca: 'object', botellas: 'object', cubiertos: 'object',
  desayuno: 'object', entrantes: 'object', manzana: 'object', maleta: 'object', menú: 'object',
  mesa: 'object', pescado: 'object', plato: 'object', postre: 'object', propina: 'object',
  servilleta: 'object', sopa: 'object', tarjeta: 'object', tarta: 'object', té: 'object', cuenta: 'object',
  libro: 'object', mensaje: 'object', carta: 'object', cosa: 'object', cosas: 'object',

  // ── Nouns: time and quantity ──────────────────────────────────
  año: 'object', años: 'object', día: 'object', días: 'object', domingo: 'object', finde: 'object',
  fin: 'object', final: 'object', hora: 'object', mayo: 'object', meses: 'object', montón: 'object',
  noche: 'object', noches: 'object', sábado: 'object', semana: 'object', verano: 'object', vez: 'object',
  veces: 'object', viernes: 'object', total: 'object', punto: 'object',

  // ── Nouns: abstract and other ─────────────────────────────────
  acuerdo: 'object', alivio: 'object', ambiente: 'object', aire: 'object', carrera: 'object', clase: 'object',
  clases: 'object', cuestión: 'object', descanso: 'object', deberes: 'object', deporte: 'object',
  ejemplo: 'object', empresa: 'object', encanto: 'object', enhorabuena: 'object', error: 'object',
  especie: 'object', estudios: 'object', experiencias: 'object', explicación: 'object', falta: 'object',
  favor: 'object', frecuencia: 'object', frío: 'object', gente: 'object', gracias: 'object', gustos: 'object',
  historia: 'object', idea: 'object', inconveniente: 'object', informática: 'object', inglés: 'object',
  instagram: 'object', lado: 'object', locos: 'object', locura: 'object', medicina: 'object',
  nombre: 'object', notas: 'object', palabra: 'object', pena: 'object', perdón: 'object', película: 'object',
  precio: 'object', problema: 'object', rabia: 'object', razón: 'object', registro: 'object',
  reserva: 'object', respuestas: 'object', reunión: 'object', servicio: 'object', servicios: 'object',
  sentido: 'object', sueño: 'object', tema: 'object', tráfico: 'object', tranquilidad: 'object',
  transporte: 'object', traslado: 'object', ubicación: 'object', vida: 'object', viaje: 'object',
  vista: 'object', vistas: 'object', vuelta: 'object', wifi: 'object', entrada: 'object', ventaja: 'object',
  ventanas: 'object', algo: 'object', nada: 'object', nadie: 'object', árboles: 'object', pausa: 'object',
  puente: 'object', fiesta: 'object', toallas: 'object', terrazas: 'object', fines: 'object',
  familia: 'object', playa: 'object', trabajo: 'object', verdad: 'object',

  // ── Proper nouns ──────────────────────────────────────────────
  barcelona: 'object', ucrania: 'object', juan: 'object', madrid: 'object', sevilla: 'object',
  valencia: 'object', europa: 'object', español: 'object',

  // ── Nouns: transport vocabulary (weeks 9–10) ──────────────────
  taquilla: 'object', máquina: 'object', billetes: 'object', billete: 'object', andén: 'object',
  vía: 'object', sala: 'object', horario: 'object', ida: 'object', salida: 'object', llegada: 'object',
  asiento: 'object', equipaje: 'object', pasajero: 'object', pasajera: 'object', revisor: 'object',
  revisora: 'object', conductor: 'object', conductora: 'object', derecha: 'object', palabras: 'object'
};

export default vocabulary;
