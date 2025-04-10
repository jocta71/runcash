
import React from 'react';
import { BarChart2, PieChart, Percent } from 'lucide-react';
import RouletteNumber from './RouletteNumber';
import { Button } from '@/components/ui/button';
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
    <div className="backdrop-filter backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4 animate-fade-in h-auto bg-[#1A1E1D]">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-vegas-green flex items-center gap-2">
          <BarChart2 size={18} />
          Estatísticas
        </h3>
      </div>
      
      <div className="space-y-5">
        <div className="text-center">
          <h4 className="text-vegas-lime text-sm">{name}</h4>
          <p className="text-xs text-gray-400 mt-1">Clique para detalhes completos</p>
          
          <Button 
            onClick={onOpenFullStats}
            variant="outline" 
            size="sm" 
            className="mt-2 border-vegas-green/30 bg-vegas-green/10 text-vegas-green hover:bg-vegas-green/20"
          >
            Ver estatísticas completas
          </Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm text-white/80">Últimos números</h4>
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
          <h4 className="text-sm text-white/80 flex items-center gap-1">
            <PieChart size={14} /> Distribuição por Cor
          </h4>
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
                <Tooltip contentStyle={{ backgroundColor: '#232323', borderColor: '#4ADE80', borderRadius: '8px' }} />
                <Legend />
              </ReChartsPie>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm text-white/80 flex items-center gap-1">
            <Percent size={14} /> Tendência
          </h4>
          <div className="h-[80px]">
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
          <div>
            <h4 className="text-sm text-white/80 mb-1 flex items-center gap-1">
              <Percent size={14} /> Taxa de vitória
            </h4>
            <div className="text-vegas-green font-bold text-lg">
              {winRate.toFixed(1)}%
            </div>
          </div>
          <div>
            <h4 className="text-sm text-white/80 mb-1">Total jogos</h4>
            <div className="text-white font-bold text-lg">
              {wins + losses}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteStatsPanel;
