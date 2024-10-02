const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')

const createProduct = async (req, res) => {
  req.body.user = req.user.userID
  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  // 3. use populate
  const products = await Product.find({}).populate('review')
  res.status(StatusCodes.OK).json({ products, count: products.length })
}

const getSingleProduct = async (req, res) => {
  const { id: productID } = req.params

  // 4. use populate
  const product = await Product.findOne({ _id: productID }).populate('review')

  if (!product)
    throw new CustomError.NotFoundError(
      `There is no product with the id ${productID}`
    )

  res.status(StatusCodes.OK).json({ product })
}

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
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded')
  }

  const productImage = req.files.image
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Not an image type ')
  }

  const maxsize = 1024 * 1024
  if (productImage.size > maxsize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1MB'
    )
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )

  await productImage.mv(imagePath)

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })
}

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
}
