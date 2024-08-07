/*
  Mongoose Virtual
  - pic: mongoose-virtual
  - can think Virtual as properties that don't persist, not stored in db -> just only logically
    -> we create them on the fly when we want to compute something 

  - Using Virtual -> when getting Products, we can get all reviews that associated with those products

  - Product Model
    + does not have connection (ref) to reviews
    -> we cannot go to getAllProducts and add populate 

  - https://mongoosejs.com/docs/populate.html#populate-virtuals
  

********************************

  -  Review -> ref to Product & User


  1. models/Product.js -> with Mongoose Virtuals -> we don't need to have ref to Reviews
    + Add "virtual" to timestamp -> review now is virtual properties 
  -> { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }


  2. models/Product.js
    -> ProductSchema.virtual('review', {options})

      ProductSchema.virtual('review', {
        ref: 'Review',
        localField: '_id', // this is what id looks like in Product
        foreignField: 'product', // in review
        justOne: false, // since we want to get the list
      })

  4. getAllProducts -> use populate 

  5. Postman


********************************

  - Besides, we also can filter based on condition
  - Product Model, add match: { rating: 5 },

  - Because it is virtual property -> we cannot query -> can not get specific review
    
********************************

  - Next lesson, we learn another way to do the same thing


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
