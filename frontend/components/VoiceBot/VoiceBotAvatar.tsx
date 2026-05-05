'use client';

interface VoiceBotAvatarProps {
  isPlaying: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function VoiceBotAvatar({ isPlaying, size = 'md' }: VoiceBotAvatarProps) {
  const sizeMap = { sm: 'w-16 h-16', md: 'w-24 h-24', lg: 'w-32 h-32' };

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse rings when playing */}
      {isPlaying && (
        <>
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-30 animate-ping" />
          <span className="absolute inline-flex rounded-full bg-pink-300 opacity-20 animate-ping animation-delay-150"
            style={{ width: '120%', height: '120%' }} />
        </>
      )}
      <div
        className={`${sizeMap[size]} relative rounded-full overflow-hidden border-4 ${
          isPlaying ? 'border-pink-500 shadow-lg shadow-pink-300' : 'border-pink-200'
        } transition-all duration-300`}
      >
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=ritu&backgroundColor=ffdfbf&accessories=earrings&clothingGraphic=bear&eyebrows=default&eyes=happy&facialHair=blank&hairColor=black&mouth=smile&skinColor=light&top=longHairStraight"
          alt="Ritu - Style Bazaar Assistant"
          className="w-full h-full object-cover"
        />
      </div>
      {isPlaying && (
        <div className="absolute -bottom-1 -right-1 bg-pink-500 rounded-full p-1">
          <SpeakerIcon />
        </div>
      )}
    </div>
  );
}

function SpeakerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
    </svg>
  );
}
