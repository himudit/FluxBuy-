const Cart = require('../models/cart.models');

const addToCart = async (req, res, next) => {
    try {
        const { userId, productApiId, title, quantity, color, size, image, price, discount } = req.body;
        const newCart = new Cart({
            userId,
            productApiId,
            title,
            quantity,
            color,
            size,
            image,
            price,
            discount,
            addedAt: Date.now()
        })
        const savedCart = await newCart.save();
        res.status(201).json({
            message: 'Product added to cart',
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { addToCart }