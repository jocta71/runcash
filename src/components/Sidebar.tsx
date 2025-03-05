
import { useState } from 'react';
import { CircleDollarSign, Rocket, Heart, Gift, Ticket, Trophy, Users, BarChart3, Scale, LifeBuoy, ChevronDown, Gamepad2, Flame, Globe, Send } from 'lucide-react';

const Sidebar = () => {
  const [otherExpanded, setOtherExpanded] = useState(false);

  return (
    <div className="h-screen fixed top-0 left-0 w-64 hidden md:flex flex-col animate-slide-right z-40 bg-[#0B0A0F]">
      <div className="p-3 flex flex-col h-full justify-between">
        <div className="space-y-6">
          {/* Games Section */}
          <div>
            <h3 className="text-gray-500 text-xs font-medium px-4 mb-2">Games</h3>
            <div className="space-y-1">
              <div className="menu-item active">
                <Gamepad2 size={18} className="text-white" />
                <span>Slots</span>
              </div>
              
              <div className="menu-item">
                <Flame size={18} className="text-white" />
                <span>Live casino</span>
              </div>
              
              <div className="menu-item">
                <Heart size={18} className="text-white" />
                <span>Favourites</span>
              </div>
            </div>
          </div>
          
          {/* Bonuses Section */}
          <div>
            <h3 className="text-gray-500 text-xs font-medium px-4 mb-2">Bonuses</h3>
            <div className="space-y-1">
              <div className="menu-item">
                <Gift size={18} className="text-green-500" />
                <span>Promocode</span>
              </div>
              
              <div className="menu-item">
                <Trophy size={18} className="text-white" />
                <span>Loyalty program</span>
              </div>
              
              <div className="menu-item">
                <Users size={18} className="text-white" />
                <span>Referal program</span>
              </div>
              
              <div className="menu-item">
                <CircleDollarSign size={18} className="text-white" />
                <span>Lottery</span>
              </div>
            </div>
          </div>
          
          {/* Other Section */}
          <div>
            <h3 className="text-gray-500 text-xs font-medium px-4 mb-2">Other</h3>
            <div className="space-y-1">
              <div className="menu-item">
                <BarChart3 size={18} className="text-white" />
                <span>Statistics</span>
              </div>
              
              <div className="menu-item">
                <Scale size={18} className="text-white" />
                <span>Provably fair</span>
              </div>
              
              <div className="menu-item">
                <LifeBuoy size={18} className="text-white" />
                <span>Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer buttons */}
        <div className="space-y-2 mt-auto">
          <div className="bg-[#22202a] rounded-md p-2 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
            <Send size={18} className="text-gray-400" />
            <span className="text-gray-300">Telegram</span>
          </div>
          
          <div className="bg-[#22202a] rounded-md p-2 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-gray-400" />
              <span className="text-gray-300">English</span>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
