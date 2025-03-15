
import React from 'react';
import { WandSparkles, Eye, EyeOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import RouletteNumber from './RouletteNumber';

interface SuggestionDisplayProps {
  suggestion: number[];
  selectedGroup: string;
  isBlurred: boolean;
  toggleVisibility: (e: React.MouseEvent) => void;
  numberGroups: Record<string, { name: string; numbers: number[]; color: string }>;
}

const SuggestionDisplay = ({ 
  suggestion, 
  selectedGroup, 
  isBlurred, 
  toggleVisibility,
  numberGroups 
}: SuggestionDisplayProps) => {
  
  const getSuggestionColor = (num: number) => {
    const groupKey = selectedGroup as keyof typeof numberGroups;
    return numberGroups[groupKey].color;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-3 rounded-xl border border-amber-500/20 shadow-lg space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WandSparkles size={18} className="text-amber-500 animate-pulse" />
          <span className="text-sm text-amber-300 font-medium uppercase tracking-wide">Sugestão de Jogada</span>
          <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 shadow-sm">
            {numberGroups[selectedGroup as keyof typeof numberGroups].name}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleVisibility} 
                className="text-amber-500 hover:text-amber-400 transition-colors bg-slate-800 p-1.5 rounded-full border border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(251,191,36,0.3)]"
              >
                {isBlurred ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800 border border-amber-500/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]">
              <p>{isBlurred ? "Mostrar números" : "Ocultar números"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2 justify-center">
        {suggestion.map((num, i) => (
          <div key={i} className="relative">
            <RouletteNumber
              number={num}
              className={`border border-amber-500 ${getSuggestionColor(num)} ${isBlurred ? 'blur-sm' : 'shadow-lg'}`}
            />
            {!isBlurred && (
              <div className="absolute -inset-0.5 rounded-full animate-jackpot-lights -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionDisplay;
