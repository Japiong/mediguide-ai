const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // PostgreSQL errors
  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists' });
  }
  if (err.code === '23503') {
    return res.status(400).json({ error: 'Referenced resource does not exist' });
  }
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ error: 'Database connection failed' });
  }

  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal server error';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
