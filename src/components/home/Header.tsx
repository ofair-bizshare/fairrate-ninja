import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ofairLogo from '@/assets/ofair-logo.png';
interface HeaderProps {
  professional: {
    first_name?: string;
    last_name?: string;
    company_name?: string;
  } | null;
  scrollToRatingSection: () => void;
  scrollToBenefits: () => void;
}
const Header: React.FC<HeaderProps> = ({
  professional,
  scrollToRatingSection,
  scrollToBenefits
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(50); // Faster initial typing speed
  const titles = ["לפלטפורמת מציאת אנשי המקצוע החדשנית של ישראל", "למערכת החדשנית למציאת נותן שירות - מעלים, משווים, מרוויחים"];
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        if (displayText.length === currentTitle.length) {
          setTypingSpeed(1500); // Shorter pause at the end before deleting
          setIsDeleting(true);
        } else {
          setTypingSpeed(50); // Faster typing
        }
      } else {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
          setTypingSpeed(200); // Faster delay before typing next sentence
        } else {
          setTypingSpeed(25); // Faster deletion
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, currentTitleIndex, isDeleting, typingSpeed, titles]);
  return <header className="relative w-full min-h-[80vh] flex flex-col justify-center pt-20 pb-16 overflow-hidden py-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-200 rounded-full opacity-40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full opacity-50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-">
            <div className="rounded-full border-4 border-primary p-0 shadow-lg transform hover:scale-105 transition-all duration-300">
              <img src={ofairLogo} alt="oFair Logo" className="h-56 w-56 object-contain rounded-full" />
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-6 max-w-4xl mx-auto leading-tight font-extrabold">
            {professional ? `דרגו את ${professional.first_name} ${professional.last_name} ${professional.company_name ? `מחברת ${professional.company_name}` : ''}` : <>
                  דרגו את נותן השירות שלכם ועזרו לו להכנס{" "}
                  <span className={cn("transition-all duration-500 inline-block min-h-[40px]", currentTitleIndex === 1 ? "text-[#70EACD] font-extrabold" : "")}>
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </>}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            בעזרת הדירוגים שלכם, אנחנו יוצרים קהילה של נותני שירות אמינים ומדויקים יותר.
            עופר היא פלטפורמה שנועדה לעזור לצרכנים לקבל נותני שירות איכותיים להשוות מחירים ולקבל זמינות באופן מהיר ונוח.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <button className="ofair-button" onClick={scrollToRatingSection}>
              דרגו עכשיו
            </button>
            <button onClick={scrollToBenefits} className="inline-flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-300 bg-[#70EACD] text-white hover:bg-opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 px-[44px] my-0 py-[9px] mx-[6px]">
              מה זה oFair
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;