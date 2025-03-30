
import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { strategies, numberGroups } from './roulette/constants';
import LastNumbers from './roulette/LastNumbers';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

const RouletteCard = ({ name, lastNumbers: initialLastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [suggestion, setSuggestion] = useState<number[]>([]);
  const [currentStrategy, setCurrentStrategy] = useState(strategies[0]);
  const [selectedGroup, setSelectedGroup] = useState<string>("grupo-123");
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
        // Check for data in roleta_numeros table instead of roletas
        const { data, error, count } = await supabase
          .from('roleta_numeros')
          .select('numero', { count: 'exact', head: true })
          .eq('roleta_nome', name);
        
        if (!count || count === 0) {
          console.log('No data found in roleta_numeros table, using mock data');
          setLastNumbers(initialLastNumbers);
          setDataSeeded(true);
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
        // Query roleta_numeros table with the correct column 'numero'
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

        // Also fetch hot numbers (most frequent in last 100 spins)
        const { data: frequencyData, error: frequencyError } = await supabase
          .rpc('get_number_frequency', { 
            roleta_nome_param: name, 
            limit_param: 100 
          });

        if (frequencyError) {
          console.error('Error fetching number frequency:', frequencyError);
        } else if (frequencyData && frequencyData.length > 0) {
          // Get top 3 most frequent numbers for mobile
          const topCount = isMobile ? 3 : 5;
          const topNumbers = frequencyData.slice(0, topCount);
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
  }, [name, dataSeeded, isMobile]);

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
  };

  const handleDetailsClick = () => {
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

  // Calculate win rate percentage
  const winRate = Math.round((wins / (wins + losses)) * 100);

  return (
    <div 
      className="bg-[#17161e]/80 border border-white/5 rounded-lg p-2 space-y-1.5 hover:border-white/20 cursor-pointer transition-all"
      onClick={handleDetailsClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium truncate">{name}</h3>
        <TrendingUp size={14} className="text-[#00ff00] flex-shrink-0" />
      </div>
      
      <LastNumbers numbers={lastNumbers} isLoading={isLoading} />
      
      {/* Simple Win Rate */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-gray-400">Win Rate:</span>
        <span className={`font-medium ${winRate >= 70 ? 'text-[#00ff00]' : winRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
          {winRate}%
        </span>
      </div>
      
      {/* Play Button Only */}
      <button
        onClick={handlePlayClick}
        className="w-full py-1 text-black text-xs font-medium rounded bg-gradient-to-b from-[#00ff00] to-[#00ff00] hover:from-[#00ff00]/90 hover:to-[#00ff00]/90 transition-colors"
      >
        Jogar
      </button>
    </div>
  );
};

export default RouletteCard;
