/*
  Port
  - we won't deploy this project, because we haven't learned about Authentication, Security package & Deploying
  - though we don't deploy 
    + but we still need to know about "PORT" because we cannot hard code the port like this 

  - const port = process.env.PORT || 5000 
    > if server has its own port -> need to use server port, else 5000...


  Steps: 
  1. stop server 
  2. PORT=6000 node app.js
    + now we will see Server is listening on port 6000... 


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

app.use(errorHandlerMiddleware) // error handler

///////////////////////////////
// CONNECT DB & START SERVER
///////////////////////////////

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
