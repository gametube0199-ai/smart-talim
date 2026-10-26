import { generateLearningPlan, getPlanStatusLabel, getTaskStatusLabel } from '@/lib/learning-plan';

const samplePlan = generateLearningPlan(78, 'Matematika diagnostik testi');

export default function LearningPlanPage() {
  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Learning plan</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Individual learning plan</h1>
        </div>
        <div className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">
          {getPlanStatusLabel(samplePlan.status)}
        </div>
      </div>

      <div className="card mb-8 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xl font-black text-slate-900">{samplePlan.title}</div>
            <div className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{samplePlan.summary}</div>
          </div>
          <div className="rounded-2xl bg-brand-50 px-4 py-3 text-brand-700">
            <div className="text-xs uppercase tracking-[0.2em] text-brand-500">Umumiy maqsad</div>
            <div className="mt-1 text-sm font-semibold">{samplePlan.overallGoal}</div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <span className="font-semibold text-slate-900">O’qituvchi izohi:</span> {samplePlan.teacherNotes}
        </div>
      </div>

      <div className="space-y-5">
        {samplePlan.tasks.map((task, index) => (
          <div key={task.id} className="card p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-brand-700">Vazifa {index + 1}</div>
                <h2 className="mt-2 text-xl font-black text-slate-900">{task.title}</h2>
              </div>
              <div className="status-badge border-brand-200 bg-brand-50 text-brand-700">
                {getTaskStatusLabel(task.status)}
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">{task.description}</p>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Tavsiya etilgan manba</div>
                <div className="mt-2 text-sm text-slate-700">{task.recommendedResource}</div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Muddati</div>
                <div className="mt-2 text-sm font-semibold text-slate-700">{task.dueDate}</div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <span className="font-semibold">O’qituvchi fikri:</span> {task.teacherFeedback}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
