#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning project...');

// Directories to clean
const dirsToClean = [
  'node_modules',
  '.expo',
  'dist',
  'web-build',
  'coverage',
  '.nyc_output',
];

// Files to clean
const filesToClean = [
  'npm-debug.log*',
  'yarn-debug.log*',
  'yarn-error.log*',
  '.DS_Store',
];

try {
  // Clean directories
  dirsToClean.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (fs.existsSync(dirPath)) {
      console.log(`Removing ${dir}...`);
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
  });

  // Clean files
  filesToClean.forEach(file => {
    try {
      execSync(`find . -name "${file}" -delete`, { stdio: 'inherit' });
    } catch (error) {
      // Ignore errors if files don't exist
    }
  });

  console.log('✅ Project cleaned successfully!');
  console.log('💡 Run "npm install" to reinstall dependencies');
} catch (error) {
  console.error('❌ Error cleaning project:', error.message);
  process.exit(1);
}
