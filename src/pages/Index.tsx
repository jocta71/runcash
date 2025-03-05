import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RouletteCard from '@/components/RouletteCard';
import { Input } from '@/components/ui/input';
import ChatUI from '@/components/ChatUI';

const mockRoulettes = [
  {
    name: "Roleta Brasileira",
    lastNumbers: [7, 11, 23, 5, 18],
    wins: 150,
    losses: 50,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Europeia",
    lastNumbers: [32, 15, 3, 26, 8],
    wins: 180,
    losses: 70,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Americana",
    lastNumbers: [0, 12, 28, 35, 14],
    wins: 200,
    losses: 90,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Platinum VIP",
    lastNumbers: [17, 22, 9, 31, 4],
    wins: 220,
    losses: 65,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Diamond",
    lastNumbers: [19, 6, 27, 13, 36],
    wins: 190,
    losses: 55,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Gold",
    lastNumbers: [2, 10, 20, 33, 16],
    wins: 170,
    losses: 60,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Lightning",
    lastNumbers: [29, 24, 1, 30, 21],
    wins: 210,
    losses: 75,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Premium",
    lastNumbers: [5, 18, 34, 11, 25],
    wins: 230,
    losses: 85,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  },
  {
    name: "Roleta Turbo",
    lastNumbers: [8, 17, 29, 2, 19],
    wins: 185,
    losses: 65,
    trend: Array.from({ length: 20 }, () => ({ value: Math.random() * 100 }))
  }
];

const Index = () => {
  const [search, setSearch] = useState("");
  
  const filteredRoulettes = mockRoulettes.filter(roulette =>
    roulette.name.toLowerCase().includes(search.toLowerCase())
  );

  const topRoulettes = useMemo(() => {
    return [...mockRoulettes]
      .sort((a, b) => {
        const aWinRate = (a.wins / (a.wins + a.losses)) * 100;
        const bWinRate = (b.wins / (b.wins + b.losses)) * 100;
        return bWinRate - aWinRate;
      })
      .slice(0, 3);
  }, []);

  return (
    <div className="min-h-screen flex bg-vegas-black">
      <Sidebar />
      
      <main className="flex-1 flex flex-col w-full ml-0 md:ml-64">
        <div className="p-6 flex flex-col h-full overflow-y-auto">
          <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="search"
                placeholder="Buscar roletas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-vegas-darkgray border-none"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6 pr-2">
            {filteredRoulettes.map((roulette, index) => (
              <RouletteCard key={index} {...roulette} />
            ))}
          </div>
        </div>
      </main>
      
      <ChatUI />
    </div>
  );
};

export default Index;
