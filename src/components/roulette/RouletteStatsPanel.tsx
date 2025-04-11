
import React from 'react';
import { BarChart2, PieChart, Percent, ChevronRight } from 'lucide-react';
import RouletteNumber from './RouletteNumber';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  PieChart as ReChartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line
} from 'recharts';

interface RouletteStatsPanelProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  onOpenFullStats: () => void;
}

const RouletteStatsPanel = ({
  name,
  lastNumbers,
  wins,
  losses,
  onOpenFullStats
}: RouletteStatsPanelProps) => {
  const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
  
  // Generate color distribution data
  const generateColorDistribution = () => {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    let reds = 0;
    let blacks = 0;
    let zeros = 0;
    
    lastNumbers.slice(0, 30).forEach(num => {
      if (num === 0) zeros++;
      else if (redNumbers.includes(num)) reds++;
      else blacks++;
    });
    
    return [
      { name: 'Vermelhos', value: reds, color: '#ef4444' },
      { name: 'Pretos', value: blacks, color: '#111827' },
      { name: 'Zero', value: zeros, color: '#4ADE80' },
    ];
  };
  
  const colorData = generateColorDistribution();
  
  // Generate trend data
  const generateTrendData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        name: i,
        value: Math.floor(Math.random() * 10) + 5
      });
    }
    return data;
  };
  
  const trendData = generateTrendData();
  
  return (
    <Card className="animate-fade-in bg-black border border-vegas-green/20 rounded-xl shadow-lg shadow-vegas-green/5">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-vegas-green flex items-center gap-2">
            <BarChart2 size={18} />
            Estatísticas
          </CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          {name}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Button 
            onClick={onOpenFullStats}
            variant="outline" 
            size="sm" 
            className="w-full border-vegas-green/30 bg-vegas-green/10 text-vegas-green hover:bg-vegas-green/20 flex items-center justify-between"
          >
            <span>Ver estatísticas completas</span>
            <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white/80 mb-1">Últimos números</h4>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {lastNumbers.slice(0, 12).map((num, idx) => (
              <RouletteNumber 
                key={idx} 
                number={num}
                size="sm" 
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1 mb-1">
            <PieChart size={14} className="text-white/80" />
            <h4 className="text-sm font-medium text-white/80">Distribuição por Cor</h4>
          </div>
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <ReChartsPie>
                <Pie
                  data={colorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {colorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000000', 
                    borderColor: '#4ADE80', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(74, 222, 128, 0.15)'
                  }} 
                />
                <Legend />
              </ReChartsPie>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-1 mb-1">
            <Percent size={14} className="text-white/80" />
            <h4 className="text-sm font-medium text-white/80">Tendência</h4>
          </div>
          <div className="h-[80px] p-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4ADE80" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black p-3 rounded-lg border border-vegas-green/20">
            <h4 className="text-sm text-white/80 mb-1 flex items-center gap-1">
              <Percent size={14} /> Taxa de vitória
            </h4>
            <div className="text-vegas-green font-bold text-lg">
              {winRate.toFixed(1)}%
            </div>
          </div>
          <div className="bg-black p-3 rounded-lg border border-vegas-green/20">
            <h4 className="text-sm text-white/80 mb-1">Total jogos</h4>
            <div className="text-white font-bold text-lg">
              {wins + losses}
            </div>
            <div className="flex gap-1 mt-1">
              <Badge variant="default" className="bg-vegas-green text-xs">V: {wins}</Badge>
              <Badge variant="outline" className="text-vegas-red text-xs">D: {losses}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouletteStatsPanel;
