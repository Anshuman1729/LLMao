'use client';

import { useRouter } from 'next/navigation';
import { BuyerInsights } from '@/lib/types';
import { getYourProductsForNiche } from '@/lib/mock-products';

interface Props {
  insights: BuyerInsights;
  open: boolean;
  onClose: () => void;
  niche?: string;
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function ConfidenceBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const styles = {
    low: 'bg-red-50 text-red-500 border-red-100',
    medium: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    high: 'bg-green-50 text-green-600 border-green-100',
  };
  const label = { low: 'Low confidence', medium: 'Medium confidence', high: 'High confidence' };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${styles[level]}`}>
      {label[level]}
    </span>
  );
}

function BrandTierBadge({ tier }: { tier: string }) {
  return (
    <span className="text-xs font-bold bg-gray-900 text-white px-3 py-1 rounded-full">
      {tier} tier
    </span>
  );
}

function PostingTimesChart({ times }: { times: Array<{ slot: string; pct: number }> }) {
  const max = Math.max(...times.map((t) => t.pct), 1);
  return (
    <div className="mt-3 flex items-end gap-2 h-20">
      {times.map((t) => {
        const heightPct = t.pct === 0 ? 4 : Math.max(8, Math.round((t.pct / max) * 100));
        const isPeak = t.pct === max && t.pct > 0;
        return (
          <div key={t.slot} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex flex-col justify-end" style={{ height: '72px' }}>
              <div
                className={`w-full rounded-t-md transition-all ${isPeak ? 'bg-[#FF2D7B]' : t.pct > 0 ? 'bg-pink-200' : 'bg-gray-100'}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-[9px] text-gray-500 text-center leading-tight">{t.slot}</span>
            {t.pct > 0 && (
              <span className="text-[9px] font-bold text-gray-700">{Math.round(t.pct)}%</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PriceDistributionChart({ distribution }: { distribution: Array<{ range: string; pct: number }> }) {
  const max = Math.max(...distribution.map((d) => d.pct), 1);
  return (
    <div className="mt-3 flex flex-col gap-2">
      {distribution.map((d) => (
        <div key={d.range} className="flex items-center gap-3">
          <span className="text-xs text-gray-500 w-24 shrink-0">{d.range}</span>
          <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF2D7B] rounded-full transition-all"
              style={{ width: `${Math.max(4, Math.round((d.pct / max) * 100))}%` }}
            />
          </div>
          <span className="text-xs font-bold text-gray-800 w-10 text-right">{Math.round(d.pct)}%</span>
        </div>
      ))}
    </div>
  );
}

function GenderBar({ female, male, coveragePct }: { female: number; male: number; coveragePct: number }) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-gray-900">{female}% Women</span>
        <span className="text-sm font-bold text-gray-500">{male}% Men</span>
      </div>
      <div className="flex h-2.5 rounded-full overflow-hidden">
        <div className="bg-[#FF2D7B]" style={{ width: `${female}%` }} />
        <div className="bg-gray-300 flex-1" />
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5">{coveragePct}% of audience identified</p>
    </div>
  );
}

