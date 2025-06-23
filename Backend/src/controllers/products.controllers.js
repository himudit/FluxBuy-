const Products = require('../models/product.model');

const getAllProducts = async (Req, res, next) => {
    try {
        const products = await Products.find();
        console.log(products);
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json({
            message: "Error fetching products"
        })
        console.log(err);
    }
}

module.exports = { getAllProducts }