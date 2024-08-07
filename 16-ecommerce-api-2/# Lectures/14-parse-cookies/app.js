/*
  JWT

- [x] require 'jsonwebtoken' package
- [x] create jwt - jwt.sign(payload,secret,options)
- [] verify jwt - jwt.verify(token,secret)
- [x] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
- [x] restart the server !!!!
- [x] refactor code, create jwt functions in utils
- [] refactor cookie code
- [] setup func attachCookiesToResponse
- [] accept payload(res, tokenUser)
- [] create token, setup cookie
- [] optionally send back the response


****************************

  Note:
  - later, browser will attach cookie to req and send to server -> server cannot access to that cookie
  - to access to cookie from server -> package: "cookie-parser"
  - pic: cookies-parser 
  

****************************

  Steps: 
  1. install cookie-parser 
      @@ npm i cookie-parser

  2. app.js 
    - now, we can use req.cookies()

  3. postman 


****************************
  Note: 
  - create cookie -> attach token to cookie -> add cookie to response
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
      })

  - to access cookie from request
      req.cookies


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const morgan = require('morgan')

// 1.
const cookieParser = require('cookie-parser')

const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')

// middlewares
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// extra
app.use(cookieParser()) // 2.
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

// 3. access cookies
app.get('/api/v1', (req, res) => {
  console.log(req.cookies) // return cookie
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)

// error middlewares
app.use(notFountMiddleware)
app.use(errorHandler)

////////////////////////////
// SERVER & PORT
////////////////////////////

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
