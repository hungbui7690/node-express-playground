/*
  JWT Setup
  - [x] require 'jsonwebtoken' package
  - [x] create jwt - jwt.sign(payload,secret,options)
  - [] verify jwt - jwt.verify(token,secret)
  - [x] add variables in .env JWT_SECRET=jwtSecret and JWT_LIFETIME=1d
  - [x] restart the server !!!!
  - [] refactor code, create jwt functions in utils
  - [] refactor cookie code
  - [] setup func attachCookiesToResponse
  - [] accept payload(res, tokenUser)
  - [] create token, setup cookie
  - [] optionally send back the response


********************************
  - Job API -> after register -> send back name & token
    + Application -> Local Storage 
    + Network -> Authorization = Bearer <token>


  Steps: 
  1. when send back token, we normally send back ID (payload) in jwt.sign(payload, secret, options). 
    - in this case, we also send back "role"
  2. delete all users in DB
  3. postman -> don't need to setup Script tab like previous lesson since we use cookies


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
