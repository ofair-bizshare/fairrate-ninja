
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingCriteria {
  id: string;
  label: string;
  value: number;
  icon?: string;
  weight: number;
}

interface RatingSystemProps {
  onRatingChange: (ratings: { [key: string]: number }, weightedAverage: number) => void;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ onRatingChange }) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    overall: 0,
    timing: 0,
    quality: 0,
    value: 0,
    communication: 0,
    cleanliness: 0,
    recommendation: 0,
  });

  const [hoveredRatings, setHoveredRatings] = useState<{ [key: string]: number }>({});
  const [weightedAverage, setWeightedAverage] = useState(0);
  const [animateStars, setAnimateStars] = useState(false);

  const criteria: RatingCriteria[] = [
    { id: 'overall', label: 'דירוג כולל', value: ratings.overall, icon: '⭐', weight: 1.5 },
    { id: 'timing', label: 'עמידה בזמנים', value: ratings.timing, icon: '⏳', weight: 1 },
    { id: 'quality', label: 'איכות העבודה', value: ratings.quality, icon: '🏗️', weight: 1.5 },
    { id: 'value', label: 'מחיר מול תמורה', value: ratings.value, icon: '💰', weight: 1 },
    { id: 'communication', label: 'שירות ותקשורת', value: ratings.communication, icon: '📞', weight: 1 },
    { id: 'cleanliness', label: 'ניקיון וסדר', value: ratings.cleanliness, icon: '🔧', weight: 0.5 },
    { id: 'recommendation', label: 'המלצה כללית', value: ratings.recommendation, icon: '👍', weight: 1.5 },
  ];

  useEffect(() => {
    setAnimateStars(true);
    const timer = setTimeout(() => setAnimateStars(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Calculate weighted average
    const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    const weightedSum = criteria.reduce(
      (sum, criterion) => sum + (ratings[criterion.id] * criterion.weight),
      0
    );
    
    const average = totalWeight > 0 ? weightedSum / totalWeight : 0;
    setWeightedAverage(Number(average.toFixed(1)));
    
    // Notify parent component
    onRatingChange(ratings, Number(average.toFixed(1)));
  }, [ratings, criteria, onRatingChange]);

  const handleRatingChange = (criterionId: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };

  const handleStarHover = (criterionId: string, value: number) => {
    setHoveredRatings(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };

  const handleStarLeave = (criterionId: string) => {
    setHoveredRatings(prev => {
      const newHovered = { ...prev };
      delete newHovered[criterionId];
      return newHovered;
    });
  };

  const renderStars = (criterionId: string, value: number) => {
    const starCount = 5;
    const displayValue = hoveredRatings[criterionId] !== undefined ? hoveredRatings[criterionId] : value;
    
    return (
      <div 
        className="star-rating-wrapper rtl"
        onMouseLeave={() => handleStarLeave(criterionId)}
      >
        <div className="star-rating-backdrop">
          {[...Array(starCount)].map((_, index) => (
            <Star 
              key={`${criterionId}-backdrop-${index}`}
              size={28}
              className="text-gray-200"
            />
          ))}
        </div>
        <div className="star-rating" style={{ width: `${(displayValue / starCount) * 100}%` }}>
          {[...Array(starCount)].map((_, index) => (
            <Star 
              key={`${criterionId}-filled-${index}`}
              size={28}
              className={cn(
                "text-yellow-400 cursor-pointer transition-all",
                animateStars && "animate-pulse-subtle"
              )}
              onClick={() => handleRatingChange(criterionId, index + 1)}
              onMouseEnter={() => handleStarHover(criterionId, index + 1)}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto ofair-card">
      <h2 className="text-2xl font-bold text-center mb-6 rtl">דרגו את בעל המקצוע</h2>
      
      <div className="space-y-6">
        {criteria.map((criterion) => (
          <div 
            key={criterion.id} 
            className={cn(
              "flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl transition-all rtl",
              ratings[criterion.id] > 0 ? "bg-blue-50" : "bg-gray-50"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="ofair-chip">{criterion.id === "overall" ? "1" : ""}</div>
              <span className="font-medium">{criterion.label}</span>
            </div>
            <div className="flex-shrink-0">
              {renderStars(criterion.id, ratings[criterion.id])}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-lg font-semibold text-center rtl">ציון משוקלל סופי</h3>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-primary">{weightedAverage.toFixed(1)}</span>
            <Star className="h-8 w-8 text-yellow-400" />
          </div>
          <div className="text-sm text-muted-foreground rtl text-center max-w-xs mx-auto mt-2">
            הציון הסופי מחושב אוטומטית על-פי משקל של כל קריטריון
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSystem;
