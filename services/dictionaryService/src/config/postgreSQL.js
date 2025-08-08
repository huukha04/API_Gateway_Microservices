// config/postgreSQL.js

import { Pool } from 'pg';
import { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } from './dotenv.js';

const pool = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
});

export default pool;
