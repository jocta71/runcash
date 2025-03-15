
import React from 'react';
import { Trophy, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface WinRateDisplayProps {
  wins: number;
  losses: number;
}

const WinRateDisplay = ({ wins, losses }: WinRateDisplayProps) => {
  const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;

  return (
    <div>
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm text-white/80 font-medium">Taxa de Vitória</span>
          <span className="text-[#00ff00] font-semibold text-xs md:text-sm bg-[#00ff00]/10 px-2 py-0.5 rounded-md">
            {winRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2 animate-slide-up">
          <div className="flex items-center gap-1 bg-[#00ff00]/20 px-2 md:px-2.5 py-0.5 md:py-1 rounded-md transition-all duration-300 hover:bg-[#00ff00]/30 hover-scale">
            <Trophy size={14} className="text-[#00ff00] animate-pulse" />
            <span className="text-[#00ff00] font-medium text-xs md:text-sm">{wins}</span>
          </div>
          <div className="flex items-center gap-1 bg-red-500/20 px-2 md:px-2.5 py-0.5 md:py-1 rounded-md transition-all duration-300 hover:bg-red-500/30 hover-scale">
            <XCircle size={14} className="text-red-500 animate-pulse" />
            <span className="text-red-500 font-medium text-xs md:text-sm">{losses}</span>
          </div>
        </div>
      </div>
      <Progress
        value={winRate}
        className="h-1.5 md:h-2 bg-gray-800/50 rounded-full overflow-hidden"
        indicatorClassName="bg-gradient-to-r from-[#00ff00] to-[#00cc00]"
      />
    </div>
  );
};

export default WinRateDisplay;
