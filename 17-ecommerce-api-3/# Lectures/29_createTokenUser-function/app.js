/*
  createTokenUser in Utils
  - [] create a file in utils (createTokenUser)
  - [] setup a function that accepts user object and returns userToken object
  - [] export as default
  - [] setup all the correct imports/exports and refactor existing code


**************************

  - authController -> there is a snippet that we use many times 
    -> const tokenUser = { name: user.name, userID: user._id, role: user.role }
    -> create utils


**************************

  Steps: 
    1. create utils/createTokenUser.js
    2. setup function -> export 
    3. authController -> use


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

////////////////////////
// SERVER & PORT
////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
