
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PlansSection from '@/components/billing/PlansSection';
import BillingHistory from '@/components/billing/BillingHistory';
import PaymentMethods from '@/components/billing/PaymentMethods';
import CheckoutForm from '@/components/billing/CheckoutForm';

const BillingPage = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleBackToPlans = () => {
    setSelectedPlanId(null);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0A0F]">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 p-6 md:p-10 overflow-auto">
        <div className="max-w-4xl mx-auto bg-[#1A191F] rounded-xl p-6 text-white shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-white">Billing</h1>
          
          {selectedPlanId ? (
            <CheckoutForm planId={selectedPlanId} onBack={handleBackToPlans} />
          ) : (
            <Tabs defaultValue="subscription" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#111118] border border-[#33333359]">
                <TabsTrigger value="subscription" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Subscription
                </TabsTrigger>
                <TabsTrigger value="payment-methods" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Payment Methods
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="subscription" className="mt-6">
                <PlansSection onSelectPlan={handleSelectPlan} />
                <BillingHistory isLoading={false} payments={[]} />
              </TabsContent>
              
              <TabsContent value="payment-methods" className="mt-6">
                <PaymentMethods />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
