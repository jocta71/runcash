import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChartBar, ArrowLeft, TrendingUp, BarChart, ArrowDown, ArrowUp, PercentIcon, FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAuth } from '@/context/AuthContext';
import RouletteTrendChart, { TrendData, TrendType } from '@/components/roulette/RouletteTrendChart';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { strategies, numberGroups } from '@/components/roulette/constants';

const generateHistoricalNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 120; i++) {
    numbers.push(Math.floor(Math.random() * 37)); // 0-36 for roulette
  }
  return numbers;
};

const generateFrequencyData = (numbers: number[]) => {
  const frequency: Record<number, number> = {};
  
  for (let i = 0; i <= 36; i++) {
    frequency[i] = 0;
  }
  
  numbers.forEach(num => {
    frequency[num] += 1;
  });
  
  return Object.entries(frequency).map(([number, count]) => ({
    number: Number(number),
    frequency: count,
  }));
};

const getHotColdNumbers = (frequencyData: {number: number, frequency: number}[]) => {
  const sorted = [...frequencyData].sort((a, b) => b.frequency - a.frequency);
  return {
    hot: sorted.slice(0, 5),  // 5 most frequent
    cold: sorted.slice(-5).reverse()  // 5 least frequent
  };
};

const generateGroupDistribution = (numbers: number[]) => {
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  const groups = [
    { name: "Vermelhos", value: 0, color: "#ef4444" },
    { name: "Pretos", value: 0, color: "#111827" },
    { name: "Zero", value: 0, color: "#059669" },
  ];
  
  numbers.forEach(num => {
    if (num === 0) {
      groups[2].value += 1;
    } else if (redNumbers.includes(num)) {
      groups[0].value += 1;
    } else {
      groups[1].value += 1;
    }
  });
  
  return groups;
};

const getRouletteNumberColor = (num: number) => {
  if (num === 0) return "bg-vegas-green text-black";
  
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  
  if (redNumbers.includes(num)) {
    return "bg-red-600 text-white";
  } else {
    return "bg-black text-white";
  }
};

const generateTrendData = (length: number, baseValue: number, volatility: number): TrendData => {
  const data: TrendData = [];
  let currentValue = baseValue;
  
  for (let i = 0; i < length; i++) {
    currentValue += (Math.random() - 0.5) * volatility;
    currentValue = Math.max(0, currentValue);
    data.push({ value: currentValue });
  }
  
  return data;
};

const generateWinLossHistory = (days: number) => {
  const data = [];
  for (let i = 1; i <= days; i++) {
    data.push({
      day: i,
      wins: Math.floor(Math.random() * 10) + 1,
      losses: Math.floor(Math.random() * 8) + 1,
    });
  }
  return data;
};

const getHeatColor = (level: number): string => {
  const colors = [
    'rgba(0, 255, 0, 0.1)',   // Level 0 - Very low
    'rgba(0, 255, 0, 0.3)',   // Level 1 - Low
    'rgba(0, 255, 0, 0.5)',   // Level 2 - Medium
    'rgba(0, 255, 0, 0.7)',   // Level 3 - High
    'rgba(0, 255, 0, 0.9)',   // Level 4 - Very high
  ];
  return colors[level];
};

