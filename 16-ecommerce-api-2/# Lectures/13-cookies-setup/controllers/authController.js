const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/')
const { createJWT } = require('../utils')

const register = async (req, res) => {
  const { email, name, password } = req.body
  const isEmailExists = await User.findOne({ email })
  if (isEmailExists)
    throw new CustomError.BadRequestError('Email already exists')

  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ name, email, password, role })

  const payload = { name: user.name, userID: user._id, role: user.role }

  console.log('payload: ', payload)
  const token = createJWT({ payload })

  // 1. expiration
  const oneDay = 1000 * 60 * 60 * 24 // 1000 = 1000ms = 1s

  // 2. using res.cookie() instead of res.json() -> send data through cookies
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
  })

  // 3. token is here anymore
  res.status(StatusCodes.CREATED).json({ user: payload })
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
