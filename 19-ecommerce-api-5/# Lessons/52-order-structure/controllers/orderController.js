const Product = require('../models/Product')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { checkPermissions } = require('../utils')

const getAllOrders = (req, res) => {
  res.send('Get All Orders')
}
const getSingleOrder = (req, res) => {
  res.send('Get Single Order')
}
const getCurrentUserOrders = (req, res) => {
  res.send('Get Current User Orders')
}
const createOrder = (req, res) => {
  res.send('Create Order')
}
const updateOrder = (req, res) => {
  res.send('Update Order')
}

// (1) routes
module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
}
