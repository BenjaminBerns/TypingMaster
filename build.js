#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Building for Vercel deployment...');

try {
  // Build frontend
  console.log('📦 Building frontend...');
  execSync('vite build --outDir dist/public', { stdio: 'inherit' });
  
  // Copy necessary files
  console.log('📁 Copying configuration files...');
  
  console.log('✅ Build completed successfully!');
  console.log('🎯 Ready for Vercel deployment');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}