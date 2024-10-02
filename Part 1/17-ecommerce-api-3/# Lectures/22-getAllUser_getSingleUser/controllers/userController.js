const User = require('../models/User')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

// #
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' })
  res.status(StatusCodes.OK).json({ users })
}

// #
const getSingleUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ _id: id }).select('-password')

  if (!user) throw CustomError.NotFoundError(`No user with id ${id}`)
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.send('Show Current User')
}

const updateUser = async (req, res) => {
  res.send(req.body)
}

const updateUserPassword = async (req, res) => {
  res.send(req.body)
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
