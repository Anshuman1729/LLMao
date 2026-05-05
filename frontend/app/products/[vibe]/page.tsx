'use client';

import { useState, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  getCategoryFiltersForNiche,
  getFilterLabelsForNiche,
  getCategoryProductsForNiche,
} from '@/lib/mock-products';

function BackArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function VibeProductsContent() {
  const { vibe } = useParams<{ vibe: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const niche = searchParams.get('niche') ?? 'fashion';

  const categoryFilters = getCategoryFiltersForNiche(niche);
  const filterLabels = getFilterLabelsForNiche(niche);
  const categoryProducts = getCategoryProductsForNiche(niche);

  // If the vibe matches a category filter for this niche, use it; otherwise default to first filter
  const initialFilter = categoryFilters.includes(vibe) ? vibe : categoryFilters[0];
  const [selected, setSelected] = useState<string>(initialFilter);

  const products = categoryProducts[selected] ?? [];
  const headerTitle = (filterLabels[selected] ?? selected).toUpperCase();

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 border-b border-gray-100">
        <button onClick={() => router.back()} className="text-gray-600">
          <BackArrow />
        </button>
        <h1 className="text-sm font-extrabold text-gray-900 tracking-wide">{headerTitle}</h1>
      </div>

      {/* Category filter chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
        {categoryFilters.map((f) => (
          <button
            key={f}
            onClick={() => setSelected(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
              selected === f
                ? 'bg-white border-[#FF2D7B] text-[#FF2D7B]'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            }`}
          >
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {/* 2-column product grid */}
      <div className="grid grid-cols-2 gap-4 px-4 py-2 pb-10">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.img}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-xl mb-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://placehold.co/400x400/fce7f3/ec4899?text=Product`;
              }}
            />
            <p className="text-base font-extrabold text-gray-900 mb-0.5">{product.price}</p>
            <p className="text-xs text-[#FF2D7B] font-semibold mb-3">
              🔥 {product.commission}% Commission
            </p>
            <button
              onClick={() => router.push(`/content-ideas?productId=${product.id}`)}
              className="w-full py-2.5 rounded-xl border border-[#FF2D7B] text-[#FF2D7B] text-xs font-bold"
            >
              Get Ideas
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function VibeProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <VibeProductsContent />
    </Suspense>
  );
}
