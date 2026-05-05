'use client';

import { useState } from 'react';

interface CreatorProfile {
  id: string;
  handle: string;
  posts: number;
  followers: number;
  following: number;
  bio: string;
}

const FASHION_CREATORS: CreatorProfile[] = [
  {
    id: 'aadhu_finds',
    handle: 'aadhu_finds',
    posts: 245,
    followers: 12400,
    following: 890,
    bio: 'Fashion & lifestyle finds | Budget hauls | Meesho faves ✨ | Daily OOTD',
  },
  {
    id: 'tanisha_patel_192',
    handle: 'tanisha_patel_192',
    posts: 388,
    followers: 45200,
    following: 1200,
    bio: 'Ethnic wear lover | Daily OOTD | Meesho must-haves | Collaborations DM me',
  },
  {
    id: 'tiya_finds',
    handle: 'tiya_finds',
    posts: 156,
    followers: 5800,
    following: 2100,
    bio: 'Budget fashion finds | Meesho hauls | Affordable styling tips for every occasion',
  },
  {
    id: 'iiamsada',
    handle: 'iiamsada',
    posts: 512,
    followers: 128000,
    following: 445,
    bio: 'Top fashion creator | Style tips | 100+ brand collabs | Meesho ambassador',
  },
];

const HOME_DECOR_CREATORS: CreatorProfile[] = [
  {
    id: 'anithashamanth_meesho',
    handle: 'anithashamanth_meesho',
    posts: 198,
    followers: 22400,
    following: 1500,
    bio: 'Home decor on a budget | Meesho home finds | Room transformation reels',
  },
  {
    id: 'velvety_vibezz',
    handle: 'velvety_vibezz',
    posts: 134,
    followers: 8900,
    following: 2300,
    bio: 'Aesthetic home decor | Budget room makeovers | Meesho shopping guide',
  },
  {
    id: 'smart_shopping_queen44',
    handle: 'smart_shopping_queen44',
    posts: 321,
    followers: 36800,
    following: 980,
    bio: 'Smart home shopping | Budget finds | Storage solutions | Meesho home hauls',
  },
  {
    id: 'dindustyles',
    handle: 'dindustyles',
    posts: 267,
    followers: 15200,
    following: 1100,
    bio: 'Desi home decor | Traditional meets modern | Meesho home collection',
  },
];

const DEFAULT_CREATORS: CreatorProfile[] = [
  {
    id: 'nano_creator',
    handle: 'priya.kapoor',
    posts: 183,
    followers: 2840,
    following: 1560,
    bio: 'Lifestyle & fashion creator | Sharing everyday outfits and home finds | Open for collaborations',
  },
  {
    id: 'micro_creator',
    handle: 'neha.sharma',
    posts: 412,
    followers: 28500,
    following: 890,
    bio: 'Beauty & skincare enthusiast | Product reviews | Brand partnerships | Creating content that converts',
  },
  {
    id: 'mid_creator',
    handle: 'ananya.singh',
    posts: 891,
    followers: 145000,
    following: 320,
    bio: 'Top fashion creator | Style tips & outfit ideas | Collaborated with 50+ brands | DM for partnerships',
  },
  {
    id: 'reviewer_creator',
    handle: 'ritu.agarwal',
    posts: 267,
    followers: 8900,
    following: 2100,
    bio: 'Honest product reviewer | Home decor | Budget finds | Helping you shop smart on Meesho',
  },
];

function creatorsForNiche(niche: string | null): CreatorProfile[] {
  if (niche === 'fashion') return FASHION_CREATORS;
  if (niche === 'home-decor') return HOME_DECOR_CREATORS;
  return DEFAULT_CREATORS;
}

function fmt(n: number): string {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  return (
    <div
      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
        checked ? 'bg-[#FF2D7B] border-[#FF2D7B]' : 'border-gray-300 bg-white'
      }`}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <polyline points="2,6 5,9 10,3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

interface CreatorTypePickerProps {
  niche: string | null;
  selected: string[];
  onSelect: (ids: string[]) => void;
}

export function CreatorTypePicker({ niche, selected, onSelect }: CreatorTypePickerProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const creators = creatorsForNiche(niche);

  function toggle(id: string) {
    if (selected.includes(id)) {
      onSelect(selected.filter((s) => s !== id));
    } else {
      onSelect([...selected, id]);
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      {creators.map((creator) => {
        const isSelected = selected.includes(creator.id);
        const isExpanded = expanded === creator.id;
        const avatarSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${creator.handle}`;

        return (
          <div
            key={creator.id}
            className={`rounded-2xl border shadow-sm overflow-hidden transition-colors ${
              isSelected ? 'bg-pink-50 border-pink-200' : 'bg-white border-gray-100'
            }`}
          >
            <div className="flex items-center gap-3 p-4">
              {/* Avatar */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt={creator.handle}
                className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0"
              />

              {/* Handle + stats */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 mb-1">@{creator.handle}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span><span className="font-semibold text-gray-800">{creator.posts}</span> posts</span>
                  <span><span className="font-semibold text-gray-800">{fmt(creator.followers)}</span> followers</span>
                  <span><span className="font-semibold text-gray-800">{fmt(creator.following)}</span> following</span>
                </div>
              </div>

              {/* Expand + checkbox */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpanded(isExpanded ? null : creator.id)}
                  className="text-gray-400 text-xs p-1"
                >
                  {isExpanded ? '▲' : '▼'}
                </button>
                <button onClick={() => toggle(creator.id)}>
                  <CheckboxIcon checked={isSelected} />
                </button>
              </div>
            </div>

            {/* Expanded bio */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 leading-relaxed pt-3">{creator.bio}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
