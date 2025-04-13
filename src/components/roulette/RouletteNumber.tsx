
import React from 'react';

interface RouletteNumberProps {
  number: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RouletteNumber = ({ number, className = '', size = 'md' }: RouletteNumberProps) => {
  const getRouletteNumberColor = (num: number) => {
    if (num === 0) return "bg-vegas-green text-black";
    
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    
    if (redNumbers.includes(num)) {
      return "bg-red-600 text-white";
    } else {
      return "bg-black text-white";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6 text-xs';
      case 'lg':
        return 'w-10 h-10 text-base';
      case 'md':
      default:
        return 'w-8 h-8 text-sm';
    }
  };

  return (
    <div
      className={`${getSizeClasses()} rounded-md ${getRouletteNumberColor(number)} flex items-center justify-center font-medium ${className}`}
    >
      {number}
    </div>
  );
};

export default RouletteNumber;
