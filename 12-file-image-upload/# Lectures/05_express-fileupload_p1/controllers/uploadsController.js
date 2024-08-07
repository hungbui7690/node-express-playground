const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const path = require('path')

const uploadProductImage = async (req, res) => {
  // console.log('image: ', req.files.image)
  console.log('name: ', req.files.image.name)
  console.log('size: ', req.files.image.size)
  console.log('__dirname: ', __dirname) // absolute path to \controllers folder

  const destinationPath = path.join(__dirname, '../public/uploads/')
  console.log(destinationPath) // \playground\public\uploads\

  res.status(StatusCodes.OK).json({})
}

module.exports = { uploadProductImage }
