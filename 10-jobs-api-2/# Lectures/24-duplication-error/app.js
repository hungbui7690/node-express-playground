/*
  Duplication Error
  - now, there are total 3 errors: 
    + Validation Errors
    + Duplication Error (email)
    + Cast Error (wrong format)
  - these 3 errors will be checked by mongoose


*****************************
  P1
  - if we check middleware/error-handler.js -> we see error 500 (Internal Server Error)
    + postman -> create same email -> we will see error response is ugly -> we want more friendly user response
    

*****************************
  P2 

    if (err.code && err.code === 11000) {
      customError.msg = `Duplicate value entered for ${err.keyValue} field, please choose another value`
      customError.statusCode = 400
    }  

  - OLD: 
    - return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
      > if we run this -> we see error code (11000)


  *****************************
  
  - remove this code in error-handler: 

      if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })


*****************************

  (1) /middleware/error-handler.js


*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// ==== connect DB
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
