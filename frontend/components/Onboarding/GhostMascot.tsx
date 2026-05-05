interface GhostMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_MAP = { sm: 56, md: 90, lg: 130, xl: 200 };

export function GhostMascot({ size = 'md', className = '' }: GhostMascotProps) {
  const px = SIZE_MAP[size];
  return (
    <svg
      width={px}
      height={Math.round(px * 1.18)}
      viewBox="0 0 100 118"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main blob body */}
      <path
        d="M50,6 C22,6 13,34 13,58 C13,86 30,108 50,108 C70,108 87,86 87,58 C87,34 78,6 50,6 Z"
        fill="#F4A4C0"
      />
      {/* Left arm */}
      <ellipse cx="9" cy="70" rx="9" ry="13" fill="#F4A4C0" transform="rotate(-18 9 70)" />
      {/* Right arm */}
      <ellipse cx="91" cy="66" rx="9" ry="13" fill="#F4A4C0" transform="rotate(18 91 66)" />
      {/* Left eye — large dark circle */}
      <circle cx="39" cy="52" r="13" fill="#C0194A" />
      <circle cx="43" cy="47" r="5" fill="white" />
      {/* Right eye — winking arc */}
      <path d="M58,51 Q67,43 76,51" stroke="#C0194A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <circle cx="54" cy="63" r="2.5" fill="#C0194A" opacity="0.45" />
      {/* Smile */}
      <path d="M38,74 Q52,88 66,74" stroke="#C0194A" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Cheek blush */}
      <circle cx="26" cy="68" r="9" fill="#E860A0" opacity="0.16" />
      <circle cx="74" cy="68" r="9" fill="#E860A0" opacity="0.16" />
      {/* Ground shadow */}
      <ellipse cx="50" cy="115" rx="34" ry="5" fill="#D880A8" opacity="0.18" />
    </svg>
  );
}
