const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

// try to create product without image
const createProduct = async (req, res) => {
  console.log(req.body)

  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  res.send('Get All Products')
}

module.exports = {
  createProduct,
  getAllProducts,
}
