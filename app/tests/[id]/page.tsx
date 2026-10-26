import Link from 'next/link';
import { ArrowLeft, FlaskConical, NotebookPen } from 'lucide-react';
import { DiagnosticTestClient } from '@/components/diagnostic-test-client';
import { findDiagnosticTestById } from '@/lib/diagnostic-data';
import { notFound } from 'next/navigation';

export default function DiagnosticTestPage({ params }: { params: { id: string } }) {
  const test = findDiagnosticTestById(params.id);

  if (!test) {
    notFound();
  }

  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Diagnostic test</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">{test.title}</h1>
        </div>
        <Link href="/tests" className="button-secondary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Testlar ro’yxatiga qaytish
        </Link>
      </div>

      <div className="card mb-8 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
            <NotebookPen className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">{test.subject}</div>
            <div className="text-sm text-slate-500">{test.description}</div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">
            {test.status === 'published' ? 'Published' : 'Draft'}
          </span>
          <span className="status-badge border-brand-200 bg-brand-50 text-brand-700">
            {test.timeLimitMinutes} daqiqa
          </span>
          {test.isSeededDemo && (
            <span className="status-badge border-amber-200 bg-amber-50 text-amber-700">
              Demo ma’lumot
            </span>
          )}
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <FlaskConical className="h-4 w-4 text-brand-600" />
            Server-side scoring (demo mode)
          </div>
        </div>
      </div>

      <DiagnosticTestClient test={test} />
    </main>
  );
}
