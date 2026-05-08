const aiService = require('../services/aiService');

const chat = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 1000) {
      return res.status(400).json({ error: 'Message too long (max 1000 characters)' });
    }

    const response = await aiService.chat(message, history);
    res.json({
      success: true,
      response,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    if (err.message?.includes('Missing AI API key') || err.status?.toString() === '401' || err.statusCode === 401) {
      return res.status(500).json({ error: 'AI service configuration error. Check GITHUB_TOKEN in server/.env.' });
    }
    next(err);
  }
};

module.exports = { chat };
