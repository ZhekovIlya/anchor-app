import json
import re

file_path = "data/week_1.js"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

# We can find the JSON part
start_idx = text.find("const week1Lessons = [") + len("const week1Lessons = ")
end_idx = text.find("];", start_idx) + 1

json_str = text[start_idx:end_idx]
# Since JSON keys in JS are not necessarily quoted, we need a small hack or just replace keys
# But looking at week_1.js: they ARE mostly unquoted.
# Actually, the python demjson or custom parser would be needed.
# Since it's simple JS, let's just do a string replacement on the whole file directly in python.

# Let's replace the chunks manually in python.
replacements = []

# w1_l2
replacements.append((
    'id: "w1_l2", title: "2. Ser + Estar + Ir — Tú / Él"',
    'id: "w1_l2a", title: "2A. Ser + Estar + Ir — Tú / Usted"'
))
# w1_l5
replacements.append((
    'id: "w1_l5", title: "5. Tener + Hacer + Decir — Tú / Él"',
    'id: "w1_l5a", title: "5A. Tener + Hacer + Decir — Tú / Usted"'
))
# w1_l8
replacements.append((
    'id: "w1_l8", title: "8. Ser Sentences — Tú / Él"',
    'id: "w1_l8a", title: "8A. Ser Sentences — Tú / Usted"'
))
# w1_l11
replacements.append((
    'id: "w1_l11", title: "11. Estar Sentences — Tú / Él"',
    'id: "w1_l11a", title: "11A. Estar Sentences — Tú / Usted"'
))
# w1_l14
replacements.append((
    'id: "w1_l14", title: "14. Ir + Tener Sentences — Tú / Él"',
    'id: "w1_l14a", title: "14A. Ir + Tener Sentences — Tú / Usted"'
))

# We need to insert the B parts effectively
# Instead of doing manual replace, I can just write out the fully formed string for week 1 directly since we have it!
# But to be safe, let's use the Python json library after fixing quotes.

def fix_json(s):
    # quote unquoted keys
    s = re.sub(r'([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:', r'\1"\2":', s)
    return s

try:
    data = json.loads(fix_json(json_str))
except Exception as e:
    print("Error parsing JSON:", e)

new_lessons = []
for lesson in data:
    if "— Tú / Él" in lesson["title"]:
        title_a = lesson["title"].replace("— Tú / Él", "— Tú / Usted")
        title_b = lesson["title"].replace("— Tú / Él", "— Él / Ella")
        
        lesson_a = {"id": lesson["id"] + "a", "title": title_a, "phrases": []}
        lesson_b = {"id": lesson["id"] + "b", "title": title_b, "phrases": []}
        
        for phrase in lesson["phrases"]:
            if phrase["meta"]["person"] == "tu":
                lesson_a["phrases"].append(phrase)
            elif phrase["meta"]["person"] == "el":
                lesson_b["phrases"].append(phrase)
                
                # Ella
                ella = json.loads(json.dumps(phrase))
                ella["meta"]["id"] = ella["meta"]["id"].replace("_el_", "_ella_")
                ella["meta"]["person"] = "ella"
                
                ella["ru"] = ella["ru"].replace("Он", "Она").replace("Ему", "Ей").replace("У него", "У нее")
                ella["ru"] = ella["ru"].replace("большой", "большая").replace("маленький", "маленькая").replace("глупый", "глупая").replace("готов", "готова")
                ella["ru"] = ella["ru"].replace("хороший", "хорошая").replace("плохой", "плохая")
                
                ella["es"] = ella["es"].replace("Él ", "Ella ")
                ella["es"] = ella["es"].replace("bueno", "buena").replace("malo", "mala").replace("pequeño", "pequeña").replace("tonto", "tonta").replace("listo", "lista")
                
                ella["tokens"][0]["text"] = "Ella"
                for t in ella["tokens"]:
                    if t["type"] in ["object", "verb"]:
                        t["text"] = t["text"].replace("bueno", "buena").replace("malo", "mala").replace("pequeño", "pequeña").replace("tonto", "tonta").replace("listo", "lista")
                
                lesson_b["phrases"].append(ella)
                
                # Usted
                usted = json.loads(json.dumps(phrase))
                usted["meta"]["id"] = usted["meta"]["id"].replace("_el_", "_usted_")
                usted["meta"]["person"] = "usted"
                
                usted["ru"] = usted["ru"].replace("Он", "Вы (вежливо)").replace("Ему", "Вам (вежливо)").replace("У него", "У вас (вежливо)")
                usted["es"] = usted["es"].replace("Él ", "Usted ")
                usted["tokens"][0]["text"] = "Usted"
                
                lesson_a["phrases"].append(usted)
                
        new_lessons.append(lesson_a)
        new_lessons.append(lesson_b)
    else:
        new_lessons.append(lesson)

out_json = json.dumps(new_lessons, indent=2, ensure_ascii=False)
out_json = re.sub(r'"([a-zA-Z_][a-zA-Z0-9_]*)":', r'\1:', out_json) # strip quotes from keys to match style

out_js = f"""window.AnchorData = window.AnchorData || [];

const week1Lessons = {out_json};

window.AnchorData.push({{
  id: "week_1",
  title: "Week 1: Identity & Core Verbs",
  description: "Ser, Estar, Ir, Tener, Hacer, Decir — Present Tense (Yo/Tú/Él/Nosotros)",
  legacy: false,
  lessons: week1Lessons
}});
"""

# Try to compact the phrases list
out_js = re.sub(r'\{\n\s+text: "([^"]+)",\n\s+type: "([^"]+)"\n\s+\}', r'{text:"\1",type:"\2"}', out_js)
out_js = re.sub(r'ru: "([^"]+)",\n\s+es: "([^"]+)",\n\s+tokens: \[\n\s+(.+?)\n\s+\],\n\s+meta', r'ru:"\1",es:"\2",tokens:[\3],meta', out_js, flags=re.DOTALL)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(out_js)

print("Done")
