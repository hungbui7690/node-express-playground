/*
  Register Controller
  - [x] create user
  - [x] send response with entire user (only while testing)
  - [x] check if email already in use (schema and controller)
  - [] ignore 'role'
  - [] alternative 'admin' setup


  Steps: 
  1. User model -> unique property -> but with this, we need to setup mongoose error
    - Postman: "msg": "Duplicate value entered for email field, please choose another value"
    - Note: when we change anything in Model or DB -> must restart server 
      + to make this work (index can add to db) -> make sure db doesn't have any duplication

  2. controller
      const { email } = req.body
      const emailAlreadyExists = await User.findOne({ email })
      if (emailAlreadyExists)
        throw new CustomError.BadRequestError('Email already exists')


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')

// database
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')

// middlewares
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// extra
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
