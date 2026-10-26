import Link from 'next/link';
import { ArrowRight, BookCheck, BrainCircuit, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';

const featureCards = [
  {
    title: 'Shaxsiy o’quv yo’li',
    description: 'Har bir talaba uchun individual rivojlanish va reja asosida ishlovchi model.',
    icon: BrainCircuit,
  },
  {
    title: 'Diagnostic testlar',
    description: 'Keng qamrovli baholashlar yordamida bilim darajasini aniqlash va yo’nalishni belgilash.',
    icon: BookCheck,
  },
  {
    title: 'Ta’lim ko’rsatmalari',
    description: 'O’qituvchilar va adminlar uchun nazorat, review va qaror qabul qilish tizimi.',
    icon: ShieldCheck,
  },
];

const metrics = [
  { label: 'Faol talabalari', value: '3.2K+' },
  { label: 'Yakuniy testlar', value: '18K' },
  { label: 'Rivojlanish o’sishi', value: '+31%' },
  { label: 'Ta’lim yetarli darajasi', value: '91%' },
];

export default function HomePage() {
  return (
    <main className="pb-20">
      <section className="page-shell pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
              <Sparkles className="h-4 w-4" />
              SMART TA’LIM
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              Talabalarni kelajakka tayyorlovchi akilliy ta’lim platformasi.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              SMART TA’LIM — diagnostic testlar, shaxsiy learning plan, portfolio va progress monitoringni birlashtirgan zamonaviy SaaS yechim.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/signup" className="button-primary">
                Ro’yxatdan o’tish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/signin" className="button-secondary">
                Kirish
              </Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4">
              {metrics.map((metric, index) => (
                <div key={index} className="card p-4">
                  <div className="text-xl font-bold text-slate-900">{metric.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden p-6">
            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-brand-500 p-2">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-200">
                  online
                </span>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <div className="text-sm text-slate-300">Umumiy natija</div>
                  <div className="mt-2 text-4xl font-black">84%</div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-slate-800 p-3">
                    <div className="text-xs text-slate-400">Test</div>
                    <div className="mt-1 text-lg font-bold">6</div>
                  </div>
                  <div className="rounded-xl bg-slate-800 p-3">
                    <div className="text-xs text-slate-400">Plan</div>
                    <div className="mt-1 text-lg font-bold">4</div>
                  </div>
                  <div className="rounded-xl bg-slate-800 p-3">
                    <div className="text-xs text-slate-400">Portfolio</div>
                    <div className="mt-1 text-lg font-bold">8</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-24">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">Nima uchun</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">Platformaning asosiy afzalliklari</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featureCards.map(({ title, description, icon: Icon }) => (
            <div key={title} className="card p-6">
              <div className="inline-flex rounded-xl bg-brand-50 p-3 text-brand-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
