/*
  1. check product-model.png -> use schema (mongoose) to setup 
      a. createdAt -> use Date.now() 
      b. company -> company must be in the allow list 
        + use enum : [] -> next lesson, we will populate data to db -> if we don't use enum, then err
        + enum: ['ikea', 'marcos', 'liddy', 'caressa']

  - if we want to have custom message when user types wrong company: 
      enum: {
        values: ['ikea', 'marcos', 'liddy', 'caressa'],
        message: '{VALUE} is not supported',
      },

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

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
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

////////////////////////////////
// START SERVER
////////////////////////////////

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
