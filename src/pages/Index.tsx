
import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronRight, ChevronDown } from 'lucide-react';
import RatingSystem from '@/components/RatingSystem';
import PlatformBenefits from '@/components/PlatformBenefits';
import Testimonials from '@/components/Testimonials';
import LiveStats from '@/components/LiveStats';
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
            <div className="ofair-chip mb-4">oFair</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
              דרגו את בעל המקצוע שלכם ועזרו ללקוחות הבאים לקבל שירות טוב יותר!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              בעזרת הדירוגים שלכם, אנחנו יוצרים קהילה של בעלי מקצוע אמינים ומדויקים יותר.
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
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-medium 
                        transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={scrollToBenefits}
              >
                קראו עוד
                <ChevronDown className="mr-2 h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-center flex-wrap gap-6">
              <div className="flex items-center gap-1 bg-white/50 px-4 py-2 rounded-full">
                <span className="text-lg font-bold">4.8</span>
                <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
                <span className="text-sm text-muted-foreground mr-1">דירוג ממוצע</span>
              </div>
              
              <div className="flex items-center gap-1 bg-white/50 px-4 py-2 rounded-full">
                <span className="text-lg font-bold">8,400+</span>
                <span className="text-sm text-muted-foreground mr-1">דירוגים</span>
              </div>
              
              <div className="flex items-center gap-1 bg-white/50 px-4 py-2 rounded-full">
                <span className="text-lg font-bold">1,400+</span>
                <span className="text-sm text-muted-foreground mr-1">בעלי מקצוע</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <ChevronDown className="h-8 w-8 text-primary/50 animate-bounce" />
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
      
      {/* Live Stats Section */}
      <LiveStats />

      {/* Platform Benefits Section */}
      <div ref={benefitsSectionRef}>
        <PlatformBenefits />
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Promotion Banner */}
      <PromotionBanner />

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-primary">oFair</h2>
              <p className="text-muted-foreground">מצאו את בעלי המקצוע הטובים ביותר</p>
            </div>
            
            <div className="flex space-x-6">
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
