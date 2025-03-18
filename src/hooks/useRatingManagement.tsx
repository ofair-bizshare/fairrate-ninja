
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { saveRating, Rating } from '@/services/supabaseService';

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
  
  const handleRatingChange = async (newRatings: {
    [key: string]: number;
  }, average: number, ratedProfName: string, ratedRecommendation?: string, ratedCustomerName?: string, ratedCustomerPhone?: string, profPhone?: string, companyName?: string) => {
    setRatings(newRatings);
    setWeightedAverage(average);
    setProfName(ratedProfName);
    setCustomerName(ratedCustomerName || '');
    setCustomerPhone(ratedCustomerPhone || '');
    if (ratedRecommendation) {
      setRecommendation(ratedRecommendation);
    }
    
    // Only create recommendation for display if rating is high enough and has text
    if (average >= 4.2 && ratedRecommendation && ratedRecommendation.trim() !== '') {
      setNewRecommendation({
        profName: ratedProfName,
        rating: average,
        recommendation: ratedRecommendation,
        customer: ratedCustomerName || 'לקוח/ה'
      });
    }
    
    // Save the rating to Supabase
    if (profPhone && ratedCustomerName && ratedCustomerPhone) {
      const ratingData: Rating = {
        professional_name: ratedProfName,
        professional_phone: profPhone,
        company_name: companyName,
        customer_name: ratedCustomerName,
        customer_phone: ratedCustomerPhone,
        rating_overall: newRatings.overall,
        rating_timing: newRatings.timing,
        rating_quality: newRatings.quality,
        rating_value: newRatings.value,
        rating_communication: newRatings.communication,
        rating_cleanliness: newRatings.cleanliness,
        rating_recommendation: newRatings.recommendation,
        weighted_average: average,
        recommendation: ratedRecommendation
      };
      
      try {
        const ratingId = await saveRating(ratingData);
        console.log('Rating saved with ID:', ratingId);
      } catch (error) {
        console.error('Error saving rating:', error);
      }
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
