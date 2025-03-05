
import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

interface RouletteTrendChartProps {
  trend: { value: number }[];
}

const RouletteTrendChart = ({ trend }: RouletteTrendChartProps) => {
  return (
    <div className="h-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trend}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3BFFA1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RouletteTrendChart;
