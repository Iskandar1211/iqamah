#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking dependencies...');

try {
  // Check for outdated packages
  console.log('\n📦 Checking for outdated packages...');
  execSync('npm outdated', { stdio: 'inherit' });
} catch (error) {
  if (error.status === 1) {
    console.log('✅ All packages are up to date!');
  } else {
    console.error('❌ Error checking dependencies:', error.message);
  }
}

try {
  // Check for security vulnerabilities
  console.log('\n🔒 Checking for security vulnerabilities...');
  execSync('npm audit', { stdio: 'inherit' });
} catch (error) {
  if (error.status === 1) {
    console.log('⚠️  Security vulnerabilities found. Run "npm audit fix" to fix them.');
  } else {
    console.error('❌ Error checking security:', error.message);
  }
}

try {
  // Check package.json for common issues
  console.log('\n📋 Checking package.json...');
  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
  
  const issues = [];
  
  if (!packageJson.scripts) {
    issues.push('No scripts section found');
  }
  
  if (!packageJson.dependencies && !packageJson.devDependencies) {
    issues.push('No dependencies found');
  }
  
  if (packageJson.dependencies && Object.keys(packageJson.dependencies).length === 0) {
    issues.push('No production dependencies found');
  }
  
  if (issues.length === 0) {
    console.log('✅ Package.json looks good!');
  } else {
    console.log('⚠️  Issues found in package.json:');
    issues.forEach(issue => console.log(`  - ${issue}`));
  }
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
} 