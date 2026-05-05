'use client';

interface VoiceBotBubbleProps {
  text: string;
  isPlaying: boolean;
}

export function VoiceBotBubble({ text, isPlaying }: VoiceBotBubbleProps) {
  return (
    <div className="relative bg-white rounded-2xl rounded-tl-none px-5 py-4 shadow-md border border-pink-100 max-w-sm">
      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
      {isPlaying && (
        <div className="flex gap-1 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
