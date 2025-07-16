const express = require('express');
const router = express.Router();
const { getAllProducts, getCategory, getSaleProducts, getProductById } = require('../controllers/products.controllers');

router.get('/allProducts', getAllProducts);
router.get('/saleProducts', getSaleProducts);
router.get('/category', getCategory);
router.get('/:id', getProductById)

module.exports = router;