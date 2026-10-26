import Link from 'next/link';
import { ArrowRight, BrainCircuit, ChartColumnBig, Gauge, NotebookPen } from 'lucide-react';

export function AppNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">SMART TA’LIM</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Learning platform</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-brand-700">Bosh sahifa</Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 transition hover:text-brand-700">Dashboard</Link>
          <Link href="/tests" className="text-sm font-medium text-slate-600 transition hover:text-brand-700">Testlar</Link>
          <Link href="/learning-plan" className="text-sm font-medium text-slate-600 transition hover:text-brand-700">Learning plan</Link>
          <Link href="/portfolio" className="text-sm font-medium text-slate-600 transition hover:text-brand-700">Portfolio</Link>
          <Link href="/analytics" className="text-sm font-medium text-slate-600 transition hover:text-brand-700">Analytics</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="button-secondary hidden sm:inline-flex">Kirish</Link>
          <Link href="/signup" className="button-primary">
            Boshlash <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function a11yMetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">{label}</div>
        <Gauge className="h-4 w-4 text-brand-600" />
      </div>
      <div className="mt-3 text-2xl font-black text-slate-900">{value}</div>
      <div className="mt-2 text-xs text-slate-500">{hint}</div>
    </div>
  );
}

export function analyticsOverviewCards() {
  return [
    { label: 'Umumiy baho', value: '84%', hint: 'Yakuniy o’rtacha ko’rsatkich' },
    { label: 'Topshirish darajasi', value: '76%', hint: 'Bajarilgan vazifalar ulushi' },
    { label: 'Growth Index', value: '0.74', hint: 'Configurative research metric' },
  ];
}

export function quickLinks() {
  return [
    { href: '/tests', label: 'Testlar', icon: NotebookPen },
    { href: '/learning-plan', label: 'Learning plan', icon: ChartColumnBig },
  ];
}
