const express = require('express');
const router = express.Router();
const { getAllProducts, getCategory } = require('../controllers/products.controllers');

router.get('/allProducts', getAllProducts);
router.get('/category', getCategory);

module.exports = router;