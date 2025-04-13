
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

  // Split numbers into four rows for better display
  const numRows = 4;
  const itemsPerRow = Math.ceil(numbers.length / numRows);
  const rows = Array.from({ length: numRows }, (_, i) =>
    numbers.slice(i * itemsPerRow, (i + 1) * itemsPerRow)
  );

  return (
    <div className="flex flex-col items-center gap-1 max-w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1">
          {row.map((num, i) => (
            <RouletteNumber 
              key={i + rowIndex * itemsPerRow} 
              number={num} 
              size="sm" 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LastNumbers;
