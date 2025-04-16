
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useBilling } from '@/hooks/useBilling';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CreditCard, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  cpfCnpj: z.string().min(11, { message: 'CPF/CNPJ must be at least 11 characters' }),
  cardNumber: z.string().min(16, { message: 'Card number must be at least 16 digits' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Expiry date must be in format MM/YY' }),
  cvv: z.string().min(3, { message: 'CVV must be at least 3 digits' }),
  cardholderName: z.string().min(3, { message: 'Cardholder name must be at least 3 characters' }),
  street: z.string().min(3, { message: 'Street must be at least 3 characters' }),
  number: z.string().min(1, { message: 'Number is required' }),
  complement: z.string().optional(),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  state: z.string().min(2, { message: 'State must be at least 2 characters' }),
  zipCode: z.string().min(8, { message: 'Zip code must be at least 8 characters' }),
});

interface CheckoutFormProps {
  planId: string;
  onBack: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ planId, onBack }) => {
  const { createSubscription, plans, isLoading } = useBilling();
  const [submitError, setSubmitError] = useState<string | null>(null);
  
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
      setSubmitError(error instanceof Error ? error.message : 'An error occurred during checkout');
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-[#1A191F] text-white border-[#33333359]">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack} 
            className="hover:bg-[#33333359]"
          >
            <ArrowLeft size={18} />
          </Button>
          <CardTitle>Complete your subscription</CardTitle>
        </div>
        <CardDescription>
          You're subscribing to the {selectedPlan.name} plan for 
          R${selectedPlan.price.toFixed(2)}/{selectedPlan.interval === 'MONTHLY' ? 'month' : 'year'}
        </CardDescription>
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
            <div>
              <h3 className="font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                        <Input placeholder="john@example.com" type="email" {...field} />
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
            
            <Separator className="bg-[#33333359] my-6" />
            
            <div>
              <h3 className="font-medium mb-4">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input placeholder="0000 0000 0000 0000" {...field} />
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
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
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
                          <Input placeholder="123" {...field} />
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
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="JOHN DOE" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator className="bg-[#33333359] my-6" />
            
            <div>
              <h3 className="font-medium mb-4">Billing Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="col-span-2 md:col-span-1">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
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
                        <FormLabel>Number</FormLabel>
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
                        <FormLabel>Complement</FormLabel>
                        <FormControl>
                          <Input placeholder="Apt 4B" {...field} />
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
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
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
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
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
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <CardFooter className="px-0 pt-6">
              <Button 
                type="submit" 
                className="w-full bg-vegas-green text-white hover:bg-vegas-green/90"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : `Pay R$${selectedPlan.price.toFixed(2)}`}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
