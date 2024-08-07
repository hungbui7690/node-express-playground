/*
  Cookie - Big Picture & Gotchas
  - client -> App.js

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors') // #
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(cors())
app.use(express.static('./public')) // #

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)

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
