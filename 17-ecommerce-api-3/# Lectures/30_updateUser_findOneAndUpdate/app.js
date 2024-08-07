/*
  updateUser with User.findOneAndUpdate()
  - [] add authenticateUser middleware in the route
  - [] check for name and email in the body
  - [] if one is missing, send 400 (optional)
  - [] use findOneAndUpdate()
  - [] create token user, attachCookiesToResponse and send back the tokenUser


***************************

  - this lesson -> findOneAndUpdate
  - next lesson -> user.save()


***************************

  Note: pic: updateUser
  - pic -> Jobs Project 
  -> when we update infos -> almost all the user info will be display there
  -> when we send request -> we need to send old and new info

  - Example:
      Company: apple
      Position: backEnd
      Status: <pending>

  - Though we just want to change status -> we need to send all data (though data is already from db)
      Company: apple
      Position: backEnd
      Status: <Interview>
  
  - In our project -> 4 fields: name, email, password and role 
    -> just allow to update name & email 
    -> add restriction -> though frontend has been restricted, but we also need to restrict in backend as well -> avoid "security hole"


*************************

  1. userRoute -> add authenticateUser
  2. controller
    + check name & email in req.body -> not allow user to update password & role
    + use findOneAndUpdate


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

/////////////////////////
// SERVER & PORT
/////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
