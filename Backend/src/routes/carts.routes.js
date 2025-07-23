const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/carts.controller');


router.post('/cart', addToCart);
// router.delete('/cart/:itemId', removeFromCart);
// router.get('/cart/:userId', getCartItems);
// router.patch('/cart/:itemId', updateCartQuantity);

module.exports = router;