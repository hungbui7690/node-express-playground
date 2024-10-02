const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new UnauthenticatedError('Authentication Invalid')

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)

    // Method 1
    // req.user = { userID: payload.userID, name: payload.name }

    // Method 2: alt syntax -> must have async/await to work
    const user = await User.findOne({ _id: payload.userID }).select('-password')
    console.log(user)
    req.user = user

    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

module.exports = auth
