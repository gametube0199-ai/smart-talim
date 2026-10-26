'use server';

import { redirect } from 'next/navigation';
import { computeScore, findDiagnosticTestById } from '@/lib/diagnostic-data';

export async function submitDiagnosticAnswers(formData: FormData) {
  const testId = String(formData.get('testId') ?? '');
  const test = findDiagnosticTestById(testId);

  if (!test) {
    throw new Error('Berilgan test topilmadi.');
  }

  const answers: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    if (key.startsWith('question_')) {
      answers[key.replace('question_', '')] = String(value);
    }
  }

  const result = computeScore(test, answers);
  const detailsPayload = Buffer.from(JSON.stringify(result.details)).toString('base64');

  redirect(
    `/tests/results?testId=${encodeURIComponent(test.id)}&attemptId=${encodeURIComponent(`demo-${Date.now()}`)}&score=${encodeURIComponent(String(result.percentage))}&earned=${encodeURIComponent(String(result.earnedPoints))}&max=${encodeURIComponent(String(result.maxScore))}&correct=${encodeURIComponent(String(result.correctCount))}&answered=${encodeURIComponent(String(result.answeredCount))}&details=${encodeURIComponent(detailsPayload)}`,
  );
}
