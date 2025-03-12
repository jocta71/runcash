
import { TrendingUp, ChevronRight, PieChart, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { strategies, numberGroups } from './roulette/constants';
import LastNumbers from './roulette/LastNumbers';
import WinRateDisplay from './roulette/WinRateDisplay';
import RouletteTrendChart from './roulette/RouletteTrendChart';
import SuggestionDisplay from './roulette/SuggestionDisplay';
import RouletteActionButtons from './roulette/RouletteActionButtons';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

const RouletteCard = ({ name, lastNumbers: initialLastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestion, setSuggestion] = useState<number[]>([]);
  const [isBlurred, setIsBlurred] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(strategies[0]);
  const [selectedGroup, setSelectedGroup] = useState<string>("grupo-123");
  const [lastNumbers, setLastNumbers] = useState<number[]>(initialLastNumbers);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSeeded, setDataSeeded] = useState(false);
  const [showInsightsDialog, setShowInsightsDialog] = useState(false);

  // Calculate some stats for insights
  const redCount = lastNumbers.filter(num => [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num)).length;
  const blackCount = lastNumbers.filter(num => [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].includes(num)).length;
  const zeroCount = lastNumbers.filter(num => num === 0).length;
  const evenCount = lastNumbers.filter(num => num !== 0 && num % 2 === 0).length;
  const oddCount = lastNumbers.filter(num => num % 2 !== 0).length;
  
  // Calculate number repetition
  const numberFrequency: Record<number, number> = {};
  lastNumbers.forEach(num => {
    numberFrequency[num] = (numberFrequency[num] || 0) + 1;
  });
  
  const mostFrequentNumber = Object.entries(numberFrequency)
    .sort(([, a], [, b]) => b - a)
    .map(([num]) => Number(num))[0];

  useEffect(() => {
    const checkAndSeedData = async () => {
      try {
        const { data, error, count } = await supabase
          .from('roletas')
          .select('numeros', { count: 'exact', head: true });
        
        if (!count || count === 0) {
          console.log('No data found in roletas table, using mock data');
          setLastNumbers(initialLastNumbers);
          setDataSeeded(true);
          toast({
            title: 'Usando Dados Locais',
            description: 'Conecte um raspador para dados em tempo real',
            variant: 'default',
          });
        } else {
          console.log('Data already exists, using database data');
          setDataSeeded(true);
        }
      } catch (error) {
        console.error('Error checking data:', error);
        setLastNumbers(initialLastNumbers);
        setDataSeeded(true);
      }
    };

    checkAndSeedData();
  }, [initialLastNumbers]);

  useEffect(() => {
    const fetchRouletteNumbers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('roletas')
          .select('numeros')
          .eq('nome', name)
          .single();

        if (error) {
          console.error('Error fetching roulette numbers:', error);
          return;
        }

        if (data && data.numeros && data.numeros.length > 0) {
          const recentNumbers = data.numeros.slice(0, 5);
          setLastNumbers(recentNumbers);
        }
      } catch (error) {
        console.error('Error in fetching roulette numbers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (dataSeeded) {
      fetchRouletteNumbers();
    }
  }, [name, dataSeeded]);

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

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBlurred(!isBlurred);
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/roulette/${encodeURIComponent(name)}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Roleta Aberta",
      description: "Redirecionando para o jogo...",
      variant: "default"
    });
  };

  const handleInsightsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInsightsDialog(true);
  };

  return (
    <>
      <div 
        className="bg-[#17161e]/90 backdrop-filter backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-3 animate-fade-in hover-scale cursor-pointer h-auto"
        onClick={handleDetailsClick}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex gap-2">
            <button 
              onClick={handleInsightsClick} 
              className="text-[#00ff00] hover:bg-[#00ff00]/10 rounded-full p-1 transition-colors"
            >
              <PieChart size={18} />
            </button>
            <TrendingUp size={20} className="text-[#00ff00]" />
          </div>
        </div>
        
        <LastNumbers numbers={lastNumbers} isLoading={isLoading} />
        
        <SuggestionDisplay 
          suggestion={suggestion}
          selectedGroup={selectedGroup}
          isBlurred={isBlurred}
          toggleVisibility={toggleVisibility}
          numberGroups={numberGroups}
        />
        
        <WinRateDisplay wins={wins} losses={losses} />
        
        <RouletteTrendChart trend={trend} />
        
        <div className="flex items-center justify-between text-xs text-white/70 mt-2">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            <span>{redCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-black border border-white/20"></span>
            <span>{blackCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>{zeroCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap size={12} className="text-[#00ff00]" />
            <span>{mostFrequentNumber || '-'}</span>
          </div>
        </div>
        
        <RouletteActionButtons 
          onDetailsClick={handleDetailsClick}
          onPlayClick={handlePlayClick}
        />
      </div>

      <Dialog open={showInsightsDialog} onOpenChange={setShowInsightsDialog}>
        <DialogContent className="bg-[#17161e] border-white/10 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <PieChart size={18} className="text-[#00ff00]" />
              <span>Insights da Roleta: {name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1A191F] rounded-lg p-3 border border-white/5">
                <div className="text-xs text-white/70 mb-1">Distribuição de Cores</div>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-red-500 font-semibold text-lg">{redCount}</div>
                    <div className="text-xs text-white/50">Vermelhos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold text-lg">{blackCount}</div>
                    <div className="text-xs text-white/50">Pretos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-500 font-semibold text-lg">{zeroCount}</div>
                    <div className="text-xs text-white/50">Zeros</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1A191F] rounded-lg p-3 border border-white/5">
                <div className="text-xs text-white/70 mb-1">Paridade</div>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-[#00ff00] font-semibold text-lg">{evenCount}</div>
                    <div className="text-xs text-white/50">Pares</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#00ff00] font-semibold text-lg">{oddCount}</div>
                    <div className="text-xs text-white/50">Ímpares</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1A191F] rounded-lg p-3 border border-white/5">
              <div className="text-xs text-white/70 mb-1">Número mais frequente</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white font-bold">
                    {mostFrequentNumber || '-'}
                  </div>
                  <div>
                    <div className="text-sm font-medium">Número {mostFrequentNumber || '-'}</div>
                    <div className="text-xs text-white/50">
                      {mostFrequentNumber ? `${numberFrequency[mostFrequentNumber]} ocorrências` : 'N/A'}
                    </div>
                  </div>
                </div>
                <Zap size={20} className="text-[#00ff00]" />
              </div>
            </div>
            
            <div className="bg-[#1A191F] rounded-lg p-3 border border-white/5">
              <div className="text-xs text-white/70 mb-1">Análise de Desempenho</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Taxa de vitória: {(wins / (wins + losses) * 100).toFixed(1)}%</div>
                  <div className="text-xs text-white/50">{wins} vitórias, {losses} derrotas</div>
                </div>
                <TrendingUp size={20} className="text-[#00ff00]" />
              </div>
            </div>
            
            <div className="bg-[#1A191F] rounded-lg p-3 border border-white/5">
              <div className="text-xs text-white/70 mb-1">Estratégia Recomendada</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{currentStrategy?.name || 'Padrão'}</div>
                  <div className="text-xs text-white/50">{currentStrategy?.description || 'Estratégia baseada nos últimos números'}</div>
                </div>
                <ChevronRight size={20} className="text-[#00ff00]" />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button 
              className="w-full py-2 bg-[#00ff00] text-black font-medium rounded-md hover:bg-[#00ff00]/90 transition-colors"
              onClick={() => navigate(`/simulator`)}
            >
              Testar no Simulador
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RouletteCard;
