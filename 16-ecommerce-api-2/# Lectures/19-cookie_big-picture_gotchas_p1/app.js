/*
  Cookie - Big Picture & Gotchas
  - public/ 
    + static asset

*****************************

  - setup static asset in app.js -> http://localhost:5000
  - browser -> will see btnTesting that links to /api/v1 -> this will show how frontend works with cookie


*****************************

  1. check Application -> Cookie 
  2. check browser-app.js -> fetch to api/v1/auth/login when submit form -> everything in frontend is simple
  3. click <Testing> button -> then check log in server -> null -> because not sign-in
  4. when fill correct data & submit -> cookie will be added to Application>Cookie right away
  5. logout -> token value will be changed to logout -> refresh to make it gone


*****************************

  i.   first, when working with cookie -> frontend doesn't need to do anything -> browser will do everything for us automatically
  ii.  when using httpOnly -> we cannot access to Cookie by using JS -> more secure
      -> httpOnly = false -> JS can access to cookie -> document.cookie
  iii. downside of cookie:
      + has max size -> 4096 bytes -> can check size in Application


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors') // # this is for next lesson
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
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
