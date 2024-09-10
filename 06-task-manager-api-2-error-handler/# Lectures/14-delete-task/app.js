/*
  + Adventure.findOneAndDelete(conditions, options, callback)
  + Adventure.findOneAndDelete(conditions, options)
  + Adventure.findOneAndDelete(conditions, callback)
  + Adventure.findOneAndDelete(conditions)


******************************
  
  - we will work on DELETE first
    + because UPDATE is more complex
    + we also need to know the differences between PUT & PATCH

  - if remove successful, we can return one of these
    + res.status(200).send()
    + res.status(200).json({task})
    + res.status(200).json({task: null, success: 'success'})
    + res.status(200).json({task: null, success: true})


  - https://mongoosejs.com/docs/queries.html


******************************

  (1) controllers/tasks.js


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
