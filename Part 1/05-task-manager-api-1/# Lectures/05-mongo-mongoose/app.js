/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


  - Check MongoDB-Smilga.pdf in /Tutorials -> setup Atlas + get Connection String

    1. follow pdf file to config atlas
    2. create /db/connect.js 
      + paste connectionString

    3. after setup db -> we need to connect to db from our server
      + though NodeJS has native Mongo DB Driver, we don't need to use it
      + we will use MONGOOSE


  - why do we use MONGOOSE? 
    + it has a lot of goodies that helps us to dev app faster
    + there are many APIs that do all heavy lifting for us

  @@ npm install mongoose 
  + https://mongoosejs.com/docs/

*/

const express = require('express')
const app = express()

const taskRouter = require('./routes/tasks')

app.use(express.json())

app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.use('/api/v1/tasks', taskRouter)

const port = 5000
app.listen(port, console.log(`Server is listening on port ${port}...`))
