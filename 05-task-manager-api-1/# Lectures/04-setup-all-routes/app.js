/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


*************************

  1. create all placeholders for functions in controllers
  2. create all routes

  - because all of them are /:id 
    > we can chain them together


  - router.route('/').get(getAllTasks).post(createTask) 
    + get() + post() are chained together
  - router.route('/:id').get(getTask).put(updateTask).delete(deleteTask)
    + get() + put() + delete() are chained together


  - we won't do anything until setting up these 
    + because if we setup later -> it will create a lot of errors -> hard to debug

  
  3. Postman Setup
  - setup variables -> check tutorial
  - after setup everything 
    > setup all routes in Postman (check pictures)


*************************

  (1) /controllers/tasks.js

*/

const express = require('express')
const app = express()

const taskRouter = require('./routes/tasks')

app.use(express.json()) // middleware

app.use('/api/v1/tasks', taskRouter) // routes

const port = 5000
app.listen(port, console.log(`Server is listening on port ${port}...`))
