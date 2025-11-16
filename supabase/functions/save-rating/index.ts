import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rating = await req.json();
    
    console.log('📝 Received rating submission:', {
      professional: rating.professional_name,
      customer: rating.customer_name,
      weighted_average: rating.weighted_average
    });

    // Validation
    if (!rating.professional_name || !rating.customer_name || !rating.customer_phone) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate rating values (1-5)
    const ratingFields = ['rating_timing', 'rating_quality', 'rating_value', 
                          'rating_communication', 'rating_cleanliness', 'rating_recommendation'];
    for (const field of ratingFields) {
      const value = rating[field];
      if (value && (value < 1 || value > 5)) {
        return new Response(
          JSON.stringify({ error: `Invalid ${field}: must be between 1 and 5` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data, error } = await supabase
      .from('professional_ratings')
      .insert(rating)
      .select('id')
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save rating' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('✅ Rating saved successfully with ID:', data.id);
    
    return new Response(
      JSON.stringify({ id: data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('❌ Exception:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
