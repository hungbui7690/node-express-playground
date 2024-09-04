/*
  Aggregate Pipeline Setup
  - this lesson -> setup auto update average rating when create/update/remove reviews -> aggregate pipeline

  1. models/Product.js
    ...

  - After done 2b. -> try to create/update/remove review
    -> post-save & post-remove hooks

  => this is the reason we use .save & .remove at update & delete controller


******************************

  Static Methods 
  - when setup User model -> we setup methods
    -> UserSchema.methods.comparePassword 
    -> this method is instance method -> auth controller (/login) -> we can use instance method
  
  - another way is to use static method -> we don't call it on instance, but schema


******************************

  3. Review Model
    - to create static methods -> Model.statics.methodName
      -> ReviewSchema.statics.calculateAverageRating (3a)
    - to use static method -> this.constructor.methodName -> this.constructor point to class, but not point to instance (3b, 3c)

  4. after done setup -> postman -> test
    -> create/update/delete review

  Note: 
  - await this.constructor.calculateAverageRating(this.product)
    -> this.product -> we're in Review model -> this.product points to product field of Review Schema -> product field has type of ObjectID -> return productID


******************************

  Test:
  - After done -> Reset DB
  - delete all products -> reviews will alto delete
  - login as "admin"
    + add 1 product 
    + add review for that product
  - login as "user"
    + add review for product


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
