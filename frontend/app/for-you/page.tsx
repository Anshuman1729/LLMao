'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCreator, getBuyerInsights } from '@/lib/api';
import { Creator, BuyerInsights } from '@/lib/types';
import { BuyerInsightsSheet } from '@/components/Home/BuyerInsightsSheet';
import { BottomNav } from '@/components/Home/BottomNav';

// Sample content for AutoDM posts section
const MOCK_POSTS = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=250&fit=crop',
    dmSent: 5,
    clicks: 2,
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop',
    dmSent: 15,
    clicks: 5,
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=250&fit=crop',
    dmSent: 8,
    clicks: 3,
  },
];

const CONTENT_IDEAS = [
  {
    img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop',
    orders: '10K',
  },
  {
    img: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=300&h=400&fit=crop',
    orders: '8K',
  },
  {
    img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&h=400&fit=crop',
    orders: '5K',
  },
];

function InstagramIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#9CA3AF">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MascotIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="https://i.postimg.cc/XY4nFJPX/image-3.png" alt="mascot" className="w-8 h-8 object-contain" />
  );
}

export default function ForYouPage() {
  const router = useRouter();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [insights, setInsights] = useState<BuyerInsights | null>(null);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    async function load() {
      const [c, i] = await Promise.all([getCreator(), getBuyerInsights()]);
      setCreator(c);
      setInsights(i);
    }
    load().catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-[#0F0F23] pb-24">
      {/* Header */}
      <header className="px-4 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-yellow-400/60">
            {creator ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={creator.profile_pic} alt={creator.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-yellow-400 animate-pulse" />
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{creator?.name ?? '—'}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
              <InstagramIcon />
              {creator ? `@${creator.username}` : ''}
            </p>
          </div>
        </div>
        <button className="bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5">
          <YouTubeIcon />
          Content Guide
        </button>
      </header>

      <div className="px-4 flex flex-col gap-5">
        {/* AutoDM Posts */}
        <section>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3">AutoDM Posts</p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {/* Add post */}
            <div className="flex-shrink-0 w-[70px] h-[88px] border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
              <span className="text-gray-500 text-3xl leading-none">+</span>
            </div>
            {MOCK_POSTS.map((post) => (
              <div key={post.id} className="flex-shrink-0 w-[70px] h-[88px] rounded-xl overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-1 right-1">
                  <span className="text-[8px] text-pink-300">✦</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-black/65 px-1.5 py-1">
                  <p className="text-white text-[8px] leading-tight">DM sent <span className="font-bold">{post.dmSent}</span></p>
                  <p className="text-gray-300 text-[8px]">Clicks <span className="font-bold">{post.clicks}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Understand your buyers */}
        <button
          onClick={() => setShowInsights(true)}
          className="w-full bg-[#1E1E35] rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <MascotIcon />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-white font-semibold text-sm">Growth Studio</p>
              <span className="bg-[#FF2D7B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">NEW</span>
            </div>
            <p className="text-gray-400 text-xs leading-snug">
              Know your Existing and Future Buyers
            </p>
          </div>
          <ChevronRightIcon />
        </button>

        {/* Get commission link */}
        <div className="bg-[#1E1E35] rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform">
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <span className="text-white text-[10px] font-extrabold">IG</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-extrabold">YT</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-extrabold">FB</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">Get commission link</p>
            <p className="text-gray-400 text-xs">Share on Insta stories/YT shorts</p>
          </div>
          <ChevronRightIcon />
        </div>

        {/* Best Product Matches */}
        <div
          className="bg-[#1E1E35] rounded-2xl p-4 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
          onClick={() => router.push('/products')}
        >
          <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <MascotIcon />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">Best Product Matches</p>
            <p className="text-gray-400 text-xs">For your audience &amp; your style</p>
          </div>
          <ChevronRightIcon />
        </div>

        {/* Content ideas from best-selling reels */}
        <section>
          <p className="text-white font-semibold text-sm mb-3">
            Content ideas from best-selling reels
          </p>
          <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
            {CONTENT_IDEAS.map((idea, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-28 h-40 rounded-xl overflow-hidden relative cursor-pointer"
                onClick={() => router.push('/content-ideas')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={idea.img} alt="" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {idea.orders} Orders
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-28 h-40 rounded-xl bg-[#1E1E35] flex items-center justify-center cursor-pointer">
              <span className="text-gray-400 text-sm font-medium">+more</span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom nav */}
      <BottomNav active="home" />

      {/* Buyer insights overlay */}
      {insights && (
        <BuyerInsightsSheet
          insights={insights}
          open={showInsights}
          onClose={() => setShowInsights(false)}
          niche={creator?.niche}
        />
      )}
    </main>
  );
}
