
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
  console.log('Starting custom build process...');
  
  // Check dependencies
  console.log('Installing dependencies if needed...');
  runCommand('npm install --no-save');
  
  // Build the project
  console.log('Building the project...');
  runCommand('npx vite build --mode development');
  
  console.log('Build completed successfully!');
}

// Run script
try {
  main();
} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}
