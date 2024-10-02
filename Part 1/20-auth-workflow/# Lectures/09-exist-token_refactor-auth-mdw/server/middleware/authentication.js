const CustomError = require('../errors')
const { isTokenValid } = require('../utils')
const Token = require('../models/Token')
const { attachCookiesToResponse } = require('../utils')

// (4)
const authenticateUser = async (req, res, next) => {
  // (a)
  const { refreshToken, accessToken } = req.signedCookies

  try {
    // (b)
    if (accessToken) {
      // (i)
      const payload = isTokenValid(accessToken)
      req.user = payload.user

      // (ii) nếu để maxAge bên jwt là 1000ms >> sẽ lỗi >> phải vào đó và set lại >> lúc này có thể vào login và /showMe để test
      return next()
    }

    // (c)
    const payload = isTokenValid(refreshToken)

    console.log(payload)

    // (i)
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    }) // check lại refreshTokenJWT >> ở đó chúng ta pass vào {user, refreshToken}

    // (ii)
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }

    // (iii) set accessToken maxAge thành 1000ms và test lại
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    })
    req.user = payload.user
    next()
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid')
  }
}

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      )
    }
    next()
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
}
