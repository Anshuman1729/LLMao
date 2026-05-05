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

function TipBox({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-100 rounded-xl p-3 mt-3">
      <span className="text-base leading-none mt-0.5">💡</span>
      <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function PeakHoursChart({ hours, peakHour }: { hours: number[]; peakHour: number }) {
  const max = Math.max(...hours);
  const labels: Record<number, string> = { 0: '12A', 6: '6A', 12: '12P', 18: '6P', 23: '11P' };

  return (
    <div className="mt-3">
      <div className="flex items-end gap-[3px] h-20 w-full">
        {hours.map((v, i) => {
          const heightPct = Math.max(4, Math.round((v / max) * 100));
          const isPeak = i === peakHour;
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end relative">
              {isPeak && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                  {peakHour === 0 ? '12A' : peakHour < 12 ? `${peakHour}AM` : peakHour === 12 ? '12P' : `${peakHour - 12}PM`}
                </div>
              )}
              <div
                className={`w-full rounded-sm transition-all ${isPeak ? 'bg-[#FF2D7B]' : 'bg-gray-200'}`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-1">
        {Object.entries(labels).map(([i, label]) => (
          <span key={i} className="text-[9px] text-gray-400">{label}</span>
        ))}
      </div>
    </div>
  );
}

function PostingWindowChart() {
  const slots = [
    { label: 'Before 8AM', active: false },
    { label: '8AM–12PM', active: true },
    { label: '12PM–6PM', active: false },
    { label: 'After 6PM', active: true },
  ];
  return (
    <div className="mt-3">
      <div className="flex items-end gap-3 h-20">
        {slots.map((s) => (
          <div key={s.label} className="flex-1 flex flex-col items-center gap-1.5">
            <div className="w-full flex flex-col justify-end" style={{ height: '72px' }}>
              <div
                className={`w-full rounded-t-lg ${s.active ? 'bg-[#FF2D7B]' : 'bg-gray-100'}`}
                style={{ height: s.active ? '90%' : '20%' }}
              />
            </div>
            <span className="text-[9px] text-gray-500 text-center leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenderBar({ female, male }: { female: number; male: number }) {
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
    </div>
  );
}

function AgeBarChart({ groups }: { groups: Array<{ label: string; value: number }> }) {
  const max = Math.max(...groups.map((g) => g.value));
  return (
    <div className="flex items-end gap-3 h-16 mt-3">
      {groups.map((g) => {
        const heightPct = Math.max(8, Math.round((g.value / max) * 100));
        const isPrimary = g.value === max;
        return (
          <div key={g.label} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-md ${isPrimary ? 'bg-[#FF2D7B]' : 'bg-pink-100'}`}
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
          {/* ── PATTERN ── */}
          <SectionDivider label="Pattern" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">3 Top Categories</p>
          <div className="flex gap-3">
            {insights.top_categories.map((cat, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-2xl p-3 flex flex-col items-center gap-1 relative">
                {cat.is_top && (
                  <span className="absolute -top-2 -left-1 bg-[#FF2D7B] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                    TOP
                  </span>
                )}
                <span className="text-xl">{cat.emoji}</span>
                <span className="text-xl font-extrabold text-gray-900">{cat.pct}%</span>
                <span className="text-[10px] text-gray-500 text-center leading-tight">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Best product matches CTA */}
          <div
            className="flex items-center gap-3 bg-pink-50 rounded-2xl p-4 mt-4 cursor-pointer"
            onClick={() => { onClose(); router.push('/products'); }}
          >
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-xl">🛍️</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">Best product matches for you</p>
              <p className="text-xs text-gray-500">For your audience &amp; your style</p>
            </div>
            <span className="text-gray-400 text-sm">›</span>
          </div>

          {/* ── PRICE BEHAVIOUR ── */}
          <SectionDivider label="Price Behaviour" />

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sweet spot</span>
              <span className="text-sm font-bold text-gray-900">{insights.price_behaviour.sweet_spot}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Highest order price</span>
              <span className="text-sm font-bold text-gray-900">{insights.price_behaviour.highest_order}</span>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Discount pull</span>
              <DiscountPullBadge level={insights.price_behaviour.discount_pull} />
            </div>
          </div>
          <TipBox text={insights.price_behaviour.tip} />

          {/* ── CONTENT ENGAGEMENT ── */}
          <SectionDivider label="What do they engage with?" />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Language', value: insights.content_engagement.language },
              { label: 'Narration', value: insights.content_engagement.narration },
              { label: 'Video style', value: insights.content_engagement.video_style },
              { label: 'Music', value: insights.content_engagement.music },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-gray-900">{value}</p>
              </div>
            ))}
          </div>

          {/* ── WHEN DO THEY BUY ── */}
          <SectionDivider label="Best time to post" />

          <PostingWindowChart />
          <TipBox text="Post either before noon or after 6 PM to maximise reach" />

          {/* ── WHO BUYS ── */}
          <SectionDivider label="Who Buys" />

          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gender</p>
          <GenderBar female={insights.gender.female} male={insights.gender.male} />
          <TipBox text={insights.primary_buyer_tip} />

          {/* ── WHERE THEY BUY FROM ── */}
          <SectionDivider label="Where they buy from" />

          <div className="flex gap-4 mb-3">
            <div className="text-center">
              <p className="text-xl font-extrabold text-gray-900">{insights.tier_distribution.metro}%</p>
              <p className="text-[10px] text-gray-500">Metro</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#FF2D7B]">{insights.tier_distribution.tier2}%</p>
              <p className="text-[10px] text-gray-500">Tier 2</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-extrabold text-gray-900">{insights.tier_distribution.tier3}%</p>
              <p className="text-[10px] text-gray-500">Tier 3+</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Selling across country +{insights.city_count} cities
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-1">
            {insights.top_cities.map((city) => (
              <span key={city} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{city}</span>
            ))}
          </div>
          <TipBox text={insights.tier_tip} />

          {/* ── ORDER FREQUENCY ── */}
          <SectionDivider label="Order Frequency" />

          <OrderFrequencyDonut
            repeat={insights.order_frequency.repeat}
            firstTime={insights.order_frequency.first_time}
          />

          {/* ── PRODUCTS FOR YOU ── */}
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
