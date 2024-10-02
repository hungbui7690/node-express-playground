/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


****************************

  1. controllers 
    + import model 
  2. createTask()
  3. postman to test -> pic: postman_create-task
    + id will be auto generated by mongodb
  4. go to db, we will see that task 


****************************

  - because we created schema with "name" & "completed" 
    + so just the fields that match with schema will be inserted into db
    + the other fields will be ignored -> if we try to add the following item, just the "name" & "completed" will be inserted
      {
        "name" : "third task",
        "completed" : false,
        "random" : "random",
        "amount" : 5
      }

  - test with postman 
    + just "name" and "completed" will be inserted into db
      > "random" + "amount" will be ignored


****************************

  (1) controllers/tasks.js


  @@ const task = await Task.create(req.body)
  @@ POST Status is 201

*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.json())

app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.use('/api/v1/tasks', taskRouter)

///////////////////////////////
// CONNECT DB & START SERVER
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