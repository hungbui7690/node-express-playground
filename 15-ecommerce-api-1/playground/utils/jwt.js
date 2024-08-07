const jwt = require('jsonwebtoken')

// 1.
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

// 2.
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

// 3. index.js
module.exports = {
  createJWT,
  isTokenValid,
}
