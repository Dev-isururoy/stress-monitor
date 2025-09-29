const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // replace with your DB username
  host: 'localhost',          // or Supabase host
  database: 'stress_monitor', // your DB name
  password: 'Kelun@123',
  port: 5432
});

module.exports = pool;
