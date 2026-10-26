import { Activity, ArrowUpRight, BookOpen, CheckCircle2, FileText, GraduationCap, TrendingUp } from 'lucide-react';

const cards = [
  { label: 'Umumiy ball', value: '84%', trend: '+12% oylik', icon: Activity },
  { label: 'Bajarilgan vazifalar', value: '76%', trend: '3 ta yangi topshiriq', icon: CheckCircle2 },
  { label: 'Portfolio', value: '6 ta', trend: '2 ta yaqin orada', icon: FileText },
];

export default function DashboardPage() {
  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Talaba paneli</h1>
        </div>
        <div className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">Faol</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map(({ label, value, trend, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
                <Icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-6 text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{value}</div>
            <div className="mt-2 text-sm text-emerald-600">{trend}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Rivojlanish trendi</h2>
            <span className="status-badge border-brand-200 bg-brand-50 text-brand-700">3 oy</span>
          </div>
          <div className="grid h-44 place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
            <div className="text-center">
              <TrendingUp className="mx-auto h-8 w-8" />
              <div className="mt-2 text-sm">Chart placeholder</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Asosiy vazifalar</h3>
              <BookOpen className="h-5 w-5 text-brand-600" />
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>Matematik tahlil</span><span className="status-badge border-amber-200 bg-amber-50 text-amber-700">Jarayonda</span></li>
              <li className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>Portfolio ko’rib chiqish</span><span className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">Bajarildi</span></li>
              <li className="flex items-center justify-between rounded-xl bg-slate-50 p-3"><span>Diagnostic test</span><span className="status-badge border-brand-200 bg-brand-50 text-brand-700">Navbatda</span></li>
            </ul>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Tavsiya</h3>
              <GraduationCap className="h-5 w-5 text-brand-600" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              O’quv rejangizda asosiy e’tibor bilimlarni mustahkamlovchi faoliyatlarga qaratilishi kerak. Keyingi haftada 2 ta kviz va 1 ta portfolio elementini yakunlang.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
