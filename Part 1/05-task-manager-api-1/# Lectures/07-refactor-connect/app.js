/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


************************

  - our problem now is DB and Server don't sync 
    + if we check log > we see that server listens first, then connect db
    + but in the real world, if we don't connect db, how server can start? 
      -> we need to connect to db first -> if successful, then start server

  
  - Steps: 
    > connect.js
      1. remove .then() & .catch() in connect.js
      2. save connection into variable (this will return promise)
      3. export

    > app.js
      1. require(./connect ) 
      2. create start() -> to connect to db -> if successful, then start server
      3. invoke function start()


************************

  (1) /db/connect.js

*/

const connectDB = require('./db/connect')

const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.json()) // middleware

app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.use('/api/v1/tasks', taskRouter)

//////////////////////////////////
// CONNECT DB & START SERVER
//////////////////////////////////
const port = 5000

const start = async () => {
  try {
    await connectDB()

    app.listen(port, console.log(`Server is listening on port ${port}...`)) // must connect to db, then starts server
  } catch (error) {
    console.log(error)
  }
}

start()
