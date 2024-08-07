/*
  JWT Setup
  - [x] require 'jsonwebtoken' package
  - [x] create jwt - jwt.sign(payload,secret,options)
  - [] verify jwt - jwt.verify(token,secret)
  - [x] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
  - [x] restart the server !!!!
  - [] refactor code, create jwt functions in utils
  - [] refactor cookie code
  - [] setup func attachCookiesToResponse
  - [] accept payload(res, tokenUser)
  - [] create token, setup cookie
  - [] optionally send back the response


***************************

  Steps: 
  1. create utils/
    - index.js
    - jwt.js

  2. jwt.js
    - create function createJWT({payload}) 
      + in function, we should place object in param -> we don't need to worry about the order of params when exec function 
    - create isTokenValid({token}) to exec jwt.verify

  3. we can do similar to error/ -> using index.js for faster import
  4. go to controller to use 
  5. postman -> /register


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// ==== rest of the packages
const morgan = require('morgan')

// database
const connectDB = require('./db/connect')

// ==== routers
const authRouter = require('./routes/authRoutes')

// middlewares
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// ==== extra
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.use('/api/v1/auth', authRouter)

// error middlewares
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
