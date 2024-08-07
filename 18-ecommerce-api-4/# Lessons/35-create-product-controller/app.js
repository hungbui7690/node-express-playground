/*
  Create Product
  - [] create user property on req.body and set it equal to userId (req.user)
  - [] pass req.body into Product.create
  - [] send back the product


*************************

  1. models/Product.js


*************************

  1. when creating product -> we need to attach user -> to know who creates that product
    -> cookie contains token 
    -> token has userID


  2. mockData/product -> list of products

  3. postman -> delete all users -> create first user as admin

  - test case:
    a. empty values
    b. wrong category 
    c. correct
        {
          "name" : "testing product",
          "description" : "some description",
          "category" : "office",
          "company" : "ikea"
        }
      -> we will see "colors": [] 
      -> set default -> default: ['#222'] 


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
