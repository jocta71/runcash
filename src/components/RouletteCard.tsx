
import { Play, TrendingUp, WandSparkles, Dices, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

const RouletteCard = ({ name, lastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const winRate = (wins / (wins + losses)) * 100;
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestion, setSuggestion] = useState<number[]>([]);
  const [isBlurred, setIsBlurred] = useState(false);

  // Generate suggestion on initial render
  useEffect(() => {
    generateSuggestion();
  }, []);

  const generateSuggestion = () => {
    // Different strategy types
    const strategies = [
      { name: 'Pares de Cor', numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36] },
      { name: 'Terminal 1,2,3', numbers: [1, 2, 3, 11, 12, 13, 21, 22, 23, 31, 32, 33] },
      { name: 'Terminal 4,7,8', numbers: [4, 7, 8, 14, 17, 18, 24, 27, 28, 34] },
      { name: 'Terminal 5,9,6', numbers: [5, 6, 9, 15, 16, 19, 25, 26, 29, 35, 36] },
      { name: 'Terminal 3,6,9', numbers: [3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36] },
    ];

    // Randomly select a strategy
    const selectedStrategy = strategies[Math.floor(Math.random() * strategies.length)];
    
    // Randomly select 3 numbers from the selected strategy
    const shuffled = [...selectedStrategy.numbers].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // Update state
    setSuggestion(selected);
    
    // Show toast notification
    toast({
      title: "Sugestão Gerada",
      description: `Estratégia: ${selectedStrategy.name}`,
      variant: "default"
    });
  };

  const toggleVisibility = () => {
    setIsBlurred(!isBlurred);
  };
  
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
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WandSparkles size={18} className="text-vegas-gold" />
            <span className="text-sm text-vegas-gold font-medium">Sugestão de Jogada</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={toggleVisibility} className="text-vegas-gold hover:text-vegas-gold/80 transition-colors">
                  {isBlurred ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBlurred ? "Mostrar números" : "Ocultar números"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2">
          {suggestion.map((num, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full bg-vegas-gold/20 border border-vegas-gold flex items-center justify-center text-sm font-medium text-vegas-gold ${isBlurred ? 'blur-sm' : 'animate-pulse'}`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between text-sm mb-2">
          <div className="flex items-center gap-2">
            <span>Taxa de Vitória</span>
            <span className="text-vegas-gold font-medium">{winRate.toFixed(1)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">{wins} Vit.</span>
            <span>/</span>
            <span className="text-red-500">{losses} Der.</span>
          </div>
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
      
      <div className="flex gap-2">
        <Button 
          onClick={generateSuggestion}
          className="flex-1 bg-vegas-blue hover:bg-vegas-blue/80 text-black font-medium"
        >
          <Dices size={16} className="mr-2" />
          Sugerir Jogada
        </Button>
        
        <Button className="flex-1 bg-vegas-green hover:bg-vegas-green/80 text-black font-medium animate-pulse-neon">
          <Play size={16} className="mr-2" />
          Jogar Agora
        </Button>
      </div>
    </div>
  );
};

export default RouletteCard;
