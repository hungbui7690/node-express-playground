/*
  Get All Tasks
  - a query also has a .then() function, and thus can be used as a promise 
  - queries are not promise 
    > they have a .then() for co and async/await as convenience 
      + unlike promise, calling a query's .then() can exec the query multiple times

  - Model.find() -> Task.find({})
  - Model.findOne() -> Task.findOne({})


**************************

  - find all documents 
    + await MyModel.find({});

  - find all documents named john and at least 18  
    + await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

  - executes, passing results to callback 
    + MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

  - executes, name LIKE/CONTAIN john and only selecting the "name" and "friends" fields 
    + await MyModel.find({ name: /john/i }, 'name friends').exec();

  - passing options 
    + await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();

  - https://mongoosejs.com/docs/queries.html

**************************

  (1) controllers/tasks.js

  @@ const tasks = await Task.find({})


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

///////////////////////////////////
// CONNECT DB & START SERVER
///////////////////////////////////
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
