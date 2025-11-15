
export interface RatingCriterion {
  id: string;
  label: string;
  icon?: string;
  weight: number;
}

export const ratingCriteria: RatingCriterion[] = [
  { id: 'timing', label: 'עמידה בזמנים', icon: '⏳', weight: 1 },
  { id: 'quality', label: 'איכות העבודה', icon: '🏗️', weight: 1.5 },
  { id: 'value', label: 'מחיר מול תמורה', icon: '💰', weight: 1 },
  { id: 'communication', label: 'שירות ותקשורת', icon: '📞', weight: 1 },
  { id: 'cleanliness', label: 'ניקיון וסדר', icon: '🔧', weight: 0.5 },
  { id: 'recommendation', label: 'המלצה כללית', icon: '👍', weight: 1.5 },
];
