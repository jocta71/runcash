import { useState, useMemo } from 'react';
import { Search, Wallet, ChevronDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RouletteCard from '@/components/RouletteCard';
import { Input } from '@/components/ui/input';
import ChatUI from '@/components/ChatUI';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AnimatedInsights from '@/components/AnimatedInsights';

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
  lastNumbers: [7, 11, 23, 5, 18],
  wins: 150,
  losses: 50,
  trend: Array.from({
    length: 20
  }, () => ({
    value: Math.random() * 100
  }))
}, {
  name: "Roleta Europeia",
  lastNumbers: [32, 15, 3, 26, 8],
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
  const filteredRoulettes = mockRoulettes.filter(roulette => roulette.name.toLowerCase().includes(search.toLowerCase()));
  const topRoulettes = useMemo(() => {
    return [...mockRoulettes].sort((a, b) => {
      const aWinRate = a.wins / (a.wins + a.losses) * 100;
      const bWinRate = b.wins / (b.wins + b.losses) * 100;
      return bWinRate - aWinRate;
    }).slice(0, 3);
  }, []);

  return <div className="min-h-screen flex bg-vegas-black">
      <Sidebar />
      
      <div className="flex-1 relative">
        <div className="fixed top-0 left-0 right-0 md:left-64 md:right-80 z-50 h-[56px] flex items-center justify-between px-4 border-b border-vegas-darkgray/70 bg-[#100f13]">
          <div className="flex items-center gap-2">
            <span className="text-white text-2xl font-bold">Vega</span>
            <div className="relative flex items-center ml-4 max-w-[180px]">
              <Search size={14} className="absolute left-2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Pesquisar roleta..." 
                className="h-8 pl-7 py-1 pr-2 text-xs bg-gray-800 border-none rounded-full text-white focus-visible:ring-0 focus-visible:ring-offset-0" 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <AnimatedInsights />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#222222] rounded-full py-1 px-3">
              <span className="h-5 w-5 bg-vegas-blue rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white">₱</span>
              </span>
              <span className="text-white text-xs">342,203,561.23</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
            
            <Button variant="default" size="sm" className="h-8 bg-vegas-green text-black font-medium">
              <Wallet size={14} className="mr-1" /> Wallet
            </Button>
            
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-vegas-darkgray">
                <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown size={12} className="text-gray-400" />
              
              <div className="h-8 w-8 bg-vegas-green/20 rounded-full flex items-center justify-center ml-1">
                <span className="text-vegas-green font-bold text-xs">3</span>
              </div>
            </div>
          </div>
        </div>
        
        <main className="pt-[56px] w-full overflow-y-auto md:mr-80">
          <div className="p-6 flex flex-col h-full bg-[#100f13]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
              {filteredRoulettes.map((roulette, index) => <RouletteCard key={index} {...roulette} />)}
            </div>
          </div>
        </main>
      </div>
      
      <ChatUI />
    </div>;
};

export default Index;
