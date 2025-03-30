
import React from 'react';
import RouletteNumber from './RouletteNumber';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface LastNumbersProps {
  numbers: number[];
  isLoading?: boolean;
}

const LastNumbers = ({ numbers, isLoading = false }: LastNumbersProps) => {
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-6">
        <Loader2 size={16} className="animate-spin text-vegas-gold" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-1 max-w-full">
      {numbers.map((num, i) => (
        <RouletteNumber 
          key={i} 
          number={num} 
          size={isMobile ? "xs" : "sm"} 
        />
      ))}
    </div>
  );
};

export default LastNumbers;
