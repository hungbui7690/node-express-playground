const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  const { name, email, password } = req.body
  console.log(req.body)

  // Controller validators
  if (!name || !email || !password) {
    throw new BadRequestError('Please provide name, email, and password')
  }

  const user = await User.create({ ...req.body })

  res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
  res.send('Login User')
}

module.exports = {
  register,
  login,
}
