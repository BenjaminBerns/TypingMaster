#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  // Build the frontend
  console.log('📦 Building frontend with Vite...');
  execSync('vite build --outDir dist/public', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });

  // Create a simple index.html for the root if it doesn't exist
  const indexPath = path.join('dist', 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ Frontend build completed successfully');
  } else {
    console.error('❌ Frontend build failed - no index.html found');
    process.exit(1);
  }

  // Verify API structure
  const apiPath = path.join('api', 'index.ts');
  if (fs.existsSync(apiPath)) {
    console.log('✅ API structure verified');
  } else {
    console.error('❌ API structure missing - api/index.ts not found');
    process.exit(1);
  }

  console.log('🎉 Vercel build completed successfully!');
  console.log('🎯 Ready for deployment');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}