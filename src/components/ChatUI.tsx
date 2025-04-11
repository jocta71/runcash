
import React, { useState } from 'react';
import ChatHeader from './chat/ChatHeader';
import ChatMessageList from './chat/ChatMessageList';
import ChatInput from './chat/ChatInput';
import { ChatMessage } from './chat/types';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface ChatUIProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const ChatUI = ({ isOpen = false, onClose, isMobile = false }: ChatUIProps) => {
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
  const [minimized, setMinimized] = useState(false);
  
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

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  // Styles for mobile vs desktop
  const chatClasses = isMobile
    ? "fixed inset-0 bg-vegas-darkgray z-50 flex flex-col"
    : minimized
      ? "fixed bottom-0 right-4 w-80 flex flex-col bg-vegas-darkgray z-50 border border-[#33333359] rounded-t-xl shadow-lg"
      : "fixed bottom-0 right-4 h-[500px] max-h-[80vh] w-80 flex flex-col bg-vegas-darkgray z-50 border border-[#33333359] rounded-t-xl shadow-lg";
  
  // For mobile, if it's not open, don't render
  if (isMobile && !isOpen) return null;
  
  return (
    <div className={chatClasses}>
      <div className="flex justify-between items-center p-2 bg-[#1A191F] border-b border-[#33333359] cursor-pointer" onClick={toggleMinimize}>
        <div className="flex-1">
          {!minimized && <ChatHeader />}
          {minimized && <h3 className="text-white font-medium ml-2">Chat ao Vivo</h3>}
        </div>
        <div className="flex items-center">
          <button onClick={toggleMinimize} className="p-1 rounded-md text-gray-400 hover:text-white">
            {minimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {isMobile && (
            <button onClick={onClose} className="p-1 ml-1 rounded-md text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      
      {!minimized && (
        <>
          <ChatMessageList messages={messages} />
          <ChatInput 
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
          />
        </>
      )}
    </div>
  );
};

export default ChatUI;
