
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
    if (!profPhone) {
      console.error('❌ Cannot save rating - missing professional phone:', {
        profName: ratedProfName,
        profPhone,
        customerName: ratedCustomerName,
        customerPhone: ratedCustomerPhone,
        average
      });
      toast({
        title: "שגיאה בשמירת הדירוג",
        description: "חסר מספר טלפון של נותן השירות. וודאו שהגעתם מהקישור הנכון.",
        variant: "destructive",
      });
      setShowSubmitSuccess(true);
      return;
    }

    if (profPhone && ratedCustomerName && ratedCustomerPhone) {
      const ratingData: Rating = {
        professional_name: ratedProfName,
        professional_phone: profPhone,
        company_name: companyName,
        customer_name: ratedCustomerName,
        customer_phone: ratedCustomerPhone,
        rating_timing: newRatings.timing,
        rating_quality: newRatings.quality,
        rating_value: newRatings.value,
        rating_communication: newRatings.communication,
        rating_cleanliness: newRatings.cleanliness,
        rating_recommendation: newRatings.recommendation,
        weighted_average: average,
        recommendation: ratedRecommendation
      };
      
      console.log('💾 Preparing to save rating:', {
        professional: ratingData.professional_name,
        phone: ratingData.professional_phone,
        customer: ratingData.customer_name,
        average: ratingData.weighted_average
      });
      
      try {
        const ratingId = await saveRating(ratingData);
        console.log('✅ Rating saved with ID:', ratingId);
        
        // Send webhook to Make
        if (ratingId) {
          try {
            const urlParams = new URLSearchParams(window.location.search);
            const webhookData = {
              // Professional details
              professional_name: ratedProfName,
              professional_phone: profPhone,
              company_name: companyName || '',
              
              // Customer details
              customer_name: ratedCustomerName,
              customer_phone: ratedCustomerPhone,
              
              // Ratings
              rating_timing: newRatings.timing,
              rating_quality: newRatings.quality,
              rating_value: newRatings.value,
              rating_communication: newRatings.communication,
              rating_cleanliness: newRatings.cleanliness,
              rating_recommendation: newRatings.recommendation,
              weighted_average: average,
              recommendation: ratedRecommendation || '',
              
              // UTM Parameters
              utm_source: urlParams.get('utm_source') || '',
              utm_medium: urlParams.get('utm_medium') || '',
              utm_campaign: urlParams.get('utm_campaign') || '',
              utm_term: urlParams.get('utm_term') || '',
              utm_content: urlParams.get('utm_content') || '',
              
              // Metadata
              rating_id: ratingId,
              timestamp: new Date().toISOString(),
              is_excellent: average >= 4.2
            };

            await fetch('https://hook.eu2.make.com/unpyqi8ifr2zz39un65da67q06tfxbl2', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(webhookData)
            });
            
            console.log('✅ Webhook sent successfully to Make');
          } catch (webhookError) {
            console.error('⚠️ Webhook failed (non-critical):', webhookError);
          }
        }
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
