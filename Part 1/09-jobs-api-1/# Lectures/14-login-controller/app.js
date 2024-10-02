/*
  LOGIN FUNCTIONALITY
  - only need to check for email and password
    + correct -> return users & token
    + incorrect -> throw unauthenticated error


  1. login controller in auth.js
    - use initial checking in controller 
      + check based on email 
        -> Email not correct or not exist -> "Invalid Credentials"
        -> Missing email or password -> "Please Provide..."

  2. postman 
      - create route: {{URL}}/auth/login (POST) to test
  
  - next lesson, compare password using bcryptjs


*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDb = require('./db/connect')

// Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

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
    // ===== Connect DB
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
