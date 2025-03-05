
import React, { useState } from 'react';
import { Send, User, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ChatMessage {
  id: number;
  sender: string;
  message: string;
  isAdmin?: boolean;
  isModerator?: boolean;
  avatar?: string;
  timestamp: Date;
}

const ChatUI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'Zé das Couves',
      message: 'Quando que vai ficar pronto, mano?',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    },
    {
      id: 2,
      sender: 'Fernandinha',
      message: 'Tô mó ansiedade pra jogar, viu?',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 60 * 4)
    },
    {
      id: 3,
      sender: 'Moderador',
      message: 'Galera, calma que já vai rolar!',
      isModerator: true,
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 60 * 3)
    },
    {
      id: 4,
      sender: 'Bia',
      message: 'Tô nem aí, só quero ganhar uma grana!',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 60 * 2)
    },
    {
      id: 5,
      sender: 'Juninho',
      message: 'Recebeu minha mensagem?',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 60 * 1)
    },
    {
      id: 6,
      sender: 'Admin',
      message: 'Cês falaram com o entregador? Mó vacilo, tá atrasado mais de uma hora!',
      isAdmin: true,
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 30)
    },
    {
      id: 7,
      sender: 'Robertão',
      message: 'Mano, esse app é show de bola!',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 20)
    },
    {
      id: 8,
      sender: 'Paty',
      message: 'Tá top demais, curti mesmo!',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 15)
    },
    {
      id: 9,
      sender: 'Dudinha',
      message: 'Blz',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 10)
    },
    {
      id: 10,
      sender: 'Matheuzinho',
      message: 'Fala aí, quando vai rolar a nova roleta?',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date(Date.now() - 1000 * 5)
    },
    {
      id: 11,
      sender: 'Você',
      message: 'Fala galera! Qual a boa?',
      avatar: '/lovable-uploads/433b5fd4-2378-47fe-9d10-276fead4ebce.png',
      timestamp: new Date()
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'Você',
        message: newMessage,
        timestamp: new Date()
      }
    ]);
    
    setNewMessage('');
  };
  
  return (
    <div className="fixed top-0 right-0 h-screen w-80 flex flex-col bg-vegas-darkgray z-50">
      <div className="p-4 h-[70px] border-b border-[#222222] flex items-center justify-between bg-[#0b0a0f]">
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
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-none bg-[#0b0a0f]">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="h-8 w-8 rounded-lg bg-gray-700 flex-shrink-0">
                {msg.isModerator ? (
                  <div className="h-8 w-8 rounded-lg bg-indigo-800 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-vegas-green" />
                  </div>
                ) : msg.isAdmin ? (
                  <div className="h-8 w-8 rounded-lg bg-[#1A191F] flex items-center justify-center">
                    <span className="text-vegas-gold text-xs">★</span>
                  </div>
                ) : (
                  <AvatarFallback className="bg-[#1A191F] text-xs text-white rounded-lg">
                    {msg.sender.substring(0, 2)}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className={`text-sm font-semibold ${msg.isModerator ? 'text-vegas-green' : msg.isAdmin ? 'text-vegas-gold' : 'text-white'}`}>
                {msg.sender}
              </span>
              {msg.isModerator && (
                <div className="flex items-center gap-1">
                  <span className="bg-vegas-green text-xs px-1.5 py-0.5 rounded text-black font-medium">Moderator</span>
                  <span className="text-purple-500">
                    <div className="p-1 bg-[#1A191F] rounded-md">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#8B5CF6" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </span>
                </div>
              )}
              {msg.isAdmin && (
                <span className="bg-vegas-gold text-xs px-1 rounded text-black">Admin</span>
              )}
            </div>
            <div className="ml-10">
              <p className={`text-sm text-gray-300 p-2 rounded-lg max-w-[85%] inline-block
                ${msg.isModerator 
                  ? 'bg-[#1A1625] border border-[#4D3A6B] shadow-[0_0_8px_0px_rgba(139,92,246,0.3)]' 
                  : msg.isAdmin 
                    ? 'bg-[#1e1c22] border border-vegas-gold/20' 
                    : 'bg-[#1e1c26]'}`}>
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-[#222222] bg-[#0b0a0f]">
        <div className="flex items-center gap-1 bg-[#1A191F] rounded-md px-2 py-1">
          <Input 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Hi guys! What are you doing?"
            className="border-none bg-transparent text-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 h-8 placeholder:text-gray-500"
          />
          <div className="p-1 bg-[#1A191F] rounded-md">
            <Button type="submit" size="icon" variant="ghost" className="h-6 w-6 text-vegas-green hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0">
              <Send size={14} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
