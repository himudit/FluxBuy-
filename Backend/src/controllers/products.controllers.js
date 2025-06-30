const Products = require('../models/product.model');

const getSaleProducts = async (req, res, next) => {
    try {
        const products = await Products.find().limit(4);
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json({
            message: "Error fetching products"
        })
        console.log(err);
    }
}

const getAllProducts = async (req, res, next) => {
    try {
        const limitNo = 12;
        const page = parseInt(req.query.page) || 1;
        // const page = 2;
        const products = await Products.find().skip(limitNo * (page - 1))
            .limit(limitNo);
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json({
            message: "Error fetching products"
        })
        console.log(err);
    }
}

const getCategory = async (req, res, next) => {
    try {
        const categories = await Products.distinct('category');
        res.status(200).json({
            message: 'Categories fetched Successfully',
            count: categories.length,
            data: categories
        });
    } catch (err) {
        res.status(404).json({
            message: "Error fetching products"
        })
        console.log(err);
    }
}


module.exports = { getAllProducts, getCategory, getSaleProducts }