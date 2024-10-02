const CustomAPIError = require('../errors/custom-error')
const jwt = require('jsonwebtoken') // 1.

const login = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('Please provide username and password', 400)
  }

  // 2. in payload, it typically contains ID (ID will be in DB) -> but because we are learning, just create dummy data as ID
  const id = new Date().getTime()
  console.log(id)

  // 3. create token -> jwt.sign(payload, secret, options)
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  // 4. postman -> test -> get back token -> go to jwt.io (debugger) and paste there
  res.status(200).json({ msg: `user created`, token })
}

const dashboard = async (req, res) => {
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
