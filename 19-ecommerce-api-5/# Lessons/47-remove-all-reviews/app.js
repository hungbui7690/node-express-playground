/*
  Why we use .remove()
  - "product" has "reviews" that associated to it
  - what happen to reviews when we remove that product
    -> nothing happens to "reviews"

  => we need to setup pre-remove hook 
    + before remove product -> get all reviews that links to that product and remove 
    + use .remove will trigger pre-remove hook 
    + if we use findOneAndDelete -> don't trigger that hook


****************************

  1. Product model -> use pre-remove, but not pre-save
  2. this.model() -> help us access to other model
    -> await this.model('Review').deleteMany({ product: this._id })
    -> when delete product -> access to Review model and delete Review that associated to that products

  3. Postman
    - create new product 
    - add multiple reviews
    - login as admin 
    - get product id that we want to remove 
    - delete product 
    - go back to review and check


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
