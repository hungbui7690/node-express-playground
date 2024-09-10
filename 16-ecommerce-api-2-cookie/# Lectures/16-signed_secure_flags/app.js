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


*****************************

  - pic: cookies-options
  - secure: only allow to send cookie through HTTPS
    + localhost -> no HTTPS -> need to setup condition 
      # secure: process.env.NODE_ENV === 'production'
    + prod -> HTTPS -> secure -> create signed cookie -> cookie has signature -> can help to check if client modifies cookie or not


*****************************

  How to create Signed Cookie
  - import cookie-parser 
    + const cookieParser = require('cookie-parser')


  - Method 1:   
    @@ app.use(cookieParser('<SECRET>'))
    @@ res.cookie('cookieX', 'X cookie', {signed:true, maxAge: 1000*60, httpOnly: true})
    @@ req.signedCookies.cookieX

  - Method 2: 
    ~~ app.use(cookieParser())
    ~~ res.cookie('cookieX', 'X cookie', {signed:true, maxAge: 1000*60, httpOnly: true})
    ~~ req.signedCookies['cookieX']


*****************************

  - create cookies
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
      })

  - before: app.use(cookieParser())
  - after:  app.use(cookieParser(process.env.JWT_SECRET))
    + we signed cookie
    + with this: 
      # we cannot use req.cookies to get cookie
      # use req.signedCookies


*****************************

  1. utils/jwt.js


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET)) // 3. to parse signed cookies -> must have secret

app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies) // 4. access signed cookies
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)

// error middlewares
app.use(notFountMiddleware)
app.use(errorHandler)

////////////////////////
// SERVER & PORT
////////////////////////

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
