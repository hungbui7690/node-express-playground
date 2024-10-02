/*
  Handle Password
  - [] UserSchema.pre('save') hook
    + this points to User
    + bcrypt.genSalt - number of rounds
    + bcrypt.hash


  Steps: 
  - User model -> with mongoose v6 -> no need next()
  - pre('save') -> when using create() or save() will call this 
  - comparePassword

  
  Test: 
  - delete all in db 
  - create 2 users without role 
  - check if password is hashed or not -> it should be hashed


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
