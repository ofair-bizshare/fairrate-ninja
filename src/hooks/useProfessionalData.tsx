
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProfessionalByPhone, Professional } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

export const useProfessionalData = () => {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfessionalData = async () => {
      let phoneNumber = '';
      if (location.search && location.search.startsWith('?')) {
        phoneNumber = location.search.substring(1).split('&')[0];
      }
      if (!phoneNumber && location.pathname) {
        const pathParts = location.pathname.split('/');
        if (pathParts.length > 1 && pathParts[1]) {
          phoneNumber = pathParts[1];
        }
      }
      phoneNumber = phoneNumber.replace(/\D/g, '');
      if (!phoneNumber) return;
      console.log("Extracted phone number:", phoneNumber);
      setIsLoading(true);
      try {
        const professionalData = await getProfessionalByPhone(phoneNumber);
        console.log("Fetched professional data:", professionalData);
        if (professionalData) {
          setProfessional(professionalData);
        } else {
          toast({
            title: "לא נמצא בעל מקצוע",
            description: "מספר הטלפון שהוזן לא נמצא במערכת",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching professional data:", error);
        toast({
          title: "שגיאה בטעינת נתונים",
          description: "אירעה שגיאה בעת טעינת נתוני בעל המקצוע",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfessionalData();
  }, [location, toast]);

  return { professional, isLoading };
};
