import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { numberGroups } from './roulette/constants';
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
  trend: { value: number }[];
}

const RouletteCard = ({ name, lastNumbers: initialLastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const navigate = useNavigate();
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);
  const [userStrategies, setUserStrategies] = useState<Strategy[]>(defaultStrategies);
  const [lastNumbers, setLastNumbers] = useState<number[]>(initialLastNumbers);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSeeded, setDataSeeded] = useState(false);
  const [hotNumbers, setHotNumbers] = useState<{numbers: number[], occurrences: number[]}>({
    numbers: [], 
    occurrences: []
  });

  useEffect(() => {
    const checkAndSeedData = async () => {
      try {
        const { data, error, count } = await supabase
          .from('roleta_numeros')
          .select('numero', { count: 'exact', head: true })
          .eq('roleta_nome', name);
        
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
  }, [initialLastNumbers, name]);

  useEffect(() => {
    const fetchRouletteNumbers = async () => {
      try {
        setIsLoading(true);
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

        const { data: frequencyData, error: frequencyError } = await supabase
          .rpc('get_number_frequency', { 
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

  return (
    <div 
      className="bg-[#17161e]/90 backdrop-filter backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-3 animate-fade-in hover-scale cursor-pointer h-auto"
      onClick={handleDetailsClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <TrendingUp size={20} className="text-[#00ff00]" />
      </div>
      
      <LastNumbers numbers={lastNumbers} isLoading={isLoading} />
      
      {hotNumbers.numbers.length > 0 && (
        <HotNumbers 
          numbers={hotNumbers.numbers}
          occurrences={hotNumbers.occurrences}
        />
      )}
      
      <SuggestionDisplay 
        strategies={userStrategies}
        selectedStrategyId={selectedStrategyId}
        onSelectStrategy={handleSelectStrategy}
      />
      
      <WinRateDisplay wins={wins} losses={losses} />
      
      <RouletteTrendChart trend={trend} />
      
      <RouletteActionButtons 
        onDetailsClick={handleDetailsClick}
        onPlayClick={handlePlayClick}
      />
    </div>
  );
};

export default RouletteCard;
