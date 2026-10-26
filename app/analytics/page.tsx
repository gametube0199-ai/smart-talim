'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowUpRight, BarChart3, TrendingUp } from 'lucide-react';
import { growthSnapshots } from '@/lib/analytics';

export default function AnalyticsPage() {
  const latest = growthSnapshots[growthSnapshots.length - 1];
  const previous = growthSnapshots[growthSnapshots.length - 2] ?? growthSnapshots[0];
  const scoreChange = latest.score - previous.score;
  const completionChange = latest.completion - previous.completion;

  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Growth analytics</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Rivojlanish statistikasi</h1>
        </div>
        <div className="status-badge border-brand-200 bg-brand-50 text-brand-700">
          <BarChart3 className="mr-2 h-4 w-4" />
          Verified score trends
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="text-sm text-slate-500">Test balli</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{latest.score}%</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
            <ArrowUpRight className="h-4 w-4" />
            {scoreChange >= 0 ? '+' : ''}{scoreChange} point
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-slate-500">Topshirish darajasi</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{latest.completion}%</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-emerald-600">
            <ArrowUpRight className="h-4 w-4" />
            {completionChange >= 0 ? '+' : ''}{completionChange}%
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-slate-500">Growth Index</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{latest.growthIndex.toFixed(2)}</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <TrendingUp className="h-4 w-4 text-brand-600" />
            Research metric — not validated yet
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Rivojlanish trendi</h2>
          <span className="status-badge border-slate-200 bg-slate-50 text-slate-700">6 oy</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthSnapshots}>
              <defs>
                <linearGradient id="fillScore" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#1f7ae0" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#1f7ae0" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#cbd5e1" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="score" stroke="#1f7ae0" fill="url(#fillScore)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
