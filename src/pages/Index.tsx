
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">RunCash</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <span>{user.email}</span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sair
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link to="/auth">Entrar</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Bem-vindo ao RunCash</h2>
          <p className="text-lg mb-6">
            Sistema avançado para análise de roletas online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Análise de Roletas</h3>
              <p className="mb-4">
                Acompanhe dados em tempo real e históricos para tomar decisões mais acertadas.
              </p>
              <Button asChild>
                <Link to="/roulette/1">Ver Análises</Link>
              </Button>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Seu Perfil</h3>
              <p className="mb-4">
                Acesse suas informações e gerencie suas preferências de conta.
              </p>
              <Button asChild>
                <Link to="/profile">Acessar Perfil</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-background border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          RunCash &copy; {new Date().getFullYear()} - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
};

export default Index;
