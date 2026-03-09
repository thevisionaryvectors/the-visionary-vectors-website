import { readFileSync } from 'fs';
import { neon } from '@neondatabase/serverless';

// Load .env.local manually
const env = readFileSync('.env.local', 'utf-8');
for (const line of env.split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
}

const sql = neon(process.env.DATABASE_URL);

const result = await sql`UPDATE newsletters SET subtitle = '' WHERE issue_date = '2026-03-09'`;
console.log('Done:', result);
