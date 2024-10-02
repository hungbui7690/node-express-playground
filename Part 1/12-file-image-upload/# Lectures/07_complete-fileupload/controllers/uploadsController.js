const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')

const CustomError = require('../errors')

// 4.
const uploadProductImage = async (req, res) => {
  console.log(req.files) // a.

  if (!req.files) throw new CustomError.BadRequestError('No file is selected') // b. check file existance

  const productImage = req.files.image

  // c. check mimetype
  if (!productImage.mimetype.startsWith('image'))
    throw new CustomError.BadRequestError('Your upload is not an image')

  // d. check image size -> 1000 === 1000 bytes -> use for testing only -> change to 1024x1024 when in prod
  const maxSize = 1024 * 1024
  if (productImage.size > maxSize)
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1Kb'
    )

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )
  await productImage.mv(imagePath)
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = { uploadProductImage }
