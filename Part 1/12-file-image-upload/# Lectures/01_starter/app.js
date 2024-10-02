/*
  Starter 
  - create .env -> MONGO_URI
  - npm install & npm start

  *** when we understand this -> we can use Multer as uploader in NodeJS

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// database
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

//======================================
// SERVER & PORT
//======================================
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
