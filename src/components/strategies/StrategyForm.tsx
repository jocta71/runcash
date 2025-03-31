
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { strategies, numberGroups } from "@/components/roulette/constants";
import { Strategy, availableColors } from "./types";

interface StrategyFormProps {
  currentStrategy: Strategy | null;
  onSubmit: (values: any, selectedNumbers: number[]) => void;
  onCancel: () => void;
}

const StrategyForm = ({ currentStrategy, onSubmit, onCancel }: StrategyFormProps) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>(
    currentStrategy?.numbers || []
  );
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: currentStrategy?.name || "",
      description: currentStrategy?.description || "",
      roulette: currentStrategy?.roulette || "Qualquer",
      color: currentStrategy?.color || "bg-purple-600"
    }
  });

  const availableNumbers = Array.from({ length: 37 }, (_, i) => i);

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

  const handleSubmit = (values: any) => {
    if (selectedNumbers.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um número para sua estratégia",
        variant: "destructive"
      });
      return;
    }

    onSubmit(values, selectedNumbers);
  };

  return (
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
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                onClick={onCancel}
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
  );
};

export default StrategyForm;
