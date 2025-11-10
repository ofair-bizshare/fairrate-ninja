
import React, { useState, useEffect } from 'react';
import { Professional } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';
import { ratingCriteria } from './ratingCriteria';
import CustomerDetails from './CustomerDetails';
import ProfessionalDetails from './ProfessionalDetails';
import CriteriaList from './CriteriaList';
import FinalScore from './FinalScore';
import { CustomerData } from '@/hooks/useProfessionalData';

interface RatingSystemProps {
  onRatingChange: (ratings: { [key: string]: number }, weightedAverage: number, profName: string, recommendation?: string, customerName?: string, customerPhone?: string, profPhone?: string, companyName?: string) => void;
  professional?: Professional | null;
  customerData?: CustomerData;
}

const RatingSystem: React.FC<RatingSystemProps> = ({ onRatingChange, professional, customerData }) => {
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
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recommendation, setRecommendation] = useState('');
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

  // Update customer fields when customerData changes
  useEffect(() => {
    if (customerData?.customerName) {
      setCustomerName(customerData.customerName);
    }
    if (customerData?.customerPhone) {
      setCustomerPhone(customerData.customerPhone);
    }
  }, [customerData]);

  useEffect(() => {
    const totalWeight = ratingCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);
    const weightedSum = ratingCriteria.reduce(
      (sum, criterion) => sum + (ratings[criterion.id] * criterion.weight),
      0
    );
    
    const average = totalWeight > 0 ? weightedSum / totalWeight : 0;
    setWeightedAverage(Number(average.toFixed(1)));
  }, [ratings]);

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

  const handleProfNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfName(e.target.value);
    if (e.target.value.trim() && errors.profName) {
      setErrors(prev => ({
        ...prev,
        profName: false
      }));
    }
  };

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerName(e.target.value);
    if (e.target.value.trim() && errors.customerName) {
      setErrors(prev => ({
        ...prev,
        customerName: false
      }));
    }
  };

  const handleCustomerPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerPhone(e.target.value);
    if (e.target.value.trim() && errors.customerPhone) {
      setErrors(prev => ({
        ...prev,
        customerPhone: false
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
    setCustomerName('');
    setCustomerPhone('');
    setRecommendation('');
    setWeightedAverage(0);
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: boolean } = {};

    if (!customerName.trim()) {
      newErrors.customerName = true;
    }

    if (!customerPhone.trim()) {
      newErrors.customerPhone = true;
    }

    if (!profName.trim()) {
      newErrors.profName = true;
    }

    let hasRating = false;
    for (const criterion of ratingCriteria) {
      if (ratings[criterion.id] > 0) {
        hasRating = true;
        break;
      }
    }

    if (!hasRating) {
      for (const criterion of ratingCriteria) {
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
    
    onRatingChange(
      ratings, 
      weightedAverage, 
      profName, 
      recommendation, 
      customerName, 
      customerPhone,
      profPhone,
      companyName
    );
    
    resetForm();
  };

  return (
    <div className="w-full max-w-2xl mx-auto ofair-card">
      <h2 className="text-2xl font-bold text-center mb-6 rtl">דרגו את נותן השירות</h2>
      
      <CustomerDetails
        customerName={customerName}
        customerPhone={customerPhone}
        onCustomerNameChange={handleCustomerNameChange}
        onCustomerPhoneChange={handleCustomerPhoneChange}
        errors={errors}
      />
      
      <ProfessionalDetails
        profName={profName}
        profPhone={profPhone}
        companyName={companyName}
        onProfNameChange={handleProfNameChange}
        professional={professional}
        errors={errors}
      />
      
      <CriteriaList
        criteria={ratingCriteria}
        ratings={ratings}
        errors={errors}
        onRatingChange={handleRatingChange}
      />

      <div className="mb-6">
        <label htmlFor="recommendation" className="block text-sm font-medium text-gray-700 mb-1 rtl">המלצה (אופציונלי)</label>
        <textarea
          id="recommendation"
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary rtl h-32 resize-none"
          placeholder="ספרו לנו על החוויה שלכם עם נותן השירות"
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

      <FinalScore weightedAverage={weightedAverage} />
    </div>
  );
};

export default RatingSystem;
