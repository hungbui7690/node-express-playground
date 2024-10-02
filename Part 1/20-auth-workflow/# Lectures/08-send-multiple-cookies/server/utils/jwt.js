const jwt = require('jsonwebtoken')

// (4) bỏ options đi
const createJWT = ({ payload }) => {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET)

// (5) (a)
const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  // (b)
  const accessTokenJWT = createJWT({ payload: { user } })
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } })

  const oneDay = 1000 * 60 * 60 * 24

  // (c) bỏ expires
  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 1000, // ms
  })

  // (d) thằng này vẫn giữ nguyên 1 ngày >> xong vào postman test >> sẽ thấy 2 cookies
  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    expires: new Date(Date.now() + oneDay),
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
