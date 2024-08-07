const User = require('../models/User')
const CustomError = require('../errors')
const { StatusCodes } = require('http-status-codes')
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require('../utils')

const getAllUsers = async (req, res) => {
  console.log(req.user)
  const users = await User.find({ role: 'user' })

  res.status(StatusCodes.OK).json({ users })
}

// 3. use here
const getSingleUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findOne({ _id: id }).select('-password')
  if (!user) throw CustomError.NotFoundError(`No user with id ${id}`)

  checkPermissions(req.user, user._id) // ***

  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { email, name } = req.body
  if (!email || !name)
    throw new CustomError.BadRequestError('Please provide all values')

  // user.save()
  const user = await User.findOne({ _id: req.user.userID })
  user.email = email
  user.name = name
  await user.save()

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserFindOneAndUpdate = async (req, res) => {
  const { email, name } = req.body
  if (!email || !name)
    throw new CustomError.BadRequestError('Please provide all values')

  const user = await User.findOneAndUpdate(
    { _id: req.user.userID },
    { email, name },
    { new: true, runValidators: true }
  )

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  if (!oldPassword || !newPassword)
    throw new CustomError.BadRequestError('Please provide both values')

  const user = await User.findOne({ _id: req.user.userID })
  const isPasswordCorrect = await user.comparePassword(oldPassword)
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid Credentials')

  user.password = newPassword

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Success! Password Updated.' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
