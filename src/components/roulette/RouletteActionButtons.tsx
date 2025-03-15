
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
        className="w-full sm:flex-1 bg-gradient-to-r from-[#00baff] to-[#0096cc] hover:opacity-90 text-black font-medium text-xs sm:text-sm shadow-lg shadow-blue-500/20 border-none transition-all duration-300 group relative overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"></span>
        <Dices size={16} className="mr-1 sm:mr-2 animate-bounce" />
        Ver Estatísticas
      </Button>
      
      <Button 
        className="w-full sm:flex-1 text-black font-medium animate-pulse-neon bg-gradient-to-r from-[#00ff00] to-[#00cc00] hover:opacity-90 text-xs sm:text-sm truncate shadow-lg shadow-[#00ff00]/20 border-none transition-all duration-300 group relative overflow-hidden"
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
