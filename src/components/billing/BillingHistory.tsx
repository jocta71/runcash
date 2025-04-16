
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
}

interface BillingHistoryProps {
  isLoading: boolean;
  payments: PaymentHistoryItem[];
}

const BillingHistory: React.FC<BillingHistoryProps> = ({ isLoading, payments }) => {
  // Default payments for demo
  const defaultPayments: PaymentHistoryItem[] = [
    {
      id: '1',
      date: 'April 13, 2025',
      amount: 59.90,
      status: 'paid',
    },
    {
      id: '2',
      date: 'March 13, 2025',
      amount: 59.90,
      status: 'paid',
    },
    {
      id: '3',
      date: 'February 13, 2025',
      amount: 59.90,
      status: 'paid',
    },
  ];

  const displayPayments = payments.length > 0 ? payments : defaultPayments;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-900/30 text-green-400';
      case 'pending':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'failed':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-gray-900/30 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8 p-4 bg-[#111118] border border-[#33333359] rounded-lg">
        <h3 className="text-lg font-bold mb-4">Billing History</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center pb-2 border-b border-[#33333359]">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-[#111118] border border-[#33333359] rounded-lg">
      <h3 className="text-lg font-bold mb-4">Billing History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <div className="flex items-center">
                  <CreditCard className="mr-2 text-vegas-green" size={16} />
                  <span>{payment.date}</span>
                </div>
              </TableCell>
              <TableCell>R${payment.amount.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`${getStatusBadgeClass(payment.status)} text-xs px-2 py-1 rounded-full`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillingHistory;
