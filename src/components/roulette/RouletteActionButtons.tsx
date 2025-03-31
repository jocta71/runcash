
import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RouletteActionButtonsProps {
  onPlayClick: (e: React.MouseEvent) => void;
}

const RouletteActionButtons = ({ onPlayClick }: RouletteActionButtonsProps) => {
  return (
    <div className="flex justify-center">
      <Button 
        className="w-full sm:max-w-[200px] text-black font-medium bg-gradient-to-b from-[#00ff00] to-[#8bff00] hover:from-[#00ff00]/90 hover:to-[#8bff00]/90 text-xs sm:text-sm truncate"
        onClick={onPlayClick}
        size="sm"
      >
        <Play size={16} className="mr-1 shrink-0" />
        <span className="truncate">Jogar Agora</span>
      </Button>
    </div>
  );
};

export default RouletteActionButtons;
