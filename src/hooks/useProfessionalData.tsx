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
      
      // Extract all possible parameters from URL with proper decoding
      const rawCustomerName = params.get('customer_name') || params.get('customerName');
      const customerName = rawCustomerName 
        ? decodeURIComponent(rawCustomerName).replace(/_/g, ' ')
        : undefined;
      
      const rawCustomerPhone = params.get('customer_phone') || params.get('customerPhone');
      const customerPhone = rawCustomerPhone 
        ? decodeURIComponent(rawCustomerPhone)
        : undefined;
      
      const rawProfName = params.get('prof_name') || params.get('profName');
      const profName = rawProfName 
        ? decodeURIComponent(rawProfName).replace(/_/g, ' ')
        : undefined;
      
      const rawProfPhone = params.get('prof_phone') || params.get('profPhone');
      const profPhone = rawProfPhone 
        ? decodeURIComponent(rawProfPhone)
        : undefined;
      
      const rawCompanyName = params.get('company_name') || params.get('companyName');
      const companyName = rawCompanyName 
        ? decodeURIComponent(rawCompanyName).replace(/_/g, ' ')
        : undefined;
      
      // Priority order for professional phone: prof_phone/profPhone -> phone/tel
      let phoneParam = profPhone || params.get('phone') || params.get('tel');
      
      // If not in query params, try to extract from path
      if (!phoneParam) {
        const pathMatch = location.pathname.match(/\/(?:phone\/)?(\d{9,10})/);
        if (pathMatch) {
          phoneParam = pathMatch[1];
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
        },
        phoneSource: profPhone ? 'profPhone parameter' : phoneParam ? 'phone/tel parameter or path' : 'none'
      });

      if (!phoneParam) {
        console.warn("⚠️ No professional phone found - ratings will not be saved");
      } else {
        console.log(`📞 Using professional phone from: ${profPhone ? 'profPhone' : 'phone/tel/path'}`);
      }

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
        professional = {
          name: profName || '',
          phone: profPhone || phoneParam || '',
          company_name: companyName || undefined
        };
      }
      
      // If professional exists but phone is empty, add fallback
      if (professional && !professional.phone) {
        console.log("🔄 Professional exists but phone is empty, using fallback:", profPhone || phoneParam);
        professional = {
          ...professional,
          phone: profPhone || phoneParam || ''
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
