const express = require('express');
const router = express.Router();
const { getDrug, getAllDrugs, getCategories } = require('../controllers/drugController');

router.get('/', getAllDrugs);
router.get('/categories', getCategories);
router.get('/:id', getDrug);

module.exports = router;
