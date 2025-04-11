import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RouletteRacetrack from '@/components/roulette/RouletteRacetrack';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import BettingTable from '@/components/roulette/BettingTable';
import PopularBets from '@/components/roulette/PopularBets';

const RouletteDetailsPage = () => {
  const { id } = useParams();
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  
  const mockPopularBets = [
    {
      type: 'numbers',
      description: 'Vizinhos do Zero',
      numbers: [0, 3, 15, 26, 32],
      players: 124,
      amount: 2500
    },
    {
      type: 'numbers',
      description: 'Órfãos',
      numbers: [1, 6, 9, 14, 17, 20, 31, 34],
      players: 89,
      amount: 1800
    },
    {
      type: 'numbers',
      description: 'Tier',
      numbers: [5, 8, 10, 11, 13, 16, 23, 24, 27, 30, 33, 36],
      players: 76,
      amount: 1500
    }
  ];
  
  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
    toast({
      title: "Número Selecionado",
      description: `Você selecionou o número ${number}`,
      variant: "default"
    });
  };
  
  const handlePlaceBet = () => {
    if (!selectedNumber) {
      toast({
        title: "Erro",
        description: "Selecione um número para apostar",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Aposta Realizada",
      description: `Você apostou no número ${selectedNumber}`,
      variant: "default"
    });
  };
  
  const handleSelectBet = (bet: any) => {
    toast({
      title: "Estratégia Selecionada",
      description: bet.description,
      variant: "default"
    });
  };
  
  const handleBetPlaced = (type: string, numbers: number[], amount: number) => {
    toast({
      title: "Aposta Realizada",
      description: `Você apostou ${amount} em ${type}`,
      variant: "default"
    });
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-4 text-vegas-gold">Detalhes da Roleta {id}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main racetrack */}
        <Card className="lg:col-span-2 bg-black border-vegas-gold/20">
          <CardHeader>
            <CardTitle className="text-vegas-gold">Roleta Europeia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <RouletteRacetrack
                onNumberClick={handleNumberClick}
                selectedNumber={selectedNumber}
                size="md"
              />
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                onClick={handlePlaceBet}
                className="bg-vegas-gold hover:bg-vegas-gold/90 text-black"
              >
                Apostar {selectedNumber !== null ? `no ${selectedNumber}` : ''}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <PopularBets 
            bets={mockPopularBets}
            onSelectBet={handleSelectBet}
          />
          
          <Card className="bg-black border-vegas-gold/20">
            <CardHeader>
              <CardTitle className="text-vegas-gold text-lg">Mesa de Apostas</CardTitle>
            </CardHeader>
            <CardContent>
              <BettingTable onBetPlaced={handleBetPlaced} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RouletteDetailsPage;
