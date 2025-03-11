
import React from 'react';
import {
  BarChart,
  Bar,
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
        <p className="text-[#00ff00] font-medium">{`Abertura: ${payload[0]?.payload.open?.toFixed(2) || '0.00'}`}</p>
        <p className="text-[#00ff00] font-medium">{`Fechamento: ${payload[0]?.payload.close?.toFixed(2) || '0.00'}`}</p>
        <p className="text-[#00ff00] font-medium">{`Máxima: ${payload[0]?.payload.high?.toFixed(2) || '0.00'}`}</p>
        <p className="text-[#00ff00] font-medium">{`Mínima: ${payload[0]?.payload.low?.toFixed(2) || '0.00'}`}</p>
      </div>
    );
  }
  return null;
};

interface CandleData {
  name: string;
  open: number;
  close: number;
  high: number;
  low: number;
  // Add isUp property to determine color
  isUp: boolean;
}

interface RouletteTrendChartProps {
  trend: { value: number }[];
}

const RouletteTrendChart = ({ trend }: RouletteTrendChartProps) => {
  // Transform the simple trend data into candle chart data
  const transformToCandleData = (data: { value: number }[]): CandleData[] => {
    // If we have too many items, sample them to reduce density
    let processedData = data;
    if (data.length > 10) {
      // Sample data to have maximum 10 candles
      const step = Math.ceil(data.length / 10);
      processedData = data.filter((_, index) => index % step === 0);
    }
    
    return processedData.map((item, index) => {
      // For the first item, use the same value for open and close
      if (index === 0) {
        return {
          name: `${index}`,
          open: item.value,
          close: item.value,
          high: item.value + (Math.random() * 0.5),
          low: item.value - (Math.random() * 0.5),
          isUp: true // No movement for first item, default to up
        };
      }
      
      const previousClose = processedData[index - 1].value;
      const currentClose = item.value;
      const isUp = currentClose >= previousClose;
      
      // For remaining items, use the previous close as the open
      return {
        name: `${index}`,
        open: previousClose,
        close: currentClose,
        high: Math.max(previousClose, currentClose) + (Math.random() * 0.3),
        low: Math.min(previousClose, currentClose) - (Math.random() * 0.3),
        isUp
      };
    });
  };
  
  const candleData = transformToCandleData(trend);
  
  // Calculate average value for reference line
  const averageValue = trend.reduce((sum, item) => sum + item.value, 0) / trend.length;
  
  // Determine if trend is generally up or down
  const firstValue = trend[0]?.value || 0;
  const lastValue = trend[trend.length - 1]?.value || 0;
  const trendDirection = lastValue >= firstValue ? 'uptrend' : 'downtrend';
  
  // Define colors for up and down candles
  const upColor = "#00ff00";
  const downColor = "#ff0000";
  
  return (
    <div className="h-36 w-full mt-2 bg-[#17161e]/40 rounded-md p-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium">Performance</span>
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${trendDirection === 'uptrend' ? 'text-[#00ff00] bg-[#00ff00]/10' : 'text-red-500 bg-red-500/10'}`}>
          {trendDirection === 'uptrend' ? 'ALTA' : 'BAIXA'}
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={candleData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          barGap={1}
          barCategoryGap={8}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} vertical={false} />
          <XAxis dataKey="name" hide={true} />
          <YAxis domain={['auto', 'auto']} hide={true} />
          <Tooltip content={<CustomTooltip />} />
          
          <ReferenceLine y={averageValue} stroke="#ffffff" strokeDasharray="3 3" opacity={0.3} />
          
          {/* Up Bars */}
          <Bar
            dataKey="low"
            fill="transparent"
            stroke={upColor}
            yAxisId={0}
            barSize={3}
            isAnimationActive={false}
            name="Low (Up)"
            // Only render for up candles
            data={candleData.filter(d => d.isUp)}
          />
          
          <Bar
            dataKey="high"
            fill="transparent"
            stroke={upColor}
            yAxisId={0}
            barSize={3}
            isAnimationActive={false}
            name="High (Up)"
            data={candleData.filter(d => d.isUp)}
          />
          
          <Bar
            dataKey="close"
            fill={upColor}
            stroke={upColor}
            yAxisId={0}
            barSize={8}
            radius={[2, 2, 2, 2]}
            isAnimationActive={false}
            name="Body (Up)"
            data={candleData.filter(d => d.isUp)}
          />
          
          {/* Down Bars */}
          <Bar
            dataKey="low"
            fill="transparent"
            stroke={downColor}
            yAxisId={0}
            barSize={3}
            isAnimationActive={false}
            name="Low (Down)"
            data={candleData.filter(d => !d.isUp)}
          />
          
          <Bar
            dataKey="high"
            fill="transparent"
            stroke={downColor}
            yAxisId={0}
            barSize={3}
            isAnimationActive={false}
            name="High (Down)"
            data={candleData.filter(d => !d.isUp)}
          />
          
          <Bar
            dataKey="close"
            fill={downColor}
            stroke={downColor}
            yAxisId={0}
            barSize={8}
            radius={[2, 2, 2, 2]}
            isAnimationActive={false}
            name="Body (Down)"
            data={candleData.filter(d => !d.isUp)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RouletteTrendChart;
