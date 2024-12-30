const { Op } = require('sequelize');
const Product = require('../models/ProductModel');

async function searchProductsUtil(query) {
  if (!query || query.length <= 2) {
    return { results: [], suggestions: [] };
  }

  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['id', 'name', 'price', 'image']
    });

    const suggestions = products.map(product => product.name);

    return { results: products, suggestions };
  } catch (error) {
    console.error('Error in searchProductsUtil:', error);
    throw new Error('Internal server error');
  }
}

module.exports = {
  searchProductsUtil
};
