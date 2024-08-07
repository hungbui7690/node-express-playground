/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


*******************************

  - the last thing is setting up env file 
    + reason: in the future, we will need to push our project to Github
      > anyone can see the connection string and mess with our data
    + solution: create .env file (install env package)

  *** .env will help us create SECRET vars 
    + after push to GITHUB, we must ignore .env using .gitignore

  *** everytime we change anything in .env file -> we need to restart server to take effect

*******************************

  1. npm install dotenv
  2. create file .env at root
  3. .env: create connection string MONGO_URI=connectionString 
      > check pic: connection-string
  4. connect.js:
      > instead of passing connection string into connect() >> then pass url
  5. app.js:
      > require('dotenv').config()
  5. app.js:
      > pass connection string by using process.env.MONGO_URI

*/

require('dotenv').config() // ***

const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.json())

app.use('/api/v1/tasks', taskRouter)

////////////////////////////////////
// CONNECT DB & START SERVER
////////////////////////////////////
const port = 5000

console.log(process.env)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // use process.env to get data in .env
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
