
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { FilterIcon, TrendingUp } from 'lucide-react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#17161e] border border-[#33333359] p-2 rounded-md text-xs">
        <p className="text-[#00ff00] font-medium">{`Valor: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

export type TrendData = { value: number, timestamp?: string }[];

export type TrendType = 
  | 'performance'   // Overall performance
  | 'red-black'     // Red vs black wins
  | 'odd-even'      // Odd vs even wins
  | 'hot-cold'      // Hot vs cold numbers
  | 'win-loss';     // Win/loss ratio

interface TrendFilter {
  name: string;
  type: TrendType;
  color: string;
}

const trendFilters: TrendFilter[] = [
  { name: 'Performance', type: 'performance', color: '#00ff00' },
  { name: 'Vermelho vs Preto', type: 'red-black', color: '#ef4444' },
  { name: 'Ímpar vs Par', type: 'odd-even', color: '#3b82f6' },
  { name: 'Quentes vs Frios', type: 'hot-cold', color: '#f97316' },
  { name: 'Vitórias vs Derrotas', type: 'win-loss', color: '#8b5cf6' },
];

interface RouletteTrendChartProps {
  trend: TrendData;
  redBlackTrend?: TrendData;
  oddEvenTrend?: TrendData;
  hotColdTrend?: TrendData;
  winLossTrend?: TrendData;
}

const RouletteTrendChart = ({ 
  trend,
  redBlackTrend,
  oddEvenTrend,
  hotColdTrend, 
  winLossTrend
}: RouletteTrendChartProps) => {
  const [activeTrend, setActiveTrend] = useState<TrendFilter>(trendFilters[0]);
  
  // Get the current trend data based on the active filter
  const getCurrentTrendData = () => {
    switch(activeTrend.type) {
      case 'red-black':
        return redBlackTrend || trend;
      case 'odd-even':
        return oddEvenTrend || trend;
      case 'hot-cold':
        return hotColdTrend || trend;
      case 'win-loss':
        return winLossTrend || trend;
      case 'performance':
      default:
        return trend;
    }
  };

  // Calculate average value for reference line
  const currentData = getCurrentTrendData();
  const averageValue = currentData.reduce((sum, item) => sum + item.value, 0) / currentData.length;
  
  // Determine if trend is generally up or down
  const firstValue = currentData[0]?.value || 0;
  const lastValue = currentData[currentData.length - 1]?.value || 0;
  const trendDirection = lastValue >= firstValue ? 'uptrend' : 'downtrend';

  return (
    <div className="h-44 w-full mt-2 bg-[#17161e]/40 rounded-md p-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium">{activeTrend.name}</span>
          <span 
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              trendDirection === 'uptrend' ? 'text-[#00ff00] bg-[#00ff00]/10' : 'text-red-500 bg-red-500/10'
            }`}
          >
            {trendDirection === 'uptrend' ? 'ALTA' : 'BAIXA'}
          </span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center text-xs text-gray-400 hover:text-[#00ff00] transition-colors">
            <FilterIcon size={14} className="mr-1" />
            Filtrar
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#17161e] border-[#333] text-white">
            {trendFilters.map((filter) => (
              <DropdownMenuItem 
                key={filter.type}
                onClick={() => setActiveTrend(filter)}
                className={`text-xs ${activeTrend.type === filter.type ? 'bg-[#00ff00]/10 text-[#00ff00]' : ''}`}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: filter.color }}></div>
                  <span>{filter.name}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={getCurrentTrendData()} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={activeTrend.color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={activeTrend.color} stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={activeTrend.color} stopOpacity={0.2}/>
              <stop offset="100%" stopColor={activeTrend.color} stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
          <XAxis dataKey="name" hide={true} />
          <YAxis domain={['auto', 'auto']} hide={true} />
          <Tooltip content={<CustomTooltip />} />
          
          <ReferenceLine y={averageValue} stroke="#ffffff" strokeDasharray="3 3" opacity={0.3} />
          
          {/* Add trend line (linear regression) */}
          {currentData.length > 1 && (
            <Line
              type="linear"
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={1}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              connectNulls={true}
              legendType="none"
              strokeDasharray="5 5"
            />
          )}
          
          <Line
            type="monotone"
            dataKey="value"
            stroke={trendDirection === 'uptrend' ? "url(#colorGradient)" : "#ff0000"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: activeTrend.color, strokeWidth: 1 }}
            fill="url(#areaGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RouletteTrendChart;
