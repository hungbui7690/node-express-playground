/*
  - This idea comes from HackerNews Algolia -> Search -> NumericFilters -> in HN, it uses >, <, >=, <= (user friendly) -> we will use regex to convert from $gt to >, $gte to >= ...

  - This is just the first step

  - Test: /products/?numericFilters=price>40,rating>=4
    + will be convert to: ?numericFilters=price-$gt-40,rating-$gte-4


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

// === setup routes
app.use('/api/v1/products', productsRouter)

// products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

////////////////////////////////
// START SERVER
////////////////////////////////

const port = process.env.PORT || 5000

const start = async () => {
  try {
    // === Connect DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
