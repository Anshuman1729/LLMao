import { Creator } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

const nicheConfig = {
  fashion: { label: 'Fashion', emoji: '👗', variant: 'pink' as const },
  beauty: { label: 'Beauty', emoji: '💄', variant: 'purple' as const },
  lifestyle: { label: 'Lifestyle', emoji: '✨', variant: 'orange' as const },
  food: { label: 'Food', emoji: '🍽️', variant: 'green' as const },
  home: { label: 'Home Decor', emoji: '🏠', variant: 'blue' as const },
};

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function CreatorCard({ creator }: { creator: Creator }) {
  const niche = nicheConfig[creator.niche] ?? nicheConfig.lifestyle;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
      <div className="relative flex-shrink-0">
        <img
          src={creator.profile_pic}
          alt={creator.name}
          className="w-20 h-20 rounded-full object-cover border-3 border-pink-200"
        />
        <span className="absolute -bottom-1 -right-1 text-xl">{niche.emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-xl font-bold text-gray-900 truncate">{creator.name}</h2>
          <Badge label={niche.label} variant={niche.variant} />
        </div>
        <p className="text-sm text-gray-500 mb-2">@{creator.username}</p>
        <p className="text-xs text-gray-400 italic truncate">{creator.bio}</p>
        <div className="mt-3 flex items-center gap-1">
          <span className="text-2xl font-bold text-pink-600">{formatFollowers(creator.follower_count)}</span>
          <span className="text-sm text-gray-500">followers</span>
        </div>
      </div>
    </div>
  );
}
