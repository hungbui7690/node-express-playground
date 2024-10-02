const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  // console.log('authHeader: ', authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Authentication Invalid')

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // console.log('auth mdw - payload: ', payload)

    const user = await User.findOne({ _id: payload.userID }).select('-password')
    // console.log('auth mdw - user: ', user)
    req.user = user
    console.log('auth mdw - req.user: ', req.user)

    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

module.exports = auth
