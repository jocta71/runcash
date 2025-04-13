
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  BarChart2,
  PieChart,
  TrendingUp, 
  Flame, 
  Percent,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer,
  LineChart, 
  Line,
  BarChart,
  Bar,
  PieChart as ReChartPie,
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

// Helper function to generate frequency data
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

// Calculate hot and cold numbers
const getHotColdNumbers = (numbers: number[]) => {
  const frequencyData = generateFrequencyData(numbers);
  const sorted = [...frequencyData].sort((a, b) => b.frequency - a.frequency);
  
  return {
    hot: sorted.slice(0, 5),  // 5 most frequent
    cold: sorted.slice(-5).reverse()  // 5 least frequent
  };
};

// Generate color distribution data
const generateColorDistribution = (numbers: number[]) => {
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const distribution = [
    { name: 'Vermelhos', value: 0, color: '#ef4444' },
    { name: 'Pretos', value: 0, color: '#111827' },
    { name: 'Zero', value: 0, color: '#059669' },
  ];
  
  numbers.forEach(num => {
    if (num === 0) {
      distribution[2].value += 1;
    } else if (redNumbers.includes(num)) {
      distribution[0].value += 1;
    } else {
      distribution[1].value += 1;
    }
  });
  
  return distribution;
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
  const frequencyData = generateFrequencyData(lastNumbers);
  const { hot, cold } = getHotColdNumbers(lastNumbers);
  const colorDistribution = generateColorDistribution(lastNumbers);
  
  const winRate = wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[80vw] md:max-w-[85vw] h-[90vh] overflow-y-auto bg-zinc-950 border-[#00ff00]/20">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg text-[#00ff00]">
            <BarChart2 className="mr-2" size={20} /> Estatísticas da {name}
          </DialogTitle>
          <DialogDescription>
            Análise detalhada dos números e tendências
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
          {/* Left side - History takes up full height */}
          <div className="md:col-span-3 flex flex-col h-full">
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5 h-full overflow-y-auto">
              <h3 className="text-base font-semibold mb-3 flex items-center text-[#00ff00]">
                <TrendingUp size={16} className="mr-2" /> Histórico de Números
              </h3>
              <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-15 lg:grid-cols-20 gap-2">
                {lastNumbers.map((num, i) => (
                  <div key={i} className="flex justify-center mb-2">
                    <RouletteNumber number={num} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Stacked charts */}
          <div className="md:col-span-1 flex flex-col gap-4 h-full">
            {/* Win Rate Chart */}
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <h3 className="text-base font-semibold mb-3 flex items-center text-[#00ff00]">
                <Percent size={16} className="mr-2" /> Taxa de Vitória
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
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
                      <Cell key="wins" fill="#00ff00" />
                      <Cell key="losses" fill="#ef4444" />
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </ReChartPie>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Color Distribution */}
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <h3 className="text-base font-semibold mb-3 flex items-center text-[#00ff00]">
                <PieChart size={16} className="mr-2" /> Distribuição por Cor
              </h3>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartPie>
                    <Pie
                      data={colorDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {colorDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </ReChartPie>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Hot & Cold Numbers */}
            <div className="bg-zinc-900/50 p-4 rounded-lg border border-white/5">
              <h3 className="text-base font-semibold mb-3 flex items-center text-[#00ff00]">
                <Flame size={16} className="mr-2" /> Números Mais Frequentes
              </h3>
              <div className="flex flex-wrap gap-2">
                {hot.slice(0, 8).map((item, i) => (
                  <div key={i} className="flex items-center space-x-1">
                    <RouletteNumber number={item.number} size="sm" />
                    <span className="text-vegas-gold text-xs">({item.frequency}x)</span>
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

