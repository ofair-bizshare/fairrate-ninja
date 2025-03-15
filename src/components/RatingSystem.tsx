import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Professional } from '@/services/supabaseService';

interface RatingCriteria {
  id: string;
  label: string;
  value: number;
  icon?: string;
  weight: number;
}

interface RatingSystemProps {
  onRatingChange: (ratings: { [key: string]: number }, weightedAverage: number, profName: string, recommendation?: string) => void;
  professional?: Professional | null;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ onRatingChange, professional }) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({
    overall: 0,
    timing: 0,
    quality: 0,
    value: 0,
    communication: 0,
    cleanliness: 0,
    recommendation: 0,
  });
  const [profName, setProfName] = useState('');
  const [profPhone, setProfPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [hoveredRatings, setHoveredRatings] = useState<{ [key: string]: number }>({});
  const [weightedAverage, setWeightedAverage] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  // Update the fields when professional data changes
  useEffect(() => {
    if (professional) {
      const fullName = `${professional.first_name || ''} ${professional.last_name || ''}`.trim();
      setProfName(fullName);
      setProfPhone(professional.phone || '');
      setCompanyName(professional.company_name || '');
    }
  }, [professional]);

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
    const totalWeight = criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    const weightedSum = criteria.reduce(
      (sum, criterion) => sum + (ratings[criterion.id] * criterion.weight),
      0
    );
    
    const average = totalWeight > 0 ? weightedSum / totalWeight : 0;
    setWeightedAverage(Number(average.toFixed(1)));
  }, [ratings, criteria]);

  const handleRatingChange = (criterionId: string, value: number) => {
    setRatings(prev => ({
      ...prev,
      [criterionId]: value
    }));

    if (errors[criterionId]) {
      setErrors(prev => ({
        ...prev,
        [criterionId]: false
      }));
    }
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

  const handleProfNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfName(e.target.value);
    if (e.target.value.trim() && errors.profName) {
      setErrors(prev => ({
        ...prev,
        profName: false
      }));
    }
  };

  const resetForm = () => {
    setRatings({
      overall: 0,
      timing: 0,
      quality: 0,
      value: 0,
      communication: 0,
      cleanliness: 0,
      recommendation: 0,
    });
    if (!professional) {
      setProfName('');
      setProfPhone('');
      setCompanyName('');
    }
    setRecommendation('');
    setWeightedAverage(0);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: boolean } = {};

    if (!profName.trim()) {
      newErrors.profName = true;
    }

    let hasRating = false;
    for (const criterion of criteria) {
      if (ratings[criterion.id] > 0) {
        hasRating = true;
        break;
      }
    }

    if (!hasRating) {
      for (const criterion of criteria) {
        newErrors[criterion.id] = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({
        title: "אנא תקנו את השדות המסומנים",
        description: "יש למלא את כל השדות הנדרשים כדי לשלוח את הדירוג",
        variant: "destructive",
      });
      return;
    }
    
    onRatingChange(ratings, weightedAverage, profName, recommendation);
    
    resetForm();
  };

  const renderStars = (criterionId: string, value: number) => {
    const displayValue = hoveredRatings[criterionId] !== undefined ? hoveredRatings[criterionId] : value;
    
    return (
      <div 
        className="flex rtl gap-2"
        onMouseLeave={() => handleStarLeave(criterionId)}
      >
        {[0, 1, 2, 3, 4, 5].map((num) => (
          <button
            key={`${criterionId}-${num}`}
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center border transition-all",
              errors[criterionId] && value === 0 ? "border-red-500" : "",
              (displayValue === num)
                ? "bg-blue-500 text-white border-blue-500" 
                : ratings[criterionId] === num
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            )}
            onClick={() => handleRatingChange(criterionId, num)}
            onMouseEnter={() => handleStarHover(criterionId, num)}
            type="button"
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto ofair-card">
      <h2 className="text-2xl font-bold text-center mb-6 rtl">דרגו את בעל המקצוע</h2>
      
      <div className="mb-6">
        <label htmlFor="profName" className="block text-sm font-medium text-gray-700 mb-1 rtl">שם בעל המקצוע*</label>
        <input
          type="text"
          id="profName"
          value={profName}
          onChange={professional ? undefined : handleProfNameChange}
          className={cn(
            "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl",
            errors.profName ? "border-red-500 bg-red-50" : "border-gray-300",
            professional ? "bg-gray-100" : ""
          )}
          placeholder="הזינו את שם בעל המקצוע"
          readOnly={!!professional}
          required
        />
        {errors.profName && (
          <p className="text-red-500 text-sm mt-1 rtl">נא להזין את שם בעל המקצוע</p>
        )}
      </div>

      {/* Phone Number Field (Read-only if prefilled) */}
      <div className="mb-6">
        <label htmlFor="profPhone" className="block text-sm font-medium text-gray-700 mb-1 rtl">מספר טלפון*</label>
        <input
          type="tel"
          id="profPhone"
          value={profPhone}
          onChange={professional ? undefined : (e) => setProfPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100 rtl"
          placeholder="מספר טלפון"
          readOnly={true}
          required
        />
      </div>

      {/* Company Name Field (Read-only if prefilled) */}
      {(companyName || professional) && (
        <div className="mb-6">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1 rtl">שם החברה</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={professional ? undefined : (e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-gray-100 rtl"
            placeholder="שם החברה"
            readOnly={true}
          />
        </div>
      )}
      
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
              {renderStars(criterion.id, ratings[criterion.id])}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-1 rtl">המלצה (אופציונלי)</label>
        <textarea
          id="recommendation"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl h-32 resize-none"
          placeholder="ספרו לנו על החוויה שלכם עם בעל המקצוע"
        />
      </div>

      <div className="mt-8 text-center">
        <button 
          type="button"
          className="ofair-button px-8 hover:bg-primary-dark active:bg-primary-darker transition-colors"
          onClick={handleSubmit}
        >
          שלחו את הדירוג
        </button>
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
