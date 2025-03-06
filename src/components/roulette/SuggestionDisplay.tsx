
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
          <WandSparkles size={18} className="text-purple-400" />
          <span className="text-sm text-purple-400 font-medium">Sugestão de Jogada</span>
          <span className="text-xs text-purple-400/70">({numberGroups[selectedGroup as keyof typeof numberGroups].name})</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={toggleVisibility} 
                className="text-purple-400 hover:text-purple-400/80 transition-colors"
              >
                {isBlurred ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isBlurred ? "Mostrar números" : "Ocultar números"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex gap-2">
        {suggestion.map((num, i) => (
          <RouletteNumber
            key={i}
            number={num}
            className={`border border-purple-400 ${getSuggestionColor(num)} ${isBlurred ? 'blur-sm' : 'animate-pulse'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestionDisplay;
