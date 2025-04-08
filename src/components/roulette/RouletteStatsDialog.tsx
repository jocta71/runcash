
import React, { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  BarChart2,
  PieChart as PieIcon,
  TrendingUp, 
  Flame, 
  Percent,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  ResponsiveContainer,
  LineChart, 
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import RouletteNumber from './RouletteNumber';

interface RouletteStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

// Helper function to get color for roulette number
const getRouletteNumberColor = (num: number): string => {
  if (num === 0) return 'bg-vegas-green text-white';
  
  // Red numbers in roulette
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  return redNumbers.includes(num) ? 'bg-red-600 text-white' : 'bg-black text-white';
};

// Generate frequency data
const generateFrequencyData = (numbers: number[]) => {
  const frequency: Record<number, number> = {};
  
  // Initialize all roulette numbers (0-36)
  for (let i = 0; i <= 36; i++) {
    frequency[i] = 0;
  }
  
  // Count occurrences
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
  
  // Convert to array for charts
  return Object.entries(frequency)
    .map(([number, count]) => ({
      number: Number(number),
      frequency: count,
    }))
    .filter(item => item.frequency > 0); // Only return numbers that appeared
};

const RouletteStatsDialog = ({ 
  open, 
  onOpenChange, 
  name, 
  lastNumbers, 
  wins, 
  losses, 
  trend 
}: RouletteStatsDialogProps) => {
  // Generate data for charts
  const frequencyData = useMemo(() => generateFrequencyData(lastNumbers), [lastNumbers]);
  
  // Calculate hot and cold numbers
  const { hot, cold } = useMemo(() => {
    const sorted = [...frequencyData].sort((a, b) => b.frequency - a.frequency);
    return {
      hot: sorted.slice(0, 5),  // 5 most frequent
      cold: sorted.slice(-5).reverse()  // 5 least frequent
    };
  }, [frequencyData]);
  
  // Generate color distribution data
  const colorDistribution = useMemo(() => {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    let reds = 0;
    let blacks = 0;
    let zeros = 0;
    
    lastNumbers.forEach(num => {
      if (num === 0) zeros++;
      else if (redNumbers.includes(num)) reds++;
      else blacks++;
    });
    
    const total = lastNumbers.length;
    
    return [
      { name: 'Vermelhos', value: reds, porcentagem: (reds / total * 100).toFixed(1), color: '#ef4444' },
      { name: 'Pretos', value: blacks, porcentagem: (blacks / total * 100).toFixed(1), color: '#111827' },
      { name: 'Zero', value: zeros, porcentagem: (zeros / total * 100).toFixed(1), color: '#4ADE80' },
    ];
  }, [lastNumbers]);
  
  const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
  
  // Convert trend data to the right format for charts
  const trendChartData = useMemo(() => {
    return trend.map((item, index) => ({
      name: index,
      value: item.value
    }));
  }, [trend]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[80vw] md:max-w-[85vw] h-[90vh] overflow-y-auto bg-[#121212] border-vegas-green/20">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg text-vegas-green">
            <BarChart2 className="mr-2" size={20} /> Estatísticas da {name}
          </DialogTitle>
          <DialogDescription>
            Análise detalhada dos números e tendências
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
          {/* Left side - History takes up full height */}
          <div className="md:col-span-3 flex flex-col h-full">
            <div className="bg-[#1A1E1D] p-4 rounded-lg border border-white/5 h-full overflow-y-auto">
              <h3 className="text-base font-semibold mb-3 flex items-center text-vegas-green">
                <TrendingUp size={16} className="mr-2" /> Histórico de Números
              </h3>
              <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-1.5">
                {lastNumbers.map((num, i) => (
                  <div key={i} className="flex justify-center mb-1.5">
                    <RouletteNumber number={num} size="sm" />
                  </div>
                ))}
              </div>
              
              {/* Frequency Chart */}
              <h3 className="text-base font-semibold mt-6 mb-3 flex items-center text-vegas-green">
                <BarChart2 size={16} className="mr-2" /> Frequência de Números
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={frequencyData.slice(0, 37)} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="number" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#232323', borderColor: '#4ADE80' }} 
                      labelStyle={{ color: '#4ADE80' }}
                    />
                    <Bar dataKey="frequency" fill="#4ADE80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Trend Chart */}
              <h3 className="text-base font-semibold mt-6 mb-3 flex items-center text-vegas-green">
                <TrendingUp size={16} className="mr-2" /> Tendência
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#232323', borderColor: '#4ADE80' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4ADE80" 
                      strokeWidth={2} 
                      dot={{ fill: '#4ADE80', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right side - Stacked charts */}
          <div className="md:col-span-1 flex flex-col gap-4 h-full">
            {/* Win Rate Chart */}
            <div className="bg-[#1A1E1D] p-4 rounded-lg border border-white/5">
              <h3 className="text-base font-semibold mb-3 flex items-center text-vegas-green">
                <Percent size={16} className="mr-2" /> Taxa de Vitória
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Vitórias", value: wins },
                        { name: "Derrotas", value: losses }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell key="wins" fill="#4ADE80" />
                      <Cell key="losses" fill="#ef4444" />
                    </Pie>
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: '#232323', borderColor: '#4ADE80' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Color Distribution */}
            <div className="bg-[#1A1E1D] p-4 rounded-lg border border-white/5">
              <h3 className="text-base font-semibold mb-3 flex items-center text-vegas-green">
                <PieIcon size={16} className="mr-2" /> Distribuição por Cor
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={colorDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, porcentagem }) => `${name}: ${porcentagem}%`}
                    >
                      {colorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip contentStyle={{ backgroundColor: '#232323', borderColor: '#4ADE80' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Hot & Cold Numbers */}
            <div className="bg-[#1A1E1D] p-4 rounded-lg border border-white/5">
              <h3 className="text-base font-semibold mb-3 flex items-center text-vegas-green">
                <Flame size={16} className="mr-2" /> Números Mais Frequentes
              </h3>
              <div className="flex flex-wrap gap-2">
                {hot.slice(0, 8).map((item, i) => (
                  <div key={i} className="flex items-center space-x-1">
                    <RouletteNumber number={item.number} size="sm" />
                    <span className="text-vegas-green text-xs">({item.frequency}x)</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-base font-semibold mt-4 mb-3 flex items-center text-blue-400">
                <ArrowDown size={16} className="mr-2" /> Números Menos Frequentes
              </h3>
              <div className="flex flex-wrap gap-2">
                {cold.slice(0, 6).map((item, i) => (
                  <div key={i} className="flex items-center space-x-1">
                    <RouletteNumber number={item.number} size="sm" />
                    <span className="text-blue-400 text-xs">({item.frequency}x)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouletteStatsDialog;
