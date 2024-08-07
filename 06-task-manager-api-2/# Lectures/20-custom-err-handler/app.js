/*
  Custom Error Handler
  - http://expressjs.com/ 
    -> search-box: error -> default error handler
  
  - Express comes with a built-in error handler that takes care of any errors that might be encountered in the app. 
    + This default error-handling middleware function is added at the end of the middleware function stack. 
    + this is why err appears when we work with postman or in console -> default of express

  - If you pass an error to next() and you do not handle it in a custom error handler, it will be handled by the built-in error handler; 
    + the error will be written to the client with the stack trace. 
    + The stack trace is not included in the production environment. 
    + this is next(error) in async wrapper

  - Scroll down, we will see Writing error handlers
    + we want to apply this into our code
      -> pic: express-default-error-handler


*****************************

  Steps: 
  1. create create directly in app.js
    -> but if we want to split our code -> create /middleware/error-handler.js -> export
  3. app.js -> import -> app.use
  4. postman -> test -> pic: custom-error-handler

  *** Note: errorHandlerMiddleware must be placed at the end of all routes (include 404)

*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', taskRouter)

app.use(notFound) // not found

// *** MUST BE HERE (AT THE END) TO CATCH ALL ERROR
app.use(errorHandlerMiddleware)

///////////////////////////////
// START SERVER
///////////////////////////////
const port = 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
