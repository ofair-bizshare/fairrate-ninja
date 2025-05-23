
import { supabase } from '@/integrations/supabase/client';

export interface Professional {
  first_name: string;
  last_name: string;
  company_name?: string;
  phone: string;
}

export interface Rating {
  id?: string;
  professional_name: string;
  professional_phone: string;
  company_name?: string;
  customer_name: string;
  customer_phone: string;
  rating_overall: number;
  rating_timing: number;
  rating_quality: number;
  rating_value: number;
  rating_communication: number;
  rating_cleanliness: number;
  rating_recommendation: number;
  weighted_average: number;
  recommendation?: string;
  created_at?: string;
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
    
    // Get all professionals from the correct table (professionals)
    const { data: allProfessionals, error } = await supabase
      .from('professionals')
      .select('first_name, last_name, company_name, phone_number');
    
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
      // Use phone_number field instead of phone since that's what the professionals table has
      const normalizedProfPhone = prof.phone_number ? normalizePhoneNumber(prof.phone_number) : '';
      console.log(`Comparing: ${normalizedProfPhone} with ${normalizedPhone}`);
      return normalizedProfPhone === normalizedPhone;
    });
    
    if (matchedProfessional) {
      console.log('Found matching professional:', matchedProfessional);
      // Convert to the expected Professional interface
      return {
        first_name: matchedProfessional.first_name || '',
        last_name: matchedProfessional.last_name || '',
        company_name: matchedProfessional.company_name,
        phone: matchedProfessional.phone_number || ''
      };
    }
    
    console.log('No matching professional found after normalization');
    return null;
  } catch (error) {
    console.error('Failed to fetch professional:', error);
    return null;
  }
};

export const saveRating = async (rating: Rating): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('professional_ratings')
      .insert(rating)
      .select('id')
      .single();
    
    if (error) {
      console.error('Error saving rating:', error);
      return null;
    }
    
    console.log('Rating saved successfully with ID:', data.id);
    return data.id;
  } catch (error) {
    console.error('Failed to save rating:', error);
    return null;
  }
};

export const getLatestRatings = async (limit: number = 3): Promise<Rating[]> => {
  try {
    const { data, error } = await supabase
      .from('professional_ratings')
      .select('*')
      .not('recommendation', 'is', null)
      .neq('recommendation', '')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching ratings:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch ratings:', error);
    return [];
  }
};
