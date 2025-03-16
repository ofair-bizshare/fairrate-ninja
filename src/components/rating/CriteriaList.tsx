
import React from 'react';
import { cn } from '@/lib/utils';
import { RatingCriterion } from './ratingCriteria';
import StarRating from './StarRating';

interface CriteriaListProps {
  criteria: RatingCriterion[];
  ratings: { [key: string]: number };
  errors: { [key: string]: boolean };
  onRatingChange: (criterionId: string, value: number) => void;
}

const CriteriaList: React.FC<CriteriaListProps> = ({
  criteria,
  ratings,
  errors,
  onRatingChange
}) => {
  return (
    <div className="space-y-6 mb-6">
      {criteria.map((criterion) => (
        <div 
          key={criterion.id} 
          className={cn(
            "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl transition-all rtl",
            errors[criterion.id] ? "bg-red-50 border border-red-200" : 
            ratings[criterion.id] > 0 ? "bg-blue-50" : "bg-gray-50"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="ofair-chip">{criterion.icon}</div>
            <span className="font-medium">{criterion.label}</span>
          </div>
          <div className="flex-shrink-0">
            <StarRating
              criterionId={criterion.id}
              value={ratings[criterion.id]}
              onChange={onRatingChange}
              error={!!errors[criterion.id]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CriteriaList;
