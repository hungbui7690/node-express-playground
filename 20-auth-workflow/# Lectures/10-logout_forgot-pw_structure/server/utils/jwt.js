const jwt = require('jsonwebtoken')

const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } })
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })

  // (2a)
  const oneDay = 1000 * 60 * 60 * 24
  const longerExp = 1000 * 60 * 60 * 24 * 30

  // (2b)
  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })

  // (2c) xong check App.js
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + longerExp),
  })
}

const attachSingleCookie = ({ res, user }) => {
  const token = createJWT({ payload: user })

  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  })
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
}
