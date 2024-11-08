/*
  Dummy Controllers
  - create dummy (placeholder) controllers


************************

  1. /controllers:
    - auth.js: create register + login
    - jobs.js: create getAllJobs, getJob, createJob, updateJob, deleteJob

*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api')
})

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
