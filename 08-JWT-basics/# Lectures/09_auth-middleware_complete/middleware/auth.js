const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  // 1. copy from controller
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomAPIError('No token provided', 401)

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 2. same to req.user
    const { id, username } = decoded
    req.user = { id, username }
    console.log(req.user)

    // 3. if everything above passes -> move to next middleware (controller)
    next()
  } catch (error) {
    throw new CustomAPIError('Not authorized to access this route', 401)
  }
}

module.exports = authenticationMiddleware
