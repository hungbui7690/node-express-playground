/*
  app.get('/api/v1/tasks')            Get all tasks
  app.post('/api/v1/tasks')           Create a new tasks
  app.get('/api/v1/tasks/:id')        Get Single Task
  app.patch('/api/v1/tasks/:id')      update task
  app.delete('/api/v1/tasks/:id')     delete task


    (1) /db/connect.js 

  *** mongoose.connect will return promise => use .then & .catch

*************************

  MongoParseError: URI does not have hostname, domain name and tld
  - The following characters and the space character must be converted using percent encoding if included in a username or password:
      : / ? # [ ] @ ! $ & ' ( ) * , ; = %

  - For example, if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:
      p%40ssw0rd%279%27%21

  - https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password

*/

const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')

const connectDB = require('./db/connect')

app.use(express.json())

app.get('/hello', (req, res) => {
  res.send('Task Manager App')
})

app.use('/api/v1/tasks', taskRouter)

const port = 5000
app.listen(port, console.log(`Server is listening on port ${port}...`))
