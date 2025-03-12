
import React, { useState, useEffect, useRef } from 'react';
import { Star, Facebook, Instagram } from 'lucide-react';
import RatingSystem from '@/components/RatingSystem';
import PlatformBenefits from '@/components/PlatformBenefits';
import Testimonials from '@/components/Testimonials';
import PromotionBanner from '@/components/PromotionBanner';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Index = () => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [weightedAverage, setWeightedAverage] = useState<number>(0);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [profName, setProfName] = useState('');
  const { toast } = useToast();
  const promotionSectionRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = (newRatings: { [key: string]: number }, average: number, ratedProfName: string) => {
    setRatings(newRatings);
    setWeightedAverage(average);
    setProfName(ratedProfName);
  };

  const scrollToPromotion = () => {
    document.getElementById('promotion-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBenefits = () => {
    document.getElementById('benefits-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <header className="relative w-full min-h-[80vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-200 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full opacity-50 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="rounded-full border-4 border-primary p-4">
                <img 
                  src="/lovable-uploads/00f51801-ae0f-45ec-bf78-c1903df9abee.png" 
                  alt="oFair Logo" 
                  className="h-32 w-32 object-contain rounded-full"
                />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              דרגו את בעל המקצוע שלכם ועזרו לו להכנס לפלטפורמת מציאת אנשי המקצוע החדשנית של ישראל
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              בעזרת הדירוגים שלכם, אנחנו יוצרים קהילה של בעלי מקצוע אמינים ומדויקים יותר.
              עופר היא פלטפורמה שנועדה לעזור לצרכנים לקבל אנשי מקצוע איכותיים להשוות מחירים ולקבל זמינות באופן מהיר ונוח.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              <button 
                className="ofair-button"
                onClick={() => {
                  document.getElementById('rating-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                דרגו עכשיו
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-xl px-8 py-3 text-base font-medium 
                        transition-all duration-300 bg-secondary/80 text-secondary-foreground hover:bg-secondary"
                onClick={scrollToBenefits}
              >
                מה זה oFair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rating Section */}
      <section id="rating-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <RatingSystem onRatingChange={handleRatingChange} />
        </div>
      </section>
      
      {/* Platform Benefits Section */}
      <div id="benefits-section">
        <PlatformBenefits />
      </div>

      {/* Promotion Banner */}
      <section id="promotion-section" ref={promotionSectionRef}>
        <PromotionBanner />
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <div className="rounded-full border-4 border-primary p-2">
                <img 
                  src="/lovable-uploads/00f51801-ae0f-45ec-bf78-c1903df9abee.png" 
                  alt="oFair Logo" 
                  className="h-24 w-24 object-contain rounded-full"
                />
              </div>
            </div>
            
            <div className="flex gap-16">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                תנאי שימוש
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                מדיניות פרטיות
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                צור קשר
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <div className="flex justify-center gap-8 mb-6">
              <a 
                href="https://www.facebook.com/profile.php?id=61573771175534#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} oFair. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
