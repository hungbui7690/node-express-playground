/*
  Setup Routes
  
  1. routes/:
    - create routes:
      + JOBS
        -> /    -> get all jobs + create job
        -> /:id -> get single job, delete, update
      + AUTH
        -> /login
        -> /register
        => both are POST methods

  NOTE: app.js
  - app.use('api/v1/auth', authRouter) -> error: route does not exist -> hard to debug -> missing / at the beginning of api
    -> app.use('/api/v1/auth', authRouter)

*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// ==== connect DB later

// (5) Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages

// (6) routes >> end
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

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
