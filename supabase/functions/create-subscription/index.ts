
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'
import { corsHeaders } from '../_shared/cors.ts'
import { Database } from '../_shared/database.types.ts'

interface RequestBody {
  planId: string
  name: string
  email: string
  cpfCnpj: string
  cardToken: string
  userId: string
  billingAddress: {
    street: string
    number: string
    complement?: string
    city: string
    state: string
    zipCode: string
  }
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
    
    // Validate that the user ID in the token matches the one in the request
    if (user.id !== requestData.userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized - User IDs do not match' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const asaasApiKey = Deno.env.get('ASAAS_API_KEY')
    
    if (!asaasApiKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error - Asaas API key not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Step 1: Create or get customer
    const customerResponse = await fetch(`${ASAAS_API_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': asaasApiKey
      },
      body: JSON.stringify({
        name: requestData.name,
        email: requestData.email,
        cpfCnpj: requestData.cpfCnpj,
        address: requestData.billingAddress.street,
        addressNumber: requestData.billingAddress.number,
        complement: requestData.billingAddress.complement,
        province: requestData.billingAddress.city,
        state: requestData.billingAddress.state,
        postalCode: requestData.billingAddress.zipCode,
      })
    })

    if (!customerResponse.ok) {
      const errorData = await customerResponse.json()
      console.error('Asaas customer creation error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to create customer', details: errorData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const customerData = await customerResponse.json()
    
    // Get plan details from the database
    const { data: planData, error: planError } = await supabaseClient
      .from('plans')
      .select('*')
      .eq('id', requestData.planId)
      .single()
      
    if (planError || !planData) {
      return new Response(
        JSON.stringify({ error: 'Plan not found', details: planError }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Step 2: Create a subscription
    const subscriptionResponse = await fetch(`${ASAAS_API_URL}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': asaasApiKey
      },
      body: JSON.stringify({
        customer: customerData.id,
        billingType: 'CREDIT_CARD',
        value: planData.price,
        nextDueDate: new Date().toISOString().split('T')[0], // Today
        cycle: planData.interval === 'MONTHLY' ? 'MONTHLY' : 'YEARLY',
        description: `Subscription to ${planData.name} plan`,
        creditCard: requestData.cardToken,
        creditCardHolderInfo: {
          name: requestData.name,
          email: requestData.email,
          cpfCnpj: requestData.cpfCnpj,
          postalCode: requestData.billingAddress.zipCode,
          addressNumber: requestData.billingAddress.number,
          addressComplement: requestData.billingAddress.complement || null,
        }
      })
    })

    if (!subscriptionResponse.ok) {
      const errorData = await subscriptionResponse.json()
      console.error('Asaas subscription creation error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to create subscription', details: errorData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const subscriptionData = await subscriptionResponse.json()

    // Step 3: Save the subscription in our database
    const { error: insertError } = await supabaseClient
      .from('subscriptions')
      .insert({
        user_id: user.id,
        asaas_customer_id: customerData.id,
        asaas_subscription_id: subscriptionData.id,
        plan_id: requestData.planId,
        status: subscriptionData.status,
        next_due_date: subscriptionData.nextDueDate,
        value: subscriptionData.value
      })

    if (insertError) {
      console.error('Error saving subscription to database:', insertError)
      // We should ideally cancel the Asaas subscription here
      return new Response(
        JSON.stringify({ error: 'Failed to save subscription', details: insertError }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        subscription: {
          id: subscriptionData.id,
          status: subscriptionData.status,
          nextDueDate: subscriptionData.nextDueDate,
          value: subscriptionData.value
        }
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
