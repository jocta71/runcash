
import { Play, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

const RouletteCard = ({ name, lastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const winRate = (wins / (wins + losses)) * 100;
  
  return (
    <div className="glass-card p-4 space-y-4 animate-fade-in hover-scale">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <TrendingUp size={20} className="text-vegas-green" />
      </div>
      
      <div className="flex gap-2">
        {lastNumbers.map((num, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-vegas-darkgray flex items-center justify-center text-sm font-medium"
          >
            {num}
          </div>
        ))}
      </div>
      
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>Taxa de Vitória</span>
          <span>{winRate.toFixed(1)}%</span>
        </div>
        <Progress
          value={winRate}
          className="h-2"
        />
      </div>
      
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
      
      <Button className="w-full bg-vegas-green hover:bg-vegas-green/80 text-black font-medium animate-pulse-neon">
        <Play size={16} className="mr-2" />
        Jogar Agora
      </Button>
    </div>
  );
};

export default RouletteCard;
