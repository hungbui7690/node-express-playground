/*
  PRODUCT MODEL
  - [x] create Product.js in models folder
  - [x] create Schema
  - [x] name : {type:String}
  - [x] price: {type:Number}
  - [x] description: {type:String}
  - [x] image: {type:String}
  - [x] category: {type:String}
  - [x] company: {type:String}
  - [x] colors: {type:[]}
  - [x] featured: {type:Boolean}
  - [x] freeShipping: {type:Boolean}
  - [x] inventory:{type:Number}
  - [x] averageRating:{type:Number}
  - [x] user
  - [x] set timestamps
  - [x] export Product model


***************************

  - image -> must have default image  
    -> default img can be in server or client
  
      image: {
        type: String,
        default: '/uploads/example.jpeg',
      }

  - company: enum
  - colors: [String] -> array of string
  - averageRating: default = 0 -> calculate later


***************************

  1. model/Product.js


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

///////////////////////////////
// SERVER & PORT
///////////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
