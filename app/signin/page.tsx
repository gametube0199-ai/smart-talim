import Link from 'next/link';
import { ArrowLeft, GraduationCap, LockKeyhole, Mail, UserCircle2 } from 'lucide-react';

export default function SignInPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-md card p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Kirish</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Kabinetga kiring</h1>
          </div>
          <div className="rounded-xl bg-brand-50 p-3 text-brand-700">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
              <input className="input-field pl-10" type="email" placeholder="name@example.com" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Parol</label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
              <input className="input-field pl-10" type="password" placeholder="••••••••" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Rol</label>
            <div className="relative">
              <UserCircle2 className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
              <select className="input-field pl-10" defaultValue="student">
                <option value="student">Talaba</option>
                <option value="teacher">O’qituvchi</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" className="button-primary w-full">
            Kirish
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <Link href="/forgot-password" className="font-medium text-brand-700 hover:underline">
            Parolni unutdim
          </Link>
          <Link href="/signup" className="font-medium text-brand-700 hover:underline">
            Ro’yxatdan o’tish
          </Link>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <Link href="/" className="inline-flex items-center gap-2 text-brand-700 hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    </main>
  );
}
