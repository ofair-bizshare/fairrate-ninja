
import React from 'react';
import { Star } from 'lucide-react';

interface FinalScoreProps {
  weightedAverage: number;
}

const FinalScore: React.FC<FinalScoreProps> = ({ weightedAverage }) => {
  return (
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
  );
};

export default FinalScore;
