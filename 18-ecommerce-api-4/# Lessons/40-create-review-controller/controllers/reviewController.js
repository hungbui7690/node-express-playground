const Review = require('../models/Review')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils')

const createReview = async (req, res) => {
  // a. check if product exists or not
  const { product: productID } = req.body
  const isValidProduct = Product.findOne({ _id: productID })
  if (!isValidProduct)
    throw new CustomError.NotFoundError(`No product with id ${productID}`)

  // b. check if review exists or not
  const alreadySubmitted = await Review.findOne({
    product: productID,
    user: req.user.userID,
  })
  if (alreadySubmitted)
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    )

  // c. add userID to req.body
  req.body.user = req.user.userID
  const review = await Review.create(req.body)

  res.status(StatusCodes.CREATED).json({ review })
}

const GetAllReviews = async (req, res) => {
  res.send('Get All Reviews')
}

const getSingleReview = async (req, res) => {
  res.send('Get Single Review')
}

const updateReview = async (req, res) => {
  res.send('Update Review')
}

const deleteReview = async (req, res) => {
  res.send('Delete Review')
}

module.exports = {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
