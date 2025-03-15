
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
        // Check if data exists in roleta_numeros table instead of roletas table
        const { data, error, count } = await supabase
          .from('roleta_numeros')
          .select('numero', { count: 'exact', head: true });
        
        if (!count || count === 0) {
          console.log('No data found in roleta_numeros table, using mock data');
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
        // Query from roleta_numeros table instead of roletas
        const { data, error } = await supabase
          .from('roleta_numeros')
          .select('numero')
          .eq('roleta_nome', name)
          .order('timestamp', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching roulette numbers:', error);
          return;
        }

        if (data && data.length > 0) {
          const recentNumbers = data.map(item => item.numero);
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
        className="bg-gradient-to-br from-[#1a1923] to-[#13121a] backdrop-filter backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4 animate-fade-in hover-scale cursor-pointer h-auto shadow-lg shadow-black/30 hover:shadow-[#00ff00]/10 transition-all duration-300"
        onClick={handleDetailsClick}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00ff00] animate-pulse mr-1"></span>
            {name}
          </h3>
          <div className="flex gap-2">
            <button 
              onClick={handleInsightsClick} 
              className="text-[#00ff00] hover:bg-[#00ff00]/10 rounded-full p-1.5 transition-all duration-300 border border-[#00ff00]/30"
            >
              <PieChart size={18} />
            </button>
            <div className="bg-[#1d1b26] p-1.5 rounded-full border border-[#00ff00]/20">
              <TrendingUp size={18} className="text-[#00ff00]" />
            </div>
          </div>
        </div>
        
        <div className="bg-[#12111a]/60 rounded-lg p-3 border border-white/5">
          <LastNumbers numbers={lastNumbers} isLoading={isLoading} />
        </div>
        
        <div className="bg-[#12111a]/60 rounded-lg p-3 border border-white/5">
          <SuggestionDisplay 
            suggestion={suggestion}
            selectedGroup={selectedGroup}
            isBlurred={isBlurred}
            toggleVisibility={toggleVisibility}
            numberGroups={numberGroups}
          />
        </div>
        
        <div className="bg-[#12111a]/60 rounded-lg p-3 border border-white/5">
          <WinRateDisplay wins={wins} losses={losses} />
        </div>
        
        <div className="h-24 mt-1">
          <RouletteTrendChart trend={trend} />
        </div>
        
        <div className="flex items-center justify-between text-xs text-white/70 mt-2 bg-[#12111a]/60 rounded-lg p-2.5 border border-white/5">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold">R</span>
            <span>{redCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-black border border-white/20 flex items-center justify-center text-[9px] font-bold">P</span>
            <span>{blackCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center text-[9px] font-bold">0</span>
            <span>{zeroCount}</span>
          </div>
          <div className="flex items-center gap-1 bg-[#1d1b26] px-2 py-0.5 rounded-full border border-[#00ff00]/20">
            <Zap size={10} className="text-[#00ff00]" />
            <span className="font-medium">{mostFrequentNumber || '-'}</span>
          </div>
        </div>
        
        <RouletteActionButtons 
          onDetailsClick={handleDetailsClick}
          onPlayClick={handlePlayClick}
        />
      </div>

      <Dialog open={showInsightsDialog} onOpenChange={setShowInsightsDialog}>
        <DialogContent className="bg-gradient-to-br from-[#1a1923] to-[#13121a] border-[#00ff00]/20 text-white max-w-md shadow-xl shadow-black/50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <PieChart size={20} className="text-[#00ff00]" />
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Insights da Roleta: {name}</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1d1b26] rounded-lg p-3 border border-white/5 hover:border-[#00ff00]/20 transition-all duration-300 hover:shadow-md hover:shadow-[#00ff00]/5">
                <div className="text-xs text-[#00ff00]/70 mb-1 font-medium">Distribuição de Cores</div>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-red-400 font-semibold text-lg">{redCount}</div>
                    <div className="text-xs text-white/50">Vermelhos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-semibold text-lg">{blackCount}</div>
                    <div className="text-xs text-white/50">Pretos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-semibold text-lg">{zeroCount}</div>
                    <div className="text-xs text-white/50">Zeros</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#1d1b26] rounded-lg p-3 border border-white/5 hover:border-[#00ff00]/20 transition-all duration-300 hover:shadow-md hover:shadow-[#00ff00]/5">
                <div className="text-xs text-[#00ff00]/70 mb-1 font-medium">Paridade</div>
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
            
            <div className="bg-[#1d1b26] rounded-lg p-3 border border-white/5 hover:border-[#00ff00]/20 transition-all duration-300 hover:shadow-md hover:shadow-[#00ff00]/5">
              <div className="text-xs text-[#00ff00]/70 mb-1 font-medium">Número mais frequente</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                    {mostFrequentNumber || '-'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white/90">Número {mostFrequentNumber || '-'}</div>
                    <div className="text-xs text-white/50">
                      {mostFrequentNumber ? `${numberFrequency[mostFrequentNumber]} ocorrências` : 'N/A'}
                    </div>
                  </div>
                </div>
                <Zap size={22} className="text-[#00ff00] animate-pulse" />
              </div>
            </div>
            
            <div className="bg-[#1d1b26] rounded-lg p-3 border border-white/5 hover:border-[#00ff00]/20 transition-all duration-300 hover:shadow-md hover:shadow-[#00ff00]/5">
              <div className="text-xs text-[#00ff00]/70 mb-1 font-medium">Análise de Desempenho</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/90">Taxa de vitória: {wins + losses > 0 ? (wins / (wins + losses) * 100).toFixed(1) : '0'}%</div>
                  <div className="text-xs text-white/50">{wins} vitórias, {losses} derrotas</div>
                </div>
                <TrendingUp size={22} className="text-[#00ff00]" />
              </div>
            </div>
            
            <div className="bg-[#1d1b26] rounded-lg p-3 border border-white/5 hover:border-[#00ff00]/20 transition-all duration-300 hover:shadow-md hover:shadow-[#00ff00]/5">
              <div className="text-xs text-[#00ff00]/70 mb-1 font-medium">Estratégia Recomendada</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white/90">{currentStrategy?.name || 'Padrão'}</div>
                  <div className="text-xs text-white/50">{currentStrategy?.name || 'Estratégia baseada nos últimos números'}</div>
                </div>
                <ChevronRight size={22} className="text-[#00ff00]" />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button 
              className="w-full py-2.5 bg-gradient-to-r from-[#00ff00] to-[#00cc00] text-black font-medium rounded-md hover:opacity-90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#00ff00]/20"
              onClick={() => navigate(`/simulator`)}
            >
              <Zap size={18} /> 
              Testar no Simulador
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RouletteCard;
