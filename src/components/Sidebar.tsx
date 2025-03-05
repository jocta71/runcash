
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
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Gamepad2 size={18} className="text-white" />
                </div>
                <span>Slots</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Flame size={18} className="text-white" />
                </div>
                <span>Live casino</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Heart size={18} className="text-white" />
                </div>
                <span>Favourites</span>
              </div>
            </div>
          </div>
          
          {/* Bonuses Section */}
          <div>
            <h3 className="text-gray-500 text-xs font-medium px-4 mb-2">Bonuses</h3>
            <div className="space-y-1">
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Gift size={18} className="text-green-500" />
                </div>
                <span>Promocode</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Trophy size={18} className="text-white" />
                </div>
                <span>Loyalty program</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Users size={18} className="text-white" />
                </div>
                <span>Referal program</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <CircleDollarSign size={18} className="text-white" />
                </div>
                <span>Lottery</span>
              </div>
            </div>
          </div>
          
          {/* Other Section */}
          <div>
            <h3 className="text-gray-500 text-xs font-medium px-4 mb-2">Other</h3>
            <div className="space-y-1">
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <BarChart3 size={18} className="text-white" />
                </div>
                <span>Statistics</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <Scale size={18} className="text-white" />
                </div>
                <span>Provably fair</span>
              </div>
              
              <div className="menu-item">
                <div className="bg-[#1A191F] p-1.5 rounded-md">
                  <LifeBuoy size={18} className="text-white" />
                </div>
                <span>Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer buttons */}
        <div className="space-y-2 mt-auto">
          <div className="bg-[#22202a] rounded-md p-2 flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
            <div className="bg-[#1A191F] p-1 rounded-md">
              <Send size={18} className="text-gray-400" />
            </div>
            <span className="text-gray-300">Telegram</span>
          </div>
          
          <div className="bg-[#22202a] rounded-md p-2 flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex items-center gap-2">
              <div className="bg-[#1A191F] p-1 rounded-md">
                <Globe size={18} className="text-gray-400" />
              </div>
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
