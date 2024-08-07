/*
  Skip vs Limit
  - we have 23 products in total

      /products/?limit=30 -> get all 
      /products/?limit=4  -> get 4 items
      /products/?         -> get 10 items


  - skip is similar, but skip will skip from top to bottom 
    + assume that limit is 4 -> sort by name -> a b c d
    + if skip 1 -> b c d e 
    + if skip 2 -> c d e f

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
