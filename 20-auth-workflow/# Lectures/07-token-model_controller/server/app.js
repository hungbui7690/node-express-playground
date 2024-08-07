/*

  Refresh Token >>> chủ đề này khó 

  *** Bởi vì logout chưa có >> muốn ra lại thì:
      - clear cookies
      - hoặc vào localhost:3000/login

  - Khi chúng ta login >> chúng ta có token trong Cookies 
  - Nhưng nếu user đang làm và token expire thì sao  >> sẽ bị logout

  >> sẽ có 2 token >> PIC: refresh token
    + accessToken >>> expire nhanh (15p, 1h ...  )
    + refreshToken >>> thằng này sẽ lâu

/////////////////////////////////////////////////////////////////////

  Token Model

  - [] create Token.js in models
  - [] refreshToken,ip,userAgent - all String and required
  - [] isValid - Boolean, default:true
  - [] ref user
  - [] timestamps true

/////////////////////////////////////////////////////////////////////

  (1) create models/Token.js


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
