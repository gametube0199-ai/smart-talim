# SMART TA’LIM

SMART TA’LIM — oliy ta’lim talabalari uchun shaxsiylashtirilgan o’quv platformasi MVP.

## Bosqich 1: loyiha boshqaruvi va UI asoslari

- Next.js + App Router + TypeScript + Tailwind asosida loyiha yaratildi.
- Uzbek Latin tilida ishlaydigan zamonaviy SaaS dizayn tayyorlandi.
- Landing page, kirish/ro’yxatdan o’tish, parolni tiklash, dashboard va profil sahifalari ishlaydigan navigatsiya bilan birlashtirildi.
- Auth va role shell (student / teacher / admin) demo rejimda ishlab turibdi.
- Middleware orqali himoyalangan sahifalarga kirish nazorat qilinadi.

## Bosqich 2: databaza schema va RBAC/RLS

- `supabase/migrations/001_initial_schema.sql` faylida barcha asosiy jadvallar yaratilgan:
  - `profiles`
  - `teacher_students`
  - `diagnostic_tests`
  - `test_questions`
  - `test_attempts`
  - `test_answers`
  - `learning_plans`
  - `plan_tasks`
  - `portfolio_items`
  - `growth_snapshots`
- Har bir jadvallarga indeks, UUID asosli foreign key, timestamps, va `ROW LEVEL SECURITY` siyosatlari qo’shilgan.
- `profiles.role` va `auth.uid()` kombinatsiyasi bo’yicha rolni server tomonida tekshirish mexanizmi kiritilgan.
- `correct_option` ni talabalar ko’ra olmaydigan tarzda ishlash uchun server-side query helper (`get_published_test_questions`) tayyorlangan.
- `lib/supabase/client.ts` va `lib/supabase/server.ts` orqali Supabase client/server konfiguratsiyasi ajratilgan.

## Ishga tushirish

1. `npm install`
2. `cp .env.example .env.local`
3. Supabase foydalanuvchi ma’lumotlarini kiriting:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. `npm run dev`
5. Brauzerda `http://localhost:3000` oching

## Muhim muhit o’zgaruvchilari

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_NAME=SMART TA’LIM
```

> Eslatma: Supabase service-role key faqat server tarafida ishlatiladi. Browser kodiga hech qachon yubormang.

## Xavfsizlik prinsiplari

- Client tomonidan kelgan ro’l qiymatini ishonch bilan qabul qilmaymiz.
- Studentlar o’zlaridan tashqari talabalar profillariga yoki superset ma’lumotlarga kirishga urinmasligi RLS orqali ta’minlanadi.
- Teacher/admin faqat ruxsat etilgan holatlarda assign, review, grading va approval amallarini bajarishi rejalashtirilgan.
- Correct answerlar va maxfiy ma’lumotlar server side orqali ishlatiladi.

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

## Keyingi bosqich

Keyingi qadam — diagnostic testlar, natijalar, and result logs bo’yicha core logic va test management modulini yaratish.
