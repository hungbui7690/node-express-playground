const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const crypto = require('crypto') // 1.

const register = async (req, res) => {
  const { email, name, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'

  // 2a. crypto.randomBytes(40) -> create buffers
  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken, // 2b.
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
    verificationToken: user.verificationToken, // 2c.
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }
  if (!user.isVerified)
    throw new CustomError.UnauthenticatedError('Please verify your account ')

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

// 3.
const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })
  console.log(user)

  if (!user) throw new CustomError.UnauthenticatedError('Verification Failed')

  if (user.verificationToken !== verificationToken)
    throw new CustomError.UnauthenticatedError('Verification Failed')

  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''
  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Email verified' })
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  })
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail, // (4) sang routes
}
