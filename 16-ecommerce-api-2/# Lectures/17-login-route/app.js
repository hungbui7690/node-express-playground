/*
  Login Route
  - [] check if email and password exist, if one missing return 400
  - [] find user, if no user return 401
  - [] check password, if does not match return 401
  - [] if everything is correct, attach cookie -> send back the same response as in register


***********************

  Steps: 
  1. authController -> login 
  2. check empty email / password
  3. check user existance
  4. check password
  5. return token user
  6. postman: 
    - before test -> need to delete cookie
    - /login
    - /api/v1 -> check if it has cookie or not


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

///////////////////////////
// SERVER & PORT
///////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
