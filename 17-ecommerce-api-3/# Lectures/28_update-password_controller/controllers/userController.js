const User = require('../models/User')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({ role: 'user' })

  res.status(StatusCodes.OK).json({ users })
}

const getSingleUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ _id: id }).select('-password')
  if (!user) throw CustomError.NotFoundError(`No user with id ${id}`)

  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  res.send(req.body)
}

// 2.
const updateUserPassword = async (req, res) => {
  // a. oldPassword to check if correct user or not
  const { oldPassword, newPassword } = req.body // req.body just have oldPassword & newPassword -> no need current user

  // b.
  if (!oldPassword || !newPassword)
    throw new CustomError.BadRequestError('Please provide both values')

  // c. get user
  const user = await User.findOne({ _id: req.user.userID })

  // d. check if oldPassword correct or not
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid Credentials')

  // e. save new password
  user.password = newPassword
  await user.save()

  // f.
  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
