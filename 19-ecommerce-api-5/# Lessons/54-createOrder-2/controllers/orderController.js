const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils')
const Review = require('../models/Review')
const Product = require('../models/Product')
const Order = require('../models/Order')

// 1.
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

  // 2. prev lesson
  // a.
  let orderItems = []

  // b.
  let subTotal = 0 // price * quantity

  // c. loop in cartItems to get items -> then add to orderItems + calc subTotal -> pic: cart
  // Order Total = Sub Total + Shipping Fee
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

  // 3. this lesson
  // a.
  const total = subTotal + shippingFee

  // b. community với stripe (fake)
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  })

  // c.
  const order = await Order.create({
    orderItems,
    total,
    subTotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userID,
  })

  // d.
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
}

const getAllOrders = (req, res) => {
  res.send('Get All Orders')
}
const getSingleOrder = (req, res) => {
  res.send('Get Single Order')
}
const getCurrentUserOrders = (req, res) => {
  res.send('Get Current User Orders')
}
const updateOrder = (req, res) => {
  res.send('Update Order')
}

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}
