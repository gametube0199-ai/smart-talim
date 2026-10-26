export type GrowthSnapshot = {
  id: string;
  label: string;
  score: number;
  completion: number;
  growthIndex: number;
  date: string;
};

export const growthSnapshots: GrowthSnapshot[] = [
  { id: 's1', label: 'Yanvar', score: 58, completion: 42, growthIndex: 0.42, date: '2026-01' },
  { id: 's2', label: 'Fevral', score: 61, completion: 48, growthIndex: 0.47, date: '2026-02' },
  { id: 's3', label: 'Mart', score: 68, completion: 56, growthIndex: 0.53, date: '2026-03' },
  { id: 's4', label: 'Aprel', score: 73, completion: 63, growthIndex: 0.59, date: '2026-04' },
  { id: 's5', label: 'May', score: 79, completion: 70, growthIndex: 0.67, date: '2026-05' },
  { id: 's6', label: 'Iyun', score: 84, completion: 76, growthIndex: 0.74, date: '2026-06' },
];

export function calculateChange(current: number, previous: number) {
  return Number((current - previous).toFixed(1));
}

export function getScoreChange(current: number, previous: number) {
  return calculateChange(current, previous);
}

export function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}
