/*
  Connect to DB

    1. mongodb:
      > copy connection string 
    2. create .env
    3. restart server
    4. db/connect.js 
    4. app.js -> import connectDB and run start()

*/

require('dotenv').config()

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect') // 2. IMPORT CONNECT DB

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Store API</h1>
    <a href="/api/v1/products">Products Route</a>
    `)
})

// products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

//////////////////////
// START SERVER
//////////////////////

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI) // 3.
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
