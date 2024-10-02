/*
  Product Structure
  - [] add productController file in controllers
  - [] export (createProduct, getAllProducts,
    getSingleProduct, updateProduct, deleteProduct, uploadImage) functions
  - [] res.send('function name')
  - [] setup productRoutes file in routes
  - [] import all controllers
  - [] only getAllProducts and getSingleProduct accessible to public
  - [] rest only by admin (setup middlewares)
  - [] typical setup
  - [] router.route('/uploadImage').post(uploadImage)
  - [] import productRoutes as productRouter in the app.js
  - [] setup app.use('/api/v1/products', productRouter)

  -> Check React Project Demo -> Comfy Store


*******************************

  Note: 
  - /uploadImage must be before /:id


*******************************

  1. model/Product.js
  ...

  4. Postman 
    - create Product/ -> setup route -> just admin can create / upload image / update / delete
    - login as admin, user -> test


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
const productRouter = require('./routes/productRoutes')
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
app.use('/api/v1/products', productRouter)

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
