'use client';

import dynamic from 'next/dynamic';
import { AudienceProfile } from '@/lib/types';
import { Spinner } from '@/components/ui/Spinner';

// Recharts uses window — must be dynamically imported with ssr:false
const AgeBarChart = dynamic(() => import('./AgeBarChart').then((m) => m.AgeBarChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const GenderDonut = dynamic(() => import('./GenderDonut').then((m) => m.GenderDonut), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
const LocationChart = dynamic(() => import('./LocationChart').then((m) => m.LocationChart), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-center h-[240px]">
      <Spinner />
    </div>
  );
}

export function AudienceInsights({ audience }: { audience: AudienceProfile }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">👥</span>
        <h2 className="text-lg font-bold text-gray-900">Your Potential Audience</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AgeBarChart data={audience.age_distribution} />
        <GenderDonut data={audience.gender} />
        <LocationChart locations={audience.top_locations} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-gray-500">Income bracket:</span>
        <span className="text-xs font-medium text-gray-700 capitalize">{audience.income_bracket.replace('-', ' ')}</span>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-xs text-gray-500">Interests:</span>
        <span className="text-xs font-medium text-gray-700">{audience.interests.join(', ')}</span>
      </div>
    </div>
  );
}
