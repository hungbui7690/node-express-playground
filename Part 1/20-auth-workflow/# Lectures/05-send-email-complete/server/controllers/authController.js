const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
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

  // (8) để hiểu hơn về origin >> PIC: origin
  const origin = 'http://localhost:3000'
  // const newOrigin = 'https://react-node-user-workflow-front-end.netlify.app' //  production origin

  // (XXX) đây là để hiểu rõ về origin >>> chúng ta có thể dùng những thông tin dưới đây để tạo ra origin mà ko cần phải hard code
  const originX = req.origin
  console.log(`origin: ${originX}`) // http://localhost: 5000
  const protocol = req.protocol
  console.log(`protocol: ${protocol}`) // http
  const host = req.get('host')
  console.log(`host: ${host}`) // localhost:5000
  const forwardedHost = req.get('x-forwarded-host')
  console.log(`forwardedHost: ${forwardedHost}`) // localhost: 3000 >>> đây là thằng chúng ta sẽ sử dụng >> bởi vì qua proxy, client đã bị hide dưới port 5000
  const forwardedProtocol = req.get('x-forwarded-proto')
  console.log(`forwardedProtocol: ${forwardedProtocol}`) // http

  // (9) lúc này vào frontend để test >>> PIC: frontend-email-verification
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
  attachCookiesToResponse({ res, user: tokenUser })

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
  verifyEmail,
}
