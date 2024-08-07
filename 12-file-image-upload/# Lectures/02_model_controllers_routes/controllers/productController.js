const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const createProduct = async (req, res) => {
  res.send('Create Product')
}

const getAllProducts = async (req, res) => {
  res.send('Get All Products')
}

module.exports = {
  createProduct,
  getAllProducts,
}
