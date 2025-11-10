import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getProfessionalByPhone, Professional } from '@/services/supabaseService';
import { useToast } from '@/hooks/use-toast';

export interface CustomerData {
  customerName?: string;
  customerPhone?: string;
}

export interface ProfessionalData {
  professional: Professional | null;
  customerData: CustomerData;
}

export const useProfessionalData = () => {
  const [professionalData, setProfessionalData] = useState<ProfessionalData>({
    professional: null,
    customerData: {}
  });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Skip if we're on the terms page
    if (location.pathname === '/terms') {
      return;
    }

    const fetchProfessional = async () => {
      const params = new URLSearchParams(location.search);
      
      // Extract all possible parameters from URL
      const customerName = params.get('customer_name') || params.get('customerName');
      const customerPhone = params.get('customer_phone') || params.get('customerPhone');
      const profName = params.get('prof_name') || params.get('profName');
      const profPhone = params.get('prof_phone') || params.get('profPhone');
      const companyName = params.get('company_name') || params.get('companyName');
      
      // Try to get phone from query params first (for backward compatibility)
      let phoneParam = params.get('phone') || params.get('tel');
      
      // If not in query params, try to extract from path
      if (!phoneParam) {
        const pathMatch = location.pathname.match(/\/(?:phone\/)?(\d{9,10})/);
        if (pathMatch) {
          phoneParam = pathMatch[1];
        }
      }

      // If still no phone, try to find any 10-digit number in the URL
      if (!phoneParam) {
        const fullUrl = window.location.href;
        const numberMatch = fullUrl.match(/(\d{10})/);
        if (numberMatch) {
          phoneParam = numberMatch[1];
        }
      }

      console.log("🔍 URL Analysis:", {
        fullUrl: window.location.href,
        pathname: location.pathname,
        search: location.search,
        extractedParams: {
          phone: phoneParam,
          customerName,
          customerPhone,
          profName,
          profPhone,
          companyName
        }
      });

      let professional: Professional | null = null;

      // If we have a phone parameter, try to fetch from database
      if (phoneParam) {
        console.log("📞 Found phone parameter, fetching from database:", phoneParam);
        setIsLoading(true);
        try {
          const data = await getProfessionalByPhone(phoneParam);
          if (data) {
            console.log("✓ Professional data loaded from database:", data);
            professional = data;
          } else {
            console.log("⚠️ No professional found in database for phone:", phoneParam);
          }
        } catch (error) {
          console.error("❌ Error loading professional:", error);
        } finally {
          setIsLoading(false);
        }
      }

      // If we have manual parameters (profName, profPhone, companyName), use those
      if (!professional && (profName || profPhone)) {
        console.log("📝 Using manual professional parameters from URL");
        const nameParts = (profName || '').split(' ');
        professional = {
          first_name: nameParts[0] || '',
          last_name: nameParts.slice(1).join(' ') || '',
          phone: profPhone || '',
          company_name: companyName || undefined
        };
      }

      // Set the professional data and customer data
      setProfessionalData({
        professional,
        customerData: {
          customerName: customerName || undefined,
          customerPhone: customerPhone || undefined
        }
      });
    };

    fetchProfessional();
  }, [location, toast]);

  return {
    professional: professionalData.professional,
    customerData: professionalData.customerData,
    isLoading
  };
};
