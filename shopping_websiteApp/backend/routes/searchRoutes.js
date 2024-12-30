const express = require('express');
const router = express.Router();
const { searchProducts } = require('../controllers/searchController');

router.get('/api/search', searchProducts);

module.exports = router;
