
import React from 'react';
import { Flame } from 'lucide-react';
import RouletteNumber from './RouletteNumber';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HotNumbersProps {
  numbers: number[];
  occurrences: number[];
}

const HotNumbers = ({ numbers, occurrences }: HotNumbersProps) => {
  return (
    <div className="glass-card p-2 rounded-lg border border-vegas-gold/20">
      <div className="flex items-center gap-2 mb-2">
        <Flame size={16} className="text-orange-500" />
        <h3 className="text-vegas-gold text-xs font-semibold">Números Quentes</h3>
      </div>
      
      <div className="flex gap-1.5 justify-center flex-wrap">
        {numbers.map((num, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative">
                  <RouletteNumber number={num} size="sm" className="hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 bg-orange-500 text-black text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {occurrences[i]}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Saiu {occurrences[i]} vezes nas últimas 100 rodadas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default HotNumbers;
