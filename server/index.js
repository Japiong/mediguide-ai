require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const searchRoutes = require('./routes/search');
const drugRoutes = require('./routes/drugs');
const supplementRoutes = require('./routes/supplements');
const interactionRoutes = require('./routes/interactions');
const aiRoutes = require('./routes/ai');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
allowedOrigins.push('http://localhost:3001');

app.use(cors({
  origin(origin, callback) {
    // Allow non-browser tools (curl, Postman) and configured browser origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Request logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// AI rate limit (stricter)
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { error: 'Too many AI requests, please wait a moment.' }
});

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/drugs', drugRoutes);
app.use('/api/supplements', supplementRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
  console.log(`✅ MediGuide AI Server running on port ${PORT}`);
  });
}

module.exports = app;
