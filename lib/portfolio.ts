export type PortfolioEntry = {
  id: string;
  title: string;
  description: string;
  url?: string;
  fileName?: string;
  submittedAt: string;
  feedback?: string;
  grade?: number;
  status: 'draft' | 'under_review' | 'approved';
};

export const allowedPortfolioMimeTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const portfolioBucketName = 'student-portfolio';
export const maxPortfolioFileSizeBytes = 5 * 1024 * 1024;

export function validatePortfolioUpload(file: { name: string; size: number; type: string }) {
  const errors: string[] = [];

  if (!file.name) {
    errors.push('Fayl nomi bo’sh bo’lishi mumkin emas.');
  }

  if (!file.type) {
    errors.push('Fayl turi aniqlanmagan.');
  }

  if (!allowedPortfolioMimeTypes.includes(file.type)) {
    errors.push('Faqat PDF, DOCX, JPEG, PNG, WEBP yoki TXT fayllari ruxsat etiladi.');
  }

  if (file.size > maxPortfolioFileSizeBytes) {
    errors.push('Fayl hajmi 5 MB dan oshmasligi kerak.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export const portfolioEntries: PortfolioEntry[] = [
  {
    id: 'p-1',
    title: 'Qisqa ilmiy maqola',
    description: 'Oliy ta’limda raqamli ko’nikmalar va innovatsion yondashuvlar mavzusida qisqa tahliliy maqola.',
    url: 'https://example.com/portfolio/article-1',
    submittedAt: '2026-10-16',
    feedback: 'Maqola aniq va strukturali yozilgan. Katta qismi yanada ilmiy asoslangan ko’rinishga aylantirilishi mumkin.',
    grade: 92,
    status: 'approved',
  },
  {
    id: 'p-2',
    title: 'Portfolio poster',
    description: 'O’quv faoliyati, loyiha natijalari va yutuqlarni ko’rsatadigan poster.',
    fileName: 'poster-final.png',
    submittedAt: '2026-10-22',
    feedback: 'Vizual dizayn yaxshi, faqat rivojlanish ko’rsatkichlari uchun kichik izoh qo’shish tavsiya etiladi.',
    grade: 88,
    status: 'under_review',
  },
  {
    id: 'p-3',
    title: 'Amaliy loyiha yakuni',
    description: 'O’quv yilidagi loyiha natijalarini jamlab, natijalar bo’yicha tahlil yozilgan fayl.',
    fileName: 'project-summary.pdf',
    submittedAt: '2026-10-25',
    status: 'draft',
  },
];

export function getPortfolioStatusLabel(status: PortfolioEntry['status']) {
  const labels = {
    draft: 'Qoralama',
    under_review: 'Tekshirilmoqda',
    approved: 'Tasdiqlandi',
  };

  return labels[status];
}
