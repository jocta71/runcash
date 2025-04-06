
import React from 'react';
import RouletteNumber from './RouletteNumber';
import { Loader2 } from 'lucide-react';

interface LastNumbersProps {
  numbers: number[];
  isLoading?: boolean;
  maxRows?: number;
  numbersPerRow?: number;
}

const LastNumbers = ({ 
  numbers, 
  isLoading = false, 
  maxRows = 4,
  numbersPerRow = 6
}: LastNumbersProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-10">
        <Loader2 size={20} className="animate-spin text-vegas-gold" />
      </div>
    );
  }

  // Create rows based on the provided configuration
  const rows = [];
  for (let i = 0; i < maxRows; i++) {
    const rowNumbers = numbers.slice(i * numbersPerRow, (i + 1) * numbersPerRow);
    if (rowNumbers.length > 0) {
      rows.push(rowNumbers);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 max-w-full">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1 flex-wrap">
          {row.map((num, i) => (
            <RouletteNumber 
              key={i + rowIndex * numbersPerRow} 
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
