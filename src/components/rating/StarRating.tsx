
import React from 'react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  criterionId: string;
  value: number;
  onChange: (criterionId: string, value: number) => void;
  error: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ criterionId, value, onChange, error }) => {
  const [hoveredValue, setHoveredValue] = React.useState<number | null>(null);
  
  const displayValue = hoveredValue !== null ? hoveredValue : value;
  
  const handleStarHover = (starValue: number) => {
    setHoveredValue(starValue);
  };
  
  const handleStarLeave = () => {
    setHoveredValue(null);
  };
  
  return (
    <div 
      className="flex rtl gap-2"
      onMouseLeave={handleStarLeave}
    >
      {[0, 1, 2, 3, 4, 5].map((num) => (
        <button
          key={`${criterionId}-${num}`}
          className={cn(
            "w-10 h-10 rounded-md flex items-center justify-center border transition-all",
            error && value === 0 ? "border-red-500" : "",
            (displayValue === num)
              ? "bg-blue-500 text-white border-blue-500" 
              : value === num
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
          )}
          onClick={() => onChange(criterionId, num)}
          onMouseEnter={() => handleStarHover(num)}
          type="button"
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
