import { Play, TrendingUp, WandSparkles, Dices, Eye, EyeOff, Trophy, XCircle } from 'lucide-react';
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
import RouletteStatsModal from './RouletteStatsModal';

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

const strategies = [
  { name: 'Pares de Cor', numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], color: "bg-purple-600" },
  { name: 'Terminal 1,2,3', numbers: [1, 2, 3, 11, 12, 13, 21, 22, 23, 31, 32, 33], color: "bg-blue-600" },
  { name: 'Terminal 4,7,8', numbers: [4, 7, 8, 14, 17, 18, 24, 27, 28, 34], color: "bg-emerald-600" },
  { name: 'Terminal 5,9,6', numbers: [5, 9, 6, 15, 16, 19, 25, 26, 29, 35], color: "bg-amber-600" },
  { name: 'Terminal 3,6,9', numbers: [3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36], color: "bg-rose-600" },
];

const numberGroups = {
  "grupo-123": { name: "Grupo 123", numbers: [1, 2, 3], color: "bg-blue-600 text-white" },
  "grupo-478": { name: "Grupo 478", numbers: [4, 7, 8], color: "bg-emerald-600 text-white" },
  "grupo-596": { name: "Grupo 596", numbers: [5, 9, 6], color: "bg-amber-600 text-white" },
  "grupo-693": { name: "Grupo 693", numbers: [6, 9, 3], color: "bg-rose-600 text-white" },
};

const RouletteCard = ({ name, lastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const winRate = (wins / (wins + losses)) * 100;
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestion, setSuggestion] = useState<number[]>([]);
  const [isBlurred, setIsBlurred] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(strategies[0]);
  const [selectedGroup, setSelectedGroup] = useState<string>("grupo-123");
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  useEffect(() => {
    generateSuggestion();
  }, []);

  const generateSuggestion = () => {
    const groupKeys = Object.keys(numberGroups);
    const randomGroupKey = groupKeys[Math.floor(Math.random() * groupKeys.length)];
    const selectedGroup = numberGroups[randomGroupKey as keyof typeof numberGroups];
    
    const relatedStrategy = strategies.find(s => s.name.includes(selectedGroup.numbers.join(',')));
    setCurrentStrategy(relatedStrategy || strategies[0]);
    
    setSuggestion([...selectedGroup.numbers]);
    setSelectedGroup(randomGroupKey);
    
    toast({
      title: "Sugestão Gerada",
      description: `Grupo: ${selectedGroup.name}`,
      variant: "default"
    });
  };

  const toggleVisibility = () => {
    setIsBlurred(!isBlurred);
  };

  const getRouletteNumberColor = (num: number) => {
    if (num === 0) return "bg-vegas-green text-black";
    
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    if (redNumbers.includes(num)) {
      return "bg-red-600 text-white";
    } else {
      return "bg-black text-white";
    }
  };

  const getSuggestionColor = (num: number) => {
    const groupKey = selectedGroup as keyof typeof numberGroups;
    return numberGroups[groupKey].color;
  };

  return (
    <>
      <div 
        className="glass-card p-4 space-y-4 animate-fade-in hover-scale cursor-pointer"
        onClick={() => setIsStatsModalOpen(true)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <TrendingUp size={20} className="text-vegas-green" />
        </div>
        
        <div className="flex gap-2">
          {lastNumbers.map((num, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full ${getRouletteNumberColor(num)} flex items-center justify-center text-sm font-medium`}
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
              <span className="text-xs text-vegas-gold/70">({numberGroups[selectedGroup as keyof typeof numberGroups].name})</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVisibility();
                    }} 
                    className="text-vegas-gold hover:text-vegas-gold/80 transition-colors"
                  >
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
                className={`w-8 h-8 rounded-full ${getSuggestionColor(num)} border border-vegas-gold flex items-center justify-center text-sm font-medium ${isBlurred ? 'blur-sm' : 'animate-pulse'}`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <div className="space-y-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">Taxa de Vitória</span>
              <span className="text-vegas-gold font-medium">{winRate.toFixed(1)}%</span>
            </div>
            <div className="flex items-center gap-3 mt-2 animate-slide-up">
              <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-md transition-all duration-300 hover:bg-green-500/30 hover-scale">
                <Trophy size={16} className="text-green-500 animate-pulse" />
                <span className="text-green-500 font-medium">{wins}</span>
              </div>
              <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-md transition-all duration-300 hover:bg-red-500/30 hover-scale">
                <XCircle size={16} className="text-red-500 animate-pulse" />
                <span className="text-red-500 font-medium">{losses}</span>
              </div>
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
            onClick={(e) => {
              e.stopPropagation();
              generateSuggestion();
            }}
            className="flex-1 bg-vegas-blue hover:bg-vegas-blue/80 text-black font-medium"
          >
            <Dices size={16} className="mr-2" />
            Sugerir Jogada
          </Button>
          
          <Button 
            className="flex-1 bg-vegas-green hover:bg-vegas-green/80 text-black font-medium animate-pulse-neon"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Play size={16} className="mr-2" />
            Jogar Agora
          </Button>
        </div>
      </div>

      <RouletteStatsModal
        open={isStatsModalOpen}
        onOpenChange={setIsStatsModalOpen}
        name={name}
        lastNumbers={lastNumbers}
        wins={wins}
        losses={losses}
        trend={trend}
      />
    </>
  );
};

export default RouletteCard;
