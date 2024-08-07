/*
  Validate Username - Password
  - check username, password in POST (login) request:
    + if exist: 
      -> create new JWT 
      -> send back to front end

  - we want setup authentication so only the request with JWT can access the dashboard


**************************

  Steps: 
  1. controllers: 
    - check in req.body has username, password or not
      -> if work with DB, there are 3 ways: 
          + mongoose: use mongoose validations
          + package: joi -> learn after understand JWT
          + controller: in Task Manager controller -> getTask -> here we use next() to pass error -> now, we use throw new Error

  ~~ The 400 Bad Request status code means that the server could not understand the request because of invalid syntax

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
