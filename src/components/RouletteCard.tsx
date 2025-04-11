
import { TrendingUp, BarChart2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import LastNumbers from './roulette/LastNumbers';
import WinRateDisplay from './roulette/WinRateDisplay';
import RouletteTrendChart from './roulette/RouletteTrendChart';
import SuggestionDisplay from './roulette/SuggestionDisplay';
import RouletteActionButtons from './roulette/RouletteActionButtons';
import { supabase } from '@/integrations/supabase/client';
import HotNumbers from './roulette/HotNumbers';
import { defaultStrategies, Strategy } from './strategies/types';
import RouletteNumber from './roulette/RouletteNumber';
import RouletteRacetrack from './roulette/RouletteRacetrack';

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: {
    value: number;
  }[];
  isSelected?: boolean;
  onClick?: () => void;
}

const RouletteCard = ({
  name,
  lastNumbers: initialLastNumbers,
  wins,
  losses,
  trend,
  isSelected = false,
  onClick
}: RouletteCardProps) => {
  const navigate = useNavigate();
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);
  const [userStrategies, setUserStrategies] = useState<Strategy[]>(defaultStrategies);
  const [lastNumbers, setLastNumbers] = useState<number[]>(initialLastNumbers);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSeeded, setDataSeeded] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [hotNumbers, setHotNumbers] = useState<{
    numbers: number[];
    occurrences: number[];
  }>({
    numbers: [],
    occurrences: []
  });

  useEffect(() => {
    const checkAndSeedData = async () => {
      try {
        const {
          data,
          error,
          count
        } = await supabase.from('roleta_numeros').select('numero', {
          count: 'exact',
          head: true
        }).eq('roleta_nome', name);
        if (!count || count === 0) {
          console.log('No data found in roleta_numeros table, using mock data');
          setLastNumbers(initialLastNumbers);
          setDataSeeded(true);
          toast({
            title: 'Usando Dados Locais',
            description: 'Conecte um raspador para dados em tempo real',
            variant: 'default'
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
  }, [initialLastNumbers, name]);

  useEffect(() => {
    const fetchRouletteNumbers = async () => {
      try {
        setIsLoading(true);
        const {
          data,
          error
        } = await supabase.from('roleta_numeros').select('numero').eq('roleta_nome', name).order('timestamp', {
          ascending: false
        }).limit(600);

        if (error) {
          console.error('Error fetching roulette numbers:', error);
          return;
        }
        if (data && data.length > 0) {
          const recentNumbers = data.map(item => item.numero);
          setLastNumbers(recentNumbers);
        }
        const {
          data: frequencyData,
          error: frequencyError
        } = await supabase.rpc('get_number_frequency', {
          roleta_nome_param: name,
          limit_param: 100
        });
        if (frequencyError) {
          console.error('Error fetching number frequency:', frequencyError);
        } else if (frequencyData && frequencyData.length > 0) {
          const topNumbers = frequencyData.slice(0, 5);
          setHotNumbers({
            numbers: topNumbers.map(item => item.numero),
            occurrences: topNumbers.map(item => Number(item.total))
          });
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

  const handleSelectStrategy = (strategyId: string) => {
    setSelectedStrategyId(strategyId);
    const selectedStrategy = userStrategies.find(s => s.id === strategyId);
    if (selectedStrategy) {
      toast({
        title: "Estratégia Selecionada",
        description: `${selectedStrategy.name}`,
        variant: "default"
      });
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Roleta Aberta",
      description: "Redirecionando para o jogo...",
      variant: "default"
    });
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    toast({
      title: "Número Selecionado",
      description: `Você selecionou o número ${number}`,
      variant: "default"
    });
  };

  const latestNumber = lastNumbers.length > 0 ? lastNumbers[0] : null;

  return (
    <div
      onClick={handleCardClick}
      className={`bg-zinc-900 py-[12px] px-[12px] rounded-md relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
        isSelected ? 'ring-2 ring-vegas-gold' : ''
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border border-gray-700 rounded-md"></div>
        <div className="absolute inset-[6px] border border-gray-700 rounded-md"></div>
        <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-vegas-gold rounded-tl-md"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-vegas-gold rounded-tr-md"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-vegas-gold rounded-bl-md"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-vegas-gold rounded-br-md"></div>
        <div className="absolute left-0 top-[12%] h-1 w-full bg-gradient-to-r from-vegas-gold/0 via-vegas-gold/70 to-vegas-gold/0"></div>
        <div className="absolute right-0 top-[50%] h-1 w-full bg-gradient-to-l from-vegas-gold/0 via-vegas-gold/50 to-vegas-gold/0"></div>
        <div className="absolute left-0 bottom-[15%] h-1 w-full bg-gradient-to-r from-vegas-gold/0 via-vegas-gold/60 to-vegas-gold/0"></div>
      </div>
      
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-200">{name}</h3>
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-vegas-green" />
        </div>
      </div>
      
      {/* Roulette Racetrack */}
      <div className="my-4">
        <RouletteRacetrack 
          onNumberClick={handleNumberClick} 
          selectedNumber={selectedNumber}
          size="sm"
        />
      </div>
      
      {latestNumber !== null && (
        <div className="flex justify-center my-2">
          <RouletteNumber number={latestNumber} size="lg" className="animate-pulse-soft" />
        </div>
      )}
      
      <div className="overflow-hidden">
        <LastNumbers numbers={lastNumbers.slice(0, 18)} isLoading={isLoading} maxRows={3} numbersPerRow={6} />
      </div>
      
      {hotNumbers.numbers.length > 0 && (
        <div className="overflow-hidden">
          <HotNumbers numbers={hotNumbers.numbers} occurrences={hotNumbers.occurrences} />
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-2">
        <WinRateDisplay wins={wins} losses={losses} />
        <RouletteTrendChart trend={trend} />
      </div>
      
      <RouletteActionButtons onPlayClick={handlePlayClick} />
    </div>
  );
};

export default RouletteCard;
