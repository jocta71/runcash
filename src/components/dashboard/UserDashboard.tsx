
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, CreditCard, Trophy } from "lucide-react";
import { useBilling } from "@/hooks/useBilling";
import LoadingSpinner from "../ui/loading-spinner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const UserDashboard = () => {
  const { subscription, plans, isLoading } = useBilling();
  
  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner text="Carregando informações do usuário..." />
      </div>
    );
  }
  
  const activePlan = subscription 
    ? plans?.find(plan => plan.id === subscription.plan) 
    : null;
    
  const formattedNextDueDate = subscription?.nextDueDate 
    ? format(new Date(subscription.nextDueDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) 
    : null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Seu Painel</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#1A191F] border-[#33333359] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-green-400" />
              Status da Assinatura
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscription ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Plano atual:</span>
                  <span className="font-medium">{activePlan?.name || "Plano básico"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span className={`font-medium ${
                    subscription.status === 'ACTIVE' 
                      ? 'text-green-400' 
                      : 'text-yellow-400'
                  }`}>
                    {subscription.status === 'ACTIVE' ? 'Ativo' : 'Pendente'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Próximo pagamento:</span>
                  <span className="font-medium">{formattedNextDueDate}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-gray-400">
                <p>Você ainda não possui uma assinatura ativa</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-[#1A191F] border-[#33333359] text-white">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-400" />
              Suas Estatísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total de acessos:</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Roletas favoritas:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Último acesso:</span>
                <span className="font-medium">
                  {format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
