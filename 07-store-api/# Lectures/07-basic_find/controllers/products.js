const Product = require('../models/product')

// static is for testing
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}) // (a) find all products
  // const products = await Product.find({ name: 'a first wooden table' }) // find with condition

  res.status(200).json({ products, nbHits: products.length }) // (b)
}

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' })
}

module.exports = { getAllProducts, getAllProductsStatic }
