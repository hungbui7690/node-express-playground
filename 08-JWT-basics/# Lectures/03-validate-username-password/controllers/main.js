const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
  // 1. make sure username & password exist
  const { username, password } = req.body
  if (!username || !password) {
    throw new CustomAPIError('Please provide username and password', 400)
  }

  // 2.
  res.send('Fake Login/Register/Signup Route')
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
