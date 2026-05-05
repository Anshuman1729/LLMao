'use client';

import { useState } from 'react';

interface CreatorProfile {
  id: string;
  name: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
}

const CREATOR_TYPES: CreatorProfile[] = [
  {
    id: 'nano',
    name: 'Priya Kapoor',
    posts: 183,
    followers: 2840,
    following: 1560,
    bio: 'Lifestyle & fashion creator | Sharing everyday outfits and home finds | Open for collaborations',
  },
  {
    id: 'micro',
    name: 'Neha Sharma',
    posts: 412,
    followers: 28500,
    following: 890,
    bio: 'Beauty & skincare enthusiast | Product reviews | Brand partnerships | Creating content that converts',
  },
  {
    id: 'mid',
    name: 'Ananya Singh',
    posts: 891,
    followers: 145000,
    following: 320,
    bio: 'Top fashion creator | Style tips & outfit ideas | Collaborated with 50+ brands | DM for partnerships',
  },
  {
    id: 'reviewer',
    name: 'Ritu Agarwal',
    posts: 267,
    followers: 8900,
    following: 2100,
    bio: 'Honest product reviewer | Home decor | Budget finds | Helping you shop smart on Meesho',
  },
];

function fmt(n: number): string {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

interface CreatorTypePickerProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function CreatorTypePicker({ selected, onSelect }: CreatorTypePickerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');

  return (
    <div className="w-full flex flex-col gap-3">
      {CREATOR_TYPES.map((creator) => {
        const isSelected = selected === creator.id;
        const isExpanded = expanded === creator.id;

        return (
          <div
            key={creator.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />

              {/* Stats */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 mb-1">{creator.name}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span><span className="font-semibold text-gray-800">{creator.posts}</span> posts</span>
                  <span><span className="font-semibold text-gray-800">{fmt(creator.followers)}</span> followers</span>
                  <span><span className="font-semibold text-gray-800">{fmt(creator.following)}</span> following</span>
                </div>
              </div>

              {/* Radio + expand */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpanded(isExpanded ? null : creator.id)}
                  className="text-gray-400 text-xs"
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
                <button
                  onClick={() => onSelect(creator.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-rose-700 border-rose-700' : 'border-gray-300'
                  }`}
                >
                  {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                </button>
              </div>
            </div>

            {/* Expanded bio */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-50">
                <p className="text-xs text-gray-500 leading-relaxed pt-3">{creator.bio}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Custom input */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <input
          type="text"
          placeholder="Write or speak out yours"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="flex-1 text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
        <MicIcon />
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
