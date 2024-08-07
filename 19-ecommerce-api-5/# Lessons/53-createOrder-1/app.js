/*  
  Create Order
  - [] add orderController file in controllers
  - [] export (getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder) functions
  - [] res.send('function name')
  - [] setup orderRoutes file in routes
  - [] import all controllers
  - [] authenticate user in all routes
  - [] getAllOrders admin only
  - [] typical REST setup
  - [] router.route('/showAllMyOrders').get(getCurrentUserOrders)
  - [] import orderRoutes as orderRouter in the app.js
  - [] setup app.use('/api/v1/orders', orderRouter)


***************************

  Step:
  - create orderController.js


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
const orderRouter = require('./routes/orderRoutes')
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

// (3) sang Postman >> end
app.use('/api/v1/orders', orderRouter)

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
