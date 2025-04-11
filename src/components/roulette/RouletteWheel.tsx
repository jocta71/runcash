
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dices } from 'lucide-react';
import RouletteNumber from './RouletteNumber';

interface RouletteWheelProps {
  onResult?: (number: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RouletteWheel = ({ onResult, size = 'md', className = '' }: RouletteWheelProps) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  
  // Roulette numbers in standard European order
  const topRowNumbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36];
  const bottomRowNumbers = [11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9];
  const leftColumn = [22, 18, 29, 7, 28, 12, 35, 3, 26];
  const rightColumn = [0];
  
  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-vegas-green text-black';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'bg-red-600 text-white' : 'bg-black text-white border border-gray-600';
  };
  
  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    
    // Get all numbers
    const allNumbers = [...topRowNumbers, ...bottomRowNumbers];
    
    // Randomly select a number
    const randomNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];
    
    // Simulate the spinning time and set the result
    setTimeout(() => {
      setResult(randomNumber);
      setSpinning(false);
      if (onResult) onResult(randomNumber);
    }, 3000);
  };
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative overflow-hidden bg-black rounded-lg border border-vegas-gold/30 p-1 w-full max-w-3xl">
        {/* Racetrack-style roulette */}
        <div className="rounded-full bg-black flex flex-col items-center">
          {/* Header labels */}
          <div className="flex justify-between w-full px-12 py-1">
            <div className="text-vegas-gold font-bold text-sm">Tier</div>
            <div className="text-vegas-gold font-bold text-sm">Orphelins</div>
            <div className="text-vegas-gold font-bold text-sm">Voisins</div>
            <div className="text-vegas-gold font-bold text-sm">Zero</div>
          </div>
          
          {/* Top row numbers */}
          <div className="flex justify-center space-x-0.5 mb-1">
            {topRowNumbers.map((num) => (
              <RouletteNumber
                key={num}
                number={num}
                size="sm"
                className={`${num === result ? 'ring-2 ring-vegas-gold animate-pulse' : ''} ${getNumberColor(num)}`}
              />
            ))}
          </div>
          
          {/* Bottom row numbers */}
          <div className="flex justify-center space-x-0.5 mt-1">
            {bottomRowNumbers.map((num) => (
              <RouletteNumber
                key={num}
                number={num}
                size="sm"
                className={`${num === result ? 'ring-2 ring-vegas-gold animate-pulse' : ''} ${getNumberColor(num)}`}
              />
            ))}
          </div>
        </div>
        
        {/* Result display */}
        {result !== null && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`${getNumberColor(result)} w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold animate-bounce`}>
              {result}
            </div>
          </div>
        )}
      </div>
      
      <Button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-4 bg-gradient-to-b from-vegas-gold to-yellow-600 text-black font-bold hover:from-vegas-gold hover:to-yellow-500 hover:shadow-gold"
      >
        <Dices className="mr-2" />
        {spinning ? 'Girando...' : 'Girar Roleta'}
      </Button>
    </div>
  );
};

export default RouletteWheel;
