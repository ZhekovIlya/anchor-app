// Audition vocabulary by week: { [week]: [{ phrase, target, lang }] }
// 80/20 sliding-window decay is applied by src/web/audition-ui.js.

const vocabularyDB = {
    1: [
        { phrase: "Hola, ¿cómo estás?", target: "hola", lang: "es-ES" },
        { phrase: "Gracias por tu ayuda.", target: "gracias", lang: "es-ES" },
        { phrase: "Adiós, nos vemos.", target: "adiós", lang: "es-ES" },
        { phrase: "Por favor, siéntate.", target: "favor", lang: "es-ES" },
        { phrase: "Lo siento mucho.", target: "siento", lang: "es-ES" },
        { phrase: "Sí, claro.", target: "sí", lang: "es-ES" },
        { phrase: "No, nunca.", target: "no", lang: "es-ES" },
        { phrase: "Bien, gracias.", target: "bien", lang: "es-ES" },
        { phrase: "Mal, me duele.", target: "mal", lang: "es-ES" },
        { phrase: "Quizás mañana.", target: "quizás", lang: "es-ES" }
    ],
    2: [
        { phrase: "Buenos días a todos.", target: "días", lang: "es-ES" },
        { phrase: "Buenas tardes.", target: "tardes", lang: "es-ES" },
        { phrase: "Buenas noches.", target: "noches", lang: "es-ES" },
        { phrase: "Hasta luego.", target: "luego", lang: "es-ES" },
        { phrase: "Hasta pronto.", target: "pronto", lang: "es-ES" },
        { phrase: "Nos vemos mañana.", target: "mañana", lang: "es-ES" },
        { phrase: "Buen fin de semana.", target: "semana", lang: "es-ES" },
        { phrase: "Feliz cumpleaños.", target: "feliz", lang: "es-ES" },
        { phrase: "Buena suerte.", target: "suerte", lang: "es-ES" },
        { phrase: "Buen provecho.", target: "provecho", lang: "es-ES" }
    ],
    3: [
        { phrase: "¿Cómo te llamas?", target: "llamas", lang: "es-ES" },
        { phrase: "Me llamo Juan.", target: "llamo", lang: "es-ES" },
        { phrase: "Mucho gusto.", target: "gusto", lang: "es-ES" },
        { phrase: "Encantado de conocerte.", target: "encantado", lang: "es-ES" },
        { phrase: "¿De dónde eres?", target: "dónde", lang: "es-ES" },
        { phrase: "Soy de España.", target: "soy", lang: "es-ES" },
        { phrase: "¿Cuántos años tienes?", target: "años", lang: "es-ES" },
        { phrase: "Tengo veinte años.", target: "tengo", lang: "es-ES" },
        { phrase: "¿Dónde vives?", target: "vives", lang: "es-ES" },
        { phrase: "Vivo en Madrid.", target: "vivo", lang: "es-ES" }
    ],
    4: [
        { phrase: "¿Qué hora es?", target: "hora", lang: "es-ES" },
        { phrase: "Son las dos.", target: "son", lang: "es-ES" },
        { phrase: "Es la una.", target: "es", lang: "es-ES" },
        { phrase: "¿A qué hora?", target: "qué", lang: "es-ES" },
        { phrase: "Hoy es lunes.", target: "lunes", lang: "es-ES" },
        { phrase: "Ayer fue domingo.", target: "ayer", lang: "es-ES" },
        { phrase: "Mañana es martes.", target: "martes", lang: "es-ES" },
        { phrase: "El próximo mes.", target: "mes", lang: "es-ES" },
        { phrase: "El año pasado.", target: "año", lang: "es-ES" },
        { phrase: "Este fin de semana.", target: "este", lang: "es-ES" }
    ]
};

export default vocabularyDB;
