'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCreator } from '@/lib/api';
import { getVibesForNiche, getYourProductsForNiche } from '@/lib/mock-products';

type Tab = 'orders' | 'wishlist' | 'paste';

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function MetricBar({ label, value, total = 5 }: { label: string; value: number; total?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] text-gray-400 w-24 flex-shrink-0">{label}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: total }, (_, i) => (
          <div key={i} className={`w-2.5 h-1.5 rounded-full ${i < value ? 'bg-[#FF2D7B]' : 'bg-gray-200'}`} />
        ))}
      </div>
      <span className="text-[9px] text-gray-400">{value}/{total}</span>
    </div>
  );
}

const TABS: Array<{ id: Tab; icon: string; label: string }> = [
  { id: 'orders', icon: '⊙', label: 'Orders' },
  { id: 'wishlist', icon: '♡', label: 'Wishlist' },
  { id: 'paste', icon: '🔗', label: 'Paste Link' },
];

export default function ProductsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('orders');
  const [niche, setNiche] = useState<string>('fashion');

  useEffect(() => {
    getCreator()
      .then((c) => setNiche(c.niche ?? 'fashion'))
      .catch(() => {});
  }, []);

  const vibes = getVibesForNiche(niche);
  const yourProducts = getYourProductsForNiche(niche);

  return (
    <main className="min-h-screen bg-white">
      {/* Dark header */}
      <div className="bg-[#2D1B4E] px-5 pt-6 pb-10 relative overflow-hidden">
        <button
          onClick={() => router.back()}
          className="flex items-center text-white/70 mb-6"
        >
          <BackArrow />
        </button>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-white leading-tight mb-1.5">
              Best product<br />matches for you!
            </h1>
            <p className="text-white/50 text-xs">Exclusive unlimited returns!</p>
          </div>
          <div className="flex flex-col items-center gap-1 mb-2 opacity-90">
            {niche === 'home' ? (
              <>
                <span className="text-4xl">🏠</span>
                <span className="text-2xl">🪴</span>
              </>
            ) : (
              <>
                <span className="text-4xl">🛋️</span>
                <span className="text-2xl">🪔</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="bg-white rounded-t-3xl pt-5 flex flex-col gap-6">
          {/* Choose Your Vibe */}
          <section>
            <SectionDivider label="Choose your vibe" />
            <div className="flex flex-col gap-3">
              {vibes.map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => router.push(`/products/${vibe.id}?niche=${niche}`)}
                  className="flex items-center gap-4 border border-gray-100 rounded-2xl p-3 shadow-sm text-left active:scale-[0.98] transition-transform w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vibe.img}
                    alt={vibe.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/f3f4f6/9ca3af?text=Vibe';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 mb-0.5">{vibe.title}</p>
                    <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-1.5">{vibe.description}</p>
                    {vibe.demand !== undefined && (
                      <div className="flex flex-col gap-0.5">
                        <MetricBar label="Demand" value={vibe.demand} />
                        {vibe.contentAvailable !== undefined && (
                          <MetricBar label="Content available" value={vibe.contentAvailable} />
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-300 text-lg flex-shrink-0">›</span>
                </button>
              ))}
            </div>
          </section>

          {/* Your Products */}
          <section className="pb-8">
            <SectionDivider label="Your products" />

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-4">
              {TABS.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeTab === id
                      ? 'bg-[#FF2D7B] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* 3-column product grid */}
            <div className="grid grid-cols-3 gap-3">
              {yourProducts.map((product) => (
                <div key={product.id} className="flex flex-col">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-xl mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/200x200/fce7f3/ec4899?text=Product`;
                    }}
                  />
                  <p className="text-sm font-bold text-gray-900">{product.price}</p>
                  <span className="text-[10px] text-gray-500 bg-gray-100 rounded-full px-1.5 py-0.5 w-fit mb-2">
                    {product.commission}% Commission
                  </span>
                  <button
                    onClick={() => router.push(`/content-ideas?productId=${product.id}`)}
                    className="w-full py-1.5 rounded-lg border border-[#FF2D7B] text-[#FF2D7B] text-[11px] font-bold"
                  >
                    Get Ideas
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
