
import { useAuth } from '@/context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Seu Perfil</h1>
      
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
        <div className="space-y-2">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>ID do usuário:</strong> {user?.id || 'N/A'}</p>
          <p><strong>Status da conta:</strong> Ativo</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
