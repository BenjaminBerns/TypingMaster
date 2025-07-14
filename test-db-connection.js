import { config } from 'dotenv';
import { Pool } from '@neondatabase/serverless';

// Load environment variables
config();

console.log('Testing database connection...');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DATABASE_URL starts with postgresql:', process.env.DATABASE_URL?.startsWith('postgresql:'));

try {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const result = await pool.query('SELECT NOW()');
  console.log('✅ Database connection successful!');
  console.log('Current time from DB:', result.rows[0].now);
  await pool.end();
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
}