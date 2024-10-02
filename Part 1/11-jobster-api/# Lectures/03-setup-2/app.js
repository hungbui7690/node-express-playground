/*
  Modify User Model
  - add properties: lastName & location


*****************************

  Modify Response in Register and Login
  - change the response structure in register and login controllers

  1. controllers/auth.js

    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
        token,
      },
    })

  - Login and Register Works Now :):):)


*****************************

  Create Test User
  - test front-end request
  - in postman or front-end
  - make sure email and password are the same (or change the front-end)

    {
        "name":"testUser",
        "email":"test-user@test.com",
        "password":"secret"
    }

  - navigate to client/src/pages/Register.js
  - make sure email and password match your test user

      <button type='button' className='btn btn-block btn-hipster' disabled={isLoading} 
        onClick={() => dispatch(loginUser({ email: 'test@test.com', password: 'secret' }))}>


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path') // 1.

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

app.use(express.static(path.resolve(__dirname, './client/build'))) // 2.

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
