
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

const PaymentMethods: React.FC = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      last4: '4242',
      brand: 'visa',
      expiryDate: '10/28',
      isDefault: true,
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCard = (event: React.FormEvent) => {
    event.preventDefault();
    
    // In a real app, this would integrate with Asaas API
    setPaymentMethods([...paymentMethods, {
      id: Math.random().toString(),
      last4: '1234',
      brand: 'mastercard',
      expiryDate: '12/27',
      isDefault: false,
    }]);
    
    setIsDialogOpen(false);
    toast({
      title: "Card added",
      description: "Your new payment method has been added successfully",
    });
  };

  const handleRemoveCard = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast({
      title: "Card removed",
      description: "The payment method has been removed",
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
    toast({
      title: "Default card updated",
      description: "Your default payment method has been updated",
    });
  };

  const getBrandLogo = (brand: string) => {
    // In a real app, we'd use actual card brand logos
    return <CreditCard className="text-vegas-green" size={20} />;
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-[#111118] border border-[#33333359] rounded-lg">
        <h3 className="text-lg font-bold mb-4">Payment Methods</h3>
        
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div 
              key={method.id} 
              className="flex justify-between items-center p-3 border border-[#33333359] rounded-lg"
            >
              <div className="flex items-center">
                <div className="h-8 w-12 bg-[#1A191F] rounded-md mr-3 flex items-center justify-center">
                  {getBrandLogo(method.brand)}
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• {method.last4}</p>
                  <p className="text-xs text-gray-400">Expires {method.expiryDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {method.isDefault ? (
                  <span className="bg-green-500/10 text-green-500 text-xs px-2 py-1 rounded-full">Default</span>
                ) : (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleSetDefault(method.id)}
                    className="text-xs"
                  >
                    Set as default
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="icon"
                  className="border-[#33333359] text-white hover:bg-[#33333359]"
                  onClick={() => handleRemoveCard(method.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-vegas-green text-white hover:bg-vegas-green/90">
                <Plus className="mr-2" size={16} />
                Add New Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#1A191F] text-white border-[#33333359]">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCard} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input id="cardholderName" placeholder="JOHN DOE" />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full mt-4 bg-vegas-green text-white hover:bg-vegas-green/90"
                >
                  Add Card
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
