
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useBilling } from '@/hooks/useBilling';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CreditCard, Shield, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LoadingSpinner from '../ui/loading-spinner';

// Card token handling would typically use a library (like Asaas.js SDK)
// This is a simplified version for demonstration
const getCardToken = async (cardDetails: any): Promise<string> => {
  // In a real implementation, this would use the Asaas SDK
  console.log('Getting card token for:', cardDetails);
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('simulated_card_token_12345');
    }, 500);
  });
};

const checkoutSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  cpfCnpj: z.string().min(11, { message: 'CPF/CNPJ deve ter pelo menos 11 caracteres' }),
  cardNumber: z.string().min(16, { message: 'Número do cartão deve ter pelo menos 16 dígitos' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Data de validade deve estar no formato MM/AA' }),
  cvv: z.string().min(3, { message: 'CVV deve ter pelo menos 3 dígitos' }),
  cardholderName: z.string().min(3, { message: 'Nome no cartão deve ter pelo menos 3 caracteres' }),
  street: z.string().min(3, { message: 'Endereço deve ter pelo menos 3 caracteres' }),
  number: z.string().min(1, { message: 'Número é obrigatório' }),
  complement: z.string().optional(),
  city: z.string().min(2, { message: 'Cidade deve ter pelo menos 2 caracteres' }),
  state: z.string().min(2, { message: 'Estado deve ter pelo menos 2 caracteres' }),
  zipCode: z.string().min(8, { message: 'CEP deve ter pelo menos 8 caracteres' }),
});

interface CheckoutFormProps {
  planId: string;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ planId, onBack }) => {
  const { createSubscription, plans, isLoading } = useBilling();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const selectedPlan = plans.find(p => p.id === planId) || {
    id: planId,
    name: 'Selected Plan',
    price: 0,
    interval: 'MONTHLY' as const
  };

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      cpfCnpj: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      street: '',
      number: '',
      complement: '',
      city: '',
      state: '',
      zipCode: '',
    },
  });
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      setSubmitError(null);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setSubmitError(null);
    }
  };

  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    setSubmitError(null);
    
    try {
      // Get card token from Asaas (simulated here)
      const [month, year] = data.expiryDate.split('/');
      const cardToken = await getCardToken({
        cardNumber: data.cardNumber.replace(/\s/g, ''),
        holderName: data.cardholderName,
        expirationMonth: month,
        expirationYear: `20${year}`,
        cvv: data.cvv,
      });
      
      // Create subscription
      await createSubscription({
        planId: selectedPlan.id,
        name: data.name,
        email: data.email,
        cpfCnpj: data.cpfCnpj,
        cardToken,
        billingAddress: {
          street: data.street,
          number: data.number,
          complement: data.complement,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
        },
      });
      
      onBack(); // Return to plans view after successful subscription
    } catch (error) {
      console.error('Checkout error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Ocorreu um erro durante o checkout');
    }
  };
  
  const StepIndicator = () => (
    <div className="flex items-center justify-center my-4">
      {[...Array(totalSteps)].map((_, i) => (
        <React.Fragment key={i}>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              i + 1 === step 
                ? 'bg-green-500 text-black' 
                : i + 1 < step 
                  ? 'bg-green-500/20 text-green-500' 
                  : 'bg-gray-800 text-gray-500'
            }`}
          >
            {i + 1 < step ? <Check size={16} /> : i + 1}
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-1 w-10 ${i + 1 < step ? 'bg-green-500' : 'bg-gray-800'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  
  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#1A191F] text-white border-[#33333359]">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between">
          <span>Checkout</span>
          <span className="bg-green-500/20 text-green-500 text-sm px-3 py-1 rounded-full">
            {selectedPlan.name}
          </span>
        </CardTitle>
        <CardDescription>
          Você está assinando o plano {selectedPlan.name} por 
          R${selectedPlan.price.toFixed(2)}/{selectedPlan.interval === 'MONTHLY' ? 'mês' : 'ano'}
        </CardDescription>
        <StepIndicator />
      </CardHeader>
      
      <CardContent>
        {submitError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div>
                <h3 className="font-medium mb-4">Informações Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="João Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="joao@exemplo.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cpfCnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF/CNPJ</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div>
                <h3 className="font-medium mb-4">Informações de Pagamento</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-3 bg-[#252429] rounded-md flex items-center gap-3 mb-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-gray-300">Seus dados de pagamento estão seguros e criptografados</p>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número do Cartão</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              placeholder="0000 0000 0000 0000" 
                              {...field} 
                              onChange={(e) => {
                                // Format card number with spaces
                                let value = e.target.value.replace(/\s/g, '');
                                if (value.length > 16) value = value.slice(0, 16);
                                const formatted = value.replace(/(.{4})/g, '$1 ').trim();
                                field.onChange(formatted);
                              }}
                            />
                            <CreditCard className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Data de Validade</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="MM/AA" 
                              {...field} 
                              onChange={(e) => {
                                // Format expiry date as MM/YY
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 4) value = value.slice(0, 4);
                                if (value.length > 2) {
                                  value = `${value.slice(0, 2)}/${value.slice(2)}`;
                                }
                                field.onChange(value);
                              }}
                              maxLength={5}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123" 
                              {...field} 
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                field.onChange(value.slice(0, 4));
                              }}
                              maxLength={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome no Cartão</FormLabel>
                        <FormControl>
                          <Input placeholder="JOÃO P SILVA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div>
                <h3 className="font-medium mb-4">Endereço de Cobrança</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="col-span-2 md:col-span-1">
                        <FormLabel>Rua</FormLabel>
                        <FormControl>
                          <Input placeholder="Av Paulista" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input placeholder="Apto 42" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="São Paulo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input placeholder="SP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="00000-000" 
                              {...field} 
                              onChange={(e) => {
                                // Format ZIP code as 00000-000
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 8) value = value.slice(0, 8);
                                if (value.length > 5) {
                                  value = `${value.slice(0, 5)}-${value.slice(5)}`;
                                }
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
            
            <CardFooter className="px-0 pt-6 flex gap-3">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="flex-1"
                >
                  Voltar
                </Button>
              )}
              
              {step < totalSteps ? (
                <Button 
                  type="button" 
                  className="flex-1 bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
                  onClick={nextStep}
                >
                  Próximo
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-b from-[#00ff00] to-[#00df00] text-black"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size={16} variant="primary" className="mr-2" />
                      Processando...
                    </>
                  ) : (
                    <>Pagar R${selectedPlan.price.toFixed(2)}</>
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
