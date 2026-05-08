// supplementController.js
const supplementService = require('../services/supplementService');

const getAllSupplements = async (req, res, next) => {
  try {
    const supplements = await supplementService.getAllSupplements();
    res.json({ supplements });
  } catch (err) {
    next(err);
  }
};

const getSupplement = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplement = await supplementService.getSupplementById(Number(id));
    if (!supplement) return res.status(404).json({ error: 'Supplement not found' });
    res.json(supplement);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllSupplements, getSupplement };
