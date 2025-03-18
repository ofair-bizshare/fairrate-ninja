
import React from 'react';
import { Gift } from 'lucide-react';

interface PromotionWidgetProps {
  onClick: () => void;
}

const PromotionWidget: React.FC<PromotionWidgetProps> = ({ onClick }) => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
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
