/*
  Populate Method
  - allow to reference different collections
  - "Review" has ref to "User" & "Product"


  - populate method on review 
    + can see info of "user" & "product"
      -> name, company, price... 

  - similar to join when working with relational DB
  
    {
      "review": {
          "_id": "6355823d820dfa08833d0f61",
          "rating": 5,
          "title": "Awesome bed",
          "comment": "Smooth and Super Good",
          "user": "63558228820dfa08833d0f5d",
          "product": "6352e2dc9f79b0aac2ae0cda",
          "createdAt": "2022-10-23T18:04:45.595Z",
          "updatedAt": "2022-10-23T18:06:32.426Z",
          "__v": 0
      }
    }


*************************

  1. controller -> getAllReviews

  2. chain -> get info from Product collection
    -> populate(what_we_want_to_ref, properties_we_want_to_get)
    -> const reviews = await Review.find({}).populate({path: 'product', select: 'name company price'}) 

  3. also can chain multiple time -> get info from User collection
    -> const reviews = await Review.find({})
        .populate({
          path: 'product',
          select: 'name company price',
        })
        .populate({ path: 'user', select: 'name' })

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

///////////////////////////////
// SERVER & PORT
///////////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
