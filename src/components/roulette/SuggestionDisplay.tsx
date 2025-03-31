
import React from 'react';
import { Target } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Strategy } from '@/components/strategies/types';

interface SuggestionDisplayProps {
  strategies: Strategy[];
  selectedStrategyId: string | null;
  onSelectStrategy: (strategyId: string) => void;
}

const SuggestionDisplay = ({ 
  strategies,
  selectedStrategyId,
  onSelectStrategy
}: SuggestionDisplayProps) => {
  
  if (strategies.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Target size={18} className="text-[#00ff00]" />
          <span className="text-sm text-[#00ff00] font-medium">Sem estratégias disponíveis</span>
        </div>
        <div className="text-xs text-gray-400">
          Crie estratégias na página de estratégias para usar aqui
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Target size={18} className="text-[#00ff00]" />
        <span className="text-sm text-[#00ff00] font-medium">Selecionar Estratégia</span>
      </div>
      <Select 
        value={selectedStrategyId || ""} 
        onValueChange={onSelectStrategy}
      >
        <SelectTrigger className="bg-[#2A2933] border-[#33333359] text-white">
          <SelectValue placeholder="Escolha uma estratégia" />
        </SelectTrigger>
        <SelectContent className="bg-[#2A2933] border-[#33333359] text-white">
          {strategies.map((strategy) => (
            <SelectItem key={strategy.id} value={strategy.id}>
              {strategy.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SuggestionDisplay;
