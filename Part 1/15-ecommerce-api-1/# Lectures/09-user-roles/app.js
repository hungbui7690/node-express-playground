/*
  Register Controller
  - [x] create user
  - [x] send response with entire user (only while testing)
  - [x] check if email already in use (schema and controller)
  - [] ignore 'role'
  - [] alternative 'admin' setup

  - with this, we add add role admin when create user -> admin just can be added from backend -> because frontend has register form without "admin role"


  1. we don't create user by passing req.body directly
    - const user = await User.create(name, email, password)
    -> if we want to change to admin -> the only way is go to DB and change there 

  2. but if we go to db and set admin -> this is not ok -> set the 1st user as admin
    - const isFirstAccount = (await User.countDocuments({})) === 0
      const role = isFirstAccount ? 'admin' : 'user'
      const user = await User.create({ name, email, password, role })


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')

// database
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

////////////////////////
// SERVER & PORT
////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
