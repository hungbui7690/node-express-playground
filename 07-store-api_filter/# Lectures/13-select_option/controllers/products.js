const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  // 1. test
  const products = await Product.find({}).select('name price')
  res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query
  const queryObject = {}
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false
  }
  if (company) {
    queryObject.company = company
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }

  let result = Product.find(queryObject)
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  // 2. Apply "Select Specific Fields" here
  if (fields) {
    const fieldsList = fields.split(',').join(' ') // (a)
    result = result.select(fieldsList) // (b) use here
  }

  const products = await result

  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
