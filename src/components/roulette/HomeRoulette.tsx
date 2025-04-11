
import React, { useState } from 'react';
import RouletteRacetrack from './RouletteRacetrack';
import { Button } from '@/components/ui/button';
import { Dice1 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import RouletteNumber from './RouletteNumber';

interface HomeRouletteProps {
  className?: string;
}

const HomeRoulette = ({ className = "" }: HomeRouletteProps) => {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  
  const handleNumberClick = (number: number) => {
    setSelectedNumber(number);
  };
  
  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    
    // Get all roulette numbers (European)
    const allNumbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    
    // Randomly select a number
    const randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];
    
    // Simulate spinning
    setTimeout(() => {
      setResult(randomNumber);
      setSpinning(false);
      
      // Show toast with result
      toast({
        title: `Resultado: ${randomNumber}`,
        description: selectedNumber === randomNumber 
          ? "Parabéns, você ganhou!" 
          : "Não foi dessa vez. Tente novamente!",
        variant: selectedNumber === randomNumber ? "default" : "destructive"
      });
    }, 2000);
  };
  
  return (
    <div className={`bg-black p-4 rounded-xl border border-vegas-gold/20 ${className}`}>
      <h2 className="text-vegas-gold font-bold text-xl mb-4 text-center">Roleta Ao Vivo</h2>
      
      <RouletteRacetrack
        onNumberClick={handleNumberClick}
        selectedNumber={selectedNumber}
        size="md"
      />
      
      {result !== null && (
        <div className="flex justify-center my-4">
          <RouletteNumber number={result} size="lg" />
        </div>
      )}
      
      <div className="flex justify-center mt-4">
        <Button
          onClick={handleSpin}
          disabled={spinning || !selectedNumber}
          className="bg-vegas-gold hover:bg-vegas-gold/90 text-black font-bold"
        >
          <Dice1 className="mr-2" />
          {spinning ? "Girando..." : "Girar Roleta"}
        </Button>
      </div>
      
      {!selectedNumber && (
        <p className="text-gray-400 text-xs text-center mt-2">
          Selecione um número para apostar
        </p>
      )}
    </div>
  );
};

export default HomeRoulette;
