
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
        }).limit(600); // Increased limit to fetch up to 600 numbers
        
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

  // Calculate the displayable number of rows to avoid overflow
  const maxRows = 3; // Maximum number of rows to display in the card
  const numbersPerRow = 6; // Number of elements per row
  const displayNumbers = lastNumbers.slice(0, maxRows * numbersPerRow);
  
  // Function to handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Get the latest number
  const latestNumber = lastNumbers.length > 0 ? lastNumbers[0] : null;

  return (
    <div 
      className={`backdrop-filter backdrop-blur-sm border ${isSelected ? 'border-[#00ff00]' : 'border-white/10'} rounded-xl p-3 space-y-2 animate-fade-in h-full bg-[#121212] cursor-pointer transition-all duration-300 hover:border-[#00ff00]/50`}
      onClick={handleCardClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-200">{name}</h3>
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-[#00ff00]" />
        </div>
      </div>
      
      {/* Latest Number Display */}
      {latestNumber !== null && (
        <div className="flex justify-center my-2">
          <RouletteNumber 
            number={latestNumber}
            size="lg" 
            className="animate-pulse-soft"
          />
        </div>
      )}
      
      <div className="overflow-hidden">
        <LastNumbers 
          numbers={displayNumbers} 
          isLoading={isLoading} 
          maxRows={maxRows}
          numbersPerRow={numbersPerRow}
        />
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
