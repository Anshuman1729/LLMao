'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getProductById, YOUR_PRODUCTS, BEST_SELLING_REELS } from '@/lib/mock-products';

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

type Tab = 'orders' | 'wishlist' | 'paste';

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'orders', label: 'Orders' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'paste', label: 'Paste Link' },
];

function ContentIdeasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const product = (productId ? getProductById(productId) : null) ?? YOUR_PRODUCTS[0];
  const [tab, setTab] = useState<Tab>('orders');
  const [expanded, setExpanded] = useState(false);

  const benefitsPreview = product.benefits.slice(0, 85);
  const hasTruncated = product.benefits.length > 85;

  return (
    <main className="min-h-screen bg-white pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 border-b border-gray-100">
        <button onClick={() => router.back()} className="text-gray-600">
          <BackArrow />
        </button>
        <h1 className="text-sm font-extrabold text-gray-900 tracking-wide uppercase">
          Content Ideas For You
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 px-4 py-3">
        <FilterIcon />
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              tab === id
                ? 'bg-pink-50 border-[#FF2D7B] text-[#FF2D7B]'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            {id === 'orders' && <span>⊙</span>}
            {id === 'wishlist' && <span>♡</span>}
            {id === 'paste' && <span>🔗</span>}
            {label}
          </button>
        ))}
      </div>

      {/* Featured product image */}
      <div className="mx-4 rounded-2xl overflow-hidden bg-gray-100" style={{ height: '200px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/fce7f3/ec4899?text=Product`;
          }}
        />
      </div>

      {/* Product info row */}
      <div className="px-4 py-4 flex items-start justify-between gap-3 border-b border-gray-100">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 mb-1">{product.name}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-extrabold text-gray-900">{product.price}*</span>
            <span className="text-xs text-[#FF2D7B] font-semibold">🔥 {product.commission}% Commission</span>
          </div>
        </div>
        <button className="flex-shrink-0 px-4 py-2 rounded-xl bg-[#FF2D7B] text-white text-xs font-bold">
          Buy Now
        </button>
      </div>

      {/* Extra offer row */}
      <div className="mx-4 mt-3 flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
        <div className="w-9 h-9 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-base">🏷️</span>
        </div>
        <p className="text-xs text-gray-700 font-medium flex-1">Extra ₹10 off for your viewers</p>
        <button className="text-gray-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </button>
      </div>

      {/* Product benefits */}
      <div className="px-4 mt-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-bold text-gray-900">Product benefits to say</p>
          <span className="text-pink-400">✦</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {expanded ? product.benefits : benefitsPreview}
          {!expanded && hasTruncated && (
            <>
              {'... '}
              <button
                onClick={() => setExpanded(true)}
                className="text-[#FF2D7B] font-semibold"
              >
                Read More
              </button>
            </>
          )}
        </p>
      </div>

      {/* Best-selling reels */}
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Best-Selling Reels
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {BEST_SELLING_REELS.map((reel) => (
            <div
              key={reel.id}
              className="flex-shrink-0 w-36 rounded-2xl overflow-hidden relative"
              style={{ height: '220px' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={reel.img} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

              {/* Sold badge */}
              <div className="absolute top-2 left-2 flex items-center gap-0.5 bg-black/50 rounded-full px-2 py-0.5">
                <span className="text-[10px]">🔥</span>
                <span className="text-white text-[9px] font-bold">{reel.sold} Products sold</span>
              </div>

              {/* Label + price overlay */}
              <div className="absolute bottom-4 left-2 right-2 flex flex-col gap-1">
                <div className="bg-[#FF2D7B] text-white text-[10px] font-extrabold px-2 py-0.5 rounded text-center">
                  {reel.label}
                </div>
                <div className="bg-white text-gray-900 text-xs font-extrabold px-2 py-0.5 rounded text-center">
                  {reel.priceText}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default function ContentIdeasPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      }
    >
      <ContentIdeasContent />
    </Suspense>
  );
}
