# SMART TA’LIM

SMART TA’LIM — Oliy ta’lim talabalari uchun shaxsiylashtirilgan o’quv platformasi MVP.

## Bosqich 1: loyiha boshqaruvi va UI asoslari

- Next.js + App Router + TypeScript + Tailwind asosida loyiha yaratildi.
- Uzuk Latin tilida ishlaydigan zamonaviy SaaS dizayn tayyorlandi.
- Landing page, kirish/ro’yxatdan o’tish, parolni tiklash, dashboard va profil sahifalari ishlaydigan navigatsiya bilan birlashtirildi.
- Auth va role shell (student / teacher / admin) demo rejimda ishlab turibdi.
- Middleware orqali himoyalangan sahifalarga kirish nazorat qilinadi.

## Ishga tushirish

1. `npm install`
2. `cp .env.example .env.local`
3. `npm run dev`
4. Brauzerda `http://localhost:3000` oching

## Muhim muhit o’zgaruvchilari

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXTAUTH_SECRET=replace-with-a-random-secret
```

> Eslatma: Supabase service-role key faqat server tarafida ishlatiladi. Browser kodiga hech qachon yubormang.

## Loyihaning maqsadi

Bu loyiha keyingi bosqichlarda quyidagi modullar bilan kengaytiriladi:
- Supabase PostgreSQL schema va RLS siyosati
- Testlar va ball hisoblash
- Individual learning plan
- Smart Portfolio va xususiy storage
- Growth analytics
- Teacher/Admin dashboard va assignment boshqaruvi

## Dasturiy ta’minot

- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts
- Supabase SDK
- Zod
- Lucide React

## Foydalanish shartlari

Bu loyiha MVP bo’lib, demo ma’lumotlar sifatida ishlatiladigan ma’lumotlar aniq belgilab qo’yilgan bo’lishi kerak. Real foydalanuvchi ma’lumotlari ishlatilmadi.
