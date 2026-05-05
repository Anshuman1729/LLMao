'use client';

import { useState, useCallback } from 'react';

interface MicInputProps {
  onResult: (transcript: string) => void;
}

export function MicButton({ onResult }: MicInputProps) {
  const [listening, setListening] = useState(false);

  const start = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript.toLowerCase());
    };

    recognition.start();
  }, [onResult]);

  return (
    <button
      onClick={start}
      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
        listening
          ? 'bg-rose-600 scale-110 shadow-rose-300'
          : 'bg-pink-600 hover:bg-pink-700 hover:scale-105'
      }`}
      aria-label="Speak your answer"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
      {listening && (
        <span className="absolute w-16 h-16 rounded-full bg-pink-400 opacity-30 animate-ping" />
      )}
    </button>
  );
}
