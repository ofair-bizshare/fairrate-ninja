
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with public keys
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Professional {
  name: string;
  company_name?: string;
  phone_number: string;
}

export const getProfessionalByPhone = async (phone: string): Promise<Professional | null> => {
  try {
    const { data, error } = await supabase
      .from('users_signup')
      .select('name, company_name, phone_number')
      .eq('phone_number', phone)
      .single();
    
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
