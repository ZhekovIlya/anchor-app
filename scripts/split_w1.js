const fs = require('fs');

const file = 'data/week_1.js';
const content = fs.readFileSync(file, 'utf-8');

global.window = { AnchorData: [] };
eval(content);

const lessons = window.AnchorData[0].lessons;
const newLessons = [];

for (const lesson of lessons) {
  if (lesson.title.includes('— Tú / Él')) {
    const titleA = lesson.title.replace('— Tú / Él', '— Tú / Usted');
    const titleB = lesson.title.replace('— Tú / Él', '— Él / Ella');
    const baseId = lesson.id;
    const lessonA = { id: baseId + 'a', title: titleA, phrases: [] };
    const lessonB = { id: baseId + 'b', title: titleB, phrases: [] };
    
    for (const phrase of lesson.phrases) {
      if (phrase.meta.person === 'tu') {
        lessonA.phrases.push(phrase);
      } else if (phrase.meta.person === 'el') {
        lessonB.phrases.push(phrase);
        
        // Ella phrase
        const ellaPhrase = JSON.parse(JSON.stringify(phrase));
        ellaPhrase.meta.id = ellaPhrase.meta.id.replace('_el_', '_ella_').replace('_el', '_ella');
        ellaPhrase.meta.person = 'ella';
        
        ellaPhrase.ru = ellaPhrase.ru.replace('Он', 'Она').replace('Ему', 'Ей').replace('У него', 'У нее');
        ellaPhrase.es = ellaPhrase.es.replace('Él ', 'Ella ');
        ellaPhrase.tokens[0].text = 'Ella';
        
        // Gender replacements
        ellaPhrase.ru = ellaPhrase.ru.replace('большой', 'большая').replace('маленький', 'маленькая').replace('глупый', 'глупая').replace('готов', 'готова');
        ellaPhrase.ru = ellaPhrase.ru.replace('хороший', 'хорошая').replace('плохой', 'плохая');
        
        ellaPhrase.es = ellaPhrase.es.replace('bueno', 'buena').replace('malo', 'mala').replace('pequeño', 'pequeña').replace('tonto', 'tonta').replace('listo', 'lista');
        
        for (const token of ellaPhrase.tokens) {
            token.text = token.text.replace('bueno', 'buena').replace('malo', 'mala').replace('pequeño', 'pequeña').replace('tonto', 'tonta').replace('listo', 'lista');
        }
        
        lessonB.phrases.push(ellaPhrase);
        
        // Usted phrase
        const ustedPhrase = JSON.parse(JSON.stringify(phrase));
        ustedPhrase.meta.id = ustedPhrase.meta.id.replace('_el_', '_usted_').replace('_el', '_usted');
        ustedPhrase.meta.person = 'usted';
        
        ustedPhrase.ru = ustedPhrase.ru.replace('Он', 'Вы (вежливо)').replace('Ему', 'Вам (вежливо)').replace('У него', 'У вас (вежливо)');
        ustedPhrase.es = ustedPhrase.es.replace('Él ', 'Usted ');
        ustedPhrase.tokens[0].text = 'Usted';
        
        lessonA.phrases.push(ustedPhrase);
      }
    }
    newLessons.push(lessonA);
    newLessons.push(lessonB);
  } else {
    newLessons.push(lesson);
  }
}

let outContent = `window.AnchorData = window.AnchorData || [];\n\nconst week1Lessons = ${JSON.stringify(newLessons, null, 2)};\n\nwindow.AnchorData.push({\n  id: "week_1",\n  title: "Week 1: Identity & Core Verbs",\n  description: "Ser, Estar, Ir, Tener, Hacer, Decir — Present Tense (Yo/Tú/Él/Nosotros)",\n  legacy: false,\n  lessons: week1Lessons\n});\n`;

// fix formatting so it's not so vertically long
outContent = outContent.replace(/\{\n\s+"text":/g, '{ "text":');
outContent = outContent.replace(/,\n\s+"type":/g, ', "type":');
outContent = outContent.replace(/"\n\s+\}/g, '" }');
outContent = outContent.replace(/\[\n\s+\{\s+"text":(.+?)\}\n\s+\]/g, '[$1]'); // single tokens
// Not perfect but works

fs.writeFileSync(file, outContent);
console.log('Week 1 rewritten!');
