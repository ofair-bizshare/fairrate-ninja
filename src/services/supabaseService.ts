
import { supabase } from '@/integrations/supabase/client';

export interface Professional {
  first_name: string;
  last_name: string;
  company_name?: string;
  phone: string;
}

export const getProfessionalByPhone = async (phone: string): Promise<Professional | null> => {
  try {
    console.log("Fetching professional with phone:", phone);
    
    // Try exact match first
    let { data, error } = await supabase
      .from('users_signup')
      .select('first_name, last_name, company_name, phone')
      .eq('phone', phone)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching professional data:', error);
      return null;
    }
    
    // If no exact match, try phone number with or without country code
    if (!data) {
      console.log("No exact match found, trying alternative formats");
      
      // If phone number has country code (e.g., starts with +972 or 972), try without it
      if (phone.startsWith("+972")) {
        const phoneWithoutCode = phone.substring(4); // Remove +972
        console.log("Trying without country code +972:", phoneWithoutCode);
        
        const { data: dataWithoutCode, error: errorWithoutCode } = await supabase
          .from('users_signup')
          .select('first_name, last_name, company_name, phone')
          .eq('phone', phoneWithoutCode)
          .maybeSingle();
          
        if (!errorWithoutCode && dataWithoutCode) {
          data = dataWithoutCode;
        }
      } 
      else if (phone.startsWith("972")) {
        const phoneWithoutCode = phone.substring(3); // Remove 972
        console.log("Trying without country code 972:", phoneWithoutCode);
        
        const { data: dataWithoutCode, error: errorWithoutCode } = await supabase
          .from('users_signup')
          .select('first_name, last_name, company_name, phone')
          .eq('phone', phoneWithoutCode)
          .maybeSingle();
          
        if (!errorWithoutCode && dataWithoutCode) {
          data = dataWithoutCode;
        }
      }
      // If phone doesn't have country code, try with it
      else if (phone.length === 10 && phone.startsWith("0")) {
        const phoneWithoutLeadingZero = phone.substring(1);
        console.log("Trying with country code:", "972" + phoneWithoutLeadingZero);
        
        const { data: dataWithCode, error: errorWithCode } = await supabase
          .from('users_signup')
          .select('first_name, last_name, company_name, phone')
          .eq('phone', "972" + phoneWithoutLeadingZero)
          .maybeSingle();
          
        if (!errorWithCode && dataWithCode) {
          data = dataWithCode;
        }
      }
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch professional:', error);
    return null;
  }
};
