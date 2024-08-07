/*
  Why do we use PATCH in task manager app, but before we use PUT?
  - both are used to update

  - PUT: replace the entire resource -> editTask() 
    + must have option [overwrite: true] 
    + Note: in model, there are fields that use "default" -> we must remove this 
        { "name" : "shake and bake" } 
    + if we use PUT, "completed" will go away

  - PATCH: partial update


***************************

  Some kinds of response that we can use:
  - res.status(200).json(tasks)
  - res.status(200).json({ tasks })
  - res.status(200).json({ tasks, amount: tasks.length })
  - res.status(200).json({ tasks, nbHits: tasks.length })
  - res.status(200).json({ tasks, length: tasks.length })
  - res.status(200).json({ success: true, data: { tasks } })

  - we can use any of these -> but everything must be consistent 
    + because when we modify something in backend, it will create effects to front-end (axios cannot get data if we change format of response)


***************************

  1. models/Task.js 
    + comment default at "completed"
  2. controllers/tasks.js 
    + copy updateTask() and change name to editTask()
    + add property overwrite: true
      -> this is the function that we use for PUT
  3. router -> create route for PUT
  4. postman test -> to make PUT work -> must have step 1. 
    + pic: put-vs-patch

*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', taskRouter)

/////////////////////////////
// START SERVER
/////////////////////////////

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
