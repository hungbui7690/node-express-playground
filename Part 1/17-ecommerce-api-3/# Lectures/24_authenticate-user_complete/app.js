/*
  Authenticate User
    1. check token exists or not 
    2. check token is valid or not
    3. authorize based on permissions

  -> just admin has the permission to run getAllUsers -> next lessons


******************************

  - Prev lesson, we checked token exists or not
    -> this lesson, we do step 2


******************************

  Steps: 

    1. middleware/authentication.js

    2. router.route('/').get(authenticateUser, getAllUsers) 
      -> authentication.js use next() -> will go to getAllUsers()

    3. getAllUser controller -> log out "req.user"
    
    4. next lesson -> req.user -> check role is admin or not -> just admin can run some specific routes

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
