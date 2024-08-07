/*
  Auth Middleware
  1. copy from controller to auth.js 
  2. add this
      const { id, username } = decoded
      req.user = { id, username }

  3. in controller, if we want to use -> use req.user 
  

  NOTE: use at verify token => login will stay same


******************************

  Why do we store data in req.user?
  - pic: req.user


******************************

  (1) /middleware/auth.js


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const mainRouter = require('./routes/main')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1', mainRouter)

// notFound & error
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
