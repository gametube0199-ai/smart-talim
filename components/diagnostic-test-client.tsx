'use client';

import { useMemo, useState } from 'react';
import { submitDiagnosticAnswers } from '@/app/tests/actions';
import type { DiagnosticTest } from '@/lib/diagnostic-data';

export function DiagnosticTestClient({ test }: { test: DiagnosticTest }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === test.questions.length;

  const progressLabel = useMemo(() => {
    return `${answeredCount}/${test.questions.length} savol javoblandi`;
  }, [answeredCount, test.questions.length]);

  const handleSelect = (questionId: string, value: string) => {
    setSelectedAnswers((current) => ({
      ...current,
      [questionId]: value,
    }));
  };

  return (
    <form action={submitDiagnosticAnswers} className="space-y-6">
      <input type="hidden" name="testId" value={test.id} />

      <div className="card p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Yakunlash</div>
            <div className="mt-2 text-xl font-black text-slate-900">{progressLabel}</div>
          </div>
          <div className="status-badge border-brand-200 bg-brand-50 text-brand-700">
            {test.timeLimitMinutes} daqiqa
          </div>
        </div>
      </div>

      {test.questions.map((question, index) => (
        <fieldset key={question.id} className="card p-6">
          <legend className="text-lg font-bold text-slate-900">
            {index + 1}. {question.prompt}
          </legend>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="status-badge border-slate-200 bg-slate-50 text-slate-600">{question.topic}</span>
            <span className="status-badge border-amber-200 bg-amber-50 text-amber-700">{question.points} ball</span>
          </div>

          <div className="mt-5 space-y-3">
            {question.options.map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                  selectedAnswers[question.id] === option
                    ? 'border-brand-200 bg-brand-50 ring-2 ring-brand-100'
                    : 'border-slate-200 bg-white hover:border-brand-200 hover:bg-brand-50/30'
                }`}
              >
                <input
                  type="radio"
                  name={`question_${question.id}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option}
                  onChange={() => handleSelect(question.id, option)}
                  className="h-4 w-4 text-brand-600"
                />
                <span className="text-sm font-medium text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-between">
        <div className="text-sm text-slate-500">
          {test.isSeededDemo ? 'Demo ma’lumotlar ko’rsatilmoqda. Real foydalanuvchi natijalari mavjud emas.' : 'Real foydalanuvchi ma’lumotlari faqat serverga yuboriladi.'}
        </div>

        <button
          type="submit"
          disabled={!allAnswered}
          className="button-primary disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Testni yakunlash
        </button>
      </div>
    </form>
  );
}
