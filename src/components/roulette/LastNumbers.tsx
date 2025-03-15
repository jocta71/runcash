
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
        <Loader2 size={20} className="animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-3 rounded-xl border border-amber-500/20 shadow-lg shadow-amber-500/5">
      <div className="flex items-center mb-2">
        <span className="text-sm text-amber-300 font-medium uppercase tracking-wide">Últimos Números</span>
        <span className="ml-2 text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 shadow-sm">
          {numbers.length} resultados
        </span>
      </div>
      <div className="flex flex-wrap justify-center gap-2 max-w-full animate-fade-in">
        {numbers.map((num, i) => (
          <RouletteNumber 
            key={i} 
            number={num} 
            className={`shadow-md transition-transform ${i === 0 ? 'ring-2 ring-amber-500 ring-offset-1 ring-offset-black' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LastNumbers;
