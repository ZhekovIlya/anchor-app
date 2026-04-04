// Validation script — run in browser console or paste into an HTML file
// Checks that all token.text concatenated === es string for every phrase in week_1.js
(function validate() {
  const lessons = window.AnchorData.flatMap(t => t.lessons);
  let pass = 0, fail = 0;
  lessons.forEach(l => {
    if (l.exam) return;
    l.phrases.forEach((p, i) => {
      const built = p.tokens.map(t => t.text).join('');
      if (built === p.es) { pass++; }
      else { fail++; console.error(`MISMATCH [${l.id}] phrase ${i}: built="${built}" vs es="${p.es}"`); }
    });
  });
  console.log(`Validation complete: ${pass} PASS, ${fail} FAIL`);
})();
