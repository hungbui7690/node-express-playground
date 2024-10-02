const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')

const register = async (req, res) => {
  const { email, name, password } = req.body

  const isEmailExists = await User.findOne({ email })

  if (isEmailExists)
    throw new CustomError.BadRequestError('Email already exists')

  // 1. add role
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  // 2. add role to user
  const user = await User.create({ name, email, password, role })

  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('Login ')
}

const logout = async (req, res) => {
  res.send('Logout')
}

module.exports = {
  register,
  login,
  logout,
}