const RouletteDetailsPage = () => {
  const { rouletteId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeTrendType, setActiveTrendType] = useState<TrendType>("performance");
  
  const name = rouletteId || "Roleta";
  const wins = 65;
  const losses = 35;
  
  const performanceTrend = generateTrendData(20, 5, 2);
  const redBlackTrend = generateTrendData(20, 3, 1.5);
  const oddEvenTrend = generateTrendData(20, 4, 1);
  const hotColdTrend = generateTrendData(20, 2, 1.2);
  const winLossTrend = generateTrendData(20, 7, 1.8);
  
  const historicalNumbers = generateHistoricalNumbers();
  const frequencyData = generateFrequencyData(historicalNumbers);
  const { hot, cold } = getHotColdNumbers(frequencyData);
  const pieData = generateGroupDistribution(historicalNumbers);
  
  const winRate = (wins / (wins + losses)) * 100;

  return (
    <div className="min-h-screen bg-vegas-black text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2 text-gray-400 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#00ff00] flex items-center">
            <BarChart className="mr-2" /> Estatísticas da {name}
          </h1>
        </div>
        
        <p className="text-gray-400 mb-8">
          Análise detalhada dos últimos 120 números e tendências
        </p>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-vegas-darkgray w-full justify-start mb-6 overflow-x-auto">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#00ff00]/20 data-[state=active]:text-[#00ff00]">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#00ff00]/20 data-[state=active]:text-[#00ff00]">
              Tendências
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-[#00ff00]/20 data-[state=active]:text-[#00ff00]">
              Análise Avançada
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
              <div className="glass-card p-4 md:p-6 space-y-4 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg md:text-xl font-semibold flex items-center">
                  <TrendingUp size={20} className="text-[#00ff00] mr-2" /> Últimos 120 Números
                </h3>
                <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 md:gap-3">
                  {historicalNumbers.map((num, i) => (
                    <div
                      key={i}
                      className={`w-7 h-7 md:w-9 md:h-9 rounded-full ${getRouletteNumberColor(num)} flex items-center justify-center text-xs md:text-sm font-medium`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4 md:p-6 space-y-4 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg md:text-xl font-semibold flex items-center">
                  <PercentIcon size={20} className="text-[#00ff00] mr-2" /> Taxa de Vitória
                </h3>
                <div className="h-60 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Vitórias", value: wins },
                          { name: "Derrotas", value: losses }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#00ff00"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell key="wins" fill="#00ff00" />
                        <Cell key="losses" fill="#ef4444" />
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-4 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg md:text-xl font-semibold flex items-center">
                  <ChartBar size={20} className="text-[#00ff00] mr-2" /> Frequência de Números
                </h3>
                <div className="h-60 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={frequencyData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="number" stroke="#ccc" />
                      <YAxis stroke="#ccc" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#00ff00' }} 
                        labelStyle={{ color: '#00ff00' }}
                      />
                      <Bar dataKey="frequency" fill="#00ff00" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-4 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg md:text-xl font-semibold flex items-center">
                  <ChartBar size={20} className="text-[#00ff00] mr-2" /> Distribuição por Cor
                </h3>
                <div className="h-60 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        fill="#00ff00"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-4 rounded-lg border border-white/10 bg-[#17161e]/90 col-span-1 lg:col-span-2">
                <h3 className="text-lg md:text-xl font-semibold">Números Quentes & Frios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="p-4 bg-vegas-darkgray rounded-lg">
                    <h4 className="text-md md:text-lg font-semibold flex items-center text-red-500 mb-3">
                      <ArrowUp size={16} className="mr-2" /> Números Quentes (Mais Frequentes)
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {hot.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${getRouletteNumberColor(item.number)} flex items-center justify-center text-sm md:text-base font-medium`}>
                            {item.number}
                          </div>
                          <span className="text-vegas-gold text-sm md:text-base">({item.frequency}x)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-vegas-darkgray rounded-lg">
                    <h4 className="text-md md:text-lg font-semibold flex items-center text-blue-500 mb-3">
                      <ArrowDown size={16} className="mr-2" /> Números Frios (Menos Frequentes)
                    </h4>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {cold.map((item, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${getRouletteNumberColor(item.number)} flex items-center justify-center text-sm md:text-base font-medium`}>
                            {item.number}
                          </div>
                          <span className="text-vegas-gold text-sm md:text-base">({item.frequency}x)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-4 md:p-6 space-y-3 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg font-semibold flex items-center">
                  <TrendingUp size={18} className="text-[#00ff00] mr-2" /> Tendências de Performance
                </h3>
                <RouletteTrendChart 
                  trend={performanceTrend} 
                  redBlackTrend={redBlackTrend}
                  oddEvenTrend={oddEvenTrend}
                  hotColdTrend={hotColdTrend}
                  winLossTrend={winLossTrend}
                />
                <p className="text-xs text-gray-400 mt-2">
                  Filtre diferentes métricas para analisar padrões e tendências ao longo do tempo.
                </p>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-3 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg font-semibold flex items-center">
                  <FilterIcon size={18} className="text-[#00ff00] mr-2" /> Desempenho por Estratégia
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {strategies.map((strategy, index) => (
                    <div key={index} className={`p-3 rounded-lg ${strategy.color} bg-opacity-10 border border-${strategy.color}/20`}>
                      <h4 className="text-sm font-medium">{strategy.name}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs">Win Rate</div>
                        <div className={`text-sm font-semibold ${Math.random() > 0.5 ? 'text-[#00ff00]' : 'text-red-500'}`}>
                          {(Math.random() * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-400 mt-2">
                  Comparação do desempenho de diferentes estratégias baseadas em tipos de apostas.
                </p>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-3 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg font-semibold flex items-center">
                  <ChartBar size={18} className="text-[#00ff00] mr-2" /> Histórico de Vitórias/Derrotas
                </h3>
                
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={generateWinLossHistory(30)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                    <XAxis dataKey="day" stroke="#777" />
                    <YAxis stroke="#777" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#17161e', borderColor: '#333' }}
                      labelStyle={{ color: '#00ff00' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wins" 
                      stroke="#00ff00" 
                      strokeWidth={2}
                      activeDot={{ r: 6, stroke: '#00ff00', strokeWidth: 1 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="losses" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 1 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                
                <p className="text-xs text-gray-400 mt-2">
                  Histórico diário de vitórias e derrotas dos últimos 30 dias.
                </p>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-3 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg font-semibold flex items-center">
                  <ChartBar size={18} className="text-[#00ff00] mr-2" /> Mapa de Calor dos Números
                </h3>
                
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 37 }, (_, i) => i).map((num) => {
                    const heatLevel = Math.floor(Math.random() * 5);
                    const heatColor = getHeatColor(heatLevel);
                    
                    return (
                      <div 
                        key={num} 
                        className={`w-full aspect-square rounded-full flex items-center justify-center text-sm font-medium ${getRouletteNumberColor(num)}`}
                        style={{ boxShadow: `0 0 10px ${heatColor}` }}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-gray-400">Menos frequente</div>
                  <div className="flex space-x-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div 
                        key={level}
                        className="w-4 h-2 rounded-sm"
                        style={{ backgroundColor: getHeatColor(level) }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">Mais frequente</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis">
            <div className="glass-card p-4 md:p-6 space-y-4 rounded-lg border border-white/10 bg-[#17161e]/90 mb-6">
              <h3 className="text-lg md:text-xl font-semibold">Análise Avançada</h3>
              <p className="text-gray-400">
                Ferramentas e análises avançadas para identificar padrões e desenvolver estratégias.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-vegas-darkgray rounded-lg p-4 flex flex-col items-center space-y-3">
                  <div className="bg-[#00ff00]/20 p-3 rounded-full">
                    <TrendingUp size={24} className="text-[#00ff00]" />
                  </div>
                  <h4 className="text-md font-semibold">Análise de Sequências</h4>
                  <p className="text-xs text-center text-gray-400">
                    Identifica padrões de sequências repetitivas nos resultados.
                  </p>
                  <Button variant="outline" className="w-full mt-2 border-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/10">
                    Acessar
                  </Button>
                </div>
                
                <div className="bg-vegas-darkgray rounded-lg p-4 flex flex-col items-center space-y-3">
                  <div className="bg-[#00ff00]/20 p-3 rounded-full">
                    <BarChart size={24} className="text-[#00ff00]" />
                  </div>
                  <h4 className="text-md font-semibold">Previsão Estatística</h4>
                  <p className="text-xs text-center text-gray-400">
                    Usa modelos estatísticos para prever possíveis resultados.
                  </p>
                  <Button variant="outline" className="w-full mt-2 border-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/10">
                    Acessar
                  </Button>
                </div>
                
                <div className="bg-vegas-darkgray rounded-lg p-4 flex flex-col items-center space-y-3">
                  <div className="bg-[#00ff00]/20 p-3 rounded-full">
                    <FilterIcon size={24} className="text-[#00ff00]" />
                  </div>
                  <h4 className="text-md font-semibold">Gerador de Estratégias</h4>
                  <p className="text-xs text-center text-gray-400">
                    Cria estratégias personalizadas baseadas nos padrões históricos.
                  </p>
                  <Button variant="outline" className="w-full mt-2 border-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/10">
                    Acessar
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-4 md:p-6 space-y-3 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg font-semibold">Correlação de Padrões</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="py-2 text-left text-gray-400">Padrão</th>
                        <th className="py-2 text-left text-gray-400">Ocorrências</th>
                        <th className="py-2 text-left text-gray-400">Win Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { pattern: "Números vermelhos consecutivos", occurrences: 37, winRate: 68.2 },
                        { pattern: "Alternância entre par/ímpar", occurrences: 29, winRate: 62.4 },
                        { pattern: "Sequência de números baixos", occurrences: 22, winRate: 57.9 },
                        { pattern: "Repetição de dezenas", occurrences: 18, winRate: 51.3 },
                        { pattern: "Zero após número alto", occurrences: 12, winRate: 48.7 },
                      ].map((item, index) => (
                        <tr key={index} className="border-b border-gray-700/30">
                          <td className="py-2">{item.pattern}</td>
                          <td className="py-2">{item.occurrences}</td>
                          <td className={`py-2 ${item.winRate > 50 ? 'text-[#00ff00]' : 'text-red-500'}`}>
                            {item.winRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="glass-card p-4 md:p-6 space-y-3 rounded-lg border border-white/10 bg-[#17161e]/90">
                <h3 className="text-lg font-semibold">Distribuição por Setores</h3>
                
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Setor 0-9", value: 35 },
                        { name: "Setor 10-19", value: 28 },
                        { name: "Setor 20-29", value: 32 },
                        { name: "Setor 30-36", value: 25 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#00ff00" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#f97316" />
                      <Cell fill="#8b5cf6" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-8">
          <Button 
            className="w-full max-w-md text-black font-medium animate-pulse-neon bg-gradient-to-b from-[#00ff00] to-[#8bff00] hover:from-[#00ff00]/90 hover:to-[#8bff00]/90 text-base"
          >
            Ir para a Roleta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouletteDetailsPage;
