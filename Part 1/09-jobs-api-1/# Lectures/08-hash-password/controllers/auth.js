const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs') // 1.

const register = async (req, res) => {
  const { name, email, password } = req.body

  const salt = await bcrypt.genSalt(10) // 2. create salt
  const hashedPassword = await bcrypt.hash(password, salt) // 3. create hashed password using salt
  console.log(hashedPassword)

  const tempUser = { name, email, password: hashedPassword } // 4. create tempUser to store hashed password
  const user = await User.create({ ...tempUser }) // 5. create user

  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('Login User')
}

module.exports = {
  register,
  login,
}
