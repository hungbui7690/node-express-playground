/*
  Cookies Setup
  - [x] require 'jsonwebtoken' package
  - [x] create jwt - jwt.sign(payload,secret,options)
  - [] verify jwt - jwt.verify(token,secret)
  - [x] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
  - [x] restart the server !!!!
  - [x] refactor code, create jwt functions in utils
  - [] refactor cookie code
  - [] setup func attachCookiesToResponse
  - [] accept payload(res, tokenUser)
  - [x] create token, setup cookie
  - [] optionally send back the response


*****************************

  - In Job API -> we send token through response and save in localStorage
  - From now on
    + token is not in Application > Local Storage 
    + will be save in Cookies
  

  - add token to cookies -> attach cookies to response

  *** HTTP only: Only browser can access to cookie -> next req
    -> we don't need to do anything in frontend like previous project


*****************************
  
  https://expressjs.com/en/api.html#res.cookie
  @@ res.cookie(name, value [, options])
    + options: expires, httpOnly...
    + later: secure & signed 


*****************************

  Steps: pic: postman-cookie-setup

  1. controller 
    -> not return token anymore 

  2. delete all in db 
  3. postman
    - token will be in Cookies tab in response -> pic


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')

const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')

// middlewares
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// extra
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.use('/api/v1/auth', authRouter)

// error middlewares
app.use(notFountMiddleware)
app.use(errorHandler)

//////////////////////
// SERVER & PORT
//////////////////////

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
