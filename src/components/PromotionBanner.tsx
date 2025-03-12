import React, { useState } from 'react';
import { Gift, Check, Facebook, Instagram, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PromotionBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !fullName || !phone || !isChecked) {
      toast({
        title: "שגיאה",
        description: "נא למלא את כל השדות",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "תודה!",
      description: "נשלח לך מייל כשהמערכת תהיה זמינה",
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="w-full py-12 bg-gradient-to-t from-blue-50/50 to-background">
      <div className="container mx-auto px-4">
        <div className="ofair-card max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 h-20 w-20 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 h-32 w-32 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold rtl">הטבת השקה מיוחדת!</h3>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 rtl">
              5% חזרה על העבודה הראשונה שלכם דרך oFair!
            </h2>
            
            <p className="text-center text-muted-foreground mb-8 rtl max-w-xl mx-auto">
              השאירו את הפרטים שלכם ונעדכן אתכם ברגע שהמערכת תהיה זמינה. תוכלו להנות מההטבה ולחסוך בעבודה הראשונה שלכם!
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="שם מלא"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl mb-3"
                    required
                  />
                  
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="מספר טלפון"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl mb-3"
                    required
                  />
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="כתובת מייל"
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl"
                    required
                  />
                </div>
                
                <div className="flex items-start gap-2 mb-6 rtl">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="mt-1"
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    אני מעוניין/ת לקבל עדכונים על השקת המערכת ומבצעים שווים
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className="ofair-button w-full rtl"
                >
                  שמרו לי את ההטבה!
                </button>
              </form>
            ) : (
              <div className="text-center py-4 relative">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="inline-flex items-center justify-center bg-green-100 text-green-700 p-4 rounded-full mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 rtl">נרשמת בהצלחה!</h3>
                <p className="text-muted-foreground rtl mb-6">נעדכן אותך ברגע שהמערכת תהיה זמינה</p>
                
                <div className="mt-4">
                  <p className="text-muted-foreground rtl font-medium mb-3">עקבו אחרינו ברשתות החברתיות:</p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="https://www.facebook.com/profile.php?id=61573771175534#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
