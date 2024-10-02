/*
  Update Job
  - setup route in Postman -> Patch
  - update -> need req.body

  - findOneAndUpdate -> need 3 things: 
    + which job we looking for 
    + what we want to update
    + options: 
      # do we want updated version 
      # do we want to run validator
    -> findOneAndUpdate(where, what, options)

  - after finish controller, test with 3 cases:
    + remove the last digit in ID -> cast error
    + wrong ID 
    + correct ID


*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDb = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra packages
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

////////////////////////////
// CONNECT DB & START SERVER
////////////////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    // Connect DB
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
