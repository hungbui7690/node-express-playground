/*
  Not Found Middleware
  - with some routes that do not exist 
    > ex: localhost:5000/api/products/ -> 404
  

  Steps: 
  1. create /middleware/not-found.js
  2. app.js -> import + app.use() 
    -> must be place at the end of all the routes
  3. postman -> pic: 404


*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const notFound = require('./middleware/not-found')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', taskRouter)

app.use(notFound) // #

//////////////////////////////
// CONNECT DB & START SERVER
//////////////////////////////
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
