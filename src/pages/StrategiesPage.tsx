
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Sidebar from "@/components/Sidebar";
import ChatUI from "@/components/ChatUI";
import StrategyCard from "@/components/strategies/StrategyCard";
import StrategyForm from "@/components/strategies/StrategyForm";
import { Strategy, defaultStrategies } from "@/components/strategies/types";

const StrategiesPage = () => {
  const [userStrategies, setUserStrategies] = useState<Strategy[]>(defaultStrategies);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState<Strategy | null>(null);
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddStrategy = () => {
    setIsEditing(true);
    setCurrentStrategy(null);
  };

  const handleEditStrategy = (strategy: Strategy) => {
    setIsEditing(true);
    setCurrentStrategy(strategy);
  };

  const handleDeleteStrategy = (id: string) => {
    setUserStrategies(userStrategies.filter(strategy => strategy.id !== id));
    toast({
      title: "Estratégia excluída",
      description: "A estratégia foi excluída com sucesso",
    });
  };

  const handleSubmitStrategy = (values: any, selectedNumbers: number[]) => {
    if (currentStrategy) {
      // Update existing strategy
      setUserStrategies(userStrategies.map(strategy => 
        strategy.id === currentStrategy.id 
          ? { ...strategy, ...values, numbers: selectedNumbers } 
          : strategy
      ));
      toast({
        title: "Estratégia atualizada",
        description: "Sua estratégia foi atualizada com sucesso"
      });
    } else {
      // Create new strategy
      const newStrategy: Strategy = {
        id: Date.now().toString(),
        ...values,
        numbers: selectedNumbers
      };
      setUserStrategies([...userStrategies, newStrategy]);
      toast({
        title: "Estratégia criada",
        description: "Sua nova estratégia foi criada com sucesso"
      });
    }
    
    setIsEditing(false);
    setCurrentStrategy(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentStrategy(null);
  };

  return (
    <div className="min-h-screen flex bg-vegas-black">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Sidebar (drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isMobile={true} />
      
      <div className="flex-1 relative">
        {/* Mobile Header */}
        <div className="mobile-header md:hidden">
          <Button 
            variant="ghost"
            className="p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Target size={24} className="text-[#00ff00]" />
          </Button>
          
          <div className="flex-1">
            <h1 className="text-white text-lg font-bold text-center">Minhas Estratégias</h1>
          </div>
          
          <Button 
            variant="ghost"
            onClick={() => setChatOpen(true)}
          >
            <PlusCircle size={24} className="text-[#00ff00]" />
          </Button>
        </div>
        
        <main className="pt-4 md:pt-[70px] pb-8 px-4 md:px-6 md:pl-[280px] md:pr-[340px] w-full min-h-screen bg-[#100f13]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white hidden md:block">Minhas Estratégias</h1>
            {!isEditing && (
              <Button onClick={handleAddStrategy} className="ml-auto bg-[#00ff00] text-black hover:bg-[#00dd00]">
                <PlusCircle className="mr-2 h-4 w-4" /> Nova Estratégia
              </Button>
            )}
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userStrategies.map((strategy) => (
                <StrategyCard 
                  key={strategy.id} 
                  strategy={strategy} 
                  onEdit={handleEditStrategy} 
                  onDelete={handleDeleteStrategy} 
                />
              ))}
            </div>
          ) : (
            <StrategyForm 
              currentStrategy={currentStrategy}
              onSubmit={handleSubmitStrategy}
              onCancel={handleCancelEdit}
            />
          )}
          
          <div className="h-16 md:h-0"></div>
        </main>
      </div>
      
      {/* Desktop Chat */}
      <ChatUI />
      
      {/* Mobile Chat (drawer) */}
      <ChatUI isOpen={chatOpen} onClose={() => setChatOpen(false)} isMobile={true} />
    </div>
  );
};

export default StrategiesPage;
