
import { useState } from 'react';
import { 
  CircleDollarSign, Rocket, Heart, Gift, Ticket, Trophy, Users, 
  BarChart3, Scale, LifeBuoy, ChevronRight, ChevronDown, Gamepad2, Flame
} from 'lucide-react';

const Sidebar = () => {
  const [otherExpanded, setOtherExpanded] = useState(false);
  
  return (
    <div className="h-screen w-64 bg-vegas-darkgray border-r border-border flex flex-col animate-slide-right">
      <div className="p-3 mt-20">
        <div className="space-y-1">
          <div className="menu-item active">
            <Gamepad2 size={20} className="text-vegas-green" />
            <span>Slots</span>
          </div>
          
          <div className="menu-item">
            <Flame size={20} className="text-vegas-blue" />
            <span>Casino ao Vivo</span>
          </div>
          
          <div className="menu-item">
            <Heart size={20} className="text-vegas-red" />
            <span>Favoritos</span>
          </div>
          
          <div className="menu-item">
            <Gift size={20} className="text-vegas-gold" />
            <span>Bônus</span>
          </div>
          
          <div className="menu-item">
            <Ticket size={20} />
            <span>Código Promocional</span>
          </div>
          
          <div className="menu-item">
            <Trophy size={20} className="text-vegas-gold" />
            <span>Programa de Fidelidade</span>
          </div>
          
          <div className="menu-item">
            <Users size={20} className="text-vegas-blue" />
            <span>Programa de Indicação</span>
          </div>
          
          <div className="menu-item">
            <CircleDollarSign size={20} className="text-vegas-green" />
            <span>Loteria</span>
          </div>
          
          <div 
            className="menu-item"
            onClick={() => setOtherExpanded(!otherExpanded)}
          >
            <Rocket size={20} />
            <span>Outros</span>
            {otherExpanded ? <ChevronDown size={16} className="ml-auto" /> : <ChevronRight size={16} className="ml-auto" />}
          </div>
          
          {otherExpanded && (
            <div className="ml-5 space-y-1">
              <div className="menu-item">
                <BarChart3 size={18} />
                <span>Estatísticas</span>
              </div>
              <div className="menu-item">
                <Scale size={18} />
                <span>Jogo Justo</span>
              </div>
              <div className="menu-item">
                <LifeBuoy size={18} />
                <span>Suporte</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
