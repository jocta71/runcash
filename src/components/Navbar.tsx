
import { 
  Bell, User, Wallet, Settings, LogOut, Info, ChevronDown, Menu, TrendingUp, Trophy, Flame
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

interface NavbarProps {
  topRoulettes?: {
    name: string;
    wins: number;
    losses: number;
  }[];
}

const Navbar = ({ topRoulettes = [] }: NavbarProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-vegas-darkgray border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="md:hidden p-2">
            <Menu size={24} />
          </Button>
          <span className="text-2xl font-bold text-vegas-green">Vega</span>
        </div>
        
        {/* New Status Section */}
        <div className="hidden md:flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-vegas-green" />
            <span className="text-sm text-muted-foreground">Hot Roletas:</span>
          </div>
          
          <TooltipProvider>
            {topRoulettes.map((roulette, index) => {
              const winRate = ((roulette.wins / (roulette.wins + roulette.losses)) * 100).toFixed(1);
              const icon = index === 0 ? Trophy : Flame;
              const colorClass = index === 0 
                ? "text-vegas-gold bg-vegas-gold/10 hover:bg-vegas-gold/20"
                : "text-vegas-green bg-vegas-green/10 hover:bg-vegas-green/20";
              
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Badge 
                      variant="outline" 
                      className={`flex items-center gap-1 cursor-pointer animate-fade-in ${colorClass}`}
                    >
                      <icon size={14} className="animate-pulse" />
                      <span className="truncate max-w-[100px]">{roulette.name}</span>
                      <span className="font-bold">{winRate}%</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-1">
                      <p className="font-bold">{roulette.name}</p>
                      <p className="text-xs">Taxa de Vitória: {winRate}%</p>
                      <p className="text-xs">Vitórias: {roulette.wins} | Derrotas: {roulette.losses}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
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
