import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { getLatestRatings, Rating } from '@/services/supabaseService';
interface RatedProfessional {
  id: string | number;
  profName: string;
  project: string;
  rating: number;
  recommendation: string;
  customer: string;
  date: string;
}

// Initial sample data (will be shown until real data is loaded)
const initialRatedProfessionals: RatedProfessional[] = [{
  id: 1,
  profName: "משה הנגר",
  project: "עבודות נגרות",
  rating: 4.8,
  recommendation: "משה ביצע עבודה מצוינת, הגיע בזמן והיה מקצועי מאוד. אני ממליץ עליו בחום לכל מי שמחפש נגר איכותי.",
  customer: "ישראל ישראלי",
  date: "לפני חודש"
}, {
  id: 2,
  profName: "יוסי החשמלאי",
  project: "התקנת מערכת חשמל",
  rating: 4.7,
  recommendation: "יוסי הגיע מהר, פתר את הבעיה ביעילות והמחיר היה הוגן. שירות מעולה!",
  customer: "רונית לוי",
  date: "לפני 3 שבועות"
}, {
  id: 3,
  profName: "אבי השרברב",
  project: "תיקון נזילה",
  rating: 4.9,
  recommendation: "אבי הגיע תוך שעה, איתר את הנזילה המורכבת ותיקן אותה במהירות. מקצועי, אדיב ואמין.",
  customer: "דוד כהן",
  date: "לפני שבועיים"
}];
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "היום";
  if (diffDays === 1) return "אתמול";
  if (diffDays < 7) return `לפני ${diffDays} ימים`;
  if (diffDays < 30) return `לפני ${Math.floor(diffDays / 7)} שבועות`;
  if (diffDays < 365) return `לפני ${Math.floor(diffDays / 30)} חודשים`;
  return `לפני ${Math.floor(diffDays / 365)} שנים`;
};
interface TestimonialsProps {
  newRecommendation?: {
    profName: string;
    rating: number;
    recommendation: string;
    customer: string;
  };
}
const Testimonials: React.FC<TestimonialsProps> = ({
  newRecommendation
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ratedProfessionals, setRatedProfessionals] = useState<RatedProfessional[]>(initialRatedProfessionals);
  const [activeTestimonial, setActiveTestimonial] = useState<RatedProfessional | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ratings from Supabase
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setIsLoading(true);
        const ratings = await getLatestRatings(3);
        if (ratings && ratings.length > 0) {
          // Filter ratings to ensure they have recommendations
          const ratingsWithRecommendations = ratings.filter(rating => rating.recommendation && rating.recommendation.trim() !== '');
          if (ratingsWithRecommendations.length > 0) {
            const formattedRatings: RatedProfessional[] = ratingsWithRecommendations.map(rating => ({
              id: rating.id || Date.now(),
              profName: rating.professional_name,
              project: "עבודה מקצועית",
              rating: rating.weighted_average,
              recommendation: rating.recommendation || "",
              customer: rating.customer_name,
              date: formatTimeAgo(rating.created_at || new Date().toISOString())
            }));
            setRatedProfessionals(formattedRatings);
          }
          // If no ratings with recommendations, keep the initial sample data
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
        // On error, keep the initial sample data
      } finally {
        setIsLoading(false);
      }
    };
    fetchRatings();
  }, []);

  // Add new recommendation if it exists and has a high rating
  useEffect(() => {
    if (newRecommendation && newRecommendation.rating >= 4.2 && newRecommendation.recommendation) {
      const newProfessional: RatedProfessional = {
        id: Date.now(),
        // Use timestamp as a unique ID
        profName: newRecommendation.profName,
        project: "עבודה מקצועית",
        rating: newRecommendation.rating,
        recommendation: newRecommendation.recommendation,
        customer: newRecommendation.customer,
        date: "עכשיו"
      };

      // Replace the first testimonial to maintain the same number of visible testimonials
      setRatedProfessionals(prev => {
        const updated = [...prev];
        updated.shift(); // Remove the first item
        updated.push(newProfessional); // Add new item at the end
        return updated;
      });
    }
  }, [newRecommendation]);
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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const openTestimonialDialog = (professional: RatedProfessional) => {
    setActiveTestimonial(professional);
  };
  const closeTestimonialDialog = () => {
    setActiveTestimonial(null);
  };
  return <div className="w-full bg-gradient-to-b from-background to-blue-50/30 mx-0 py-0">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="ofair-chip mb-2">נותני שירות מומלצים</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 rtl">לקוחות שכבר דירגו את נותן השירות שלהם ואיפשרו לו להכנס לעופר</h2>
          <div className="h-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto rtl">
            נותני שירות שקיבלו ציון מעל 4.2 מופיעים כאן ונהנים מפלטפורמת oFair
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 section-transition">
          {isLoading ?
        // Loading skeletons
        Array(3).fill(0).map((_, index) => <div key={`skeleton-${index}`} className="ofair-card h-full flex flex-col relative animate-pulse">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>) : ratedProfessionals.map((professional, index) => <div key={professional.id} className={cn("ofair-card h-full flex flex-col relative", "hover:translate-y-[-5px] cursor-pointer")} style={{
          transitionDelay: `${index * 100}ms`
        }} onClick={() => openTestimonialDialog(professional)}>
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
                
                <p className="text-muted-foreground flex-grow rtl line-clamp-3">
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
              </div>)}
        </div>
      </div>

      <Dialog open={!!activeTestimonial} onOpenChange={open => !open && closeTestimonialDialog()}>
        <DialogContent className="max-w-lg rtl">
          {activeTestimonial && <div className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xl">
                  {activeTestimonial.profName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{activeTestimonial.profName}</h3>
                  <p className="text-sm text-muted-foreground">{activeTestimonial.project}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                <span className="font-bold text-lg">{activeTestimonial.rating.toFixed(1)}</span>
                <Star className="h-5 w-5 text-yellow-400" fill="#facc15" />
              </div>
              
              <div className="mb-4 relative">
                <Quote className="h-10 w-10 text-primary/10 absolute top-0 right-0" />
                <p className="text-muted-foreground pt-8 pb-2 px-4 text-right">
                  "{activeTestimonial.recommendation}"
                </p>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
                <div className="text-sm text-muted-foreground">
                  {activeTestimonial.date}
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">דורג על ידי: </span>
                  <span className="font-medium">{activeTestimonial.customer}</span>
                </div>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default Testimonials;