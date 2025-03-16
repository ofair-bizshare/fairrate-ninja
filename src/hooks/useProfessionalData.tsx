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
      // Don't fetch on the terms page
      if (location.pathname === '/terms') {
        return;
      }
      
      let phoneNumber = '';
      
      // Extract phone number from URL parameters
      if (location.search) {
        // Handle query parameters like ?phone=1234567890
        const searchParams = new URLSearchParams(location.search);
        phoneNumber = searchParams.get('phone') || searchParams.get('id') || '';
        
        // If no explicit param found, try to get the first parameter value
        if (!phoneNumber) {
          const firstParam = Array.from(searchParams.entries())[0];
          if (firstParam) {
            phoneNumber = firstParam[1];
          }
        }
      }
      
      // If not found in query params, try to get from pathname segments
      if (!phoneNumber && location.pathname) {
        const pathParts = location.pathname.split('/').filter(part => part);
        if (pathParts.length > 0) {
          // Try to find any segment that looks like a phone number (digits only or with + prefix)
          for (const part of pathParts) {
            if (/^\+?\d+$/.test(part)) {
              phoneNumber = part;
              break;
            }
          }
          
          // If no phone-like segment found, just try the last segment
          if (!phoneNumber && pathParts.length > 0) {
            phoneNumber = pathParts[pathParts.length - 1];
          }
        }
      }
      
      // Clean up the phone number - keep only digits and plus sign
      phoneNumber = phoneNumber.replace(/[^\d+]/g, '');
      
      if (!phoneNumber) {
        console.log("No phone number found in URL");
        return;
      }
      
      console.log("Extracted phone number:", phoneNumber);
      setIsLoading(true);
      
      try {
        const professionalData = await getProfessionalByPhone(phoneNumber);
        console.log("Fetched professional data:", professionalData);
        
        if (professionalData) {
          setProfessional(professionalData);
        } else {
          console.log("No professional found with phone number:", phoneNumber);
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
