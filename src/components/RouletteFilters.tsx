
import React from 'react';
import { Filter, TrendingUp, Clock, Award, CheckCircle, ArrowLeftRight, Hash, Columns, ListOrdered, Waves, Copy } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

export type FilterType = 'all' | 'trending' | 'recent' | 'high-win-rate' | 'verified';

export interface AdvancedFilters {
  realTime: boolean;
  creation: boolean;
  reverseDirection: boolean;
  numbered: boolean;
  countColumns: boolean;
  countLines: boolean;
  surf: boolean;
  multipleSelection: string | null;
}

interface RouletteFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  advancedFilters: AdvancedFilters;
  onAdvancedFilterChange: (name: keyof AdvancedFilters, value: boolean | string | null) => void;
  className?: string;
}

const RouletteFilters = ({ 
  activeFilter, 
  onFilterChange, 
  advancedFilters, 
  onAdvancedFilterChange, 
  className 
}: RouletteFiltersProps) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <Tabs 
        defaultValue={activeFilter} 
        value={activeFilter}
        onValueChange={(value) => onFilterChange(value as FilterType)}
        className="w-full"
      >
        <TabsList className="w-full bg-[#1A191F] h-auto p-1 space-x-1 flex flex-wrap justify-start md:justify-center">
          <TabsTrigger 
            value="all" 
            className="text-xs md:text-sm py-1.5 rounded-md data-[state=active]:bg-[#00ff00] data-[state=active]:text-black"
          >
            <Filter size={14} className="mr-1.5" />
            <span>Todas</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="trending" 
            className="text-xs md:text-sm py-1.5 rounded-md data-[state=active]:bg-[#00ff00] data-[state=active]:text-black"
          >
            <TrendingUp size={14} className="mr-1.5" />
            <span>Em Alta</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="recent" 
            className="text-xs md:text-sm py-1.5 rounded-md data-[state=active]:bg-[#00ff00] data-[state=active]:text-black"
          >
            <Clock size={14} className="mr-1.5" />
            <span>Recentes</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="high-win-rate" 
            className="text-xs md:text-sm py-1.5 rounded-md data-[state=active]:bg-[#00ff00] data-[state=active]:text-black"
          >
            <Award size={14} className="mr-1.5" />
            <span>Maior Taxa de Ganho</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="verified" 
            className="text-xs md:text-sm py-1.5 rounded-md data-[state=active]:bg-[#00ff00] data-[state=active]:text-black"
          >
            <CheckCircle size={14} className="mr-1.5" />
            <span>Verificadas</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Advanced Filters Section - based on the provided images */}
      <div className="bg-gray-100 dark:bg-[#1A191F] rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* First Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Tempo real</span>
            <Switch 
              checked={advancedFilters.realTime} 
              onCheckedChange={(checked) => onAdvancedFilterChange('realTime', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Criação</span>
            <Switch 
              checked={advancedFilters.creation} 
              onCheckedChange={(checked) => onAdvancedFilterChange('creation', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Sentido inverso</span>
            <Switch 
              checked={advancedFilters.reverseDirection} 
              onCheckedChange={(checked) => onAdvancedFilterChange('reverseDirection', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">Numerado</span>
            <Switch 
              checked={advancedFilters.numbered} 
              onCheckedChange={(checked) => onAdvancedFilterChange('numbered', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
          </div>
          
          {/* Second Row */}
          <div className="flex items-center gap-2">
            <Switch 
              checked={advancedFilters.countColumns} 
              onCheckedChange={(checked) => onAdvancedFilterChange('countColumns', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Contar colunas</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch 
              checked={advancedFilters.countLines} 
              onCheckedChange={(checked) => onAdvancedFilterChange('countLines', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Contar linhas</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch 
              checked={advancedFilters.surf} 
              onCheckedChange={(checked) => onAdvancedFilterChange('surf', checked)}
              className="data-[state=checked]:bg-[#00ff00]"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Surf</span>
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 h-8">
                  <Copy size={14} className="mr-2" />
                  Múltipla seleção
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[9999] bg-white dark:bg-[#1e1d24] border-gray-200 dark:border-gray-800">
                <DropdownMenuItem 
                  onClick={() => onAdvancedFilterChange('multipleSelection', 'same-number')}
                  className={cn(
                    "cursor-pointer text-sm",
                    advancedFilters.multipleSelection === 'same-number' ? "bg-gray-100 dark:bg-gray-800" : ""
                  )}
                >
                  Mesmo número
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onAdvancedFilterChange('multipleSelection', 'same-color')}
                  className={cn(
                    "cursor-pointer text-sm",
                    advancedFilters.multipleSelection === 'same-color' ? "bg-gray-100 dark:bg-gray-800" : ""
                  )}
                >
                  Mesma cor
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onAdvancedFilterChange('multipleSelection', 'same-hour')}
                  className={cn(
                    "cursor-pointer text-sm",
                    advancedFilters.multipleSelection === 'same-hour' ? "bg-gray-100 dark:bg-gray-800" : ""
                  )}
                >
                  Mesma hora
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onAdvancedFilterChange('multipleSelection', 'same-minute')}
                  className={cn(
                    "cursor-pointer text-sm",
                    advancedFilters.multipleSelection === 'same-minute' ? "bg-gray-100 dark:bg-gray-800" : ""
                  )}
                >
                  Mesmo minuto
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onAdvancedFilterChange('multipleSelection', null)}
                  className="cursor-pointer text-sm"
                >
                  NÃO destacar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteFilters;
