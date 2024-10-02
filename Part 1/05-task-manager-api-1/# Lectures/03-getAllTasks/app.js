/*
  Get All Tasks
  - All Routes:  
      app.get   ('/api/v1/tasks')             Get all tasks
      app.post  ('/api/v1/tasks')             Create a new tasks
      app.get   ('/api/v1/tasks/:id')         Get Single Task
      app.patch ('/api/v1/tasks/:id')         update task
      app.delete('/api/v1/tasks/:id')         delete task


******************************

  Why?
  - why /api? 
    > because website NOT ONLY has API, BUT ALSO other stuffs (blogs, news, products...)
      + /api is used to distinguish with the others 
      + check Hacker News Algolia API

  - why do we need single task, but use /tasks (plural) 
    + this is the convention 

  - why do we need patch to update 
    + learn later


******************************

  (1) create /controllers/tasks.js

*/

const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks') // import route

app.use(express.json()) // must have this => otherwise, req.body will be undefined

app.use('/api/v1/tasks', taskRouter) // setup route

const port = 5000
app.listen(port, console.log(`Server is listening on port ${port}...`))
