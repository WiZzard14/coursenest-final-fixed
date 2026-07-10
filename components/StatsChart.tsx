"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { category: "Dev", learners: 820 },
  { category: "Data", learners: 640 },
  { category: "Design", learners: 510 },
  { category: "Marketing", learners: 460 },
  { category: "Business", learners: 390 }
];

export default function StatsChart() {
  return (
    <div className="hover-card-3d card-base h-80 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-600">Analytics</p>
          <p className="text-sm text-slate-500">Learners by category</p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-black text-brand-700">Live</span>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="learners" radius={[12, 12, 0, 0]} fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
