const Products = require('../models/product.model');

const getSaleProducts = async (req, res, next) => {
    try {
        const keywords = ['laptops', 'footwear', 'watches', 'electronics'];

        const productPromises = keywords.map(async (keyword) => {
            return await Products.findOne({ tags: keyword });
        });

        const products = (await Promise.all(productPromises)).filter(Boolean);

        res.status(200).json(products);

    } catch (err) {
        res.status(404).json({
            message: "Error fetching products"
        })
        console.log(err);
    }
}


const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const apiId = Number(id);

        if (isNaN(apiId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID',
            });
        }

        const product = await Products.findOne({ apiId: apiId });
        res.status(200).json({
            success: true,
            message: "Product found",
            data: product
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
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


module.exports = { getAllProducts, getCategory, getSaleProducts, getProductById }