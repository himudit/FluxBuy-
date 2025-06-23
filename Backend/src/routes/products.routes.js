const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/products.controllers');

router.get('/allProducts', getAllProducts);

module.exports = router;