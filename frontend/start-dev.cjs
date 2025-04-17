
/* Script para iniciar o servidor de desenvolvimento */
const { execSync } = require('child_process');
const path = require('path');

// Função para executar comandos
function runCommand(command) {
  console.log(`Executando comando: ${command}`);
  try {
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname) });
    return true;
  } catch (error) {
    console.error(`Erro ao executar comando: ${command}`);
    console.error(error);
    return false;
  }
}

// Função principal
function main() {
  console.log('Iniciando servidor de desenvolvimento...');
  
  // Verificar e instalar dependências
  console.log('Verificando dependências...');
  const depsInstalled = runCommand('npm install');
  
  if (!depsInstalled) {
    console.error('Falha ao instalar dependências. Verifique o log para detalhes.');
    process.exit(1);
  }
  
  // Iniciar servidor de desenvolvimento
  console.log('Iniciando Vite dev server...');
  const devServerStarted = runCommand('npx vite --port 8080 --host');
  
  if (!devServerStarted) {
    console.error('Falha ao iniciar o servidor de desenvolvimento.');
    process.exit(1);
  }
}

// Executar script
try {
  main();
} catch (error) {
  console.error('Erro durante a inicialização do servidor:', error);
  process.exit(1);
}
