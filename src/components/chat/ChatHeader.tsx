
import React from 'react';
import { User } from 'lucide-react';

const ChatHeader = () => {
  return (
    <div className="p-4 h-[70px] border-b border-[#33333359] flex items-center justify-between bg-[#0b0a0f]">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-[#1A191F] rounded-md flex items-center justify-center">
          <span className="text-xs text-white">#</span>
        </div>
        <h2 className="font-medium text-white">Rules</h2>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="p-1 bg-[#1A191F] rounded-md">
            <User size={14} className="text-vegas-green" />
          </div>
          <span className="text-xs text-vegas-green">3,331</span>
        </div>
        <div className="text-gray-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
