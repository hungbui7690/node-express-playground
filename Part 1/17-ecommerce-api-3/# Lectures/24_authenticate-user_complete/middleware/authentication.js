const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  // 1. without cookie -> we need to check in authHeader
  const token = req.signedCookies.token

  // 2.
  if (!token)
    throw new CustomError.UnauthenticatedError('Authentication Invalid')

  try {
    // 3. get payload from token
    const payload = isTokenValid({ token })
    // console.log(payload) // contains current user

    // 4. destructure
    const { name, userID, role } = payload

    // 5. save to req.user
    req.user = { name, userID, role }

    // 6. go to next controller
    next()
  } catch (error) {
    // 7.
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

module.exports = {
  authenticateUser,
}
