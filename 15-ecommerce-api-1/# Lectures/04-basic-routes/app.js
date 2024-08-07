/*
  Basic Routes and Middleware

  - [] setup / GET Route
  - [] setup express.json() middleware
  - [] setup 404 and errorHandler middleware
  - [] import 'express-async-errors' package


  1. import "express-async-errors" -> we don't need try/catch in app.js file -> at server.listen
  2. why app.get(/) is above notFound & errorHandler?
    - code run from top to bottom -> if any route does not exist, it will check from top to bot, then to the notFound -> error
  3. why errorHandler is at the end?
    - in each route, when error comes -> throw error -> errorHandler will catch error


*/

require('dotenv').config()
require('express-async-errors') // #

const express = require('express')
const app = express()

// database
const connectDB = require('./db/connect')

// middlewares
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// extra
app.use(express.json())

// # routes
app.get('/', (req, res) => {
  throw new Error('hello there')
  res.send('Ecommerce API')
})

// # error middlewares
app.use(notFountMiddleware)
app.use(errorHandler)

////////////////////////
// SERVER & PORT
////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
