/*
  - We want to get some specific fields: 
    + /fields=name,price

  - Docs -> Queries Section: 
      Person.
          find({ occupation: /host/ }).
          where('name.last').equals('Ghost').where('age').gt(17).lt(66).
          where('likes').in(['vaporizing', 'talking']).
          limit(10).sort('-occupation').
          @@ select('name occupation')

  - Test: 
    + /products/?fields=name,price -> pic: select


  ?? result.select(fieldsList) 

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
