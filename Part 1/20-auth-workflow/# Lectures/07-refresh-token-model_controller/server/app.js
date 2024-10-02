/*
  Refresh Token 
  - pic: refresh-token
  - for security reason, we need to have 2 tokens: Access <AT> & Refresh Token <RT>
    + Access Token: use for all of the requests -> 15m, 1hr...
    + Refresh Token: use when <AT> is expired to generate new <AT> -> very long -> 30d...


*************************

  - Since we don't have logout route: 
    -> clear cookies 
    -> or localhost:3000/login
  
  - When we login, we will have token in Cookies 
    -> but if user is working, then token expires -> user will be logout


*************************

  Steps: 
  1. Login 
    -> <AT> and <RT> will be sent back to client 
  2. use <AT> to access protected routes /api/profile, /api/products...
    -> Protected resources is returned
  3. <AT> expires, then use <RT> to generate new <AT> -> go to /api/refresh-token for example
    -> <AT> is returned
    -> use new <AT> too access protected routes

  
  🔍 Since <AT> has short lifespan -> when hackers get <AT>, they can use for short period of time 
    -> <RT> is used less frequently -> so it's hard to be hacked than <AT> -> but if <RT> is hacked, they can used it to generate new <AT>

  
*************************

  Re-validate <RT> & generate <AT>
  - <AT> is stored in client 
  - <RT> is stored in both client and server (DB)
    -> to revalidate 
      + check if the IP address that is saved from server is different than client -> email or sms will be sent to that user to verify if it is the correct user
      + check if <RT> from client is match with <RT> from DB
    -> if true -> generate new <AT> & <RT>
    -> if not -> revoke <RT>


*************************

  Token Model
  - [] create Token.js in models
  - [] refreshToken,ip,userAgent - all String and required
  - [] isValid - Boolean, default:true
  - [] ref user
  - [] timestamps true


  1. create models/Token.js


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
