import React, { useState, useEffect, useRef } from 'react';
import { Star, Facebook, Instagram, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import RatingSystem from '@/components/RatingSystem';
import PlatformBenefits from '@/components/PlatformBenefits';
import Testimonials from '@/components/Testimonials';
import PromotionBanner from '@/components/PromotionBanner';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getProfessionalByPhone, Professional } from '@/services/supabaseService';
const Index = () => {
  const [ratings, setRatings] = useState<{
    [key: string]: number;
  }>({});
  const [weightedAverage, setWeightedAverage] = useState<number>(0);
  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [profName, setProfName] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState<any>(null);
  const {
    toast
  } = useToast();
  const promotionSectionRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const titles = ["לפלטפורמת מציאת אנשי המקצוע החדשנית של ישראל", "למערכת החדשנית למציאת בעל מקצוע - מעלים, משווים, מרוויחים"];
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentTitle.length) {
          setTypingSpeed(3000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentTitleIndex, isDeleting, typingSpeed, titles]);
  useEffect(() => {
    const fetchProfessionalData = async () => {
      let phoneNumber = '';
      if (location.search && location.search.startsWith('?')) {
        phoneNumber = location.search.substring(1).split('&')[0];
      }
      if (!phoneNumber && location.pathname) {
        const pathParts = location.pathname.split('/');
        if (pathParts.length > 1 && pathParts[1]) {
          phoneNumber = pathParts[1];
        }
      }
      phoneNumber = phoneNumber.replace(/\D/g, '');
      if (!phoneNumber) return;
      console.log("Extracted phone number:", phoneNumber);
      setIsLoading(true);
      try {
        const professionalData = await getProfessionalByPhone(phoneNumber);
        console.log("Fetched professional data:", professionalData);
        if (professionalData) {
          setProfessional(professionalData);
        } else {
          toast({
            title: "לא נמצא בעל מקצוע",
            description: "מספר הטלפון שהוזן לא נמצא במערכת",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching professional data:", error);
        toast({
          title: "שגיאה בטעינת נתונים",
          description: "אירעה שגיאה בעת טעינת נתוני בעל המקצוע",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfessionalData();
  }, [location, toast]);
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
  return <div dir="rtl" className="min-h-screen flex flex-col bg-background">
      <header className="relative w-full min-h-[80vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-200 rounded-full opacity-40 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full opacity-50 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-">
              <div className="rounded-full border-4 border-primary p-0 shadow-lg transform hover:scale-105 transition-all duration-300">
                <img src="/lovable-uploads/00f51801-ae0f-45ec-bf78-c1903df9abee.png" alt="oFair Logo" className="h-56 w-56 object-contain rounded-full" />
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 max-w-4xl mx-auto leading-tight font-extrabold">
              {professional ? `דרגו את ${professional.first_name} ${professional.last_name} ${professional.company_name ? `מחברת ${professional.company_name}` : ''}` : <>
                    דרגו את בעל המקצוע שלכם ועזרו לו להכנס{" "}
                    <span className={cn("transition-all duration-500 inline-block min-h-[40px]", currentTitleIndex === 1 ? "text-[#70EACD] font-extrabold" : "")}>
                      {displayText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </>}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              בעזרת הדירוגים שלכם, אנחנו יוצרים קהילה של בעלי מקצוע אמינים ומדויקים יותר.
              עופר היא פלטפורמה שנועדה לעזור לצרכנים לקבל אנשי מקצוע איכותיים להשוות מחירים ולקבל זמינות באופן מהיר ונוח.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              <button className="ofair-button" onClick={() => {
              document.getElementById('rating-section')?.scrollIntoView({
                behavior: 'smooth'
              });
            }}>
                דרגו עכשיו
              </button>
              <button onClick={scrollToBenefits} className="inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300 bg-[#70EACD] text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 px-[44px] my-0 py-[9px] mx-[6px]">
                מה זה oFair
              </button>
            </div>
          </div>
        </div>
      </header>

      <section id="rating-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div> : <RatingSystem onRatingChange={handleRatingChange} professional={professional} />}
        </div>
      </section>
      
      <div id="benefits-section">
        <PlatformBenefits />
      </div>

      <section id="promotion-section" ref={promotionSectionRef}>
        <PromotionBanner />
      </section>

      <Testimonials newRecommendation={newRecommendation} />

      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <div className="rounded-full border-4 border-primary p-2">
                <img src="/lovable-uploads/00f51801-ae0f-45ec-bf78-c1903df9abee.png" alt="oFair Logo" className="h-24 w-24 object-contain rounded-full" />
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
              <a href="https://www.facebook.com/profile.php?id=61573771175534#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-3 rounded-full hover:opacity-90 transition-opacity">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} oFair. כל הזכויות שמורות.
            </p>
          </div>
        </div>
      </footer>

      {showSubmitSuccess && <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
            <button onClick={closeSuccessPopup} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
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
                <a href="https://www.facebook.com/profile.php?id=61573771175534#" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <button onClick={scrollToBenefits} className="ofair-button bg-secondary/80 text-secondary-foreground hover:bg-secondary">
                מה זה oFair?
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Index;