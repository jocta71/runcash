
import React from 'react';
import BettingSimulator from '@/components/roulette/BettingSimulator';

const BettingSimulatorPage = () => {
  return (
    <div className="min-h-screen bg-vegas-black text-white p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-[#00ff00]">Simulador de Apostas</h1>
        <BettingSimulator />
      </div>
    </div>
  );
};

export default BettingSimulatorPage;
