/*
  UpdateUserPassword
  - [] almost identical to login user
  - [] add authenticateUser middleware in the route
  - [] check for oldPassword and newPassword in the body
  - [] if one missing 400
  - [] look for user with req.user.userId
  - [] check if oldPassword matches using user.comparePassword
  - [] if no match 401
  - [] if everything good set user.password equal to newPassword
  - [] await user.save()


*****************************

  1. userRoute -> add authenticateUser
    -> router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword)

  2. controller -> after update, run model.save() -> alternative way for findOneAndUpdate
    + before:
        findOneAndUpdate
    + after: 
        findOne
        save()
      
  3. postman


  Note: new password is still hashed -> since we use .save() -> pre save hook


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
