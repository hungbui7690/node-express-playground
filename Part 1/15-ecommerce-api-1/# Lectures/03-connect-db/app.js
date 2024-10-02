/*
  Connect To DB
  - [] get connection string
  - [] setup .env with MONGO_URL variable and assign the value
  - [] import 'dotenv' and setup package
  - [] import connect() and invoke in the starter
  - [] restart the server
  - [] mongoose V6 info

  
  - With Mongoose V6 -> we don't need options for deprecated warnings 


*/

require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

////////////////////
// SERVER & PORT
////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
