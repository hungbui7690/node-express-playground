/*
  - update: must have body 
    + id + req.body

      const query = { name: 'borne' };
      User.findOneAndUpdate(query, { name: 'jason bourne' }, options, callback)

  - is sent as 
      Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options, callback)


***************************
  - const task = await Task.findOneAndUpdate({ _id: taskID }, req.body) 
    + when finishes update, postman will:
      # return the original item (pic: test-update.png), but NOT updated item

  - and we can also update with "name":"", though we set validator in model
    + this is because we did not pass options into findOneAndUpdate()

  - when we add options, it will return new item, also check validators when update
      const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
      })


  - https://mongoosejs.com/docs/queries.html


***************************

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

//////////////////////////////////
// CONNECT DB & START SERVER
//////////////////////////////////
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
