
import React from 'react';
import { cn } from '@/lib/utils';

interface RouletteNumberProps {
  number: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const RouletteNumber = ({ number, size = 'sm', className }: RouletteNumberProps) => {
  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-green-600 text-white';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'bg-red-600 text-white' : 'bg-black text-white';
  };
  
  const sizeClasses = {
    xs: 'w-5 h-5 text-[9px]',
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-full flex items-center justify-center font-bold",
        getNumberColor(number),
        className
      )}
    >
      {number}
    </div>
  );
};

export default RouletteNumber;
