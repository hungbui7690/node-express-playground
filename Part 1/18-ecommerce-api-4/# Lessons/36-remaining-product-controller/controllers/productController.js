const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const createProduct = async (req, res) => {
  req.body.user = req.user.userID

  const product = await Product.create(req.body)

  res.status(StatusCodes.CREATED).json({ product })
}

// 1.
const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

// 2.
const getSingleProduct = async (req, res) => {
  const { id: productID } = req.params

  const product = await Product.findOne({ _id: productID })

  if (!product)
    throw new CustomError.NotFoundError(
      `There is no product with the id ${productID}`
    )

  res.status(StatusCodes.OK).json({ product })
}

// 3.
const updateProduct = async (req, res) => {
  const { id: productID } = req.params

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product)
    throw new CustomError.NotFoundError(
      `There is no product with the id ${productID}`
    )

  res.status(StatusCodes.OK).json({ product })
}

// 4.
const deleteProduct = async (req, res) => {
  const { id: productID } = req.params

  const product = await Product.findOne({ _id: productID })
  if (!product)
    throw new CustomError.NotFoundError(
      `There is no product with the id ${productID}`
    )

  await product.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Product removed' })
}

const uploadImage = async (req, res) => {
  res.send('Upload Image')
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
