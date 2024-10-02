/*
  - we have 1 more: error 404 does not show taskID -> we want to have custom error message
    + use custom error class


  Steps.
  1. controller -> getTask 
        if (!task) {
          const error = new Error('Not found')
          error.status = 404
          return next(error)
        }
    + if we want, we can log directly 
    + or we can use next() to pass to err handler 
    + go to middleware/error-handler.js -> log -> we can see the err

  2. postman -> test getTask() -> keep the structure of ID
    + now, we can see our custom error -> pic: custom-err-class 1, 2, 3
  
  3. error-handler.js -> change to variable, but not hard code
    + return res.status(err.status).json({ msg: err.msg }) 

  - now, every time we need to create new Error -> DRY
    + we will create customer err class extends error
    + later, we just need to create instance and use


*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.static('./public')) // middleware
app.use(express.json())

app.use('/api/v1/tasks', taskRouter) // routes

app.use(notFound) // not found

app.use(errorHandlerMiddleware) // # error handler

///////////////////////
// START SERVER
///////////////////////
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
