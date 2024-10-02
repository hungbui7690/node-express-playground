const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')

const uploadProductImage = async (req, res) => {
  // 1. get image data
  let productImage = req.files.image

  // 2. create path
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  )
  console.log(imagePath)

  // 3. move image to public/uploads -> app.js
  await productImage.mv(imagePath)

  // 4. return path of image
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = { uploadProductImage }
