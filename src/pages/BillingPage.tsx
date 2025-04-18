
const BillingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Faturamento</h1>
      
      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Plano Atual</h2>
        <p className="mb-4">Você está atualmente no plano <strong>Gratuito</strong>.</p>
        
        <h3 className="text-lg font-medium mt-6 mb-2">Recursos disponíveis:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Acesso básico às análises</li>
          <li>Histórico limitado de jogadas</li>
          <li>Suporte via email</li>
        </ul>
      </div>
    </div>
  );
};

export default BillingPage;
