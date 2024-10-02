/*
  - if in query param, we pass value that does not exist in schema? 
    + {{URL}}/products?featured=true&page=1

        {
            "products": [],
            "nbHits": 0
        }
  
  - so, the best way to to set queryObject -> ?featured=true&page=1
    + with this setup, page=1 will be ignored 
    + if {{URL}}/products?page=1: this will return all products, since queryObject={}


******************************

  Steps: 
  1. create empty object 
  2. add key:value pair in the query params to the object we just created
  3. find & search using that object

******************************

  (1) controllers/products.js

  - postman test -> pic: postman-queryObject


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

app.use(express.json()) // middleware

// routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Store API</h1>
    <a href="/api/v1/products">Products Route</a>
  `)
})

// setup routes
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
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
