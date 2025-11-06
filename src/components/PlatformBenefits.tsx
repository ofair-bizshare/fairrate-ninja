import React, { useRef, useEffect } from 'react';
import { Search, MessageSquare, CheckCircle, Clock, PiggyBank, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
const PlatformBenefits: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });
    const sections = document.querySelectorAll('.section-transition');
    sections.forEach(section => {
      observer.observe(section);
    });
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  const scrollToPromotion = () => {
    document.getElementById('promotion-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div ref={sectionRef} className="w-full py-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="ofair-chip mb-2">oFair</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 rtl">מצאו נותני שירות בצורה חכמה ומשתלמת</h2>
          <div className="h-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto rtl">
            ב-oFair יש לכם שתי אפשרויות למציאת נותן שירות בצורה המשתלמת והחכמה ביותר
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Option 2 - Now first (recommended) */}
          <div className="section-transition delay-100">
            <div className="ofair-card h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary/10 text-primary font-medium text-xs px-3 py-1 rounded-bl-lg rtl">
                הדרך המומלצת
              </div>
              
              <div className="bg-primary/5 p-4 rounded-xl mb-6 inline-flex">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 rtl">📩 אפשרות 1: השאירו פנייה וקבלו הצעות במהירות</h3>
              <p className="text-muted-foreground mb-6 rtl">
                במקום לחפש בעצמכם, השאירו פנייה ותוך כמה דקות תקבלו הצעות ממספר אנשי מקצוע זמינים.
              </p>
              
              <div className="mt-auto space-y-4">
                <div className="flex items-start gap-3 rtl">
                  <PiggyBank className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">משווים – חוסכים – מקבלים את השירות הטוב ביותר!</p>
                </div>
                
                <div className="flex items-start gap-3 rtl">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">תוכלו לבחור לפי מחיר, זמינות ודירוגים</p>
                </div>
                
                <div className="flex items-start gap-3 rtl">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">למצוא את נותן השירות האמין והמקצועי ביותר במהירות</p>
                </div>
              </div>
            </div>
          </div>

          {/* Option 1 - Now second */}
          <div className="section-transition delay-200">
            <div className="ofair-card h-full flex flex-col">
              <div className="bg-primary/5 p-4 rounded-xl mb-6 inline-flex">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 rtl">🔎 אפשרות 2: בחירת נותן שירות ישירות</h3>
              <p className="text-muted-foreground mb-6 rtl">
                פשוט חפשו נותן שירות לפי תחום ועיר, עיינו בפרופילים ובדירוגים, ובחרו את האיש המתאים לכם ביותר!
              </p>
              
              <div className="mt-auto space-y-4">
                <div className="flex items-start gap-3 rtl">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">כל נותני השירות מדורגים ומבוקרים על ידי לקוחות אמתיים</p>
                </div>
                
                <div className="flex items-start gap-3 rtl">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">בחרו לפי דירוגים ותיאורי חוויה מלקוחות קודמים</p>
                </div>
                
                <div className="flex items-start gap-3 rtl">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">חסכו זמן בחיפוש והשוואה במקום אחד</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="ofair-button rtl" onClick={scrollToPromotion}>
            נסו את oFair עכשיו – זה בחינם!
          </button>
        </div>
      </div>
    </div>;
};
export default PlatformBenefits;