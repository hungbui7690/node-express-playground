/*
  Modify Job Model
  - add jobType & jobLocation


****************************

  Setup Mock Data
  - we want to setup mock data for Job model -> will populate later 
  - using testUser ID that we created in 02-setup-2 -> then paste into the createdBy in the mock-data.json
  - pic: mockaroo

  @@ Mockaroo: https://www.mockaroo.com/
  

****************************

  Populate Data
  - create populate.js

      ~~ node populate.js


  - then login with testUser -> check for All Jobs 


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
