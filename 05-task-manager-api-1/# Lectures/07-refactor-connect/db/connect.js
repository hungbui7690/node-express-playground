const mongoose = require('mongoose')

const password = '121212%40001'
const database = 'task-manager'

const connectionString = `mongodb+srv://hungbui7690:${password}@cluster0.5g3x7fn.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`

// return promise
const connectDB = (url) => {
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}
module.exports = connectDB // to app.js
