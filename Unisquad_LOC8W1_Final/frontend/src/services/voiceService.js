export async function startSpeechToText({ lang = "hi-IN", onPartial, onFinal }) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) throw new Error("SpeechRecognition not supported (try Chrome).");

  const rec = new SpeechRecognition();
  rec.lang = lang;
  rec.interimResults = true;
  rec.continuous = false;

  rec.onresult = (event) => {
    let interim = "";
    let final = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) final += transcript;
      else interim += transcript;
    }
    if (interim && onPartial) onPartial(interim);
    if (final && onFinal) onFinal(final);
  };

  rec.start();
  return { stop: () => rec.stop() };
}