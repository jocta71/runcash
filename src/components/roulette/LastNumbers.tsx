
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
        <Loader2 size={20} className="animate-spin text-[#00ff00]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-2">
        <span className="text-sm text-white/90 font-medium uppercase tracking-wide">Últimos Números</span>
        <span className="ml-2 text-xs bg-[#1d1b26] text-[#00ff00] px-2 py-0.5 rounded-full border border-[#00ff00]/30 shadow-sm shadow-[#00ff00]/10">
          {numbers.length} resultados
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-full animate-fade-in">
        {numbers.map((num, i) => (
          <RouletteNumber 
            key={i} 
            number={num} 
            className={`shadow-md transition-transform ${i === 0 ? 'ring-2 ring-[#00ff00] ring-offset-1 ring-offset-black' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LastNumbers;
