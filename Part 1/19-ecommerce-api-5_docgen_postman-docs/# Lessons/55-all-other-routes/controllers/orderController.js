const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils')
const Review = require('../models/Review')
const Product = require('../models/Product')
const Order = require('../models/Order')

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'randomValue'

  return { client_secret, amount }
}

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided')
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee')
  }

  let orderItems = []

  let subTotal = 0

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id ${item.product}`)
    }
    const { name, price, image, _id } = dbProduct
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    }

    orderItems = [...orderItems, singleOrderItem]
    subTotal += item.amount * price
  }

  const total = subTotal + shippingFee

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  })

  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userID,
  })

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
}

// 1. can add pagination and other stuffs if we want
const getAllOrders = async (req, res) => {
  const orders = await Order.find({})

  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

// 2.
const getSingleOrder = async (req, res) => {
  const { id: orderID } = req.params

  const order = await Order.findOne({ _id: orderID })
  if (!order) throw new CustomError.NotFoundError(`No order with id ${orderID}`)

  checkPermissions(req.user, order.user)

  res.status(StatusCodes.OK).json({ order })
}

// 3.
const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userID })

  res.status(StatusCodes.OK).json({ orders, count: orders.length })
}

// 4. pic: postman-updateOrder
const updateOrder = async (req, res) => {
  const { id: orderID } = req.params

  const { paymentIntentID } = req.body

  const order = await Order.findOne({ _id: orderID })
  if (!order) throw new CustomError.NotFoundError(`No order with id ${orderID}`)

  checkPermissions(req.user, order.user)

  order.paymentIntentID = paymentIntentID
  order.status = 'paid'
  await order.save()

  res.status(StatusCodes.OK).json({ order })
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}