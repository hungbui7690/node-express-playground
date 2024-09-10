/*
  - file browser-app.js is wrong at showTasks()
    # old:    const {data: { tasks }} = await axios.get('/api/v1/tasks')
    # fixed:  const { data: tasks } = await axios.get('/api/v1/tasks')

  - actually, it's not wrong -> just because the way we setup in getAllTasks() controller
    # old:  res.status(200).json({tasks})
    # new:  res.status(200).json(tasks)


*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.static('./public')) // add static folder
app.use(express.json())

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
