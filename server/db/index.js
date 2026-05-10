const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

let isConnected = false;

pool.on('error', (err) => {
  console.error('❌ Database error:', err.message);
  isConnected = false;
});

pool.on('connect', () => {
  isConnected = true;
  console.log('✅ PostgreSQL connected');
});

// Test connection on startup (non-blocking)
const testConnection = async () => {
  try {
    const client = await pool.connect();
    isConnected = true;
    console.log('✅ PostgreSQL connected');
    client.release();
  } catch (err) {
    console.warn('⚠️  PostgreSQL connection failed:', err.message);
    console.warn('⚠️  Retrying in 5 seconds...');
    isConnected = false;
    // Retry after 5 seconds
    setTimeout(testConnection, 5000);
  }
};

// Start connection test but don't block startup
testConnection();

const query = (text, params) => {
  if (!isConnected) {
    console.warn('⚠️  Database not connected, attempting query anyway...');
  }
  return pool.query(text, params);
};

module.exports = { query, pool, isConnected: () => isConnected };
