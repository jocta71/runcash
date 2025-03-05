
import { 
  Bell, User, Wallet, Settings, LogOut, Info, ChevronDown, Menu, TrendingUp, Trophy, Flame,
  ArrowLeft, ArrowRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface NavbarProps {
  topRoulettes?: {
    name: string;
    wins: number;
    losses: number;
  }[];
}

const Navbar = ({ topRoulettes = [] }: NavbarProps) => {
  const [currentView, setCurrentView] = useState<'hot' | 'trending' | 'new'>('hot');
  const [isAnimating, setIsAnimating] = useState(false);

  const rotateView = (direction: 'next' | 'prev') => {
    setIsAnimating(true);
    setTimeout(() => {
      if (direction === 'next') {
        if (currentView === 'hot') setCurrentView('trending');
        else if (currentView === 'trending') setCurrentView('new');
        else setCurrentView('hot');
      } else {
        if (currentView === 'hot') setCurrentView('new');
        else if (currentView === 'trending') setCurrentView('hot');
        else setCurrentView('trending');
      }
      setIsAnimating(false);
    }, 300);
  };

  // Auto-rotate views every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      rotateView('next');
    }, 10000);
    
    return () => clearInterval(timer);
  }, [currentView]);

  // Title and data based on current view
  const viewData = {
    hot: {
      title: "Hot Roletas",
      icon: <TrendingUp size={18} className="text-vegas-green" />,
      data: topRoulettes
    },
    trending: {
      title: "Tendências",
      icon: <Flame size={18} className="text-vegas-gold" />,
      data: topRoulettes.sort((a, b) => (b.wins - b.losses) - (a.wins - a.losses))
    },
    new: {
      title: "Novas Roletas",
      icon: <Trophy size={18} className="text-vegas-blue" />,
      data: [...topRoulettes].sort(() => Math.random() - 0.5) // Just for demo purposes
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-vegas-darkgray border-b border-border z-30">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="md:hidden p-2">
            <Menu size={24} />
          </Button>
          <span className="text-2xl font-bold text-vegas-green">Vega</span>
        </div>
        
        {/* Status Section with Animation - Removed overflow */}
        <div className="hidden md:flex items-center gap-3 mx-4 relative max-w-3xl bg-vegas-darkgray/60 px-3 py-1 rounded-lg border border-vegas-green/20">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 shrink-0" 
            onClick={() => rotateView('prev')}
          >
            <ArrowLeft size={16} />
          </Button>
          
          <div className="flex items-center gap-2 min-w-[110px] shrink-0">
            {viewData[currentView].icon}
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {viewData[currentView].title}:
            </span>
          </div>
          
          <div className={`flex items-center gap-2 transition-all duration-300 ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <TooltipProvider>
              {viewData[currentView].data.slice(0, 5).map((roulette, index) => {
                const winRate = ((roulette.wins / (roulette.wins + roulette.losses)) * 100).toFixed(1);
                const profit = roulette.wins - roulette.losses;
                
                let colorClass = "text-vegas-green bg-vegas-green/10 hover:bg-vegas-green/20";
                if (index === 0) colorClass = "text-vegas-gold bg-vegas-gold/10 hover:bg-vegas-gold/20";
                else if (index === 1) colorClass = "text-vegas-blue bg-vegas-blue/10 hover:bg-vegas-blue/20";
                
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Badge 
                        variant="outline" 
                        className={`flex items-center gap-1 cursor-pointer animate-fade-in ${colorClass}`}
                      >
                        {index === 0 ? (
                          <Trophy size={14} className="animate-pulse" />
                        ) : (
                          <Flame size={14} className="animate-pulse" />
                        )}
                        <span className="truncate max-w-[100px]">{roulette.name}</span>
                        <span className="font-bold">{winRate}%</span>
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <p className="font-bold">{roulette.name}</p>
                        <p className="text-xs">Taxa de Vitória: {winRate}%</p>
                        <p className="text-xs">Vitórias: {roulette.wins} | Derrotas: {roulette.losses}</p>
                        <p className="text-xs">Lucro: {profit > 0 ? '+' : ''}{profit} pontos</p>
                        <p className="text-xs">Tendência: {profit > 20 ? '🔥 Alta' : profit > 0 ? '📈 Positiva' : '📉 Negativa'}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </TooltipProvider>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 shrink-0 ml-auto" 
            onClick={() => rotateView('next')}
          >
            <ArrowRight size={16} />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            className="hover-neon-blue items-center gap-2 hidden sm:flex"
          >
            <Info size={18} />
            <span>Regras</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover-neon-green flex items-center gap-1 sm:gap-2">
                <Wallet size={18} />
                <span className="hidden sm:inline">R$ 1.000,00</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-vegas-darkgray border-vegas-green">
              <DropdownMenuItem>Depósito</DropdownMenuItem>
              <DropdownMenuItem>Saque</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Histórico</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" className="hover-neon-gold relative">
            <Bell size={20} className="animate-bell-shake" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-vegas-gold rounded-full text-[10px] flex items-center justify-center text-black font-bold">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover-scale">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-vegas-darkgray">
              <DropdownMenuItem>
                <User size={16} className="mr-2" /> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={16} className="mr-2" /> Configurações
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Wallet size={16} className="mr-2" /> Depósito
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-vegas-red">
                <LogOut size={16} className="mr-2" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
