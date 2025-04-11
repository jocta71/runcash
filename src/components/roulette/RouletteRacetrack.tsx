
import React, { useState } from 'react';
import RouletteNumber from './RouletteNumber';

interface RouletteRacetrackProps {
  onNumberClick?: (number: number) => void;
  selectedNumber?: number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RouletteRacetrack = ({ 
  onNumberClick, 
  selectedNumber = null, 
  className = "",
  size = 'md'
}: RouletteRacetrackProps) => {
  // European roulette numbers in racetrack order
  const topRowNumbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36];
  const bottomRowNumbers = [11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9];
  const sideNumbers = [22, 18, 29, 7, 28, 12, 35, 3, 26];
  
  const getNumberSize = () => {
    switch(size) {
      case 'sm': return 'w-6 h-6 text-xs';
      case 'lg': return 'w-9 h-9 text-base';
      default: return 'w-7 h-7 text-sm';
    }
  };
  
  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-vegas-green text-white';
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'bg-red-600 text-white' : 'bg-black text-white border border-gray-600';
  };
  
  const handleClick = (number: number) => {
    if (onNumberClick) {
      onNumberClick(number);
    }
  };
  
  return (
    <div className={`bg-black rounded-xl border border-gray-800 p-2 ${className}`}>
      <div className="racetrack-layout">
        {/* Top section labels */}
        <div className="flex justify-between w-full px-8 py-1">
          <div className="text-vegas-gold text-xs">Tier</div>
          <div className="text-vegas-gold text-xs">Orphelins</div>
          <div className="text-vegas-gold text-xs">Voisins</div>
          <div className="text-vegas-gold text-xs">Zero</div>
        </div>
        
        {/* Top row numbers */}
        <div className="flex justify-center space-x-0.5 mb-1">
          {topRowNumbers.map((num) => (
            <div 
              key={`top-${num}`}
              onClick={() => handleClick(num)}
              className={`
                ${getNumberSize()}
                ${getNumberColor(num)}
                ${selectedNumber === num ? 'ring-2 ring-vegas-gold' : ''}
                rounded-full flex items-center justify-center cursor-pointer transition-all
                hover:opacity-80
              `}
            >
              {num}
            </div>
          ))}
        </div>
        
        {/* Bottom row numbers */}
        <div className="flex justify-center space-x-0.5 mt-1">
          {bottomRowNumbers.map((num) => (
            <div
              key={`bottom-${num}`}
              onClick={() => handleClick(num)}
              className={`
                ${getNumberSize()}
                ${getNumberColor(num)}
                ${selectedNumber === num ? 'ring-2 ring-vegas-gold' : ''}
                rounded-full flex items-center justify-center cursor-pointer transition-all
                hover:opacity-80
              `}
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouletteRacetrack;
