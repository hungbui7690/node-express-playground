/*
  Order Schema
  - [] tax : {type:Number}
  - [] shippingFee: {type:Number}
  - [] subtotal: {type:Number}
  - [] total: {type:Number}
  - [] orderItems:[]
  - [] status:{type:String}
  - [] user
  - [] clientSecret:{type:String} -> this is used to setup stripe
  - [] paymentId:{type:String}
  - [] set timestamps
  - [] export Order model

*************************

  - pic: cart.png 
    -> info about product
    -> 2 way to setup cart
      - local storage -> Front End
      - save in server
    -> next project -> will use "express sessions" -> then save in db

*************************

  1. create models/Order.js


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)

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
