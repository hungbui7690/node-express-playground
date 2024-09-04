const Review = require('../models/Review')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils')

const createReview = async (req, res) => {
  const { product: productID } = req.body

  const isValidProduct = Product.findOne({ _id: productID })
  if (!isValidProduct)
    throw new CustomError.NotFoundError(`No product with id ${productID}`)

  const alreadySubmitted = await Review.findOne({
    product: productID,
    user: req.user.userID,
  })
  if (alreadySubmitted)
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    )

  req.body.user = req.user.userID
  const review = await Review.create(req.body)

  res.status(StatusCodes.CREATED).json({ review })
}

const GetAllReviews = async (req, res) => {
  const reviews = await Review.find({})

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

const getSingleReview = async (req, res) => {
  const { id: reviewID } = req.params

  const review = await Review.findOne({ _id: reviewID })
  if (!review)
    throw new CustomError.NotFoundError(`No review with id ${reviewID}`)

  res.status(StatusCodes.OK).json({ review })
}

const updateReview = async (req, res) => {
  res.send('Update Review')
}

const deleteReview = async (req, res) => {
  // a. check if review exists or not
  const { id: reviewID } = req.params
  const review = await Review.findOne({ _id: reviewID })
  if (!review)
    throw new CustomError.NotFoundError(`No review with id ${reviewID}`)

  // b. check if current user delete their own review or not
  checkPermissions(req.user, review.user)

  // c. remove review
  await review.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed.' })
}

module.exports = {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
