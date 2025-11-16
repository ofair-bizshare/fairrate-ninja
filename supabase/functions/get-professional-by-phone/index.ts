import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Normalize phone: remove non-digits, strip leading 0 or 972
function normalizePhone(phone: string): string {
  let normalized = phone.replace(/\D/g, '');
  if (normalized.startsWith('0')) {
    normalized = normalized.substring(1);
  }
  if (normalized.startsWith('972')) {
    normalized = normalized.substring(3);
  }
  return normalized;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone } = await req.json();
    
    if (!phone) {
      console.error('❌ Missing phone parameter');
      return new Response(
        JSON.stringify({ error: 'Phone parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔍 Searching for professional with phone:', phone);
    
    const normalizedInput = normalizePhone(phone);
    console.log('📞 Normalized input:', normalizedInput);

    // Create Supabase client with service_role (bypasses RLS securely)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all active/approved professionals
    const { data: professionals, error } = await supabase
      .from('professionals')
      .select('name, company_name, phone_number, status')
      .in('status', ['approved', 'active']);

    if (error) {
      console.error('❌ Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Database error', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`✓ Found ${professionals?.length || 0} professionals in database`);

    // Find matching professional by normalized phone
    const matched = professionals?.find(prof => {
      if (!prof.phone_number) return false;
      const normalizedDb = normalizePhone(prof.phone_number);
      const isMatch = normalizedDb === normalizedInput;
      console.log(`  Comparing DB: "${normalizedDb}" with Input: "${normalizedInput}" => ${isMatch ? '✓ MATCH' : '✗'}`);
      return isMatch;
    });

    if (matched) {
      console.log('✅ Match found:', matched.name);
      return new Response(
        JSON.stringify({
          name: matched.name,
          company_name: matched.company_name,
          phone: matched.phone_number
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('❌ No match found for normalized phone:', normalizedInput);
    return new Response(
      JSON.stringify({ error: 'Professional not found' }),
      { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Exception:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
