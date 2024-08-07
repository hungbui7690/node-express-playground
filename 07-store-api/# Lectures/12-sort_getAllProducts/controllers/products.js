const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('-name price')
  res.status(200).json({ products, nbHits: products.length })
}

// apply sort
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query
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

  // (a) use let + remove await
  let result = Product.find(queryObject)

  // (b)
  if (sort) {
    const sortList = sort.split(',').join(' ') // must have space at join -> name-price won't work -> name -price
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt _id') // this is the default when we don't pass sort -> add _id to create "sort consistency" -> must have this everytime we perform sorting
  }

  // (c) MUST HAVE THIS -> OTHERWISE, ERROR
  const products = await result

  res.status(200).json({ products, nbHits: products.length })
}

module.exports = { getAllProducts, getAllProductsStatic }
