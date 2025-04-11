import { useState, useMemo, useCallback } from 'react';
import { Search, Wallet, Menu, MessageSquare } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RouletteCard from '@/components/RouletteCard';
import { Input } from '@/components/ui/input';
import ChatUI from '@/components/ChatUI';
import { Button } from '@/components/ui/button';
import AnimatedInsights from '@/components/AnimatedInsights';
import ProfileDropdown from '@/components/ProfileDropdown';
import RouletteStatsDialog from '@/components/roulette/RouletteStatsDialog';
import RouletteStatsPanel from '@/components/roulette/RouletteStatsPanel';

const mockRoulettes = [
  {
    name: "Roleta Brasileira",
    lastNumbers: [7, 11, 23, 5, 18, 36, 14, 9, 32, 0, 27, 1, 13, 6, 17, 34, 22, 29, 15, 3, 24, 10, 19, 31],
    wins: 150,
    losses: 50,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Europeia",
    lastNumbers: [32, 15, 3, 26, 8, 12, 29, 18, 0, 35, 4, 10, 22, 7, 28, 19, 33, 14, 31, 9, 20, 2, 25, 17],
    wins: 180,
    losses: 70,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Americana",
    lastNumbers: [0, 12, 28, 35, 14],
    wins: 200,
    losses: 90,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Platinum VIP",
    lastNumbers: [17, 22, 9, 31, 4],
    wins: 220,
    losses: 65,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Diamond",
    lastNumbers: [19, 6, 27, 13, 36],
    wins: 190,
    losses: 55,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Gold",
    lastNumbers: [2, 10, 20, 33, 16],
    wins: 170,
    losses: 60,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Lightning",
    lastNumbers: [29, 24, 1, 30, 21],
    wins: 210,
    losses: 75,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Premium",
    lastNumbers: [5, 18, 34, 11, 25],
    wins: 230,
    losses: 85,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }, {
    name: "Roleta Turbo",
    lastNumbers: [8, 17, 29, 2, 19],
    wins: 185,
    losses: 65,
    trend: Array.from({
      length: 20
    }, () => ({
      value: Math.random() * 100
    }))
  }
];

const Index = () => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedRoulette, setSelectedRoulette] = useState(mockRoulettes[0]);
  const [statsOpen, setStatsOpen] = useState(false);
  
  const filteredRoulettes = useMemo(() => {
    return mockRoulettes.filter(roulette => 
      roulette.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const topRoulettes = useMemo(() => {
    return [...mockRoulettes].sort((a, b) => {
      const aWinRate = a.wins / (a.wins + a.losses) * 100;
      const bWinRate = b.wins / (b.wins + a.losses) * 100;
      return bWinRate - aWinRate;
    }).slice(0, 3);
  }, []);

  const handleCardClick = useCallback((roulette) => {
    setSelectedRoulette(roulette);
  }, []);

  const handleOpenFullStats = useCallback(() => {
    setStatsOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#121212] to-[#1C2622]">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Sidebar (drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={true} />
      
      <div className="flex-1 relative">
        {/* Mobile Header */}
        <div className="mobile-header">
          <button 
            className="p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} className="text-vegas-green" />
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-2">
            {showMobileSearch ? (
              <div className="absolute top-0 left-0 right-0 z-50 p-2 bg-[#121212] border-b border-[#33333359]">
                <div className="relative flex items-center w-full">
                  <Search size={16} className="absolute left-3 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Pesquisar roleta..." 
                    className="w-full pl-9 py-2 pr-3 text-sm bg-[#1A1E1D] border-none rounded-full text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                    autoFocus
                    onBlur={() => setShowMobileSearch(false)}
                  />
                </div>
              </div>
            ) : (
              <>
                <button 
                  className="p-2 bg-[#1A1E1D] rounded-full"
                  onClick={() => setShowMobileSearch(true)}
                >
                  <Search size={16} className="text-gray-400" />
                </button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-8 text-black font-medium bg-gradient-to-b from-vegas-green to-[#22c55e] hover:from-vegas-green/90 hover:to-[#22c55e]/90"
                >
                  <Wallet size={14} className="mr-1" /> Saldo
                </Button>
                <ProfileDropdown />
              </>
            )}
            <button 
              className="p-2"
              onClick={() => setChatOpen(true)}
            >
              <MessageSquare size={24} className="text-vegas-green" />
            </button>
          </div>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden md:flex fixed top-0 left-0 right-0 md:left-64 md:right-0 z-40 h-[70px] items-center justify-between px-4 border-b border-white/10 bg-[#121212]">
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">RunCash</span>
            <div className="relative flex items-center ml-4 max-w-[180px]">
              <Search size={14} className="absolute left-2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Pesquisar roleta..." 
                className="h-8 pl-7 py-1 pr-2 text-xs bg-[#1A1E1D] border-none rounded-full text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
          </div>
          
          <AnimatedInsights />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#1A1E1D] rounded-full py-1 px-3">
              <span className="h-5 w-5 bg-vegas-blue rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white">R$</span>
              </span>
              <span className="text-white text-xs">1.346,34</span>
              <Wallet size={14} className="text-gray-400" />
            </div>
            
            <Button variant="default" size="sm" className="h-8 text-black font-medium bg-gradient-to-b from-vegas-green to-[#22c55e] hover:from-vegas-green/90 hover:to-[#22c55e]/90">
              <Wallet size={14} className="mr-1" /> Saldo
            </Button>
            
            <ProfileDropdown />
          </div>
        </div>
        
        {/* Mobile Insights */}
        <div className="md:hidden px-4 py-2 mt-14">
          <div className="bg-[#1A1E1D]/50 rounded-lg p-3">
            <AnimatedInsights />
          </div>
        </div>
        
        {/* Main content with side-by-side layout */}
        <main className="pt-4 md:pt-[70px] pb-8 px-4 md:px-6 md:pl-[280px] w-full min-h-screen flex flex-col lg:flex-row gap-4">
          {/* Left side: Roulette cards */}
          <div className="w-full lg:w-2/3 lg:pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {filteredRoulettes.map((roulette, index) => (
                <div key={index} className="h-full">
                  <RouletteCard 
                    {...roulette} 
                    isSelected={selectedRoulette.name === roulette.name}
                    onClick={() => handleCardClick(roulette)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side: Statistics panel */}
          <div className="w-full lg:w-1/3 mt-2 lg:pl-4 lg:border-l lg:border-white/10">
            <div className="sticky top-[85px]">
              {selectedRoulette && (
                <RouletteStatsPanel 
                  name={selectedRoulette.name}
                  lastNumbers={selectedRoulette.lastNumbers}
                  wins={selectedRoulette.wins}
                  losses={selectedRoulette.losses}
                  onOpenFullStats={handleOpenFullStats}
                />
              )}
            </div>
          </div>
          
          <div className="h-16 md:h-0"></div>
        </main>
      </div>
      
      {/* Fixed Chat UI (desktop & mobile) */}
      <ChatUI />
      
      {/* Mobile Chat (drawer) */}
      <ChatUI isOpen={chatOpen} onClose={() => setChatOpen(false)} isMobile={true} />
      
      {/* Stats Dialog */}
      {selectedRoulette && (
        <RouletteStatsDialog 
          open={statsOpen} 
          onOpenChange={setStatsOpen} 
          name={selectedRoulette.name}
          lastNumbers={selectedRoulette.lastNumbers}
          wins={selectedRoulette.wins}
          losses={selectedRoulette.losses}
          trend={selectedRoulette.trend}
        />
      )}
    </div>
  );
};

export default Index;
