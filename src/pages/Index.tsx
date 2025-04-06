import { useState, useMemo, useCallback } from 'react';
import { Search, Wallet, Menu, MessageSquare, BarChart2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RouletteCard from '@/components/RouletteCard';
import { Input } from '@/components/ui/input';
import ChatUI from '@/components/ChatUI';
import { Button } from '@/components/ui/button';
import AnimatedInsights from '@/components/AnimatedInsights';
import ProfileDropdown from '@/components/ProfileDropdown';
import RouletteStatsDialog from '@/components/roulette/RouletteStatsDialog';

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar?: string;
    role?: string;
    isAdmin?: boolean;
    isModerator?: boolean;
  };
  message: string;
  timestamp: Date;
}

const mockRoulettes = [{
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
}];

const mockChatMessages: ChatMessage[] = [{
  id: '1',
  user: {
    name: 'Wade Warren',
    avatar: ''
  },
  message: 'when will it be ready?',
  timestamp: new Date()
}, {
  id: '2',
  user: {
    name: 'Leslie Alexander',
    avatar: ''
  },
  message: 'when will it be ready?',
  timestamp: new Date()
}, {
  id: '3',
  user: {
    name: 'Moderator',
    avatar: '',
    isModerator: true
  },
  message: 'when will it be ready?',
  timestamp: new Date()
}, {
  id: '4',
  user: {
    name: 'Eleanor Pena',
    avatar: ''
  },
  message: 'when will it be ready?',
  timestamp: new Date()
}, {
  id: '5',
  user: {
    name: 'Cody Fisher',
    avatar: ''
  },
  message: 'received?',
  timestamp: new Date()
}, {
  id: '6',
  user: {
    name: 'Anonymous Admin',
    avatar: '',
    isAdmin: true
  },
  message: 'Have you spoken to the delivery man? He is more than an hour late',
  timestamp: new Date()
}, {
  id: '7',
  user: {
    name: 'Robert Fox',
    avatar: ''
  },
  message: 'Great service.',
  timestamp: new Date()
}, {
  id: '8',
  user: {
    name: 'Savannah Nguyen',
    avatar: ''
  },
  message: 'tastes amazing!',
  timestamp: new Date()
}, {
  id: '9',
  user: {
    name: 'Arlene McCoy',
    avatar: ''
  },
  message: 'Ok',
  timestamp: new Date()
}, {
  id: '10',
  user: {
    name: 'Mummyland',
    avatar: ''
  },
  message: 'when will it be ready?',
  timestamp: new Date()
}, {
  id: '11',
  user: {
    name: 'You',
    avatar: ''
  },
  message: 'Hi guys! What are you doing?',
  timestamp: new Date()
}];

