/*
  JWT
  - [x] require 'jsonwebtoken' package
  - [x] create jwt - jwt.sign(payload,secret,options)
  - [] verify jwt - jwt.verify(token,secret)
  - [x] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
  - [x] restart the server !!!!
  - [x] refactor code, create jwt functions in utils
  - [] refactor cookie code
  - [] setup func attachCookiesToResponse
  - [] accept payload(res, tokenUser)
  - [] create token, setup cookie
  - [] optionally send back the response


******************************

  1. utils/jwt.js
    - create function attachCookiesToResponse 

  2. controller

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

app.use(cookieParser())

app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.cookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

////////////////////////////
// SERVER & PORT
////////////////////////////

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
