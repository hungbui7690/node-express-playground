/*
  Status Codes
  - now, we are hard code the status code in errors/ 
  - better solution is to use http-status-codes package
    
    @@ npm install http-status-codes --save
  
      200	OK	OK
      201	CREATED	Created
      202	ACCEPTED	Accepted
      400	BAD_REQUEST	Bad Request
      401	UNAUTHORIZED	Unauthorized

  - from now, instead of filling status code (200, 201...), we fill the code names => don't need to remember status codes, and code will be more consistent

      const { StatusCodes } = require('http-status-codes')
      this.statusCode = StatusCodes.BAD_REQUEST
      

  - refactor our code
    1. /middleware/auth.js 
        OLD: throw new CustomAPIError('No token provided', 401)
        NEW: throw new UnauthenticatedError('No token provided')

    2. /controllers/main.js -> bad request

    3. /middleware/error-handler.js

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
