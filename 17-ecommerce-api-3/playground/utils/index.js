const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')
const { createTokenUser } = require('./createTokenUser')

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
} // 2. to controller
