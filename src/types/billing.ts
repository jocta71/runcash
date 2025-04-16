
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'MONTHLY' | 'YEARLY';
  features: string[];
  recommended?: boolean;
}

export interface Subscription {
  id: string;
  customer: {
    name: string;
    email: string;
    cpfCnpj?: string;
  };
  plan: string;
  status: 'ACTIVE' | 'INACTIVE' | 'OVERDUE' | 'CANCELED';
  nextDueDate: string;
  createdAt: string;
  value: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface PaymentMethod {
  id: string;
  creditCardNumber: string;
  creditCardBrand: string;
  creditCardToken: string;
}

export interface AsaasErrorResponse {
  errors: {
    code: string;
    description: string;
  }[];
}
