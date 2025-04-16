
import React from 'react';
import { useBilling } from '@/hooks/useBilling';
import PlanCard from './PlanCard';
import { Skeleton } from '@/components/ui/skeleton';

const PlansSection = ({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) => {
  const { plans, subscription, isLoading } = useBilling();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-[#33333359] p-4">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-8 w-28 mb-2" />
            <Skeleton className="h-4 w-full mb-6" />
            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  // Default plans if none are loaded from the database
  const defaultPlans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Essential features for beginners',
      price: 29.90,
      interval: 'MONTHLY' as const,
      features: ['Basic features', 'Limited access', 'Email support'],
    },
    {
      id: 'standard',
      name: 'Standard',
      description: 'Perfect for regular users',
      price: 59.90,
      interval: 'MONTHLY' as const,
      features: ['All basic features', 'Premium access', 'Priority support', 'Advanced analytics'],
      recommended: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For professional users with advanced needs',
      price: 99.90,
      interval: 'MONTHLY' as const,
      features: ['All standard features', 'Unlimited access', '24/7 support', 'Custom solutions', 'Dedicated account manager'],
    },
  ];

  const displayPlans = plans.length > 0 ? plans : defaultPlans;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {displayPlans.map((plan) => (
        <PlanCard 
          key={plan.id}
          plan={plan}
          isCurrentPlan={subscription?.plan === plan.id}
          onSelectPlan={() => onSelectPlan(plan.id)}
        />
      ))}
    </div>
  );
};

export default PlansSection;
