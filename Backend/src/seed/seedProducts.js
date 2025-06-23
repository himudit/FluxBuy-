// seed/seedProducts.js
const axios = require('axios');
const Product = require('../models/product.model');

const seedProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=50');
    const products = response.data.products;

    const cleanedProducts = products.map(p => {
      const { id, ...rest } = p;
      return { ...rest, apiId: id };
    });

    await Product.insertMany(cleanedProducts);
    console.log('✅ Products seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed products:', error.message);
  }
};

module.exports = seedProducts;
