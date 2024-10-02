/*
  Auth Routes Structure
  - auth routes: 
    + register
    + login
    + logout


  - [] create controllers folder
  - [] add authController file -> using xxxController -> because project becomes bigger -> easy to distinguish
  - [] create routes folder
  - [] setup authRoutes file
  - [] import all controllers
  - [] setup three routes
  - [] post('/register') post('/login') get('/logout')
  - [] import authRoutes as authRouter in the app.js
  - [] setup app.use('/api/v1/auth', authRouter)
  

*****************************
  Postman Setup 
  - environment setup


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
