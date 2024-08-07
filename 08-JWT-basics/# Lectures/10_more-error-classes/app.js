/*
  More Error Classes
  - now, we have 1 custom error -> but we can do better:

    1. create 3 files in /errors:
      + bad-request.js
      + index.js
      + unauthenticated.js

    2. copy code in custom-error.js to bad-request.js -> BadRequest will extend CustomAPIError -> Err Code = 400
    3. copy code in custom-error.js to unauthenticated.js -> Unauthenticated will extend CustomAPIError -> Err Code = 401
    
    4. go to index.js and import these 3 -> from now on, everytime we want to use CustomError -> just need to import index.js

    5. use in controller

  
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
