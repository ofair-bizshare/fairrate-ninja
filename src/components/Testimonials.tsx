
import React, { useRef, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  project: string;
  rating: number;
  content: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "אלון ישראלי",
    project: "שיפוץ דירה",
    rating: 4.9,
    content: "השתמשתי ב-oFair למציאת קבלן שיפוצים. קיבלתי 5 הצעות מחיר תוך שעה, והצלחתי לחסוך אלפי שקלים! הקבלן שבחרתי היה מעולה ועמד בכל הציפיות.",
    date: "לפני חודש"
  },
  {
    id: 2,
    name: "מיכל לוי",
    project: "התקנת מזגן",
    rating: 4.8,
    content: "חיפשתי מתקין מזגנים דחוף בקיץ. דרך oFair מצאתי בעל מקצוע אמין שהגיע תוך יומיים במחיר הוגן. חסכתי המון זמן בחיפושים.",
    date: "לפני 3 חודשים"
  },
  {
    id: 3,
    name: "דוד כהן",
    project: "עבודות גינון",
    rating: 5.0,
    content: "מערכת הדירוג ב-oFair עזרה לי למצוא גנן מצוין. הדירוגים היו מדויקים והתוצאה הייתה מושלמת. ממליץ בחום!",
    date: "לפני שבועיים"
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full py-16 bg-gradient-to-b from-background to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="ofair-chip mb-2">חוויות אמיתיות</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 rtl">מה אומרים עלינו</h2>
          <div className="h-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto rtl">
            לקוחות שכבר מצאו את בעלי המקצוע המושלמים דרך oFair
          </p>
        </div>

        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 section-transition"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={cn(
                "ofair-card h-full flex flex-col relative",
                "hover:translate-y-[-5px]"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium rtl">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground rtl">{testimonial.project}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                <span className="font-bold">{testimonial.rating}</span>
                <Star className="h-4 w-4 text-yellow-400" fill="#facc15" />
              </div>
              
              <p className="text-muted-foreground flex-grow rtl">
                "{testimonial.content}"
              </p>
              
              <div className="text-xs text-muted-foreground mt-4 rtl">
                {testimonial.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
