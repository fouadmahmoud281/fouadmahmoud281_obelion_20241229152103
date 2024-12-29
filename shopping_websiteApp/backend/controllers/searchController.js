const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');

async function searchProducts(req, res) {
  try {
    const query = req.query.query;
    if (!query || query.length <= 2) {
      return res.json({ results: [], suggestions: [] });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['id', 'name', 'price', 'image']
    });

    const suggestions = products.map(product => product.name);

    return res.json({ results: products, suggestions });
  } catch (error) {
    console.error('Error searching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  searchProducts
};
