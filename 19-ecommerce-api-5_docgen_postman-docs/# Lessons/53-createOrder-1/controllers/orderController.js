const Review = require('../models/Review') // 1. Review + Product
const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { checkPermissions } = require('../utils')

// 2. before -> pic: postman-createOrder1
const createOrder = async (req, res) => {
  // a. destructure
  const { items: cartItems, tax, shippingFee } = req.body

  // b. checks
  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.BadRequestError('No cart items provided')
  }
  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee')
  }

  // c. check if cartItems has that product or not -> if yes, then increase quantity -> use findOne(productID)
  let orderItems = []
  let subTotal = 0 // price * quantity
  // d. use await in for..of loop
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product })
    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id ${item.product}`)
    }
    const { name, price, image, _id } = dbProduct
    console.log(name, price, image, _id)
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    } // SingleCartItem schema

    orderItems = [...orderItems, singleOrderItem]
    subTotal += item.amount * price
  }

  console.log(orderItems, subTotal)

  res.send('Create Order')
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
