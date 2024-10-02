/*
  Remaining Controllers (apart from uploadImage)
  - [] getAllProducts
  - [] getSingleProduct
  - [] updateProduct
  - [] deleteProduct
  - [] typical CRUD, utilize (task or job) project
  - [] remember we check already for role 'admin'


***************************

  1. productController.js
    -> now, we just have 1 role -> admin role -> just only 1 role to add and modify products

  2. update -> findOneAndUpdate(filter, req.body, {options})

  3. delete 
    -> will do differently -> because later will have some other functionalities (reviews)
    -> findOne -> remove
    -> now use product.remove() -> but not findOneAndDelete 
      => trigger pre save hook

  4. postman 
    - test with "admin" and "user"


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
