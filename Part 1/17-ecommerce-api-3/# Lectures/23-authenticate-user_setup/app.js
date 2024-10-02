/*
  Authenticate User Setup
  - First, check token exists or not 
  - Next, check token is valid or not
  - Then, authorize based on permissions

  
  -> just admin has the permission to run getAllUsers

  *** Delete Cookie in Postman -> pic: postman-delete-cookies


****************************

  1. middleware/authentication.js 
    + setup authenticateUser()
  
  2. app.js -> because we use signed cookies 
    @@ app.use(cookieParser(process.env.JWT_SECRET))) 
    @@ req.signedCookies

  3. all user routes use authentication -> middleware in app.js 
    -> now, we add middleware go getAllUsers & getSingleUser first

  4. postman -> logout to clear cookie -> then test getAllUsers


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

app.use(cookieParser(process.env.JWT_SECRET)) // 3.
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

// 4.
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
