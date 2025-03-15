
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useRatingManagement = () => {
  const [ratings, setRatings] = useState<{
    [key: string]: number;
  }>({});
  const [weightedAverage, setWeightedAverage] = useState<number>(0);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [profName, setProfName] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [newRecommendation, setNewRecommendation] = useState<any>(null);
  const { toast } = useToast();
  
  const handleRatingChange = (newRatings: {
    [key: string]: number;
  }, average: number, ratedProfName: string, ratedRecommendation?: string, ratedCustomerName?: string, ratedCustomerPhone?: string) => {
    setRatings(newRatings);
    setWeightedAverage(average);
    setProfName(ratedProfName);
    setCustomerName(ratedCustomerName || '');
    setCustomerPhone(ratedCustomerPhone || '');
    if (ratedRecommendation) {
      setRecommendation(ratedRecommendation);
    }
    if (average >= 4.2 && ratedRecommendation && ratedRecommendation.trim() !== '') {
      setNewRecommendation({
        profName: ratedProfName,
        rating: average,
        recommendation: ratedRecommendation,
        customer: ratedCustomerName || 'לקוח/ה'
      });
    }
    setShowSubmitSuccess(true);
    toast({
      title: "הדירוג התקבל!",
      description: `תודה על הדירוג של ${ratedProfName}`
    });
  };

  const closeSuccessPopup = () => {
    setShowSubmitSuccess(false);
  };

  return {
    ratings,
    weightedAverage,
    showSubmitSuccess,
    profName,
    recommendation,
    customerName,
    customerPhone,
    newRecommendation,
    handleRatingChange,
    closeSuccessPopup
  };
};
