import React, { useState } from 'react';
import { Gift, Check, Facebook, Instagram, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const PromotionBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  }>({});
  const {
    toast
  } = useToast();
  const validateIsraeliPhone = (phoneNumber: string) => {
    // Israeli phone numbers: 10 digits, typically starting with 05
    const israeliPhonePattern = /^0\d{9}$/;
    return israeliPhonePattern.test(phoneNumber);
  };
  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    const newErrors: {
      email?: string;
      phone?: string;
      firstName?: string;
      lastName?: string;
    } = {};

    // Validate form fields
    if (!firstName.trim()) {
      newErrors.firstName = "נא להזין שם פרטי";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "נא להזין שם משפחה";
    }
    if (!phone) {
      newErrors.phone = "נא להזין מספר טלפון";
    } else if (!validateIsraeliPhone(phone)) {
      newErrors.phone = "מספר טלפון ישראלי חייב להיות 10 ספרות ולהתחיל ב-0";
    }
    if (!email) {
      newErrors.email = "נא להזין כתובת מייל";
    } else if (!validateEmail(email)) {
      newErrors.email = "כתובת מייל לא תקינה";
    }

    // Check if any errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Display toast with first error
      const firstError = Object.values(newErrors)[0];
      toast({
        title: "שגיאה",
        description: firstError,
        variant: "destructive"
      });
      return;
    }

    // Send data to webhook
    try {
      await fetch('https://hook.eu2.make.com/ndbpdupbfbcpyry0ts36jb13bk2gqq9y', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: "תודה רבה!",
        description: "פרטיך נקלטו בהצלחה. נשלח לך עדכון מייל ברגע שהמערכת תעלה לאוויר ותוכל להנות מההטבה המיוחדת שלך!"
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error sending to webhook:', error);
      toast({
        title: "תודה!",
        description: "קיבלנו את פרטייך ונעדכן אותך בהקדם"
      });
      setIsSubmitted(true);
    }
  };
  const resetForm = () => {
    setIsSubmitted(false);
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setIsChecked(true);
    setErrors({});
  };
  return <div className="w-full bg-gradient-to-t from-blue-50/50 to-background py-0">
      <div className="container mx-auto px-4">
        <div className="ofair-card max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 h-20 w-20 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 h-32 w-32 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gift className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold rtl">הטבת השקה מיוחדת!</h3>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 rtl">50 שקל חזרה על הזמנת העבודה הראשונה שלכם דרך oFair!</h2>
            
            <p className="text-center text-muted-foreground mb-8 rtl max-w-xl mx-auto">
              השאירו את הפרטים שלכם ונעדכן אתכם ברגע שהמערכת תהיה זמינה. תוכלו להנות מההטבה ולחסוך בעבודה הראשונה שלכם!
            </p>
            
            {!isSubmitted ? <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                  <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="שם פרטי*" className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl mb-3`} required />
                  
                  <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="שם משפחה*" className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl mb-3`} required />
                  
                  <input type="tel" value={phone} onChange={e => {
                // Allow only digits
                const value = e.target.value.replace(/\D/g, '');
                setPhone(value);
              }} placeholder="מספר טלפון*" maxLength={10} className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl mb-3`} required />
                  
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="כתובת מייל*" className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-input'} bg-background focus:outline-none focus:ring-2 focus:ring-primary rtl`} required />
                </div>
                
                <div className="flex items-start gap-2 mb-6 rtl">
                  <input type="checkbox" id="terms" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="mt-1" required />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">אני מעוניין/ת לקבל עדכונים על השקת המערכת, קבלת ההטבה ומבצעים שווים (חובה)*</label>
                </div>
                
                <button type="submit" className="ofair-button w-full rtl">
                  שמרו לי את ההטבה!
                </button>
                
                <p className="text-xs text-muted-foreground mt-3 rtl text-center">
                  * 50 שקל חזרה לעבודה הבאה שלכם דרכנו ישמרו בחשבונכם
                </p>
              </form> : <div className="text-center py-4 relative">
                <button onClick={resetForm} className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700" type="button">
                  <X className="h-5 w-5" />
                </button>
                
                <div className="inline-flex items-center justify-center bg-green-100 text-green-700 p-4 rounded-full mb-4">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 rtl">תודה רבה על ההרשמה!</h3>
                <p className="text-muted-foreground rtl mb-4">פרטייך נקלטו במערכת בהצלחה 🎉</p>
                <p className="text-sm text-muted-foreground rtl mb-6">נשלח לך עדכון למייל ברגע שהמערכת תעלה לאוויר, ותוכל להנות מההטבה המיוחדת שלך - 50 שקל חזרה על העבודה הראשונה!</p>
                
                <div className="mt-4">
                  <p className="text-muted-foreground rtl font-medium mb-3">עקבו אחרינו ברשתות החברתיות:</p>
                  <div className="flex justify-center gap-4">
                    <a href="https://www.facebook.com/profile.php?id=61573771175534#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default PromotionBanner;