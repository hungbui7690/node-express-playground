/*
  Modify Get All Jobs
  - before: return all jobs that is filtered by req.user.userID
  - this lesson -> add:
    + search functionality 
    + sort
    + pagination
  - after finish, remember to test in UI


*************************

  - counts number of documents matching filter in a database collection.

      Adventure.countDocuments({ type: 'jungle' }, function (err, count) {
        console.log('there are %d jungle adventures', count);
      })

  - if you want to count all documents in a large collection, use the estimatedDocumentCount() function instead. If you call countDocuments({}), MongoDB will always execute a full collection scan and not use any indexes.


*************************

  @@ totalJobs = await Job.countDocuments(queryObject)
  @@ numOfPages = Math.ceil(totalJobs / limit)

*************************

  1. jobs controller


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