const Index = () => {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedRoulette, setSelectedRoulette] = useState(mockRoulettes[0]);
  const [statsOpen, setStatsOpen] = useState(false);
  
  const filteredRoulettes = mockRoulettes.filter(roulette => roulette.name.toLowerCase().includes(search.toLowerCase()));
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

  return (
    <div className="min-h-screen flex bg-vegas-black">
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
            <Menu size={24} className="text-[#00ff00]" />
          </button>
          
          <div className="flex-1"></div>
          
          <div className="flex items-center gap-2">
            {showMobileSearch ? (
              <div className="absolute top-0 left-0 right-0 z-50 p-2 bg-[#100f13] border-b border-[#33333359]">
                <div className="relative flex items-center w-full">
                  <Search size={16} className="absolute left-3 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Pesquisar roleta..." 
                    className="w-full pl-9 py-2 pr-3 text-sm bg-[#1A191F] border-none rounded-full text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
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
                  className="p-2 bg-[#1A191F] rounded-full"
                  onClick={() => setShowMobileSearch(true)}
                >
                  <Search size={16} className="text-gray-400" />
                </button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-8 text-black font-medium bg-gradient-to-b from-[#00ff00] to-[#00ff00] hover:from-[#00ff00]/90 hover:to-[#00ff00]/90"
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
              <MessageSquare size={24} className="text-[#00ff00]" />
            </button>
          </div>
        </div>
        
        {/* Desktop Header */}
        <div className="hidden md:flex fixed top-0 left-0 right-0 md:left-64 md:right-0 z-40 h-[70px] items-center justify-between px-4 border-b border-[#33333359] bg-[#100f13]">
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">RunCash</span>
            <div className="relative flex items-center ml-4 max-w-[180px]">
              <Search size={14} className="absolute left-2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Pesquisar roleta..." 
                className="h-8 pl-7 py-1 pr-2 text-xs bg-[#1A191F] border-none rounded-full text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
            </div>
          </div>
          
          <AnimatedInsights />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#1A191F] rounded-full py-1 px-3">
              <span className="h-5 w-5 bg-vegas-blue rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white">R$</span>
              </span>
              <span className="text-white text-xs">1.346,34</span>
              <Wallet size={14} className="text-gray-400" />
            </div>
            
            <Button variant="default" size="sm" className="h-8 text-black font-medium bg-gradient-to-b from-[#00ff00] to-[#00ff00] hover:from-[#00ff00]/90 hover:to-[#00ff00]/90">
              <Wallet size={14} className="mr-1" /> Saldo
            </Button>
            
            <ProfileDropdown />
          </div>
        </div>
        
        {/* Mobile Insights */}
        <div className="md:hidden px-4 py-2 mt-14">
          <div className="bg-[#1A191F]/50 rounded-lg p-3">
            <AnimatedInsights />
          </div>
        </div>
        
        {/* Main content with new side-by-side layout */}
        <main className="pt-4 md:pt-[70px] pb-8 px-4 md:px-6 md:pl-[280px] w-full min-h-screen bg-[#100f13] flex flex-col lg:flex-row">
          {/* Left side: Roulette cards */}
          <div className="w-full lg:w-2/3 lg:pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-6">
              {filteredRoulettes.map((roulette, index) => (
                <div key={index} onClick={() => handleCardClick(roulette)} className="cursor-pointer">
                  <RouletteCard {...roulette} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side: Statistics panel */}
          <div className="w-full lg:w-1/3 mt-6 lg:mt-2 lg:pl-4 lg:border-l lg:border-white/10">
            <div className="sticky top-[85px]">
              <div className="backdrop-filter backdrop-blur-sm border border-white/10 rounded-xl p-5 space-y-4 animate-fade-in h-auto bg-zinc-950">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#00ff00] flex items-center gap-2">
                    <BarChart2 size={18} />
                    Estatísticas
                  </h3>
                </div>
                
                {selectedRoulette && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-vegas-gold text-sm">{selectedRoulette.name}</h4>
                      <p className="text-xs text-gray-400">Clique para detalhes completos</p>
                      
                      <Button 
                        onClick={() => setStatsOpen(true)}
                        variant="outline" 
                        size="sm" 
                        className="mt-2 border-[#00ff00]/30 text-[#00ff00] hover:bg-[#00ff00]/10"
                      >
                        Ver estatísticas completas
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm text-white/80">Últimos números</h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {selectedRoulette.lastNumbers.slice(0, 12).map((num, idx) => (
                          <div 
                            key={idx} 
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                              ${num === 0 ? 'bg-vegas-green text-white' : 
                              [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(num) ? 
                              'bg-red-600 text-white' : 'bg-black text-white'}`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm text-white/80 mb-1">Taxa de vitória</h4>
                        <div className="text-[#00ff00] font-bold text-lg">
                          {((selectedRoulette.wins / (selectedRoulette.wins + selectedRoulette.losses)) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm text-white/80 mb-1">Total jogos</h4>
                        <div className="text-white font-bold text-lg">
                          {selectedRoulette.wins + selectedRoulette.losses}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="h-16 md:h-0"></div>
        </main>
      </div>
      
      {/* Desktop Chat */}
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
