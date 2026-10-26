export type Question = {
  id: string;
  prompt: string;
  topic: string;
  points: number;
  options: string[];
  correctOption: string;
  explanation: string;
};

export type DiagnosticTest = {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  timeLimitMinutes: number;
  isSeededDemo: boolean;
  publishedAt: string;
  questions: Question[];
};

export const diagnosticTests: DiagnosticTest[] = [
  {
    id: 'math-aptitude-01',
    title: 'Matematika tayyorgarlik testi',
    subject: 'Matematika',
    description: 'Algebra, arifmetika va mantiqiy fikrlashga oid qisqa diagnostik test.',
    status: 'published',
    timeLimitMinutes: 25,
    isSeededDemo: true,
    publishedAt: '2026-10-26',
    questions: [
      {
        id: 'q1',
        prompt: '24 + 18 × 2 ni hisoblang.',
        topic: 'Arifmetika',
        points: 2,
        options: ['42', '60', '66', '52'],
        correctOption: '60',
        explanation: 'Avval ko’paytirish bajariladi: 18 × 2 = 36, keyin 24 + 36 = 60.',
      },
      {
        id: 'q2',
        prompt: 'x + 7 = 15 bo’lsa, x ning qiymati nima?',
        topic: 'Algebra',
        points: 2,
        options: ['6', '7', '8', '9'],
        correctOption: '8',
        explanation: 'x = 15 - 7 = 8.',
      },
      {
        id: 'q3',
        prompt: 'Quyidagilardan qaysi biri 3 va 5 ning umumiy bo’luvchisi hisoblanadi?',
        topic: 'Mantiq',
        points: 3,
        options: ['8', '15', '10', '20'],
        correctOption: '15',
        explanation: '15 ikkala sondan ham bo’linadi.',
      },
    ],
  },
  {
    id: 'reading-logic-01',
    title: 'O’qish va mantiq testi',
    subject: 'O’qish va mantiq',
    description: 'Tahlil va stilistik tushunish darajasini baholash uchun diagnostik moduli.',
    status: 'published',
    timeLimitMinutes: 30,
    isSeededDemo: true,
    publishedAt: '2026-10-26',
    questions: [
      {
        id: 'q4',
        prompt: 'Matnning asosiy maqsadi nima?',
        topic: 'Tushunish',
        points: 2,
        options: ['Faoliyatni sekinlashtirish', 'Maqsad va fikrni aniq yetkazish', 'Barchasini rad etish', 'Fikrni qiyinlashtirish'],
        correctOption: 'Maqsad va fikrni aniq yetkazish',
        explanation: 'Yaxshi matnning asosiy vazifasi maqsadli fikrni aniq va tushunarli qilib yetkazishdir.',
      },
      {
        id: 'q5',
        prompt: 'Agar “sifatli fikr” tushunchasi yanada mustahkam bo’lsa, qaysi javob mos keladi?',
        topic: 'Analiz',
        points: 3,
        options: ['Barcha fikrlar bir xil bo’ladi', 'Fikr aniq, ishonchli va asoslangan bo’ladi', 'Hech narsa o’zgarmaydi', 'Fikr faqat tez yozilishi kerak'],
        correctOption: 'Fikr aniq, ishonchli va asoslangan bo’ladi',
        explanation: 'Sifatli fikrlar aniq, foydali va sababga asoslangan bo’ladi.',
      },
    ],
  },
  {
    id: 'science-aptitude-01',
    title: 'Tabiiy fanlar diagnostik testi',
    subject: 'Tabiiy fanlar',
    description: 'Kimyo va biologiya bo’yicha boshlang’ich bilimlarni aniqlash.',
    status: 'draft',
    timeLimitMinutes: 20,
    isSeededDemo: true,
    publishedAt: '2026-10-26',
    questions: [
      {
        id: 'q6',
        prompt: 'Fotosintez jarayonida qanday gaz ajralib chiqadi?',
        topic: 'Biologiya',
        points: 2,
        options: ['Kislorod', 'Karbonat angidrid', 'Azot', 'Vodorod'],
        correctOption: 'Kislorod',
        explanation: 'O’simliklar fotosintezda kislorod chiqaradi.',
      },
      {
        id: 'q7',
        prompt: 'Bitta atomdagi protonlar soni nima bilan belgilanadi?',
        topic: 'Kimyo',
        points: 2,
        options: ['Yuk', 'Atom massasi', 'Atom raqami', 'Valentlik'],
        correctOption: 'Atom raqami',
        explanation: 'Atom raqami protonlar soniga teng.',
      },
    ],
  },
];

export function findDiagnosticTestById(id: string) {
  return diagnosticTests.find((test) => test.id === id);
}

export function computeScore(
  test: DiagnosticTest,
  answers: Record<string, string>,
): {
  earnedPoints: number;
  maxScore: number;
  percentage: number;
  correctCount: number;
  answeredCount: number;
  details: Array<{
    questionId: string;
    questionPrompt: string;
    selectedOption: string | null;
    correctOption: string;
    isCorrect: boolean;
    pointsEarned: number;
    pointsPossible: number;
  }>;
} {
  let earnedPoints = 0;
  let correctCount = 0;
  let answeredCount = 0;

  const details = test.questions.map((question) => {
    const selectedOption = answers[question.id] ?? null;
    const isCorrect = selectedOption === question.correctOption;
    if (selectedOption) answeredCount += 1;
    if (isCorrect) {
      earnedPoints += question.points;
      correctCount += 1;
    }

    return {
      questionId: question.id,
      questionPrompt: question.prompt,
      selectedOption,
      correctOption: question.correctOption,
      isCorrect,
      pointsEarned: isCorrect ? question.points : 0,
      pointsPossible: question.points,
    };
  });

  const maxScore = test.questions.reduce((sum, question) => sum + question.points, 0);
  const percentage = maxScore === 0 ? 0 : (earnedPoints / maxScore) * 100;

  return {
    earnedPoints,
    maxScore,
    percentage,
    correctCount,
    answeredCount,
    details,
  };
}
