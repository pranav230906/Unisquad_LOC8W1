import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const VoiceInputButton = ({ onTranscript, onCommand }) => {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US"; // Defaulted to English for command matching, but can be dynamic

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      if (onTranscript) onTranscript(currentTranscript);
      if (onCommand) onCommand(currentTranscript.toLowerCase());
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setError(event.error === "not-allowed" ? "Permission denied" : "Speech not detected");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const toggleListening = () => {
    if (!recognition) {
      alert(t("voice_not_supported"));
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={toggleListening}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-90 ${isListening
            ? "bg-red-500 animate-pulse shadow-red-200"
            : "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
          }`}
      >
        <span className="text-2xl text-white">
          {isListening ? "⏹️" : "🎤"}
        </span>
        {isListening && (
          <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></span>
        )}
      </button>

      {isListening && (
        <p className="text-sm font-bold text-red-500 animate-bounce">{t("listening")}</p>
      )}

      {transcript && !isListening && (
        <p className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 max-w-[200px] text-center truncate italic">
          "{transcript}"
        </p>
      )}

      {error && (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      )}
    </div>
  );
};

export default VoiceInputButton;
