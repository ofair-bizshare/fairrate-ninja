
import React, { useState } from 'react';
import { Gift, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PromotionBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !isChecked) {
      toast({
        title: "שגיאה",
        description: "נא למלא את כל השדות",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would normally send the data to a server
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
          {/* Decorative elements */}
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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="הזינו את כתובת המייל שלכם"
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
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center bg-green-100 text-green-700 p-4 rounded-full mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 rtl">נרשמת בהצלחה!</h3>
                <p className="text-muted-foreground rtl">נעדכן אותך ברגע שהמערכת תהיה זמינה</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionBanner;