function AgeBarChart({ groups }: { groups: Array<{ label: string; value: number }> }) {
  const max = Math.max(...groups.map((g) => g.value), 1);
  return (
    <div className="flex items-end gap-2 h-16 mt-3">
      {groups.map((g) => {
        const heightPct = g.value === 0 ? 4 : Math.max(8, Math.round((g.value / max) * 100));
        const isPrimary = g.value === max && g.value > 0;
        return (
          <div key={g.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-md ${isPrimary ? 'bg-[#FF2D7B]' : g.value > 0 ? 'bg-pink-100' : 'bg-gray-100'}`}
              style={{ height: `${heightPct}%` }}
            />
            <span className="text-[9px] text-gray-500 text-center leading-tight">{g.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function OrderFrequencyDonut({ repeat, firstTime }: { repeat: number; firstTime: number }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const repeatDash = (repeat / 100) * circumference;
  const firstDash = (firstTime / 100) * circumference;

  return (
    <div className="flex items-center gap-6 mt-3">
      <svg width="90" height="90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#FDE7F0" strokeWidth="14" />
        <circle
          cx="50" cy="50" r={r}
          fill="none" stroke="#FF2D7B" strokeWidth="14"
          strokeDasharray={`${repeatDash} ${circumference - repeatDash}`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <circle
          cx="50" cy="50" r={r}
          fill="none" stroke="#FFB3D1" strokeWidth="14"
          strokeDasharray={`${firstDash} ${circumference - firstDash}`}
          strokeLinecap="round"
          transform={`rotate(${(repeat / 100) * 360 - 90} 50 50)`}
        />
      </svg>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF2D7B]" />
          <span className="text-xs text-gray-700">Repeat buyers <span className="font-bold">{repeat}%</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FFB3D1]" />
          <span className="text-xs text-gray-700">First-time buyers <span className="font-bold">{firstTime}%</span></span>
        </div>
      </div>
    </div>
  );
}

function DiscountPullBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    HIGH: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    LOW: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors[level] ?? colors.MEDIUM}`}>
      {level} ✓
    </span>
  );
}

export function BuyerInsightsSheet({ insights, open, onClose, niche = 'fashion' }: Props) {
  const router = useRouter();
  const yourProducts = getYourProductsForNiche(niche).slice(0, 3);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 top-0 bg-white z-40 overflow-y-auto transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-extrabold text-gray-900">Let&apos;s understand your buyers</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-sm"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-10">

          {/* ── PRODUCT CATALOGS ── */}
          <SectionDivider label="Product Catalogs" />

          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">What they buy</p>
            <ConfidenceBadge level={insights.product_confidence} />
          </div>

          <div className="flex flex-col gap-3">
            {insights.product_catalogs.map((cat, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 leading-tight">{cat.name}</p>
                  {cat.description && (
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{cat.description}</p>
                  )}
                </div>
                <span className="text-xl font-extrabold text-[#FF2D7B] shrink-0">{Math.round(cat.pct)}%</span>
              </div>
            ))}
          </div>

          {/* Get products now CTA */}
          <div
            className="flex items-center gap-3 bg-pink-50 rounded-2xl p-4 mt-4 cursor-pointer"
            onClick={() => { onClose(); router.push('/products'); }}
          >
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-xl">🛍️</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Get products now</p>
              <p className="text-xs text-gray-500">For your audience &amp; your style</p>
            </div>
            <span className="text-gray-400 text-sm">›</span>
          </div>

          {/* ── PRICE DISTRIBUTION ── */}
          <SectionDivider label="Price Distribution" />

          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Price range breakdown</p>
            <BrandTierBadge tier={insights.brand_tier} />
          </div>
          <PriceDistributionChart distribution={insights.price_distribution} />

          {/* ── CONTENT ENGAGEMENT ── */}
          <SectionDivider label="What do they engage with?" />

          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Content style</p>
            <ConfidenceBadge level={insights.content_confidence} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Language', value: insights.language },
              { label: 'Narration', value: insights.narration_style },
              { label: 'Video style', value: insights.video_style },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                <p className="text-xs font-bold text-gray-900 leading-snug">{value}</p>
              </div>
            ))}
          </div>

          {/* ── WHEN DO THEY POST ── */}
          <SectionDivider label="Best time to post" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time blocks</p>
          <PostingTimesChart times={insights.posting_times} />

          {/* ── WHO BUYS ── */}
          <SectionDivider label="Who Buys" />

          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gender &amp; Age</p>
            <ConfidenceBadge level={insights.demographics_confidence} />
          </div>

          <GenderBar
            female={insights.gender.female}
            male={insights.gender.male}
            coveragePct={insights.gender.coverage_pct}
          />

          {/* ── PRODUCT SUGGESTIONS ── */}
          <SectionDivider label="Products for you" />

          <div className="grid grid-cols-3 gap-3">
            {yourProducts.map((product) => (
              <div key={product.id} className="flex flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-xl mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/fce7f3/ec4899?text=Product';
                  }}
                />
                <p className="text-xs font-bold text-gray-900 leading-tight mb-0.5 line-clamp-1">{product.name}</p>
                <p className="text-xs font-semibold text-gray-800 mb-1">{product.price}</p>
                <button
                  onClick={() => { onClose(); router.push(`/content-ideas?productId=${product.id}`); }}
                  className="w-full py-1.5 rounded-lg border border-[#FF2D7B] text-[#FF2D7B] text-[10px] font-bold"
                >
                  Get Ideas
                </button>
              </div>
            ))}
          </div>

          {/* See all */}
          <button
            onClick={() => { onClose(); router.push('/products'); }}
            className="w-full mt-4 py-3 rounded-2xl border border-gray-200 text-gray-600 text-sm font-semibold"
          >
            See all products →
          </button>
        </div>
      </div>
    </>
  );
}
