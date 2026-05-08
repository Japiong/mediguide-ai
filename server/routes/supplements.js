const express = require('express');
const router = express.Router();
const { getAllSupplements, getSupplement } = require('../controllers/supplementController');

router.get('/', getAllSupplements);
router.get('/:id', getSupplement);

module.exports = router;
