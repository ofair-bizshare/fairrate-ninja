
import React, { useState, useEffect } from 'react';
import { Star, X, Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface RatingCriteria {
  id: string;
  label: string;
  value: number;
  icon?: string;
  weight: number;
}

interface RatingSystemProps {
  onRatingChange: (ratings: { [key: string]: number }, weightedAverage: number, profName: string) => void;
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
  const [profName, setProfName] = useState('');
  const [hoveredRatings, setHoveredRatings] = useState<{ [key: string]: number }>({});
  const [weightedAverage, setWeightedAverage] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { toast } = useToast();

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
    // Calculate weighted average
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
    setProfName('');
    setWeightedAverage(0);
  };

  const handleSubmit = () => {
    if (weightedAverage === 0) {
      toast({
        title: "לא ניתן לשלוח",
        description: "נא לדרג לפחות קריטריון אחד",
        variant: "destructive",
      });
      return;
    }
    
    if (!profName.trim()) {
      toast({
        title: "חסרים פרטים",
        description: "נא להזין את שם בעל המקצוע",
        variant: "destructive",
      });
      return;
    }
    
    // This is the function that actually submits the rating - make sure it's called
    onRatingChange(ratings, weightedAverage, profName);
    
    // Show success popup
    setShowSuccessPopup(true);
    
    // Show toast for confirmation
    toast({
      title: "הדירוג נשלח בהצלחה!",
      description: `תודה על הדירוג של ${profName}`,
    });
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    resetForm();
  };

  const scrollToBenefits = () => {
    document.getElementById('benefits-section')?.scrollIntoView({ behavior: 'smooth' });
    closePopup();
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
          onChange={(e) => setProfName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl"
          placeholder="הזינו את שם בעל המקצוע"
          required
        />
      </div>
      
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
              <div className="ofair-chip">{criterion.icon}</div>
              <span className="font-medium">{criterion.label}</span>
            </div>
            <div className="flex-shrink-0">
              {renderStars(criterion.id, ratings[criterion.id])}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button 
          type="button"
          className={cn(
            "ofair-button px-8",
            weightedAverage === 0 || !profName.trim() ? "opacity-70 cursor-not-allowed" : ""
          )}
          disabled={weightedAverage === 0 || !profName.trim()}
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
            <button 
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold rtl">תודה על הדירוג!</h3>
              <p className="text-muted-foreground mt-2 rtl">
                הדירוג שלך יעזור לאחרים למצוא בעלי מקצוע איכותיים
              </p>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-center mb-3 rtl">עקבו אחרינו ברשתות החברתיות</h4>
              <div className="flex justify-center gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=61573771175534#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={scrollToBenefits}
                className="ofair-button bg-secondary/80 text-secondary-foreground hover:bg-secondary"
              >
                מה זה oFair?
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingSystem;
