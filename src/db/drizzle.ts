import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users, apiKeys } from './schema';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'Stage7',
  user: 'postgres',
  password: '', 
});

export const db = drizzle(pool, { schema: { users, apiKeys } });
