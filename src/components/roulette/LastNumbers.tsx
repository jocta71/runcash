
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
      <div className="flex justify-center items-center h-5">
        <Loader2 size={12} className="animate-spin text-vegas-gold" />
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-1 max-w-full">
      {numbers.map((num, i) => (
        <RouletteNumber 
          key={i} 
          number={num} 
          size="xs" 
        />
      ))}
    </div>
  );
};

export default LastNumbers;
