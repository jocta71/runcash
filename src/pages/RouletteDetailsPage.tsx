
import { useParams } from 'react-router-dom';

const RouletteDetailsPage = () => {
  const { rouletteId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Detalhes da Roleta {rouletteId}</h1>
      <div className="bg-card border rounded-lg p-6">
        <p className="text-lg mb-4">
          Esta página mostrará os detalhes e análises da roleta selecionada.
        </p>
        <p>ID da roleta: {rouletteId}</p>
      </div>
    </div>
  );
};

export default RouletteDetailsPage;
