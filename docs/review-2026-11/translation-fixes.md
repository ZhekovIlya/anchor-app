# Translation audit — fixes to apply (2026-11-16)

All 1,098 drillable phrases and 264 words were read ES ↔ RU ↔ UK. These are the items where the
prompt and the Spanish disagree, the prompt is broken, or two different answers share one prompt.
Reference format: `lessonId#index` (index is the 0-based position inside the lesson — do not reorder).

Rule used: when the Russian/Ukrainian says something the Spanish does not, fix whichever side keeps
the sentence natural. For the «после парка» family the Spanish was missing `después`.

## A. Spanish was wrong or incomplete (change `es`; RU/UK stay unless given)

| Ref | Current es | New es | Also change |
|---|---|---|---|
| w4_l3#2 | El perro está sucio del parque | El perro está sucio después del parque | — |
| w4_l10#0 | Ellos usan la ducha del parque | Ellos usan la ducha después del parque | — |
| w5_l19#2 | Yo lavé el perro del parque | Yo lavé el perro después del parque | — |
| w5_l19#5 | Yo sequé las patas del parque | Yo sequé las patas después del parque | — |
| w4_l7#4 | Tú necesitas la ducha para el parque | Tú necesitas la ducha después del parque | ru: «Тебе нужен душ после парка» · uk: «Тобі потрібен душ після парку» |
| w8_l6#5 | Me alegro un montón de verte a las y media. | Me alegro un montón de verte a las ocho y media. | ru: «Я очень рад видеть тебя в половине девятого.» · uk: «Я дуже радий бачити тебе о пів на дев'яту.» |
| w8_l6#3 | Qué pena, nunca cenas conmigo en punto. | Qué pena, nunca cenas conmigo a las nueve en punto. | ru: «Как жаль, ты никогда не ужинаешь со мной ровно в девять.» · uk: «Як шкода, ти ніколи не вечеряєш зі мною рівно о дев'ятій.» |
| w11_l5#5 | Él no pudo venir a la clase porque estuvo cansado. | Él no pudo venir a la clase porque estuvo enfermo. | ru: «Он не смог прийти на урок, потому что болел.» · uk: «Він не зміг прийти на урок, тому що хворів.» |

Any new Spanish word must be present in `data/vocabulary.js` (`después`, `ocho`, `nueve`, `enfermo`
— check with `node scripts/audit-data.js --unknown`).

## B. Russian / Ukrainian was wrong (change only the listed field)

| Ref | es | Field | Current | New |
|---|---|---|---|---|
| w1_l2b#1 | Ella está | ru | Она находилась | Она находится |
| w1_l2b#2 | Usted va | ru | Вы идет (вежливо) | Вы идёте (вежливо) |
| w1_l2b#4 | Ella no va | uk | Вона не йду | Вона не йде |
| w1_l5b#5 | Usted no hace | ru / uk | Вы не делаете / Ви не робите | Вы не делаете (вежливо) / Ви не робите (ввічливо) |
| w2_l13#5 | Usted dice | ru | Вы (вежливо) кажете | Вы (вежливо) говорите |
| w4_l11#5 | La casa está limpia | ru / uk | Дом чистый после уборки / Будинок чистий після прибирання | Дом чистый / Будинок чистий |
| w4_l13#3 | Ella lava la cocina con el agua | ru / uk | моет кухню с водой / миє кухню з водою | Она моет кухню водой / Вона миє кухню водою |
| w7_l21#2 | ¿Cuáles son los mismos problemas? | ru / uk | Какие у вас те же проблемы? / Які у вас ті самі проблеми? | Какие проблемы те же самые? / Які проблеми ті самі? |
| w14_l1#5 | Nos mudamos de casa hace tres años. | ru / uk | Мы переехали из дома три года назад. / Ми переїхали з будинку три роки тому. | Мы переехали (сменили жильё) три года назад. / Ми переїхали (змінили житло) три роки тому. |
| w11_l1#4 | ¿Ustedes llegaron a tiempo a la estación? | ru / uk | Вы прибыли вовремя на станцию? / Ви прибули вчасно на станцію? | Вы (вежливо, мн.ч.) прибыли вовремя на станцию? / Ви (ввічливо, мн.) прибули вчасно на станцію? |

## C. Same prompt, two different answers (`usted` vs `ustedes` in week 1)

In week 1 the `ustedes` phrases are labelled «(вежливо)» exactly like the `usted` ones, so the prompt
cannot tell them apart (e.g. «Вы умны (вежливо)» is both `Usted es inteligente` and
`Ustedes son inteligentes`). Weeks 2–3 already use «(мн.ч.)» / «(мн.)» for `ustedes`. Make week 1
consistent: in every week-1 phrase whose `es` starts with `Ustedes`, replace «(вежливо)» with
«(мн.ч.)» in `ru` and «(ввічливо)» with «(мн.)» in `uk`; where such a phrase has no marker, add one.
Also fix the verb while there:

| Ref | es | New ru | New uk |
|---|---|---|---|
| w1_l3b#2 | Ustedes van | Вы идёте (мн.ч.) | Ви йдете (мн.) |
| w1_l3b#5 | Ustedes no van | Вы не идёте (мн.ч.) | Ви не йдете (мн.) |
| w1_l6b#2 | Ustedes dicen | Вы говорите (мн.ч.) | Ви кажете (мн.) |
| w1_l6b#5 | Ustedes no dicen | Вы не говорите (мн.ч.) | Ви не кажете (мн.) |
| w1_l9b#2 | Ustedes son inteligentes | Вы умные (мн.ч.) | Ви розумні (мн.) |
| w1_l9b#5 | Ustedes no son grandes | Вы не большие (мн.ч.) | Ви не великі (мн.) |
| w1_l12b#2 | Ustedes están aquí | Вы здесь (мн.ч.) | Ви тут (мн.) |
| w1_l12b#5 | Ustedes no están listos | Вы не готовы (мн.ч.) | Ви не готові (мн.) |
| w1_l15b#2 | Ustedes van a casa | Вы идёте домой (мн.ч.) | Ви йдете додому (мн.) |
| w1_l15b#5 | Ustedes no tienen dinero | У вас нет денег (мн.ч.) | У вас немає грошей (мн.) |

## D. Words (`data/words/*.js`)

| Ref | es | New ru | New uk | Why |
|---|---|---|---|---|
| ww_l1#8 | calor | жара | спека | noun, was translated as an adverb |
| ww_l1#9 | frío | холод | холод | same |
| ww_l1#10 | templado | тёплый, умеренный | теплий, помірний | adjective |
| wt_l3#4 | tarde | день после полудня / вечер | пообіддя / вечір | `tarde` starts at noon |
| wtf_l1#9 | y cuarto | с четвертью (о времени) | з чвертю (про час) | fragment was untranslatable |
| wtf_l1#10 | y media | с половиной (о времени) | з половиною (про час) | same |
| wd_l1#6 | al lado | рядом (наречие) | поруч (прислівник) | «сбоку» is `a un lado` |

## E. Noted, deliberately not changed

- Week 7 and parts of weeks 8, 12 use perfect / imperfect / conditional chunks (`me he liado`,
  `no tenía ni idea`, `¿Cuánto costaría?`). They are taught as fixed conversational formulas; the
  translations are accurate. Whether they belong in an A1–A2 scope is the owner's call.
- `Él pide la tarjeta en la farmacia` and similar week-6 sentences are odd but aligned.
- Subjectless 3rd-person phrases in week 14 (`Vivió…` «Он…», `Dedicó…` «Она…») cannot be wrong either way.
