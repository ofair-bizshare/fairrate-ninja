
import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatedProfessional {
  id: number;
  profName: string;
  project: string;
  rating: number;
  recommendation: string;
  customer: string;
  date: string;
}

// Initial sample data
const initialRatedProfessionals: RatedProfessional[] = [
  {
    id: 1,
    profName: "משה הנגר",
    project: "עבודות נגרות",
    rating: 4.8,
    recommendation: "משה ביצע עבודה מצוינת, הגיע בזמן והיה מקצועי מאוד. אני ממליץ עליו בחום לכל מי שמחפש נגר איכותי.",
    customer: "ישראל ישראלי",
    date: "לפני חודש"
  },
  {
    id: 2,
    profName: "יוסי החשמלאי",
    project: "התקנת מערכת חשמל",
    rating: 4.7,
    recommendation: "יוסי הגיע מהר, פתר את הבעיה ביעילות והמחיר היה הוגן. שירות מעולה!",
    customer: "רונית לוי",
    date: "לפני 3 שבועות"
  },
  {
    id: 3,
    profName: "אבי השרברב",
    project: "תיקון נזילה",
    rating: 4.9,
    recommendation: "אבי הגיע תוך שעה, איתר את הנזילה המורכבת ותיקן אותה במהירות. מקצועי, אדיב ואמין.",
    customer: "דוד כהן",
    date: "לפני שבועיים"
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ratedProfessionals, setRatedProfessionals] = useState<RatedProfessional[]>(initialRatedProfessionals);
  
  // This would be replaced with actual data fetching in a real implementation
  useEffect(() => {
    // We would fetch the rated professionals data here
    // For now, we're using the initial data
    
    // Filter professionals with rating above 4.2
    const filteredProfessionals = ratedProfessionals.filter(prof => prof.rating >= 4.2);
    setRatedProfessionals(filteredProfessionals);
  }, []);
  
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

  // Function to update rated professionals (would be called when new ratings are submitted)
  const updateRatedProfessionals = (newProfessional: RatedProfessional) => {
    if (newProfessional.rating >= 4.2) {
      setRatedProfessionals(prev => [...prev, newProfessional]);
    }
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-background to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="ofair-chip mb-2">בעלי מקצוע מומלצים</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 rtl">לקוחות שכבר דירגו את בעל המקצוע שלהם ואיפשרו לו להכנס לעופר</h2>
          <div className="h-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto rtl">
            בעלי מקצוע שקיבלו ציון מעל 4.2 מופיעים כאן ונהנים מפלטפורמת oFair
          </p>
        </div>

        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 section-transition"
        >
          {ratedProfessionals.map((professional, index) => (
            <div 
              key={professional.id} 
              className={cn(
                "ofair-card h-full flex flex-col relative",
                "hover:translate-y-[-5px]"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
              
              <div className="flex items-center gap-2 mb-2">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {professional.profName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium rtl">{professional.profName}</h4>
                  <p className="text-xs text-muted-foreground rtl">{professional.project}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-3">
                <span className="font-bold">{professional.rating.toFixed(1)}</span>
                <Star className="h-4 w-4 text-yellow-400" fill="#facc15" />
              </div>
              
              <p className="text-muted-foreground flex-grow rtl">
                "{professional.recommendation}"
              </p>
              
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                <div className="text-xs text-muted-foreground rtl">
                  {professional.date}
                </div>
                <div className="text-xs rtl">
                  <span className="text-gray-600">דורג על ידי: </span>
                  <span className="font-medium">{professional.customer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
