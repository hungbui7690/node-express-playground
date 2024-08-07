/*
  Logout Route
  - [] set token cookie equal to some string value
  - [] set expires:new Date(Date.now())

  - Job API project -> we don't setup logout -> since token in response -> frontend just needs to remove token 
  
  - The way we remove token is just to change <payload> to any random string


*************************

  Steps: 
  - check in controller
      res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5*1000),
      })
    - must have 5*1000 -> otherwise, cookie will be removed right away 

  - when logout, we don't need to return anything -> but this is testing, we should return status code

  - postman:
    + /login
    + /logout
    + /api/v1


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

// extra
app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)

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
