const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')
const cloudinary = require('cloudinary').v2
const CustomError = require('../errors')
const fs = require('fs')

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload',
    }
  )

  // 1. after upload -> we need to remove temp file
  fs.unlinkSync(req.files.image.tempFilePath)

  // 2. return secure_url
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

// # OLD VERSION
const uploadProductImageLocal = async (req, res) => {
  console.log(req.files)
  if (!req.files) throw new CustomError.BadRequestError('No File Uploaded')

  const productImage = req.files.image

  if (!productImage.mimetype.startsWith('image'))
    throw new CustomError.BadRequestError('Your upload is not an image')

  const maxSize = 1000
  if (productImage.size > maxSize)
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1Kb'
    )

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )
  await productImage.mv(imagePath)

  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = { uploadProductImage }
