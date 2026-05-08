const drugService = require('../services/drugService');

const getDrug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const numId = Number(id);
    if (!id || isNaN(numId) || !Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({ error: 'Invalid drug ID' });
    }
    const drug = await drugService.getDrugById(Number(id));
    if (!drug) {
      return res.status(404).json({ error: 'Drug not found' });
    }
    res.json(drug);
  } catch (err) {
    next(err);
  }
};

const getAllDrugs = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const offset = parseInt(req.query.offset) || 0;
    const drugs = await drugService.getAllDrugs(limit, offset);
    res.json({ drugs, limit, offset });
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await drugService.getCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDrug, getAllDrugs, getCategories };
