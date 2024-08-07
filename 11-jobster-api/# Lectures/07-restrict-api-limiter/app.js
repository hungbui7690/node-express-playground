/*
  Restrict CRUD to testUser
  - testUser: we created before
    -> this user is used to read data only 
    -> not allow to modify


  1. middleware/authentication.js -> always have testUser in token

      const payload = jwt.verify(token, process.env.JWT_SECRET)
      const testUser = payload.userID === '62eff8bcdb9af70b4155349d'
      req.user = { userID: payload.userID, testUser 


  2. create middleware/testUser.js -> will add this middleware to updateJob & deleteJob -> does not allow to delete / update

      const testUser = (req, res, next) => {
        if (req.user.testUser) {
          throw new BadRequestError('Test User. Read Only!')
        }
        next()
      }

  3. auth route
  4. job route


**************************
  API Limiter
  - limit the amount of time user login/register

  5. routes/auth.js

  - to test: 
    + max: 1
    -> logout -> login -> logout -> login...

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path')

// extra security packages
const helmet = require('helmet')
const xss = require('xss-clean')

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1) // 5d. since later, we need to upload this project to heroku or render
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(helmet())
app.use(xss())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// 3. serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
