
import React, { useRef } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import RatingSystem from '@/components/rating';
import PlatformBenefits from '@/components/PlatformBenefits';
import Testimonials from '@/components/Testimonials';
import PromotionBanner from '@/components/PromotionBanner';
import SuccessDialog from '@/components/home/SuccessDialog';
import PromotionWidget from '@/components/PromotionWidget';
import { useProfessionalData } from '@/hooks/useProfessionalData';
import { useRatingManagement } from '@/hooks/useRatingManagement';

const Index = () => {
  const { professional, isLoading } = useProfessionalData();
  const { 
    showSubmitSuccess, 
    newRecommendation, 
    handleRatingChange, 
    closeSuccessPopup 
  } = useRatingManagement();
  
  const promotionSectionRef = useRef<HTMLDivElement>(null);

  const scrollToPromotion = () => {
    document.getElementById('promotion-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const scrollToBenefits = () => {
    document.getElementById('benefits-section')?.scrollIntoView({
      behavior: 'smooth'
    });
    closeSuccessPopup();
  };

  const scrollToRatingSection = () => {
    document.getElementById('rating-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-background">
      <Header 
        professional={professional} 
        scrollToRatingSection={scrollToRatingSection} 
        scrollToBenefits={scrollToBenefits} 
      />

      {/* Promotion Widget */}
      <PromotionWidget onClick={scrollToPromotion} />

      <section id="rating-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <RatingSystem onRatingChange={handleRatingChange} professional={professional} />
          )}
        </div>
      </section>
      
      <div id="benefits-section">
        <PlatformBenefits />
      </div>

      <section id="promotion-section" ref={promotionSectionRef}>
        <PromotionBanner />
      </section>

      <Testimonials newRecommendation={newRecommendation} />

      <Footer />

      {showSubmitSuccess && (
        <SuccessDialog 
          onClose={closeSuccessPopup} 
          onLearnMore={scrollToBenefits} 
        />
      )}
    </div>
  );
};

export default Index;
