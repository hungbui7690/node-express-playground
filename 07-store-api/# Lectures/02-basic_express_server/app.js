/*
  Basic Express Server
  1. npm install
  2. setup basic server in app.js


*/

require('dotenv').config()

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(express.json()) // middleware

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

////////////////////////////////
// START SERVER
////////////////////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    // Connect DB

    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
