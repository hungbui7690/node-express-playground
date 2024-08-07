/*
  1. create errors/custom-error.js
    a. create class and extends Error
    b. create method createCustomError(msg, statusCode)
      > now, if we want to use, just need to create instance and call method

  2. export + go to controller import and use
      > return next(createCustomError(`No task with id ${taskID}`), 404)

  3. go to middleware/error-handlers.js to check:
    - if error is the instance of CustomAPIError, then run different way
    - if error is NOT the instance of CustomAPIError, then run the old way

*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.static('./public')) // middleware
app.use(express.json())

app.use('/api/v1/tasks', taskRouter) // routes

app.use(notFound) // not found

app.use(errorHandlerMiddleware) // error handler

////////////////////////////////
// CONNECT DB & START SERVER
////////////////////////////////
const port = 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
