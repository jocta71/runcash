
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
      <div className="space-y-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">Taxa de Vitória</span>
          <span className="text-[#00ff00] font-medium">{winRate.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-3 mt-2 animate-slide-up">
          <div className="flex items-center gap-1 bg-[#00ff00]/20 px-2 py-1 rounded-md transition-all duration-300 hover:bg-[#00ff00]/30 hover-scale">
            <Trophy size={16} className="text-[#00ff00] animate-pulse" />
            <span className="text-[#00ff00] font-medium">{wins}</span>
          </div>
          <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-md transition-all duration-300 hover:bg-red-500/30 hover-scale">
            <XCircle size={16} className="text-red-500 animate-pulse" />
            <span className="text-red-500 font-medium">{losses}</span>
          </div>
        </div>
      </div>
      <Progress
        value={winRate}
        className="h-2 bg-gray-800"
        indicatorClassName="bg-gradient-to-r from-[#00ff00] to-[#00ff00]"
      />
    </div>
  );
};

export default WinRateDisplay;
