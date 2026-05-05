'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AgeDistribution } from '@/lib/types';

const COLORS = ['#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d'];

export function AgeBarChart({ data }: { data: AgeDistribution }) {
  const chartData = Object.entries(data).map(([age, pct]) => ({ age, pct }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Age Distribution</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} barCategoryGap="30%">
          <XAxis dataKey="age" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            formatter={(v) => [`${v}%`, 'Audience']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #fce7f3', fontSize: '12px' }}
          />
          <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
