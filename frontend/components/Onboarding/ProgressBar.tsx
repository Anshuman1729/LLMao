interface ProgressBarProps {
  current: number; // 0-indexed (0 = category, 1 = creator_type, 2 = instagram)
  total?: number;
}

export function ProgressBar({ current, total = 3 }: ProgressBarProps) {
  return (
    <div className="flex gap-1.5 w-full px-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex-1 h-1 rounded-full transition-colors duration-300"
          style={{ backgroundColor: i <= current ? '#E91E8C' : '#E0E0E0' }}
        />
      ))}
    </div>
  );
}
