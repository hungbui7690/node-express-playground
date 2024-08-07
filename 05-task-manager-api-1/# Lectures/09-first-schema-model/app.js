/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


****************************

  - mongoDB does not have structure
    + use mongoose to create structure 
      > mongoose schema
    
  - https://mongoosejs.com/docs/guide.html 
    + mongoose schema


  1. /models/Task.js
    + create schema first
      > schema will have structure, validation...
      > after having schema, we will create Model (we can think model as collection in mongoDB)
      
  2. module.exports = mongoose.model(name, schema) 


  *** in mongoose, model is the wrapper of schema 
    + with model, we can apply CRUD 
    + API of mongoose is straightforward
  
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

////////////////////////////////
// CONNECT DB & START SERVER
////////////////////////////////
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
