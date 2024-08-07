const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  const token = jwt.sign({ userID: user._id, name: user.name }, 'jwtSecret', {
    expiresIn: '30d',
  })

  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token }) // use instance method here
}

const login = async (req, res) => {
  res.send('Login User')
}

module.exports = {
  register,
  login,
}
