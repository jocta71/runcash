
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl mt-4">Página não encontrada</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary/80">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
