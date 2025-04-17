
#!/usr/bin/env node

const { execSync } = require('child_process');

// Function to run commands
function runCommand(command) {
  console.log(`Executing command: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    throw error;
  }
}

// Main function
function main() {
  console.log('Starting development server...');
  
  // Check dependencies
  console.log('Installing dependencies if needed...');
  runCommand('npm install --no-save');
  
  // Start the development server
  console.log('Starting Vite development server...');
  runCommand('npx vite --port 8080 --host');
  
  console.log('Development server started successfully!');
}

// Run script
try {
  main();
} catch (error) {
  console.error('Error during development server startup:', error);
  process.exit(1);
}
