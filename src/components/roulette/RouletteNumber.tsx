
import React from 'react';

interface RouletteNumberProps {
  number: number;
  className?: string;
}

const RouletteNumber = ({ number, className = '' }: RouletteNumberProps) => {
  const getRouletteNumberColor = (num: number) => {
    if (num === 0) return "bg-gradient-to-br from-green-500 to-green-700 text-white border-2 border-green-400/30";
    
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    if (redNumbers.includes(num)) {
      return "bg-gradient-to-br from-red-600 to-red-800 text-white border-2 border-red-400/30";
    } else {
      return "bg-gradient-to-br from-gray-900 to-black text-white border-2 border-white/10";
    }
  };

  return (
    <div
      className={`w-8 h-8 rounded-full ${getRouletteNumberColor(number)} flex items-center justify-center text-sm font-bold shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.2)] ${className}`}
    >
      {number}
    </div>
  );
};

export default RouletteNumber;
