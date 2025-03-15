
import React from 'react';

interface RouletteNumberProps {
  number: number;
  className?: string;
}

const RouletteNumber = ({ number, className = '' }: RouletteNumberProps) => {
  const getRouletteNumberColor = (num: number) => {
    if (num === 0) return "bg-gradient-to-br from-green-500 to-green-700 text-white";
    
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    if (redNumbers.includes(num)) {
      return "bg-gradient-to-br from-red-600 to-red-800 text-white";
    } else {
      return "bg-gradient-to-br from-gray-900 to-black text-white";
    }
  };

  return (
    <div
      className={`w-8 h-8 rounded-full ${getRouletteNumberColor(number)} flex items-center justify-center text-sm font-bold shadow-lg transition-transform duration-200 ${className}`}
    >
      {number}
    </div>
  );
};

export default RouletteNumber;
