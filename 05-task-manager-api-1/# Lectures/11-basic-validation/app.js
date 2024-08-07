/*
  - though we now have 2 fields ("name" & "completed"), but we still can pass empty value 
    + { 
        "name" : "" 
      }
    + to fix: add validation
      > in this lesson, we just learn briefly about validation
        -> validation is so big
        -> in the next project, we will dive deeply
      

******************************

  - model: now, we just have type
    + we will pass object

  - required
    + note: require"D", but not require -> if there's type, there's no error, but cannot validate
      > Method 1: 
          required: true 
          -> default mongodb err msg
      > Method 2: 
          required: [true, 'must provide name'] 
          -> set custom message

  - trim
    + if we pass " joe   " -> will save this to db 
      > trim : true
  
  - now, if we pass empty string, it will show err 
    + so that we will handle err in controllers
      > try/catch


    name: {
      type: String
      required: [true, 'must provide name']
      trim: true
      maxlength: [20, 'name cannot be more than 20 characters']
    }
    completed: {
      type: Boolean
      default: false
    }


******************************

  (1) models/Task.js
  (2) add try/catch in controllers

  - questions: 
    - do we need to place try/catch block for every controllers 
      > yes, because they uses async/await -> this is a must
      > later we will learn how to omit the try/catch 

    - now, we are using: res.status(500).json({ msg: error }) 
      > it looks messy 
      > we will learn how to make it shorter later

  - https://mongoosejs.com/docs/validation.html


  @@ Status = 500 -> Server Error

*/

require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

app.use(express.json()) // middleware

// routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.use('/api/v1/tasks', taskRouter)

/////////////////////////////////
// CONNECT DB & START SERVER
/////////////////////////////////
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
