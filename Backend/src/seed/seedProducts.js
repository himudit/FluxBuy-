// seed/seedProducts.js
const axios = require('axios');
const Product = require('../models/product.model');


const seedProducts = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=200');
    const products = response.data.products;

    const bulkOps = products.map(p => {
      const { id, ...rest } = p;
      return {
        updateOne: {
          filter: { apiId: id },       // check if product with apiId exists
          update: { $set: { ...rest, apiId: id } }, // update if it exists
          upsert: true                 // insert if it doesn’t
        }
      };
    });

    await Product.bulkWrite(bulkOps);
    console.log('✅ Products seeded or updated (no duplicates)');
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
  }
};

module.exports = seedProducts;