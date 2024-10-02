const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token
  if (!token)
    throw new CustomError.UnauthenticatedError('Authentication Invalid')

  try {
    const payload = isTokenValid({ token })

    const { name, userID, role } = payload
    req.user = { name, userID, role }

    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (req, res, next) => {
  // 1. check role is admin or not -> userRoute
  if (req.user.role !== 'admin') {
    throw new CustomError.UnauthenticatedError(
      'Unauthorized to access this route'
    )
  }
  next()
}

module.exports = {
  authenticateUser,
  authorizePermissions,
}
