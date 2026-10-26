import Link from 'next/link';
import { ArrowLeft, Mail, ShieldCheck, UserPlus } from 'lucide-react';

export default function SignUpPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-xl card p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Ro’yxatdan o’tish</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Hisob yaratish</h1>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
            <UserPlus className="h-6 w-6" />
          </div>
        </div>

        <form className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">To’liq ism</label>
            <input className="input-field" type="text" placeholder="Azizbek Karimov" />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
              <input className="input-field pl-10" type="email" placeholder="name@example.com" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Rol</label>
            <div className="relative">
              <ShieldCheck className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />
              <select className="input-field pl-10" defaultValue="student">
                <option value="student">Talaba</option>
                <option value="teacher">O’qituvchi</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Parol</label>
            <input className="input-field" type="password" placeholder="Kamida 8 ta belgi" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="button-primary w-full">
              Hisob yaratish
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Allaqachon hisobingiz bormi?{' '}
          <Link href="/signin" className="font-semibold text-brand-700 hover:underline">
            Kirish
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
