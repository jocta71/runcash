
import { useParams } from 'react-router-dom';

export default function RouletteDetailsPage() {
  const { rouletteId } = useParams();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Detalhes da Roleta</h1>
      <p className="mt-4">ID: {rouletteId}</p>
    </div>
  );
}
