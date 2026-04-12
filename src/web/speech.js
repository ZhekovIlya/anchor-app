// ========================
// WEB SPEECH API WRAPPER
// ========================
// Browser-specific TTS. Not used by Telegram bot.

/**
 * Cancel any ongoing speech.
 */
export function cancelSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speak the Russian prompt.
 * @param {string} text
 * @param {string} [lang='ru-RU']
 */
export function speakPrompt(text, lang = 'ru-RU') {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

/**
 * Speak the Spanish answer, then call onDone when finished.
 * @param {string} text
 * @param {Function} onDone - Called when speech ends (or after timeout fallback)
 */
export function speakAnswer(text, onDone) {
  if (!('speechSynthesis' in window)) {
    setTimeout(onDone, 1500);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';

  let isFired = false;
  const finish = () => {
    if (!isFired) {
      isFired = true;
      onDone();
    }
  };

  utterance.onend = finish;
  utterance.onerror = finish;

  // Fallback if events don't fire
  setTimeout(finish, Math.max(2000, text.length * 100));

  window.speechSynthesis.speak(utterance);
}
