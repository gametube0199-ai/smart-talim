import { BriefcaseBusiness, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';

export default function ProfilePage() {
  return (
    <main className="page-shell py-10">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-100 text-2xl font-black text-brand-700">A</div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Aziza Karimova</h1>
              <p className="text-sm text-slate-500">Talaba • 2-kurs</p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-brand-600" /> aziza@example.com</div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-brand-600" /> +998 90 123 45 67</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-brand-600" /> Toshkent, O’zbekiston</div>
            <div className="flex items-center gap-3"><BriefcaseBusiness className="h-4 w-4 text-brand-600" /> Buxgalteriya va audit yo’nalishi</div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Profil ma’lumotlari</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">Fakultet</label>
              <input className="input-field" defaultValue="Iqtisodiyot" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Kurs</label>
              <input className="input-field" defaultValue="2" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Yo’nalish</label>
              <input className="input-field" defaultValue="Buxgalteriya" />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Guruh</label>
              <input className="input-field" defaultValue="B-204" />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Biografiya</label>
              <textarea className="input-field min-h-[120px]" defaultValue="Mening maqsadim zamonaviy biznes va boshqaruv yondashuvlarini o’rganish orqali o’z kasbiy yo’limni rivojlantirish." />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="button-primary">Saqlash</button>
          </div>
        </div>
      </div>
    </main>
  );
}
