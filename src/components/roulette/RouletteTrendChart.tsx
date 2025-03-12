
import React from 'react';
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

interface RouletteTrendChartProps {
  trend: { value: number }[];
}

const RouletteTrendChart = ({ trend }: RouletteTrendChartProps) => {
  // Calculate average value for reference line
  const averageValue = trend.reduce((sum, item) => sum + item.value, 0) / trend.length;
  
  // Determine if trend is generally up or down
  const firstValue = trend[0]?.value || 0;
  const lastValue = trend[trend.length - 1]?.value || 0;
  const trendDirection = lastValue >= firstValue ? 'uptrend' : 'downtrend';
  
  return (
    <div className="h-36 w-full mt-2 bg-[#17161e]/40 rounded-md p-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">Performance</span>
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${trendDirection === 'uptrend' ? 'text-[#00ff00] bg-[#00ff00]/10' : 'text-red-500 bg-red-500/10'}`}>
          {trendDirection === 'uptrend' ? 'ALTA' : 'BAIXA'}
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={trend} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8bff00" stopOpacity={0.3}/>
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00ff00" stopOpacity={0.2}/>
              <stop offset="100%" stopColor="#00ff00" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
          <XAxis dataKey="name" hide={true} />
          <YAxis domain={['auto', 'auto']} hide={true} />
          <Tooltip content={<CustomTooltip />} />
          
          <ReferenceLine y={averageValue} stroke="#ffffff" strokeDasharray="3 3" opacity={0.3} />
          
          <Line
            type="monotone"
            dataKey="value"
            stroke={trendDirection === 'uptrend' ? "url(#colorGradient)" : "#ff0000"}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: "#00ff00", strokeWidth: 1 }}
            fill="url(#areaGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RouletteTrendChart;
