
import React from 'react';
import { Star, Facebook, Instagram, X } from 'lucide-react';

interface SuccessDialogProps {
  onClose: () => void;
  onLearnMore: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ onClose, onLearnMore }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold rtl">תודה על הדירוג!</h3>
          <p className="text-muted-foreground mt-2 rtl">
            הדירוג שלך יעזור לאחרים למצוא נותני שירות איכותיים
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
          <button onClick={onLearnMore} className="ofair-button bg-secondary/80 text-secondary-foreground hover:bg-secondary">
            מה זה oFair?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessDialog;
