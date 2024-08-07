const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { attachCookiesToResponse } = require('../utils')

const register = async (req, res) => {
  const { email, name, password } = req.body
  const isEmailExists = await User.findOne({ email })
  if (isEmailExists)
    throw new CustomError.BadRequestError('Email already exists')

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })
  const tokenUser = { name: user.name, userID: user._id, role: user.role }
  attachCookiesToResponse({ res, user: tokenUser })

  return res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  // 1.
  const { email, password } = req.body
  if (!email || !password)
    throw new CustomError.BadRequestError('Please provide email and password')

  // 2.
  const user = await User.findOne({ email })
  if (!user) throw new CustomError.UnauthenticatedError('Invalid Credentials')

  // 3.
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect)
    throw new CustomError.UnauthenticatedError('Invalid Credentials')

  // 4. select fields we want -> because we don't want to send password
  const tokenUser = {
    name: user.name,
    userID: user._id,
    role: user.role,
  }

  // 5.
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
  res.send('Logout')
}

module.exports = {
  register,
  login,
  logout,
}
