/*
  Get Single Task
  - Find one adventure whose `country` is 'Croatia', otherwise `null` 
    + await Adventure.findOne({ country: 'Croatia' }).exec();

  - using callback 
    + await Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});

  - select only the adventures name and length 
    + await Adventure.findOne({ country: 'Croatia' }, 'name length').exec();

*****************************

  - there are 2 types of error: 
    + assume that ID is "abcd" (4 characters)
      > if we find with ID "abc1" (4 characters) 
        -> will show err: No task with id ${taskID} 
      > but if we find with ID "abcd1" or "ab1" 
        -> not enough or more characters -> it will show another "format error" (cast error) -> this is the err by mongodb


  - "name": "CastError", "message": "Cast to ObjectId failed for value \"6345e0a253e14294e1b5\" (type string) at path \"_id\" for model \"Task\"" -> pic: 2-errors

  - https://mongoosejs.com/docs/queries.html


*****************************

  (1) controllers/tasks.js

  @@ const { id: taskID } = req.params
  @@ const task = await Task.findOne({ _id: taskID })


  - TEST: api/v1/tasks/66a908dc1d33738bb37a984a

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
