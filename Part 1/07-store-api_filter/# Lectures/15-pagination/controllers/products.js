const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(10)
    .skip(1)
  res.status(200).json({ nbHits: products.length, products })
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
    result = result.sort('createdAt _id') // 1. add sort consistency
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }

  // 2. default page = 1
  const page = Number(req.query.page) || 1

  // 3. default limit = 10
  const limit = Number(req.query.limit) || 10

  // 4.
  const skip = (page - 1) * limit

  // 5.
  result = result.skip(skip).limit(limit)

  // we have 23 products & want to have 7 items each page
  // -> 23/7 = 3.28 -> roundUp = 4
  // -> 4 page: 7 7 7 2

  const products = await result

  res.status(200).json({ nbHits: products.length, products })
}

module.exports = { getAllProducts, getAllProductsStatic }
