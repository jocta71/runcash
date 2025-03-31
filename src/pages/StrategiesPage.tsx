
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Target, ArrowRight, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { numberGroups, strategies } from "@/components/roulette/constants";
import Sidebar from "@/components/Sidebar";
import ChatUI from "@/components/ChatUI";
import RouletteNumber from "@/components/roulette/RouletteNumber";

interface Strategy {
  id: string;
  name: string;
  description: string;
  roulette: string;
  numbers: number[];
  color: string;
}

const defaultStrategies: Strategy[] = [
  {
    id: "1",
    name: "Estratégia Pares",
    description: "Apostando em números pares",
    roulette: "Qualquer",
    numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
    color: "bg-purple-600"
  },
  {
    id: "2",
    name: "Grupo 123",
    description: "Apostando no grupo 123",
    roulette: "Roleta Europeia",
    numbers: [1, 2, 3, 11, 12, 13, 21, 22, 23, 31, 32, 33],
    color: "bg-blue-600"
  }
];

const StrategiesPage = () => {
  const [userStrategies, setUserStrategies] = useState<Strategy[]>(defaultStrategies);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState<Strategy | null>(null);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      roulette: "Qualquer",
      color: "bg-purple-600"
    }
  });

  const availableNumbers = Array.from({ length: 37 }, (_, i) => i);
  const availableColors = [
    { name: "Roxo", value: "bg-purple-600" },
    { name: "Azul", value: "bg-blue-600" },
    { name: "Verde", value: "bg-emerald-600" },
    { name: "Âmbar", value: "bg-amber-600" },
    { name: "Rosa", value: "bg-rose-600" }
  ];

  const handleAddStrategy = () => {
    setIsEditing(true);
    setCurrentStrategy(null);
    setSelectedNumbers([]);
    form.reset({
      name: "",
      description: "",
      roulette: "Qualquer",
      color: "bg-purple-600"
    });
  };

  const handleEditStrategy = (strategy: Strategy) => {
    setIsEditing(true);
    setCurrentStrategy(strategy);
    setSelectedNumbers(strategy.numbers);
    form.reset({
      name: strategy.name,
      description: strategy.description,
      roulette: strategy.roulette,
      color: strategy.color
    });
  };

  const handleDeleteStrategy = (id: string) => {
    setUserStrategies(userStrategies.filter(strategy => strategy.id !== id));
    toast({
      title: "Estratégia excluída",
      description: "A estratégia foi excluída com sucesso",
    });
  };

  const toggleNumber = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const applyTemplateStrategy = (strategyTemplate: typeof strategies[0]) => {
    setSelectedNumbers(strategyTemplate.numbers);
    form.setValue("color", strategyTemplate.color);
  };

  const applyNumberGroup = (groupKey: string) => {
    const group = numberGroups[groupKey as keyof typeof numberGroups];
    setSelectedNumbers(group.numbers);
  };

  const onSubmit = (values: any) => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um número para sua estratégia",
        variant: "destructive"
      });
      return;
    }

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
    setSelectedNumbers([]);
    form.reset();
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
                <Card key={strategy.id} className="bg-[#1A191F] border-[#33333359] text-white">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-[#00ff00]" />
                          {strategy.name}
                        </CardTitle>
                        <CardDescription className="text-gray-400 mt-1">
                          {strategy.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-[#2A2933] border-none">
                        {strategy.roulette}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 my-3">
                      {strategy.numbers.sort((a, b) => a - b).slice(0, 12).map((number) => (
                        <RouletteNumber 
                          key={number} 
                          number={number} 
                          className={`${strategy.color} border border-[#33333359]`}
                        />
                      ))}
                      {strategy.numbers.length > 12 && (
                        <Badge variant="outline" className="flex items-center bg-[#2A2933] border-none">
                          +{strategy.numbers.length - 12} números
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#33333359] text-gray-300 hover:text-white hover:bg-[#33333330]"
                      onClick={() => handleEditStrategy(strategy)}
                    >
                      <Edit className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#33333359] text-gray-300 hover:text-white hover:bg-[#33333330]"
                      onClick={() => handleDeleteStrategy(strategy.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Excluir
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-[#1A191F] border-[#33333359] text-white">
              <CardHeader>
                <CardTitle>{currentStrategy ? "Editar Estratégia" : "Nova Estratégia"}</CardTitle>
                <CardDescription>
                  {currentStrategy 
                    ? "Modifique sua estratégia existente" 
                    : "Crie uma estratégia personalizada para suas apostas"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome da Estratégia</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: Minha Estratégia de Pares" 
                                {...field} 
                                className="bg-[#2A2933] border-[#33333359] text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="roulette"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roleta Alvo</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-[#2A2933] border-[#33333359] text-white">
                                  <SelectValue placeholder="Selecione uma roleta" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-[#2A2933] border-[#33333359] text-white">
                                <SelectItem value="Qualquer">Qualquer Roleta</SelectItem>
                                <SelectItem value="Roleta Brasileira">Roleta Brasileira</SelectItem>
                                <SelectItem value="Roleta Europeia">Roleta Europeia</SelectItem>
                                <SelectItem value="Roleta Americana">Roleta Americana</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Descreva a lógica da sua estratégia" 
                              {...field} 
                              className="bg-[#2A2933] border-[#33333359] text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cor da Estratégia</FormLabel>
                          <div className="flex flex-wrap gap-2">
                            {availableColors.map((color) => (
                              <div 
                                key={color.value}
                                className={`w-8 h-8 rounded-full cursor-pointer transition-all ${color.value} ${field.value === color.value ? 'ring-2 ring-[#00ff00] ring-offset-2 ring-offset-[#1A191F]' : 'opacity-70'}`}
                                onClick={() => form.setValue("color", color.value)}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <h3 className="text-lg font-medium mb-2">Números da Estratégia</h3>
                      
                      <Tabs defaultValue="custom">
                        <TabsList className="bg-[#2A2933] border-[#33333359]">
                          <TabsTrigger value="custom">Personalizado</TabsTrigger>
                          <TabsTrigger value="templates">Modelos</TabsTrigger>
                          <TabsTrigger value="groups">Grupos</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="custom" className="mt-4">
                          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-2 mb-4">
                            {availableNumbers.map((number) => (
                              <div 
                                key={number}
                                onClick={() => toggleNumber(number)}
                                className={`
                                  w-8 h-8 flex items-center justify-center rounded-full cursor-pointer
                                  ${selectedNumbers.includes(number) 
                                    ? form.getValues().color + ' text-white' 
                                    : 'bg-[#2A2933] text-gray-400'}
                                  ${number === 0 ? 'bg-green-600 text-white' : ''}
                                  transition-all hover:opacity-80
                                `}
                              >
                                {number}
                              </div>
                            ))}
                          </div>
                          <div className="text-sm text-gray-400">
                            {selectedNumbers.length} números selecionados
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="templates" className="mt-4">
                          <div className="space-y-4">
                            {strategies.map((strategy, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-[#2A2933] rounded-lg cursor-pointer hover:bg-[#33333350]"
                                onClick={() => applyTemplateStrategy(strategy)}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full ${strategy.color}`}></div>
                                  <span>{strategy.name}</span>
                                  <Badge variant="outline" className="bg-transparent border-gray-500">
                                    {strategy.numbers.length} números
                                  </Badge>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="groups" className="mt-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Object.entries(numberGroups).map(([key, group]) => (
                              <div
                                key={key}
                                className="flex items-center justify-between p-3 bg-[#2A2933] rounded-lg cursor-pointer hover:bg-[#33333350]"
                                onClick={() => applyNumberGroup(key)}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`w-4 h-4 rounded-full ${group.color.split(' ')[0]}`}></div>
                                  <span>{group.name}</span>
                                  <div className="flex gap-1">
                                    {group.numbers.map(num => (
                                      <span key={num} className="text-xs text-gray-400">{num}</span>
                                    ))}
                                  </div>
                                </div>
                                <ArrowRight size={16} className="text-gray-400" />
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  
                    <div className="flex justify-end gap-2 pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setIsEditing(false);
                          setCurrentStrategy(null);
                        }}
                        className="border-[#33333359] text-gray-300 hover:text-white hover:bg-[#33333330]"
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-[#00ff00] text-black hover:bg-[#00dd00]">
                        <Save className="mr-2 h-4 w-4" />
                        {currentStrategy ? "Atualizar Estratégia" : "Salvar Estratégia"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
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
