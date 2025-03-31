
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Target, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Strategy } from "./types";
import RouletteNumber from "@/components/roulette/RouletteNumber";

interface StrategyCardProps {
  strategy: Strategy;
  onEdit: (strategy: Strategy) => void;
  onDelete: (id: string) => void;
}

const StrategyCard = ({ strategy, onEdit, onDelete }: StrategyCardProps) => {
  return (
    <Card className="bg-[#1A191F] border-[#33333359] text-white">
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
            <Badge variant="outline" className="bg-[#2A2933] border-none">
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
          onClick={() => onEdit(strategy)}
        >
          <Edit className="mr-2 h-4 w-4" /> Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-[#33333359] text-gray-300 hover:text-white hover:bg-[#33333330]"
          onClick={() => onDelete(strategy.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" /> Excluir
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StrategyCard;
