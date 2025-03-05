
import { 
  Bell, User, Wallet, Settings, LogOut, Info, ChevronDown, Menu 
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

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-vegas-darkgray border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="md:hidden p-2">
            <Menu size={24} />
          </Button>
          <span className="text-2xl font-bold text-vegas-green">Vega</span>
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
