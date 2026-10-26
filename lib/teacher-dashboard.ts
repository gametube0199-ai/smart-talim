export type TeacherStudentSummary = {
  studentId: string;
  studentName: string;
  latestScore: number;
  learningPlanStatus: 'draft' | 'active' | 'reviewed' | 'approved';
  portfolioStatus: 'draft' | 'under_review' | 'approved';
  trend: number;
};

export const teacherAssignments: TeacherStudentSummary[] = [
  {
    studentId: 's-101',
    studentName: 'Aziza Karimova',
    latestScore: 84,
    learningPlanStatus: 'active',
    portfolioStatus: 'under_review',
    trend: 12,
  },
  {
    studentId: 's-102',
    studentName: 'Shoxrux Tojiboyev',
    latestScore: 76,
    learningPlanStatus: 'reviewed',
    portfolioStatus: 'approved',
    trend: 8,
  },
  {
    studentId: 's-103',
    studentName: 'Nodira Yusufova',
    latestScore: 68,
    learningPlanStatus: 'draft',
    portfolioStatus: 'draft',
    trend: 4,
  },
];

export function getLearningPlanStateLabel(status: TeacherStudentSummary['learningPlanStatus']) {
  const labels = {
    draft: 'Qoralama',
    active: 'Faol',
    reviewed: 'Tekshirilmoqda',
    approved: 'Tasdiqlandi',
  };

  return labels[status];
}

export function getPortfolioStateLabel(status: TeacherStudentSummary['portfolioStatus']) {
  const labels = {
    draft: 'Qoralama',
    under_review: 'Tekshirilmoqda',
    approved: 'Tasdiqlandi',
  };

  return labels[status];
}
