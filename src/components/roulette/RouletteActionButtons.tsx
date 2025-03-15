
import React from 'react';
import { Dices, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouletteActionButtonsProps {
  onDetailsClick: (e: React.MouseEvent) => void;
  onPlayClick: (e: React.MouseEvent) => void;
}

const RouletteActionButtons = ({ onDetailsClick, onPlayClick }: RouletteActionButtonsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button 
        onClick={onDetailsClick}
        className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:opacity-90 text-white font-medium text-xs sm:text-sm shadow-lg shadow-blue-500/20 border-none transition-all duration-300 group relative overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></span>
        <Dices size={16} className="mr-1 sm:mr-2 animate-bounce" />
        Ver Estatísticas
      </Button>
      
      <Button 
        className="w-full sm:flex-1 text-slate-900 font-medium animate-pulse-gold bg-gradient-to-r from-amber-500 to-amber-400 hover:opacity-90 text-xs sm:text-sm truncate shadow-lg shadow-amber-500/20 border-none transition-all duration-300 group relative overflow-hidden"
        onClick={onPlayClick}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] pointer-events-none"></span>
        <Play size={16} className="mr-1 sm:mr-2 shrink-0" />
        <span className="truncate">Jogar Agora</span>
      </Button>
    </div>
  );
};

export default RouletteActionButtons;
