/*
  Check Permission Function
  - Only logged in user can see their own info -> cannot see other infos

  1. userRoutes 
    + old: router.route('/').get(authenticateUser, authorizePermissions('admin', 'user'), getAllUsers)
    + new: router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
    -> only admin can use getAllUsers
  
  2. but now, if we login as "peter" -> still can use getSingleUser/mary
    -> create utils/checkPermissions.js

  3. controller -> getSingleUser -> use checkPermission
    - after authenticate -> return req.user -> which has userID -> check if userID match with request userID 


  *** From now, we finished Auth -> with other projects -> just need to copy -> no need to start from scratch
  

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

///////////////////////////////
// SERVER & PORT
///////////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
