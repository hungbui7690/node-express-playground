const Review = require('../models/Review')
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils')

const createReview = async (req, res) => {
  const { product: productID } = req.body

  // check existance of product
  const isValidProduct = Product.findOne({ _id: productID })
  if (!isValidProduct)
    throw new CustomError.NotFoundError(`No product with id ${productID}`)

  // check if user left review on this product or not
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
    .populate({
      path: 'product',
      select: 'name company price',
    })
    .populate({ path: 'user', select: 'name' })

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
  // find review
  const { id: reviewID } = req.params
  const { rating, title, comment } = req.body

  const review = await Review.findOne({ _id: reviewID })
  if (!review)
    throw new CustomError.NotFoundError(`No review with id ${reviewID}`)

  // Check Permission
  checkPermissions(req.user, review.user)

  // Set Properties
  review.rating = rating
  review.title = title
  review.comment = comment

  // Update
  await review.save()
  res.status(StatusCodes.OK).json({ review })
}

const deleteReview = async (req, res) => {
  // find review
  const { id: reviewID } = req.params

  const review = await Review.findOne({ _id: reviewID })
  if (!review)
    throw new CustomError.NotFoundError(`No review with id ${reviewID}`)

  // check permission >> check lại hàm này sẽ hiểu
  checkPermissions(req.user, review.user)

  await review.remove()
  res.status(StatusCodes.OK).json({ msg: 'Success! Review removed.' })
}

// ========= Get Single Product Review
const getSingleProductReviews = async (req, res) => {
  // get product id, since we just want to get reviews that associated with that product only
  const { id: productID } = req.params
  const reviews = await Review.find({ product: productID })

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
}

///////////////////////////==

module.exports = {
  createReview,
  GetAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
}
