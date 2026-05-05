'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#ec4899', '#f472b6', '#f9a8d4', '#fce7f3', '#fdf2f8'];

export function LocationChart({ locations }: { locations: string[] }) {
  // Generate mock reach scores (descending)
  const chartData = locations.slice(0, 5).map((city, i) => ({
    city,
    reach: Math.round(100 - i * 14),
  }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Locations</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart layout="vertical" data={chartData} barCategoryGap="25%">
          <XAxis type="number" hide domain={[0, 100]} />
          <YAxis dataKey="city" type="category" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={70} />
          <Tooltip
            formatter={(v) => [`${v}%`, 'Reach']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #fce7f3', fontSize: '12px' }}
          />
          <Bar dataKey="reach" radius={[0, 4, 4, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
