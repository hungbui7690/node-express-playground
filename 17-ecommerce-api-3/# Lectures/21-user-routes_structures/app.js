/*
  User Routes Structures
  - this is from lesson 18

  - [] add userController file
  - [] export (getAllUsers,getSingleUser,showCurrentUser,updateUser,updateUserPassword) functions
  - [] res.send('some string value')
  - [] setup userRoutes file
  - [] import all controllers
  - [] setup just one route - router.route('/').get(getAllUsers);
  - [] import userRoutes as userRouter in the app.js
  - [] setup app.use('/api/v1/users', userRouter)


********************************

  - Note: order of route is important
    + router.route('/:id').get(getSingleUser)
    + router.route('/showMe')
    -> if we go to /showMe -> no ID error -> because both 2 points to /:id 
    -> /showMe must be above /:id

  - this is the correct order
    + router.route('/showMe')
    + router.route('/:id').get(getSingleUser)

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
