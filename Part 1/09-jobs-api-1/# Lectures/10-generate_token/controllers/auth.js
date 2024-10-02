const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  // generate token
  const token = jwt.sign({ userID: user._id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  })
  console.log(token)

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  res.send('Login User')
}

module.exports = {
  register,
  login,
}
