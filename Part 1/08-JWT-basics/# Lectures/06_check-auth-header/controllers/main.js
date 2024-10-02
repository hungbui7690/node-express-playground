const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('Please provide username and password', 400)
  }

  const id = new Date().getDate()
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ meg: `user created`, token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization // 1. get authorization in headers
  console.log('authHeader: ', authHeader)

  // 2.
  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new CustomAPIError('No token provided', 401)

  const token = authHeader.split(' ')[1] // 3. position [0] is Bearer
  console.log('token: ', token)

  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
