import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CircleDashed, FileText, Sparkles } from 'lucide-react';
import { diagnosticTests } from '@/lib/diagnostic-data';

export default function DiagnosticTestsPage() {
  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Diagnostic tests</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Baholash va testlar</h1>
        </div>
        <Link href="/dashboard" className="button-secondary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Dashboardga qaytish
        </Link>
      </div>

      <div className="mb-8 card p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-sm text-slate-600">
            Bu testlar demo ma’lumotlar sifatida tayyorlangan. Real foydalanuvchi natijalari serverda saqlanadi va bu mintaqada ko’rsatilmaydi.
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {diagnosticTests.map((test) => (
          <div key={test.id} className="card p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="status-badge border-brand-200 bg-brand-50 text-brand-700">{test.subject}</span>
                  {test.isSeededDemo && <span className="status-badge border-amber-200 bg-amber-50 text-amber-700">Demo</span>}
                  <span className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">{test.status}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">{test.title}</h2>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">{test.description}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <FileText className="h-4 w-4 text-brand-600" />
                  {test.questions.length} savol
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  <CircleDashed className="h-4 w-4 text-brand-600" />
                  {test.timeLimitMinutes} daqiqa
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Serverda auto-scoring
              </div>
              <Link href={`/tests/${test.id}`} className="button-primary">
                Testni boshlash
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
