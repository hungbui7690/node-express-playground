const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')

const uploadProductImage = async (req, res) => {
  console.log(req.files) // 2a. has image, size properties + mv function

  res.send('Upload Product Image')
}

module.exports = { uploadProductImage }
