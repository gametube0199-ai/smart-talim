export type PlanStatus = 'draft' | 'active' | 'reviewed' | 'approved';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'approved';

export type PlanTask = {
  id: string;
  title: string;
  description: string;
  recommendedResource: string;
  dueDate: string;
  status: TaskStatus;
  teacherFeedback: string;
};

export type LearningPlan = {
  id: string;
  title: string;
  summary: string;
  overallGoal: string;
  status: PlanStatus;
  teacherNotes: string;
  tasks: PlanTask[];
};

const planRules = {
  foundational: {
    title: 'Asosiy bilimlarni mustahkamlash',
    summary: 'Maqsad — asosiy bilim va amaliy ko’nikmalarni barqarorlashtirish.',
    overallGoal: 'Asosiy tushunchalarni mustahkamlash va o’quv faoliyatini barqarorlashtirish.',
    teacherNotes: 'Bu reja boshlang’ich daraja talabalar uchun moslashtirilgan. Reja ma’lum bir diagnostik ko’rsatkich asosida avtomatik ravishda yaratilgan.',
    tasks: [
      {
        id: 'foundation-1',
        title: 'Asosiy mavzularni qayta ko’rib chiqish',
        description: 'Har hafta 3 ta asosiy mavzu bo’yicha qisqa takrorlash va mashg’ulot.',
        recommendedResource: 'Kurs materiallari, video darslar, qo’shimcha test topshiriqlari.',
        dueDate: '2026-11-04',
        status: 'in_progress',
        teacherFeedback: 'Qisqa va aniq takrorlashga e’tibor qaratilgan. Har bir mavzu uchun mini-checklist qo’shish tavsiya etiladi.',
      },
      {
        id: 'foundation-2',
        title: 'Mini-quiz va mashq topshiriqlari',
        description: 'Kundalik 15-20 daqiqalik mashqlar orqali mashg’ulotni mustahkamlash.',
        recommendedResource: 'Platforma testlari, amaliy mashqlar, mustahkamlovchi materiallar.',
        dueDate: '2026-11-08',
        status: 'pending',
        teacherFeedback: 'Faol takrorlash va tezkor testlar orqali yutqazilgan bilimlarni tiklash maqsadga muvofiq.',
      },
      {
        id: 'foundation-3',
        title: 'Mavzu bo’yicha xulosalar',
        description: 'Har bir mavzu bo’yicha o’z fikrini yozib, asosiy qoidalarni jamlash.',
        recommendedResource: 'Notebook, xulosa matni, ko’rsatmalar to’plami.',
        dueDate: '2026-11-12',
        status: 'pending',
        teacherFeedback: 'Tavsif va xulosa yozish orqali o’rganilgan nazariy bilimlar mustahkamlanadi.',
      },
    ],
  },
  growth: {
    title: 'Rivojlanishni tezlashtirish',
    summary: 'Maqsad — mavjud natijalarni saqlab qolish va yanada barqaror rivojlanish.',
    overallGoal: 'O’rtacha natijalarni mustahkamlash va uzoq muddatli ilmiy ko’nikmalarni rivojlantirish.',
    teacherNotes: 'Rivojlanish bosqichi talabalar uchun o’rta va yuqori darajadagi ko’nikmalarni rivojlantirishga qaratilgan. Reja texnik va nazariy faoliyatni muvozanatli taqsimlaydi.',
    tasks: [
      {
        id: 'growth-1',
        title: 'Mavzular bo’yicha chuqurroq o’rganish',
        description: 'Har bir mavzu bo’yicha qo’shimcha manbalarni o’rganib chiqish va misollar yechish.',
        recommendedResource: 'Amaliy topshiriqlar, video-lectures, muammoli vazifalar.',
        dueDate: '2026-11-05',
        status: 'in_progress',
        teacherFeedback: 'Mavzu bo’yicha chuqurroq ishlash va mustaqil yechim topish ko’nikmasi rivojlanmoqda.',
      },
      {
        id: 'growth-2',
        title: 'Portfolio elementlarini boyitish',
        description: 'Yana 2 ta tasdiqlangan portfolio elementini qo’shish yoki tahliliy ishlanmalar ishlab chiqish.',
        recommendedResource: 'Portfolio shablonlari, ko’rsatilgan ishlanmalar, guruh ishi.',
        dueDate: '2026-11-10',
        status: 'pending',
        teacherFeedback: 'Portfolio boyitilgan bo’lsa, rivojlanish ko’rsatkichi aniqroq namoyon bo’ladi.',
      },
      {
        id: 'growth-3',
        title: 'O’qituvchi bilan review',
        description: 'Yakuniy review sessiyasi orqali qaysi sohalar yanada rivojlantirish kerakligini aniqlash.',
        recommendedResource: 'Review formasi, ko’rsatmalar, feedback notes.',
        dueDate: '2026-11-16',
        status: 'pending',
        teacherFeedback: 'Regulyar review orqali kelajakdagi maqsadlarni aniqroq belgilash mumkin.',
      },
    ],
  },
  advanced: {
    title: 'Yuqori natija uchun strategik yondashuv',
    summary: 'Maqsad — kuchli natijalarni saqlab qolish va ilg’or ko’nikmalarni rivojlantirish.',
    overallGoal: 'Yuqori natijalarni barqaror saqlash va mustaqil ilmiy tahlil ko’nikmalarini rivojlantirish.',
    teacherNotes: 'Yuqori ko’rsatkichli talabalarda mustaqil tahlil, innovatsion yondashuv va portfolio boyitishga kuchli e’tibor beriladi.',
    tasks: [
      {
        id: 'advanced-1',
        title: 'Mustaqil ilmiy tahlil',
        description: 'Mavzu bo’yicha qo’shimcha tadqiqot va tahliliy xulosalarni ishlab chiqish.',
        recommendedResource: 'Respublika va xalqaro onlayn manbalar, ilmiy ma’lumotlar bazalari.',
        dueDate: '2026-11-06',
        status: 'approved',
        teacherFeedback: 'Ushbu faoliyat yuqori natijani saqlab qolish uchun muhim bosqichdir.',
      },
      {
        id: 'advanced-2',
        title: 'Ko’nikmalarni kuchaytirish',
        description: 'Keng qamrovli amaliy va nazariy mashqlarni bajarib, o’z natijasini baholash.',
        recommendedResource: 'Amaliy ko’rsatmalar, benchmark natijalar, ko’rsatkich jadvali.',
        dueDate: '2026-11-13',
        status: 'completed',
        teacherFeedback: 'Ko’nikma darajasi yuqori, faqat doimiy takrorlash va qayta baholash kerak.',
      },
      {
        id: 'advanced-3',
        title: 'Liderlik va mentorlik',
        description: 'O’z guruhidagi boshqa talabalar uchun qisqa rekomendatsiyalar berish.',
        recommendedResource: 'Mentorlik shablonlari, ko’rsatmalar, feedback form.',
        dueDate: '2026-11-18',
        status: 'pending',
        teacherFeedback: 'Liderlik ko’nikmalari rivojlanib borayotgan bo’lsa, bu yaxshi ko’rsatkich hisoblanadi.',
      },
    ],
  },
};

