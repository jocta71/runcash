
import React from 'react';
import RouletteNumber from './RouletteNumber';
import { Loader2 } from 'lucide-react';

interface LastNumbersProps {
  numbers: number[];
  isLoading?: boolean;
}

const LastNumbers = ({ numbers, isLoading = false }: LastNumbersProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-10">
        <Loader2 size={20} className="animate-spin text-vegas-gold" />
      </div>
    );
  }

  // Split numbers into two rows
  const firstRow = numbers.slice(0, Math.ceil(numbers.length / 2));
  const secondRow = numbers.slice(Math.ceil(numbers.length / 2));

  return (
    <div className="flex flex-col items-center gap-2 max-w-full">
      <div className="flex justify-center gap-2">
        {firstRow.map((num, i) => (
          <RouletteNumber key={i} number={num} />
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {secondRow.map((num, i) => (
          <RouletteNumber key={i + firstRow.length} number={num} />
        ))}
      </div>
    </div>
  );
};

export default LastNumbers;
