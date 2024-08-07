/*
  Get All Jobs
  - take out all jobs that associated with that user
  - because auth middleware is run right before all jobs routes -> we can access to req.user

      const jobs = await Job.find({ createdBy: req.user.userID })

  - return:

      res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
      + we need "count" for front end

  - test with postman -> need header authorization -> Scripts tab


*****************************

  1. controllers/jobs.js


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

/*
======================================
CONNECT DB & START SERVER
======================================
*/
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
