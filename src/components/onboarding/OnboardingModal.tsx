
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, CreditCard, Users, Settings, Check } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal = ({ isOpen, onClose }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1A191F] border border-[#33333359] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Bem-vindo ao RunCash</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-center mb-4">
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
            <p className="text-gray-400">Acesse todas as estatísticas de roletas e recomendações personalizadas.</p>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Gerenciar assinatura</h3>
            </div>
            <p className="text-gray-400">Escolha o plano ideal para você e gerencie seus pagamentos facilmente.</p>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Settings className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium">Configurações e preferências</h3>
            </div>
            <p className="text-gray-400">Personalize suas notificações e configure seu acesso.</p>
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
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
