
import React from 'react';
import { AlertTriangle } from "lucide-react";
import ConfirmationDialog, { ConfirmationDialogProps } from '../ui/confirmation-dialog';

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const CancelSubscriptionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading
}: CancelSubscriptionDialogProps) => {
  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      isLoading={isLoading}
      title="Cancelar assinatura"
      description="Tem certeza que deseja cancelar sua assinatura? Você perderá acesso a todos os recursos premium ao final do período atual."
      confirmText="Confirmar cancelamento"
      cancelText="Voltar"
      confirmVariant="destructive"
      loadingText="Cancelando..."
      icon={<AlertTriangle size={40} className="text-yellow-500" />}
    />
  );
};

export default CancelSubscriptionDialog;
