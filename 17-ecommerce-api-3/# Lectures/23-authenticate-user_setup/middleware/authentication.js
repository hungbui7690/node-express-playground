const CustomError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  // 1. get signedCookies
  const token = req.signedCookies.token

  // 2. check if token exists or not
  if (!token) {
    throw new Error(`error, no token present`)
  } else {
    console.log(`token present`)
  }

  // 3. app.js
  next()
}

module.exports = {
  authenticateUser,
}
