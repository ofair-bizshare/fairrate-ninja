
import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PromotionWidgetProps {
  onClick: () => void;
}

const PromotionWidget: React.FC<PromotionWidgetProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const promotionSection = document.getElementById('promotion-section');
      if (promotionSection) {
        const rect = promotionSection.getBoundingClientRect();
        const isPromoSectionVisible = 
          rect.top < window.innerHeight && rect.bottom >= 0;
        
        setIsVisible(!isPromoSectionVisible);
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-20">
        <div 
          className="flex flex-col items-center gap-1 bg-gradient-to-br from-primary to-blue-600 text-white p-2 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={onClick}
        >
          <Gift className="h-4 w-4" />
          <div className="text-center text-xs font-medium">
            <p className="font-bold text-yellow-200">5% חזרה</p>
            <p className="text-white text-[10px]">על העבודה הראשונה</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20">
      <div 
        className="flex flex-col items-center gap-2 bg-gradient-to-br from-primary to-blue-600 text-white p-3 rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105 active:scale-95"
        onClick={onClick}
      >
        <Gift className="h-6 w-6" />
        <div className="text-center text-sm font-medium max-w-[120px]">
          <p>הטבה ייחודית</p>
          <p className="font-bold text-yellow-200">5% חזרה</p>
          <p>על העבודה הראשונה</p>
        </div>
      </div>
    </div>
  );
};

export default PromotionWidget;
