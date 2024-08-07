/*
  Verify Email Controller
  - [] create verifyEmail in authController
  - [] get verificationToken and email from req.body
  - [] setup a '/verify-email' route in authRoutes
  - [] test in a Postman
  - [] check for user using email
  - [] if no user 401
  - [] if token does not match user token 401
  - [] if correct set
  - [] user.isVerified = true
  - [] user.verified = Date.now()
  - [] user.verificationToken = ''
  - [] save use with instance method
  - [] return msg:'email verified'


******************************

  - const verificationToken = 'fake token'
    + we can use unique id library to create token 
    + better way is to use "crypto" lib -> built-in nodejs -> no need to install


******************************

  1. authController.js
  ...

  - when finish step 2 -> we finish create token

******************************

  - pic: verify-email
  - ask user verify email -> send token to user

  
  - khi chúng ta bắt user verify email >> btn, chúng ta đã gửi token tới user 
  - có thể thấy ở postman, sau khi register xong, chúng ta gửi token tới user >>> trong thực tế khi có front end sẽ khác >> check picture 
    
    >> chúng ta sẽ kiểm tra token, cũng như email có hợp lý hay ko >> nếu hợp lý thì sẽ cho verify 

///////////////////////////////////////////////////////////////////////

  (3) tạo verify() trong authController.js

  
  sau khi xong, postman: 
  - register
  - verify
  - login >> nếu chưa verify thì ko login đc

*/

require('dotenv').config()
require('express-async-errors')
// express

const express = require('express')
const app = express()
// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

// database
const connectDB = require('./db/connect')

//  routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
