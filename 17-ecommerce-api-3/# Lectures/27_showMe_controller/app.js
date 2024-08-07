/*
  Show Current User
  - get user from req
  - send response with user


******************************
  
  - sometimes, user must refresh or navigate to URL they want -> we need routes to check: 
    -> user exists or not -> what is name/role? 

  - frontend -> console -> without login but refresh, then 401 -> no user currently
  - login 
    -> get user info in req.user 
    -> we don't need to go to DB to get info -> but get user info from cookie 


******************************


  1. userRoute -> add authenticatedUser
  2. user controller 
  3. postman -> test /showMe


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

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
