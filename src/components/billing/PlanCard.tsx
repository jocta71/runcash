
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { Plan } from "@/types/billing";

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  onSelectPlan: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  plan, 
  isCurrentPlan,
  onSelectPlan
}) => {
  return (
    <div className={`rounded-lg border ${isCurrentPlan ? 'border-white' : 'border-[#33333359]'} p-4 flex flex-col relative overflow-hidden ${plan.recommended ? 'ring-2 ring-vegas-green' : ''}`}>
      {plan.recommended && (
        <div className="absolute -right-8 top-4 bg-vegas-green text-black text-xs px-8 py-1 rotate-45">
          Recommended
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{plan.name}</h3>
        {isCurrentPlan && (
          <span className="bg-white text-black text-xs px-2 py-1 rounded-full">Current Plan</span>
        )}
      </div>
      <div className="text-2xl font-bold mb-2">
        R${plan.price.toFixed(2)}
        <span className="text-sm font-normal text-gray-400">
          /{plan.interval === 'MONTHLY' ? 'month' : 'year'}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
      <ul className="mb-6 flex-grow space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <Check size={16} className="mr-2 text-vegas-green" />
            {feature}
          </li>
        ))}
      </ul>
      <Button 
        variant={isCurrentPlan ? 'outline' : 'default'}
        className={isCurrentPlan ? 
          'border-white text-white hover:bg-white hover:text-black' : 
          'bg-white text-black hover:bg-gray-200'}
        onClick={onSelectPlan}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
      </Button>
    </div>
  );
};

export default PlanCard;
