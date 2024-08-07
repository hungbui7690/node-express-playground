const User = require('../models/User')
const Token = require('../models/Token')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require('../utils')
const crypto = require('crypto')

const register = async (req, res) => {
  const { email, name, password } = req.body

  const emailAlreadyExists = await User.findOne({ email })
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists')
  }
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const verificationToken = crypto.randomBytes(40).toString('hex')

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  })

  const origin = 'http://localhost:3000'

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
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

  let refreshToken = ''

  const existToken = await Token.findOne({ user: user._id })

  if (existToken) {
    const { isValid } = existToken
    if (!isValid) {
      throw new CustomError.UnauthenticatedError('Invalid Credentials')
    }

    refreshToken = existToken.refreshToken

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }

  await Token.create(userToken)

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

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
  await Token.findOneAndDelete({ user: req.user.userId })

  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({ msg: 'user logged out!' })
}

// (1) utils/sendResetPasswordEmail.js
const forgotPassword = async (req, res) => {
  // (a)
  const { email } = req.body

  // (b)
  if (!email) {
    throw new CustomError.BadRequestError('Please provide email')
  }

  // (c) xong check postman + db
  const user = await User.findOne({ email })
  if (user) {
    // (i) password này vẫn có thể hashed  >> bài sau
    const passwordToken = crypto.randomBytes(70).toString('hex')
    console.log(passwordToken)

    // (ii) send email
    const origin = 'http://localhost:3000'
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    })

    // (iii)
    const tenMins = 1000 * 60 * 10
    const passwordTokenExpDate = new Date(Date.now() + tenMins)

    user.passwordToken = passwordToken
    user.passwordTokenExpDate = passwordTokenExpDate
    await user.save()
  }

  // (d)
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' })
}

// (3)
const resetPassword = async (req, res) => {
  const { token, email, password } = req.body

  if (!token || !email || !password) {
    throw new CustomError.BadRequestError('Please provide all values ')
  }

  const user = await User.findOne({ email })
  // console.log(user)
  console.log(user.passwordToken, token)

  if (user) {
    const currentDate = new Date()

    if (
      user.passwordToken === token &&
      user.passwordTokenExpDate > currentDate
    ) {
      user.password = password
      user.passwordToken = null
      user.passwordTokenExpDate = null
      await user.save()
    }
  }

  res.send('reset password')
}

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
}
