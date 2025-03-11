
import React from 'react';
import BettingSimulator from '@/components/roulette/BettingSimulator';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BettingSimulatorPage = () => {
  return (
    <div className="min-h-screen bg-vegas-black text-white p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/" className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[#00ff00]">Simulador de Apostas</h1>
        </div>
        
        <div className="bg-[#17161e]/80 border border-white/10 rounded-xl p-4 md:p-6">
          <p className="text-gray-300 mb-4">
            Use o simulador para testar estratégias diferentes sem arriscar dinheiro real. Defina sua banca virtual, escolha os números e acompanhe os resultados.
          </p>
          <BettingSimulator />
        </div>
      </div>
    </div>
  );
};

export default BettingSimulatorPage;
