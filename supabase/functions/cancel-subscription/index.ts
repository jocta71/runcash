
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'
import { Database } from '../_shared/database.types.ts'

interface RequestBody {
  subscriptionId: string
}

const ASAAS_API_URL = 'https://sandbox.asaas.com/api/v3'

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient<Database>(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    
    const { data: { user } } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the request body
    const requestData: RequestBody = await req.json()
    
    // Check if the subscription exists and belongs to the user
    const { data: subscriptionData, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .select('asaas_subscription_id')
      .eq('id', requestData.subscriptionId)
      .eq('user_id', user.id)
      .single()
      
    if (subscriptionError || !subscriptionData) {
      return new Response(
        JSON.stringify({ error: 'Subscription not found or does not belong to user', details: subscriptionError }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const asaasApiKey = Deno.env.get('ASAAS_API_KEY')
    
    if (!asaasApiKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error - Asaas API key not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Cancel the subscription in Asaas
    const cancelResponse = await fetch(`${ASAAS_API_URL}/subscriptions/${subscriptionData.asaas_subscription_id}`, {
      method: 'DELETE',
      headers: {
        'access_token': asaasApiKey
      }
    })

    if (!cancelResponse.ok) {
      const errorData = await cancelResponse.json()
      console.error('Asaas subscription cancellation error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to cancel subscription', details: errorData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update the subscription status in our database
    const { error: updateError } = await supabaseClient
      .from('subscriptions')
      .update({ status: 'CANCELED', updated_at: new Date().toISOString() })
      .eq('id', requestData.subscriptionId)

    if (updateError) {
      console.error('Error updating subscription status:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update subscription status', details: updateError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Subscription cancelled successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Unhandled error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
