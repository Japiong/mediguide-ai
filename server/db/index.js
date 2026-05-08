const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
  // Keep the API alive in development so non-DB routes (e.g. AI chat) still work.
  // Process termination here can cause nodemon crash loops after transient DB issues.
  if (process.env.NODE_ENV === 'production') {
    process.exit(-1);
  }
});

// Test connection on startup
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL connected');
    client.release();
  })
  .catch(err => {
    console.error('❌ PostgreSQL connection error:', err.message);
  });

const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };
