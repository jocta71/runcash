
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, CreditCard, Users, Settings, Check, Calendar, BarChart, Bell, ArrowLeft } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1A191F] border border-[#33333359] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Bem-vindo ao RunCash</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full mx-1 ${
                i + 1 === step ? 'bg-green-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Perfil personalizado</h3>
            </div>
            <p className="text-gray-400">Acesse todas as estatísticas de roletas e recomendações personalizadas baseadas no seu perfil de jogador.</p>
            <img 
              src="https://placehold.co/600x200/252429/00FF00?text=User+Dashboard" 
              alt="Dashboard preview" 
              className="rounded-md w-full object-cover h-36 mt-2" 
            />
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <BarChart className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Estatísticas avançadas</h3>
            </div>
            <p className="text-gray-400">Tenha acesso a estatísticas detalhadas e análises em tempo real para tomar decisões mais precisas.</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-[#252429] rounded-md p-3">
                <p className="text-xs text-gray-400">Acertos</p>
                <p className="text-lg text-green-500">78%</p>
                <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                  <div className="h-1 bg-green-500 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              <div className="bg-[#252429] rounded-md p-3">
                <p className="text-xs text-gray-400">Sequências</p>
                <p className="text-lg text-blue-500">12</p>
                <div className="w-full h-1 bg-gray-700 rounded-full mt-2">
                  <div className="h-1 bg-blue-500 rounded-full" style={{width: '65%'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Gerenciar assinatura</h3>
            </div>
            <p className="text-gray-400">Escolha o plano ideal para você e gerencie seus pagamentos facilmente. Assine para obter acesso completo a todos recursos premium.</p>
            <div className="bg-[#252429] p-3 rounded-md mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Plano Premium</span>
                <span className="bg-green-500/20 px-2 py-1 rounded text-green-500 text-xs">Recomendado</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">Acesso completo a todas as roletas e algoritmos</p>
              <p className="font-bold">R$ 59,90<span className="text-xs text-gray-400">/mês</span></p>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Bell className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Notificações personalizadas</h3>
            </div>
            <p className="text-gray-400">Receba alertas de oportunidades de apostas e padrões de jogo diretamente no seu email ou no aplicativo.</p>
            <div className="bg-[#252429] rounded-md p-3 mt-2">
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Alerta de sequência encontrada</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span className="text-sm">Lembretes de renovação</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Ofertas e promoções</span>
              </div>
            </div>
          </div>
        )}
        
        {step === 5 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Settings className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Pronto para começar!</h3>
            </div>
            <p className="text-gray-400">Sua conta está configurada e pronta para uso. Explore todas as funcionalidades do RunCash e maximize suas chances de sucesso.</p>
            <div className="flex items-center justify-center mt-4">
              <div className="p-4 bg-green-500/20 rounded-full">
                <Check className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-between">
          {step > 1 ? (
            <Button 
              onClick={prevStep}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>
          ) : <div></div>}
          
          <Button 
            onClick={nextStep}
            className="bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
          >
            {step === totalSteps ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Começar
              </>
            ) : (
              <>
                Próximo
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
