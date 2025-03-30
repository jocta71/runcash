
import React from 'react';
import { Trophy, XCircle } from 'lucide-react';

interface WinRateStatsProps {
  wins: number;
  losses: number;
  size?: 'xs' | 'sm' | 'md';
}

const WinRateStats = ({ wins, losses, size = 'sm' }: WinRateStatsProps) => {
  const winRate = Math.round((wins / (wins + losses)) * 100);
  
  const sizeClasses = {
    xs: {
      container: "gap-1",
      pill: "px-1 py-0.5",
      icon: 10,
      text: "text-[8px]",
    },
    sm: {
      container: "gap-1.5",
      pill: "px-1.5 py-0.5",
      icon: 12,
      text: "text-[10px]",
    },
    md: {
      container: "gap-2",
      pill: "px-2 py-1",
      icon: 14,
      text: "text-xs",
    },
  };
  
  return (
    <div className={`flex items-center ${sizeClasses[size].container}`}>
      <div className={`flex items-center gap-0.5 bg-[#00ff00]/20 ${sizeClasses[size].pill} rounded-md`}>
        <Trophy size={sizeClasses[size].icon} className="text-[#00ff00]" />
        <span className={`text-[#00ff00] font-medium ${sizeClasses[size].text}`}>{wins}</span>
      </div>
      <div className={`flex items-center gap-0.5 bg-red-500/20 ${sizeClasses[size].pill} rounded-md`}>
        <XCircle size={sizeClasses[size].icon} className="text-red-500" />
        <span className={`text-red-500 font-medium ${sizeClasses[size].text}`}>{losses}</span>
      </div>
    </div>
  );
};

export default WinRateStats;
