
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
    <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-3 rounded-xl border border-amber-500/20 shadow-lg">
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm text-amber-300 font-medium uppercase tracking-wide">Taxa de Vitória</span>
          <span className="text-amber-500 font-semibold text-xs md:text-sm bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30 shadow-sm">
            {winRate.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2 animate-slide-up">
          <div className="flex items-center gap-1 bg-emerald-500/20 px-2 md:px-2.5 py-0.5 md:py-1 rounded-md transition-all duration-300 hover:bg-emerald-500/30 hover:scale-105 border border-emerald-500/30 shadow-sm">
            <Trophy size={14} className="text-emerald-500 animate-pulse" />
            <span className="text-emerald-500 font-medium text-xs md:text-sm">{wins}</span>
          </div>
          <div className="flex items-center gap-1 bg-red-500/20 px-2 md:px-2.5 py-0.5 md:py-1 rounded-md transition-all duration-300 hover:bg-red-500/30 hover:scale-105 border border-red-500/30 shadow-sm">
            <XCircle size={14} className="text-red-500 animate-pulse" />
            <span className="text-red-500 font-medium text-xs md:text-sm">{losses}</span>
          </div>
        </div>
      </div>
      <Progress
        value={winRate}
        className="h-1.5 md:h-2 bg-slate-800 rounded-full overflow-hidden border border-amber-500/10 shadow-inner"
        indicatorClassName="bg-gradient-to-r from-amber-500 to-amber-400 shadow-[0_0_5px_#FAB005]"
      />
    </div>
  );
};

export default WinRateDisplay;
