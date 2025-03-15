
import { supabase } from '@/integrations/supabase/client';

export interface Professional {
  first_name: string;
  last_name: string;
  company_name?: string;
  phone: string;
}

export const getProfessionalByPhone = async (phone: string): Promise<Professional | null> => {
  try {
    const { data, error } = await supabase
      .from('users_signup')
      .select('first_name, last_name, company_name, phone')
      .eq('phone', phone)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching professional data:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Failed to fetch professional:', error);
    return null;
  }
};
