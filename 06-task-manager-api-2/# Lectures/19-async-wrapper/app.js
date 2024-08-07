/*
  - now, in controllers, all functions must have try/catch because we are using async/await 
    > code looks messy

  - solution: create middleware function to wrap our controllers
    > in mdw function, there is logic that helps us remove try/catch
  
  *** there is package that helps us do this -> later in upcoming projects


**************************

  Steps: 
  1. create file /middleware/async.js -> contain asyncWrapper() 
  2. export & import into controller
  3. use asyncWrapper in function. Ex:
      - old: 
          const getAllItems = async() => {}
      - new:
          const getAllItems = asyncWrapper(async() => {})


  if (!task) return res.status(404).json({ msg: `No task with id ${taskID}` }) 
  > this is custom error -> we will work on it in next lesson


**************************

  (1) create /middleware/async.js

*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const notFound = require('./middleware/not-found')
const app = express()
const taskRouter = require('./routes/tasks')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', taskRouter)

// # not found
app.use(notFound)

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
