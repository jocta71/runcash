
import React from 'react';
import { Filter, TrendingUp, Clock, Award, CheckCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type FilterType = 'all' | 'trending' | 'recent' | 'high-win-rate' | 'verified';

interface RouletteFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  className?: string;
}

const RouletteFilters = ({ activeFilter, onFilterChange, className }: RouletteFiltersProps) => {
  return (
    <div className={cn("w-full", className)}>
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
    </div>
  );
};

export default RouletteFilters;
