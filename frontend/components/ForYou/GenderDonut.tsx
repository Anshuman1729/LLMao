'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GenderSplit } from '@/lib/types';

const COLORS = { female: '#ec4899', male: '#818cf8', other: '#34d399' };

export function GenderDonut({ data }: { data: GenderSplit }) {
  const chartData = [
    { name: 'Female', value: data.female },
    { name: 'Male', value: data.male },
    { name: 'Other', value: data.other },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Gender Split</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            dataKey="value"
            paddingAngle={3}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => [`${v}%`, '']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #fce7f3', fontSize: '12px' }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
