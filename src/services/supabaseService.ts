
import { supabase } from '@/integrations/supabase/client';

export interface Professional {
  first_name: string;
  last_name: string;
  company_name?: string;
  phone: string;
}

// Function to normalize phone numbers for comparison
const normalizePhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  let normalized = phone.replace(/\D/g, '');
  
  // If it starts with 0, remove the leading 0
  if (normalized.startsWith('0')) {
    normalized = normalized.substring(1);
  }
  
  // If it starts with 972, remove the 972
  if (normalized.startsWith('972')) {
    normalized = normalized.substring(3);
  }
  
  return normalized;
};

export const getProfessionalByPhone = async (phone: string): Promise<Professional | null> => {
  try {
    console.log("Fetching professional with phone:", phone);
    
    // Normalize the input phone number
    const normalizedPhone = normalizePhoneNumber(phone);
    console.log("Normalized phone:", normalizedPhone);
    
    // Get all professionals
    const { data: allProfessionals, error } = await supabase
      .from('users_signup')
      .select('first_name, last_name, company_name, phone');
    
    if (error) {
      console.error('Error fetching professionals:', error);
      return null;
    }
    
    if (!allProfessionals || allProfessionals.length === 0) {
      console.log('No professionals found in the database');
      return null;
    }
    
    console.log(`Found ${allProfessionals.length} professionals in the database`);
    
    // Find a professional with a matching normalized phone number
    const matchedProfessional = allProfessionals.find(prof => {
      const normalizedProfPhone = normalizePhoneNumber(prof.phone);
      console.log(`Comparing: ${normalizedProfPhone} with ${normalizedPhone}`);
      return normalizedProfPhone === normalizedPhone;
    });
    
    if (matchedProfessional) {
      console.log('Found matching professional:', matchedProfessional);
      return matchedProfessional;
    }
    
    console.log('No matching professional found after normalization');
    return null;
  } catch (error) {
    console.error('Failed to fetch professional:', error);
    return null;
  }
};
