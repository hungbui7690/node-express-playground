/*
  Authorize Permission
  - check if role in token is admin or not


*************************

  - Last lesson: save payload to req.user -> this lesson, check req.user.role is admin or not

  1. /middleware/authentication.js
    -> create <authorization>Permissions() 
  
  2. note: 
    - <authentication> before <authorization>
      + authentication -> token -> save data to req.user -> req.user.role is admin 
      -> router.route('/').get(authenticateUser, authorizePermissions, getAllUsers)

  3. create errors/unauthorized.js 
  4. MUST EXPORT in index.js
      

  @@ unAuthentication = 403 -> unAuthorization = 401 (forbidden)


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
