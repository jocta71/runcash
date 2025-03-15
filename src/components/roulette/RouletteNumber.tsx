
import React from 'react';

interface RouletteNumberProps {
  number: number;
  className?: string;
}

const RouletteNumber = ({ number, className = '' }: RouletteNumberProps) => {
  const getRouletteNumberColor = (num: number) => {
    if (num === 0) return "bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border border-emerald-400";
    
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    if (redNumbers.includes(num)) {
      return "bg-gradient-to-br from-red-600 to-red-800 text-white border border-red-400";
    } else {
      return "bg-gradient-to-br from-slate-800 to-black text-white border border-slate-600";
    }
  };

  return (
    <div
      className={`w-8 h-8 rounded-full ${getRouletteNumberColor(number)} flex items-center justify-center text-sm font-bold shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl ${className}`}
    >
      {number}
    </div>
  );
};

export default RouletteNumber;
