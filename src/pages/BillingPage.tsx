
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PlansSection from '@/components/billing/PlansSection';
import BillingHistory from '@/components/billing/BillingHistory';
import PaymentMethods from '@/components/billing/PaymentMethods';
import CheckoutForm from '@/components/billing/CheckoutForm';
import { useBilling } from '@/hooks/useBilling';
import UserDashboard from '@/components/dashboard/UserDashboard';
import SettingsPanel from '@/components/settings/SettingsPanel';
import LoadingSpinner from '@/components/ui/loading-spinner';
import CancelSubscriptionDialog from '@/components/billing/CancelSubscriptionDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import OnboardingModal from '@/components/onboarding/OnboardingModal';
import { Menu } from 'lucide-react';

const BillingPage = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { subscription, isLoading, cancelSubscription } = useBilling();
  const isMobile = useIsMobile();

  // Check if it's the first visit by looking for a flag in localStorage
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('visited_billing');
    if (!hasVisitedBefore) {
      setShowOnboarding(true);
      localStorage.setItem('visited_billing', 'true');
    }
  }, []);

  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
  };

  const handleBackToPlans = () => {
    setSelectedPlanId(null);
  };
  
  const handleCancelSubscription = () => {
    cancelSubscription();
    setCancelDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0A0F]">
      {!isMobile && (
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
      )}
      
      {/* Mobile Sidebar */}
      {isMobile && (
        <>
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={true} />
          <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[#0B0A0F] border-b border-[#33333359]">
            <button 
              className="p-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} className="text-[#00ff00]" />
            </button>
            <span className="text-white text-xl font-bold">RunCash</span>
          </div>
        </>
      )}
      
      <div className={`flex-1 p-4 md:p-10 overflow-auto ${isMobile ? 'pt-20' : ''}`}>
        <div className="max-w-4xl mx-auto bg-[#1A191F] rounded-xl p-4 md:p-6 text-white shadow-lg">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner text="Carregando informações do seu perfil..." />
            </div>
          ) : (
            <>
              {/* User Dashboard */}
              <UserDashboard />
              
              <div className="mt-8">
                <h1 className="text-2xl font-bold mb-6 text-white">Billing</h1>
                
                {selectedPlanId ? (
                  <CheckoutForm planId={selectedPlanId} onBack={handleBackToPlans} />
                ) : (
                  <Tabs defaultValue="subscription" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#111118] border border-[#33333359]">
                      <TabsTrigger value="subscription" className="data-[state=active]:bg-white data-[state=active]:text-black">
                        Assinatura
                      </TabsTrigger>
                      <TabsTrigger value="payment-methods" className="data-[state=active]:bg-white data-[state=active]:text-black">
                        Métodos de Pagamento
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-black">
                        Configurações
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="subscription" className="mt-6">
                      {subscription && (
                        <div className="mb-6 p-4 border border-green-500/30 rounded-lg bg-green-500/10">
                          <h3 className="font-bold text-lg mb-2 flex items-center">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            Assinatura Ativa
                          </h3>
                          <p className="text-gray-300 mb-4">
                            Você tem uma assinatura ativa até {new Date(subscription.nextDueDate).toLocaleDateString('pt-BR')}
                          </p>
                          <Button 
                            variant="destructive"
                            onClick={() => setCancelDialogOpen(true)}
                          >
                            Cancelar Assinatura
                          </Button>
                        </div>
                      )}
                      <PlansSection onSelectPlan={handleSelectPlan} />
                      <BillingHistory isLoading={false} payments={[]} />
                    </TabsContent>
                    
                    <TabsContent value="payment-methods" className="mt-6">
                      <PaymentMethods />
                    </TabsContent>
                    
                    <TabsContent value="settings" className="mt-6">
                      <SettingsPanel />
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Onboarding Modal */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      
      {/* Cancel Subscription Dialog */}
      <CancelSubscriptionDialog 
        isOpen={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={handleCancelSubscription}
        isLoading={isLoading}
      />
    </div>
  );
};

export default BillingPage;
