const interactionService = require('../services/interactionService');

const checkInteractions = async (req, res, next) => {
  try {
    const { drugIds } = req.body;

    if (!Array.isArray(drugIds) || drugIds.length < 2) {
      return res.status(400).json({
        error: 'Please provide at least 2 drug IDs in an array: { "drugIds": [1, 2] }'
      });
    }

    if (drugIds.length > 10) {
      return res.status(400).json({ error: 'Maximum 10 drugs can be checked at once' });
    }

    const result = await interactionService.checkInteractions(drugIds);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { checkInteractions };
