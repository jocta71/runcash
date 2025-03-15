
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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WandSparkles size={18} className="text-[#00ff00]" />
          <span className="text-sm text-white font-medium">Sugestão de Jogada</span>
          <span className="text-xs bg-[#00ff00]/10 text-[#00ff00] px-2 py-0.5 rounded-full">
            {numberGroups[selectedGroup as keyof typeof numberGroups].name}
          </span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleVisibility} 
                className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors bg-[#1d1b26] p-1.5 rounded-full border border-[#00ff00]/20"
              >
                {isBlurred ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isBlurred ? "Mostrar números" : "Ocultar números"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2 justify-center">
        {suggestion.map((num, i) => (
          <RouletteNumber
            key={i}
            number={num}
            className={`border border-[#00ff00] ${getSuggestionColor(num)} ${isBlurred ? 'blur-sm' : 'animate-pulse shadow-lg shadow-[#00ff00]/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionDisplay;
