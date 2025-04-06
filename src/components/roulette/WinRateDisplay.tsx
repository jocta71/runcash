
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
      <div className="space-y-1 mb-1.5">
        <div className="flex items-center gap-1">
          <span className="text-xs">Taxa de Vitória</span>
          <span className="text-[#00ff00] font-medium text-xs">{winRate.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 bg-[#00ff00]/20 px-1.5 py-0.5 rounded-md">
            <Trophy size={12} className="text-[#00ff00]" />
            <span className="text-[#00ff00] font-medium text-xs">{wins}</span>
          </div>
          <div className="flex items-center gap-1 bg-red-500/20 px-1.5 py-0.5 rounded-md">
            <XCircle size={12} className="text-red-500" />
            <span className="text-red-500 font-medium text-xs">{losses}</span>
          </div>
        </div>
      </div>
      <Progress
        value={winRate}
        className="h-1.5 bg-gray-800"
        indicatorClassName="bg-gradient-to-r from-[#00ff00] to-[#00ff00]"
      />
    </div>
  );
};

export default WinRateDisplay;
