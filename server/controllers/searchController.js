// searchController.js
const searchService = require('../services/searchService');

const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length === 0) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const results = await searchService.searchAll(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

module.exports = { search };
