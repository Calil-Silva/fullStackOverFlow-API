import pg from 'pg';
import './setup';

const { Pool } = pg;

const connection = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export default connection;
