'use client';

import { useRouter } from 'next/navigation';
import { BuyerInsights } from '@/lib/types';

interface Props {
  insights: BuyerInsights;
  open: boolean;
  onClose: () => void;
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
  const active = groups.filter((g) => g.value > 0);
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

export function BuyerInsightsSheet({ insights, open, onClose }: Props) {
  const router = useRouter();

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

          {/* Get products CTA */}
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

          <AgeBarChart groups={insights.age_groups} />

          {insights.demographics_confidence === 'low' && insights.demographics_note && (
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-100 rounded-xl p-3 mt-3">
              <span className="text-base leading-none mt-0.5">⚠️</span>
              <p className="text-xs text-gray-600 leading-relaxed">{insights.demographics_note}</p>
            </div>
          )}

          {/* ── TOP THEMES & CATEGORIES ── */}
          <SectionDivider label="Top Themes & Categories" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Content themes</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {insights.top_content_themes.map((theme) => (
              <span key={theme} className="bg-pink-50 border border-pink-100 text-pink-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {theme}
              </span>
            ))}
          </div>

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Product categories</p>
          <div className="flex flex-wrap gap-2">
            {insights.top_product_categories.map((cat) => (
              <span key={cat} className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                {cat}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => { onClose(); }}
            className="w-full mt-8 py-4 text-[#FF2D7B] font-extrabold text-base text-center"
          >
            Got it →
          </button>
        </div>
      </div>
    </>
  );
}
