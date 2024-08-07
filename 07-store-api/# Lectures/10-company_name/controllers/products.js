const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  // 1. test regular expression
  const products = await Product.find({
    name: { $regex: 'ab', $options: 'i' },
  })

  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query
  console.log(company)

  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  // 2. apply regular expression
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  console.log('queryObject', queryObject)

  const products = await Product.find(queryObject)

  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
