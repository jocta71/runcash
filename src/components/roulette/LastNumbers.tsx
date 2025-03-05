
import React from 'react';
import RouletteNumber from './RouletteNumber';

interface LastNumbersProps {
  numbers: number[];
}

const LastNumbers = ({ numbers }: LastNumbersProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-full">
      {numbers.map((num, i) => (
        <RouletteNumber key={i} number={num} />
      ))}
    </div>
  );
};

export default LastNumbers;
