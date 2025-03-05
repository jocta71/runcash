
import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import RouletteStatsModal from './RouletteStatsModal';
import { strategies, numberGroups } from './roulette/constants';
import LastNumbers from './roulette/LastNumbers';
import WinRateDisplay from './roulette/WinRateDisplay';
import RouletteTrendChart from './roulette/RouletteTrendChart';
import SuggestionDisplay from './roulette/SuggestionDisplay';
import RouletteActionButtons from './roulette/RouletteActionButtons';
import { supabase } from '@/integrations/supabase/client';
import { seedRouletteNumbers } from '@/integrations/supabase/seedData';

interface RouletteCardProps {
  name: string;
  lastNumbers: number[];
  wins: number;
  losses: number;
  trend: { value: number }[];
}

const RouletteCard = ({ name, lastNumbers: initialLastNumbers, wins, losses, trend }: RouletteCardProps) => {
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestion, setSuggestion] = useState<number[]>([]);
  const [isBlurred, setIsBlurred] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState(strategies[0]);
  const [selectedGroup, setSelectedGroup] = useState<string>("grupo-123");
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [lastNumbers, setLastNumbers] = useState<number[]>(initialLastNumbers);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSeeded, setDataSeeded] = useState(false);

  // Check if data needs to be seeded and seed if necessary
  useEffect(() => {
    const checkAndSeedData = async () => {
      try {
        // First check if we have any data
        const { data, error, count } = await supabase
          .from('recent_numbers')
          .select('number', { count: 'exact', head: true });
        
        // If no data exists, trigger seeding
        if (!count || count === 0) {
          console.log('No data found, seeding database...');
          const success = await seedRouletteNumbers();
          if (success) {
            setDataSeeded(true);
            toast({
              title: 'Dados Adicionados',
              description: 'Números iniciais adicionados com sucesso!',
              variant: 'default',
            });
          }
        } else {
          console.log('Data already exists, skipping seeding');
          setDataSeeded(true);
        }
      } catch (error) {
        console.error('Error checking data:', error);
      }
    };

    checkAndSeedData();
  }, []);

  // Fetch recent numbers from the database
  useEffect(() => {
    const fetchRecentNumbers = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('recent_numbers')
          .select('number')
          .eq('roulette_name', name)
          .order('timestamp', { ascending: false })
          .limit(5);

        if (error) {
          console.error('Error fetching recent numbers:', error);
          return;
        }

        if (data && data.length > 0) {
          const numbers = data.map(item => item.number);
          setLastNumbers(numbers);
        }
      } catch (error) {
        console.error('Error in fetching recent numbers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // If data is seeded or we're retrying after a delay
    if (dataSeeded) {
      fetchRecentNumbers();
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
    setIsStatsModalOpen(true);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Play functionality - currently just stops propagation
  };

  return (
    <>
      <div 
        className="bg-[#17161e]/90 backdrop-filter backdrop-blur-sm border border-white/10 rounded-xl p-4 space-y-3 animate-fade-in hover-scale cursor-pointer h-auto"
        onClick={() => setIsStatsModalOpen(true)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <TrendingUp size={20} className="text-vegas-green" />
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
        
        <RouletteActionButtons 
          onDetailsClick={handleDetailsClick}
          onPlayClick={handlePlayClick}
        />
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
