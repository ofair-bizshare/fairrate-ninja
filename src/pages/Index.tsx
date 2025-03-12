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
  const [category, setCategory] = useState('');
  const { toast } = useToast();
  const benefitsSectionRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = (newRatings: { [key: string]: number }, average: number) => {
    setRatings(newRatings);
    setWeightedAverage(average);
  };

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    
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
    
    // Here you would normally send the data to a server
    setShowSubmitSuccess(true);
    
    toast({
      title: "תודה על הדירוג!",
      description: "הדירוג נשלח בהצלחה",
    });
    
    // Reset after 5 seconds
    setTimeout(() => {
      setShowSubmitSuccess(false);
      setProfName('');
      setCategory('');
      // Reset ratings
      setRatings({});
      setWeightedAverage(0);
    }, 5000);
  };

  const scrollToBenefits = () => {
    benefitsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPromotion = () => {
    document.getElementById('promotion-section')?.scrollIntoView({ behavior: 'smooth' });
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
              <div className="rounded-full border-4 border-primary/30 p-4">
                <img 
                  src="/lovable-uploads/00f51801-ae0f-45ec-bf78-c1903df9abee.png" 
                  alt="oFair Logo" 
                  className="h-32 object-contain"
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
                onClick={scrollToPromotion}
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
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">דרגו את בעל המקצוע שלכם</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              הדירוג שלכם עוזר ללקוחות אחרים למצוא את בעלי המקצוע הטובים ביותר
            </p>
          </div>

          {!showSubmitSuccess ? (
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmitRating}>
                <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="ofair-card">
                    <div className="mb-4">
                      <label htmlFor="profName" className="block text-sm font-medium mb-1">
                        שם בעל המקצוע *
                      </label>
                      <input
                        id="profName"
                        type="text"
                        value={profName}
                        onChange={(e) => setProfName(e.target.value)}
                        placeholder="הזינו את שם בעל המקצוע"
                        className="w-full px-4 py-2 rounded-xl border border-input bg-background"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1">
                        תחום מקצועי
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-input bg-background"
                      >
                        <option value="">בחרו תחום</option>
                        <option value="שיפוצים">שיפוצים</option>
                        <option value="חשמל">חשמל</option>
                        <option value="אינסטלציה">אינסטלציה</option>
                        <option value="גינון">גינון</option>
                        <option value="ניקיון">ניקיון</option>
                        <option value="הובלות">הובלות</option>
                        <option value="מזגנים">מזגנים</option>
                        <option value="אחר">אחר</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="ofair-card flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-medium mb-2">הדירוג שלכם חשוב!</h3>
                    <p className="text-muted-foreground mb-4">
                      בזכות הדירוגים שלכם, בעלי מקצוע טובים זוכים להכרה והערכה
                    </p>
                    
                    {weightedAverage > 0 && (
                      <div className="mt-4 flex flex-col items-center">
                        <div className="text-sm mb-1">הדירוג הכולל שלכם</div>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl font-bold text-primary">{weightedAverage.toFixed(1)}</span>
                          <Star className="h-6 w-6 text-yellow-400" fill="#facc15" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <RatingSystem onRatingChange={handleRatingChange} />
                
                <div className="mt-8 text-center">
                  <button 
                    type="submit" 
                    className={cn(
                      "ofair-button px-8",
                      weightedAverage === 0 && "opacity-70 cursor-not-allowed"
                    )}
                    disabled={weightedAverage === 0}
                  >
                    שלחו את הדירוג
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center ofair-card py-12 animate-scale-in">
              <div className="inline-flex items-center justify-center bg-green-100 text-green-700 p-5 rounded-full mb-6">
                <Star className="h-10 w-10" fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold mb-4">תודה על הדירוג!</h3>
              <p className="text-lg mb-6">
                הדירוג שלכם ל{profName} התקבל בהצלחה ויעזור ללקוחות אחרים לקבל החלטות טובות יותר.
              </p>
              
              <div className="mt-4 mb-6">
                <p className="text-muted-foreground font-medium mb-3">עקבו אחרינו ברשתות החברתיות:</p>
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573771175534#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
              
              <button 
                className="ofair-button"
                onClick={scrollToBenefits}
              >
                גלו את oFair
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Platform Benefits Section */}
      <div ref={benefitsSectionRef}>
        <PlatformBenefits />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Promotion Banner */}
      <section id="promotion-section">
        <PromotionBanner />
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <img 
                src="/lovable-uploads/00f51801-ae0f-45ec-bf78-c1903df9abee.png" 
                alt="oFair Logo" 
                className="h-16 object-contain"
              />
            </div>
            
            <div className="flex gap-12">
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
            <div className="flex justify-center gap-4 mb-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61573771175534#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-5 w-5" />
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
