import Link from 'next/link';
import { ArrowRight, BrainCircuit, FileText, LayoutDashboard, LogIn, ShieldCheck, UserRound } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Bosh sahifa', icon: LayoutDashboard },
  { href: '/dashboard', label: 'Dashboard', icon: BrainCircuit },
  { href: '/profile', label: 'Profil', icon: UserRound },
  { href: '/signin', label: 'Kirish', icon: LogIn },
  { href: '/signup', label: 'Ro’yxatdan o’tish', icon: FileText },
  { href: '/forgot-password', label: 'Parolni tiklash', icon: ShieldCheck },
];

export function AppNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">SMART TA’LIM</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Learning platform</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-slate-600 transition hover:text-brand-700">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="button-secondary hidden sm:inline-flex">
            Kirish
          </Link>
          <Link href="/signup" className="button-primary">
            Boshlash <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
