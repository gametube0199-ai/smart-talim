import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CircleDashed, TrendingUp } from 'lucide-react';
import { findDiagnosticTestById } from '@/lib/diagnostic-data';

export default function TestResultsPage({
  searchParams,
}: {
  searchParams: {
    testId?: string;
    attemptId?: string;
    score?: string;
    earned?: string;
    max?: string;
    correct?: string;
    answered?: string;
    details?: string;
  };
}) {
  const testId = searchParams.testId ?? '';
  const test = findDiagnosticTestById(testId);
  const scorePercent = Number(searchParams.score ?? 0);
  const earned = Number(searchParams.earned ?? 0);
  const max = Number(searchParams.max ?? 0);
  const correct = Number(searchParams.correct ?? 0);
  const answered = Number(searchParams.answered ?? 0);

  let details: Array<{
    questionId: string;
    questionPrompt: string;
    selectedOption: string | null;
    correctOption: string;
    isCorrect: boolean;
    pointsEarned: number;
    pointsPossible: number;
  }> = [];

  if (searchParams.details) {
    try {
      const decoded = Buffer.from(decodeURIComponent(searchParams.details), 'base64').toString('utf8');
      details = JSON.parse(decoded) as typeof details;
    } catch {
      details = [];
    }
  }

  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Test natijalari</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Yakuniy natija</h1>
        </div>
        <Link href="/tests" className="button-secondary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Testlar ro’yxatiga qaytish
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Umumiy ball</div>
              <div className="mt-2 text-4xl font-black text-slate-900">{scorePercent.toFixed(1)}%</div>
            </div>
            <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
              <TrendingUp className="h-8 w-8" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="text-xs text-slate-500">To’g’ri javoblar</div>
              <div className="mt-2 text-xl font-bold text-slate-900">{correct}/{max > 0 ? max : 0}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="text-xs text-slate-500">Ochilgan savollar</div>
              <div className="mt-2 text-xl font-bold text-slate-900">{answered}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="text-xs text-slate-500">Kutilayotgan ball</div>
              <div className="mt-2 text-xl font-bold text-slate-900">{earned}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <div className="text-xs text-slate-500">Maksimal ball</div>
              <div className="mt-2 text-xl font-bold text-slate-900">{max}</div>
            </div>
          </div>

          {test ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">{test.title}</div>
              <div className="mt-2">{test.subject}</div>
            </div>
          ) : null}
        </div>

        <div className="card p-6">
          <div className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Savol bo’yicha natijalar
          </div>

          <div className="space-y-4">
            {details.length > 0 ? (
              details.map((detail, index) => (
                <div key={detail.questionId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-slate-900">
                      {index + 1}. {detail.questionPrompt}
                    </div>
                    <span className={`status-badge ${detail.isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                      {detail.isCorrect ? 'To’g’ri' : 'Noto’g’ri'}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-600">
                    <div>Tanlangan javob: {detail.selectedOption ?? 'Javob berilmagan'}</div>
                    <div>To’g’ri javob: {detail.correctOption}</div>
                    <div>Ball: {detail.pointsEarned}/{detail.pointsPossible}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
                Natija tafsilotlari mavjud emas. Test yakunlangan bo’lishi kerak.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
