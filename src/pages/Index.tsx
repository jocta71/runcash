
import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
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
  }
];

const Index = () => {
  const [search, setSearch] = useState("");
  
  const filteredRoulettes = mockRoulettes.filter(roulette =>
    roulette.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-vegas-black">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col">
        <Navbar />
        
        <div className="p-6 flex-1 flex flex-col h-[calc(100vh-64px)]">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full flex-1 overflow-y-auto">
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
