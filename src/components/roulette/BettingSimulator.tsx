
import React, { useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RouletteNumber from './RouletteNumber';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface BettingSimulatorProps {
  className?: string;
}

const BettingSimulator = ({ className }: BettingSimulatorProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [balance, setBalance] = useState(0);
  const [virtualBalance, setVirtualBalance] = useState(0);
  const [betAmount, setBetAmount] = useState<string>('0');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [simulationResult, setSimulationResult] = useState<number | null>(null);

  // Array of roulette numbers (0-36)
  const topRowNumbers = Array.from({ length: 11 }, (_, i) => i + 27);
  const middleRowNumbers = Array.from({ length: 11 }, (_, i) => i);
  
  // Generate the roulette table numbers in the correct order
  const generateRouletteTableNumbers = () => {
    const columns = {
      col1: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
      col2: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
      col3: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
    };
    
    return {
      col1: columns.col1,
      col2: columns.col2,
      col3: columns.col3
    };
  };

  const tableNumbers = generateRouletteTableNumbers();

  const handleRecharge = () => {
    setVirtualBalance(prevBalance => prevBalance + 100);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleNumberSelect = (number: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(number)) {
        return prev.filter(num => num !== number);
      } else {
        return [...prev, number];
      }
    });
  };

  const selectRange = (range: [number, number]) => {
    const [start, end] = range;
    const rangeNumbers = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    setSelectedNumbers(rangeNumbers);
  };

  const selectColor = (color: 'red' | 'black') => {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    
    if (color === 'red') {
      setSelectedNumbers(redNumbers);
    } else {
      setSelectedNumbers(blackNumbers);
    }
  };

  const selectEvenOdd = (type: 'even' | 'odd') => {
    if (type === 'even') {
      setSelectedNumbers(Array.from({ length: 18 }, (_, i) => (i + 1) * 2));
    } else {
      setSelectedNumbers(Array.from({ length: 18 }, (_, i) => (i * 2) + 1));
    }
  };

  const selectColumn = (colNum: 1 | 2 | 3) => {
    if (colNum === 1) {
      setSelectedNumbers(tableNumbers.col1);
    } else if (colNum === 2) {
      setSelectedNumbers(tableNumbers.col2);
    } else {
      setSelectedNumbers(tableNumbers.col3);
    }
  };

  const simulate = () => {
    if (selectedNumbers.length === 0 || parseFloat(betAmount) <= 0 || virtualBalance < parseFloat(betAmount)) {
      return;
    }

    // Generate a random roulette number (0-36)
    const result = Math.floor(Math.random() * 37);
    setSimulationResult(result);
    
    // Check if the result is in the selected numbers
    if (selectedNumbers.includes(result)) {
      // Calculate winnings based on betting odds
      const betValue = parseFloat(betAmount);
      const odds = 36 / selectedNumbers.length;
      const winnings = betValue * odds;
      
      setVirtualBalance(prev => prev + winnings);
      setBalance(prev => prev + winnings - betValue);
    } else {
      // Lose the bet amount
      setVirtualBalance(prev => prev - parseFloat(betAmount));
      setBalance(prev => prev - parseFloat(betAmount));
    }
  };

  const isNumberSelected = (num: number) => selectedNumbers.includes(num);

  return (
    <div className={`bg-vegas-black rounded-lg border border-gray-700 ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="inline-block w-5 h-5"></span>
            Simulador de apostas
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleVisibility}
            className="text-xs"
          >
            {isVisible ? (
              <>
                <EyeOff size={16} className="mr-1" /> OCULTAR
              </>
            ) : (
              <>
                <Eye size={16} className="mr-1" /> MOSTRAR
              </>
            )}
          </Button>
        </div>

        {isVisible && (
          <>
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div>
                <div className="text-sm mb-1">Balanço</div>
                <div className="bg-red-500 text-white px-3 py-1 rounded">
                  R$ {balance.toFixed(2)}
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Banca virtual:</div>
                <div className="bg-black text-white px-3 py-1 rounded border border-gray-700">
                  R$ {virtualBalance.toFixed(2)}
                </div>
              </div>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white" 
                onClick={handleRecharge}
              >
                RECARREGAR
              </Button>
            </div>

            <div className="bg-gray-100 dark:bg-vegas-darkgray p-4 rounded-lg mb-4">
              <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4 border-b border-blue-500 pb-4 relative">
                {topRowNumbers.map((num) => (
                  <div 
                    key={`top-${num}`} 
                    onClick={() => handleNumberSelect(num)}
                    className="cursor-pointer"
                  >
                    <RouletteNumber 
                      number={num} 
                      className={isNumberSelected(num) ? "ring-2 ring-white ring-opacity-70" : ""} 
                    />
                  </div>
                ))}
                <div className="absolute bottom-0 h-full w-0.5 bg-blue-500 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-1 md:gap-2">
                {middleRowNumbers.map((num) => (
                  <div 
                    key={`middle-${num}`} 
                    onClick={() => handleNumberSelect(num)}
                    className="cursor-pointer"
                  >
                    <RouletteNumber 
                      number={num} 
                      className={isNumberSelected(num) ? "ring-2 ring-white ring-opacity-70" : ""} 
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-4 text-center">
                Atenção: O simulador pode não refletir 100% do comportamento do cassino, sendo apenas ilustrativo.
              </div>
            </div>

            <div className="mb-4">
              <div className="mb-2">Quantia</div>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="mb-4">
              <div className="mb-2">Monte seu padrão:</div>
              <div className="grid grid-cols-12 gap-1 mb-4">
                <div className="flex items-center justify-center col-span-1">0</div>
                {Array.from({ length: 11 }, (_, i) => {
                  const cols = [
                    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
                    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
                    [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
                  ];
                  
                  const renderCol = (col: number, rowIndex: number) => {
                    const num = cols[col][rowIndex];
                    return (
                      <div 
                        key={`table-${num}`}
                        onClick={() => handleNumberSelect(num)}
                        className="cursor-pointer flex justify-center"
                      >
                        <RouletteNumber 
                          number={num} 
                          className={`w-7 h-7 ${isNumberSelected(num) ? "ring-2 ring-white ring-opacity-70" : ""}`} 
                        />
                      </div>
                    );
                  };
                  
                  if (i === 0) {
                    return (
                      <React.Fragment key={`col-${i}`}>
                        {[0, 1, 2].map(col => (
                          <div key={`cell-${i}-${col}`} className="col-span-1">
                            {renderCol(col, i)}
                          </div>
                        ))}
                      </React.Fragment>
                    );
                  }
                  return null;
                })}
                
                <div className="col-span-2 flex items-center justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs w-full"
                    onClick={() => selectColumn(3)}
                  >
                    3ª Coluna
                  </Button>
                </div>
                
                {Array.from({ length: 3 }, (_, row) => (
                  <React.Fragment key={`row-${row}`}>
                    <div className="col-span-1 flex items-center justify-center">
                      {row === 0 ? (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs w-7 h-7 p-0"
                          onClick={() => handleNumberSelect(0)}
                        >
                          0
                        </Button>
                      ) : null}
                    </div>
                    {Array.from({ length: 11 }, (_, i) => {
                      const cols = [
                        [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
                        [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
                        [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
                      ];
                      
                      const rowOffset = row * 4;
                      const index = i + rowOffset;
                      
                      if (index < 12) {
                        const renderCell = (col: number) => {
                          const num = cols[col][index];
                          return (
                            <div 
                              key={`table-${num}`}
                              onClick={() => handleNumberSelect(num)}
                              className="cursor-pointer flex justify-center"
                            >
                              <RouletteNumber 
                                number={num} 
                                className={`w-7 h-7 ${isNumberSelected(num) ? "ring-2 ring-white ring-opacity-70" : ""}`} 
                              />
                            </div>
                          );
                        };
                        
                        return (
                          <div key={`cell-${row}-${i}`} className="col-span-1">
                            {renderCell(row)}
                          </div>
                        );
                      }
                      return null;
                    })}
                    
                    <div className="col-span-2 flex items-center justify-center">
                      {row === 0 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs w-full"
                          onClick={() => selectColumn(2)}
                        >
                          2ª Coluna
                        </Button>
                      )}
                      {row === 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs w-full"
                          onClick={() => selectColumn(1)}
                        >
                          1ª Coluna
                        </Button>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Button 
                  variant="outline" 
                  onClick={() => selectRange([1, 12])}
                >
                  1 - 12
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => selectRange([13, 24])}
                >
                  13 - 24
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => selectRange([25, 36])}
                >
                  25 - 36
                </Button>
              </div>
              
              <div className="grid grid-cols-6 gap-2">
                <Button 
                  variant="outline" 
                  className="col-span-1"
                  onClick={() => selectRange([1, 18])}
                >
                  1 - 18
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-1"
                  onClick={() => selectEvenOdd('even')}
                >
                  Pares
                </Button>
                <Button 
                  variant="ghost" 
                  className="col-span-1 bg-black text-white hover:bg-black/80"
                  onClick={() => selectColor('black')}
                >
                  <div className="w-5 h-5 bg-black rounded-full"></div>
                </Button>
                <Button 
                  variant="ghost" 
                  className="col-span-1 bg-red-600 text-white hover:bg-red-700"
                  onClick={() => selectColor('red')}
                >
                  <div className="w-5 h-5 bg-red-600 rounded-full"></div>
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-1"
                  onClick={() => selectEvenOdd('odd')}
                >
                  Ímpares
                </Button>
                <Button 
                  variant="outline" 
                  className="col-span-1"
                  onClick={() => selectRange([19, 36])}
                >
                  19 - 36
                </Button>
              </div>
            </div>

            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
              onClick={simulate}
            >
              SIMULAR
            </Button>

            {simulationResult !== null && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="mt-4 flex justify-center">
                    <div className="animate-pulse cursor-pointer">
                      <RouletteNumber 
                        number={simulationResult} 
                        className="w-12 h-12 text-lg"
                      />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Resultado da Simulação</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-4 py-4">
                    <RouletteNumber 
                      number={simulationResult} 
                      className="w-20 h-20 text-2xl"
                    />
                    <div className="text-center">
                      {selectedNumbers.includes(simulationResult) ? (
                        <div className="text-green-500 font-bold">Você Ganhou!</div>
                      ) : (
                        <div className="text-red-500 font-bold">Você Perdeu!</div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BettingSimulator;
