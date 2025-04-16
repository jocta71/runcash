
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
import { ArrowLeft, CreditCard, Menu, RefreshCcw } from 'lucide-react';
import { showInfoToast } from '@/components/ui/info-toast';
import { Progress } from '@/components/ui/progress';

const BillingPage = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { subscription, isLoading, cancelSubscription, plans } = useBilling();
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
  
  const handleRefreshData = () => {
    setIsRefreshing(true);
    // Normally this would call a function to refresh data from the server
    // For now, just show a toast after a delay
    setTimeout(() => {
      setIsRefreshing(false);
      showInfoToast("Atualizado", "Dados atualizados com sucesso");
    }, 1500);
  };

  // Calculate subscription progress if user has an active subscription
  const subscriptionProgress = subscription ? (() => {
    const startDate = new Date(subscription.createdAt).getTime();
    const endDate = new Date(subscription.nextDueDate).getTime();
    const currentDate = new Date().getTime();
    const totalDuration = endDate - startDate;
    const elapsed = currentDate - startDate;
    return Math.min(Math.max(Math.floor((elapsed / totalDuration) * 100), 0), 100);
  })() : 0;

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
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white"
              onClick={handleRefreshData}
              disabled={isRefreshing}
            >
              <RefreshCcw size={20} className={isRefreshing ? "animate-spin" : ""} />
            </Button>
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
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Assinatura e Pagamento</h1>
                    <p className="text-gray-400 text-sm mt-1">
                      Gerencie seus planos, pagamentos e configurações de assinatura
                    </p>
                  </div>
                  
                  {!isMobile && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-white"
                      onClick={handleRefreshData}
                      disabled={isRefreshing}
                    >
                      <RefreshCcw size={16} className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                      Atualizar
                    </Button>
                  )}
                </div>
                
                {subscription && (
                  <div className="mb-6 p-4 border border-[#33333359] rounded-lg bg-[#252429]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-lg flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                        Assinatura Ativa
                      </h3>
                      <Button 
                        variant="destructive"
                        size="sm"
                        onClick={() => setCancelDialogOpen(true)}
                      >
                        Cancelar 
                        <span className="hidden md:inline ml-1">Assinatura</span>
                      </Button>
                    </div>
                    
                    {/* Plan details */}
                    <div className="bg-[#1A191F]/60 p-3 rounded-md mb-3">
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        <div>
                          <p className="text-xs text-gray-400">Plano atual</p>
                          <p className="font-semibold">
                            {plans.find(p => p.id === subscription.plan)?.name || "Plano Premium"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Próxima cobrança</p>
                          <p className="font-semibold">
                            {new Date(subscription.nextDueDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Valor</p>
                          <p className="font-semibold">R$ {subscription.value.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subscription progress */}
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Período atual</span>
                        <span>{subscriptionProgress}% completo</span>
                      </div>
                      <Progress value={subscriptionProgress} className="h-2" />
                    </div>
                  </div>
                )}
                
                {selectedPlanId ? (
                  <div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleBackToPlans}
                      className="mb-4 flex items-center text-gray-400 hover:text-white"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Voltar aos planos
                    </Button>
                    <CheckoutForm planId={selectedPlanId} onBack={handleBackToPlans} />
                  </div>
                ) : (
                  <Tabs defaultValue="subscription" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#111118] border border-[#33333359]">
                      <TabsTrigger value="subscription" className="data-[state=active]:bg-white data-[state=active]:text-black">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Assinatura</span>
                        <span className="sm:hidden">Planos</span>
                      </TabsTrigger>
                      <TabsTrigger value="payment-methods" className="data-[state=active]:bg-white data-[state=active]:text-black">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Métodos de Pagamento</span>
                        <span className="sm:hidden">Pagamentos</span>
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-black">
                        <CreditCard className="h-4 w-4 mr-2" />
                        <span>Configurações</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="subscription" className="mt-6">
                      <PlansSection onSelectPlan={handleSelectPlan} />
                      <div className="mt-8">
                        <BillingHistory isLoading={false} payments={[]} />
                      </div>
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
