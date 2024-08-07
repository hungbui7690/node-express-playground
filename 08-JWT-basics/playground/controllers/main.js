const BadRequestError = require('../errors/bad-request')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new BadRequestError('Please provide username & password') // ***
  }

  const id = new Date().getDate()
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(StatusCodes.OK).json({ meg: `user created`, token }) // StatusCodes.OK
}

const dashboard = async (req, res) => {
  console.log('req.user: ', req.user) // 4.
  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(StatusCodes.OK).json({
    msg: `Hello, ${decoded.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
