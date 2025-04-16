
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plan, Subscription } from "@/types/billing";
import { showSuccessToast } from '@/components/ui/success-toast';

export const useBilling = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  
  // Fetch plans from our Supabase database
  const { data: plans = [], isLoading: isLoadingPlans } = useQuery({
    queryKey: ['billing-plans'],
    queryFn: async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('plans')
          .select('*');
        
        if (error) throw error;
        
        // Type assertion to convert database results to our Plan type
        return (data as unknown) as Plan[];
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive",
        });
        return [] as Plan[];
      } finally {
        setLoading(false);
      }
    },
  });
  
  // Fetch user's current subscription
  const { data: subscription, isLoading: isLoadingSubscription } = useQuery({
    queryKey: ['user-subscription'],
    queryFn: async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return null;
        
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') throw error;
        
        // Type assertion to convert database result to our Subscription type
        return (data as unknown) as Subscription | null;
      } catch (error) {
        console.error('Error fetching subscription:', error);
        toast({
          title: "Error",
          description: "Failed to load subscription information",
          variant: "destructive",
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
  });
  
  // Create a new subscription
  const subscriptionMutation = useMutation({
    mutationFn: async ({ 
      planId, 
      name, 
      email, 
      cpfCnpj, 
      cardToken,
      billingAddress
    }: { 
      planId: string;
      name: string;
      email: string;
      cpfCnpj: string;
      cardToken: string;
      billingAddress: {
        street: string;
        number: string;
        complement?: string;
        city: string;
        state: string;
        zipCode: string;
      };
    }) => {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          name,
          email,
          cpfCnpj,
          cardToken,
          billingAddress,
          userId: user.id,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create subscription');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      showSuccessToast(
        "Assinatura criada",
        "Sua assinatura foi criada com sucesso!"
      );
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
    },
    onError: (error) => {
      console.error('Error creating subscription:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create subscription",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setLoading(false);
    }
  });
  
  // Cancel subscription
  const cancelSubscriptionMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      
      if (!subscription?.id) {
        throw new Error('No active subscription found');
      }
      
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId: subscription.id,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to cancel subscription');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      showSuccessToast(
        "Assinatura cancelada",
        "Sua assinatura foi cancelada com sucesso"
      );
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
    },
    onError: (error) => {
      console.error('Error canceling subscription:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to cancel subscription",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setLoading(false);
    }
  });

  return {
    plans,
    subscription,
    isLoading: loading || isLoadingPlans || isLoadingSubscription,
    createSubscription: subscriptionMutation.mutate,
    cancelSubscription: cancelSubscriptionMutation.mutate,
  };
};
