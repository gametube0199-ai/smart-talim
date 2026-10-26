import Link from 'next/link';
import { ArrowLeft, KeyRound, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <main className="page-shell py-16">
      <div className="mx-auto max-w-md card p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">Parolni tiklash</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900">Elektron pochtangizni kiriting</h1>
          </div>
          <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
            <KeyRound className="h-6 w-6" />
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

          <button type="submit" className="button-primary w-full">
            Tiklash linkini yuborish
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          <Link href="/signin" className="font-semibold text-brand-700 hover:underline">
            Kirishga qaytish
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
