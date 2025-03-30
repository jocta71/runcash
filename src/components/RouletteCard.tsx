
import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { strategies, numberGroups } from './roulette/constants';
import LastNumbers from './roulette/LastNumbers';
import RouletteNumber from './roulette/RouletteNumber';
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
  const [lastNumbers, setLastNumbers] = useState<number[]>(initialLastNumbers);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSeeded, setDataSeeded] = useState(false);
  const [hotNumbers, setHotNumbers] = useState<{numbers: number[], occurrences: number[]}>({
    numbers: [], 
    occurrences: []
  });

  // Calculate win rate percentage
  const winRate = Math.round((wins / (wins + losses)) * 100);

  useEffect(() => {
    const checkAndSeedData = async () => {
      try {
        const { data, error, count } = await supabase
          .from('roleta_numeros')
          .select('numero', { count: 'exact', head: true })
          .eq('roleta_nome', name);
        
        if (!count || count === 0) {
          setLastNumbers(initialLastNumbers);
          setDataSeeded(true);
        } else {
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

        // Fetch hot numbers (most frequent in last 100 spins)
        const { data: frequencyData, error: frequencyError } = await supabase
          .rpc('get_number_frequency', { 
            roleta_nome_param: name, 
            limit_param: 100 
          });

        if (frequencyError) {
          console.error('Error fetching number frequency:', frequencyError);
        } else if (frequencyData && frequencyData.length > 0) {
          const topCount = isMobile ? 2 : 3;
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

  return (
    <div 
      className="bg-[#17161e]/80 border border-white/5 rounded-lg p-2 space-y-1.5 hover:border-white/20 cursor-pointer transition-all"
      onClick={handleDetailsClick}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium truncate">{name}</h3>
        <span className={`text-xs font-semibold ${winRate >= 70 ? 'text-[#00ff00]' : winRate >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
          {winRate}%
        </span>
      </div>
      
      <LastNumbers numbers={lastNumbers} isLoading={isLoading} />
      
      {/* Hot Numbers Row */}
      {hotNumbers.numbers.length > 0 && (
        <div className="flex items-center gap-1 animate-fade-in">
          <span className="text-[10px] text-gray-400">Hot:</span>
          <div className="flex gap-1">
            {hotNumbers.numbers.map((num, i) => (
              <div key={i} className="relative">
                <RouletteNumber number={num} size="xs" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center">
                  {hotNumbers.occurrences[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Play Button */}
      <button
        onClick={handlePlayClick}
        className="w-full py-1 text-black text-[10px] font-medium rounded bg-gradient-to-b from-[#00ff00] to-[#00ff00] hover:from-[#00ff00]/90 hover:to-[#00ff00]/90 transition-colors"
      >
        Jogar
      </button>
    </div>
  );
};

export default RouletteCard;