export function generateLearningPlan(scorePercentage: number, testTitle = 'diagnostic test'): LearningPlan {
  const ruleSet = scorePercentage < 50
    ? planRules.foundational
    : scorePercentage < 75
      ? planRules.growth
      : planRules.advanced;

  return {
    id: `plan-${Date.now()}`,
    title: `${testTitle} uchun individual learning plan`,
    summary: `${ruleSet.summary} Olingan natija: ${scorePercentage.toFixed(1)}%`,
    overallGoal: ruleSet.overallGoal,
    status: 'active',
    teacherNotes: ruleSet.teacherNotes,
    tasks: ruleSet.tasks.map((task) => ({ ...task })),
  };
}

export function getPlanStatusLabel(status: PlanStatus) {
  const labels: Record<PlanStatus, string> = {
    draft: 'Qoralama',
    active: 'Faol',
    reviewed: 'Tekshirilmoqda',
    approved: 'Tasdiqlandi',
  };

  return labels[status];
}

export function getTaskStatusLabel(status: TaskStatus) {
  const labels: Record<TaskStatus, string> = {
    pending: 'Kutilmoqda',
    in_progress: 'Jarayonda',
    completed: 'Bajarildi',
    approved: 'Tasdiqlandi',
  };

  return labels[status];
}
