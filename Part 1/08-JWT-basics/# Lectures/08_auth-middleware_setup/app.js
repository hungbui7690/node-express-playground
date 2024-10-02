/*
  Auth Middleware Setup
  - now, everything is in controllers -> and JWT will be used multiple times -> create middleware

  1. create /middleware/auth.js
    - create function authenticationMiddleware

  2. /routes
    - router.route('/dashboard').get(authMiddleware, dashboard) 
      + now, everytime request that is sent to /dashboard -> it needs to go thru middleware -> then next() to move to /dashboard
    
  3. browser -> get data -> Bearer null


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
