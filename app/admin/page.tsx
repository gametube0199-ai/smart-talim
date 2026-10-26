import { BriefcaseBusiness, BookOpen, CheckSquare, ClipboardList, ShieldCheck, UserCog } from 'lucide-react';

export function adminSidebarLinks() {
  return [
    { href: '/admin/users', label: 'User management', icon: UserCog },
    { href: '/teacher/dashboard', label: 'Teacher dashboard', icon: BriefcaseBusiness },
    { href: '/teacher/tests', label: 'Test management', icon: ClipboardList },
    { href: '/teacher/students', label: 'Assigned students', icon: BookOpen },
    { href: '/teacher/review', label: 'Learning-plan review', icon: CheckSquare },
    { href: '/admin/security', label: 'Security review', icon: ShieldCheck },
  ];
}

export function AdminUsersPage() {
  return (
    <main className="page-shell py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Admin panel</p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">User management</h1>
      </div>

      <div className="card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Students</div>
            <div className="mt-2 text-2xl font-black text-slate-900">128</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Teachers</div>
            <div className="mt-2 text-2xl font-black text-slate-900">13</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="text-sm text-slate-500">Admins</div>
            <div className="mt-2 text-2xl font-black text-slate-900">3</div>
          </div>
        </div>
      </div>
    </main>
  );
}
