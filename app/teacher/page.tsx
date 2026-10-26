import Link from 'next/link';
import { ArrowRight, BookOpen, BriefcaseBusiness, ShieldCheck, Users } from 'lucide-react';
import { teacherAssignments } from '@/lib/teacher-dashboard';

export default function TeacherDashboardPage() {
  return (
    <main className="page-shell py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Teacher dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Ushlangan talabalarning holati</h1>
        </div>
        <div className="status-badge border-emerald-200 bg-emerald-50 text-emerald-700">
          <ShieldCheck className="mr-2 h-4 w-4" />
          Assigned students only
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <div className="text-sm text-slate-500">Jami talabalari</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{teacherAssignments.length}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-slate-500">Faol planlar</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{teacherAssignments.filter((s) => s.learningPlanStatus === 'active').length}</div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-slate-500">Portfolio tasdiqlangan</div>
          <div className="mt-2 text-3xl font-black text-slate-900">{teacherAssignments.filter((s) => s.portfolioStatus === 'approved').length}</div>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Talaba holati</h2>
          </div>
          <Link href="/teacher/students" className="button-secondary">
            Barchasini ko’rish <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-[0.14em] text-slate-500">
                <th className="pb-3 pr-4">Talaba</th>
                <th className="pb-3 pr-4">So’ngi test</th>
                <th className="pb-3 pr-4">Learning plan</th>
                <th className="pb-3 pr-4">Portfolio</th>
                <th className="pb-3 pr-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {teacherAssignments.map((student) => (
                <tr key={student.studentId} className="border-b border-slate-100 align-middle">
                  <td className="py-4 pr-4 font-semibold text-slate-900">{student.studentName}</td>
                  <td className="py-4 pr-4">{student.latestScore}%</td>
                  <td className="py-4 pr-4">
                    <span className="status-badge border-brand-200 bg-brand-50 text-brand-700">
                      {student.learningPlanStatus}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="status-badge border-amber-200 bg-amber-50 text-amber-700">
                      {student.portfolioStatus}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-emerald-600">+{student.trend}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
