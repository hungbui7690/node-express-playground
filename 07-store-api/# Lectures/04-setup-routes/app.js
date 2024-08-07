/*
  Setup Routes

    1. go to controllers & setup these 2:
        - one function is to test
        - another function is the real one

    2. /routes to setup routes for these 2:
        - /
        - /static (to test)

    3. app.js:
      - import

    4. go to browser to test 2 routes

    5. setup postman for /products and /products/static

    6. express-async-error 
      - check package.json > we will see Express-Async-Error > Express-Async-Error
        a. npm i express-async-errors --save
        b. app.js 
            -> require 
        c. go to controller 
            -> throw new Error('testing async errors') -> it will pass error to error-handler.js


    *** https://www.npmjs.com/package/express-async-errors -> A Notice About Calling next 
        -> no need to use next() to pass error -> just need to throw new Error


*/

require('dotenv').config()
require('express-async-errors') // 7.

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products') // 8.

app.use(express.json()) // middleware

// routes
app.get('/', (req, res) => {
  res.send(`
    <h1>Store API</h1>
    <a href="/api/v1/products">Products Route</a>
 `)
})

app.use('/api/v1/products', productsRouter) // 9. products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

////////////////////////////////
// START SERVER
////////////////////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    // Connect DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
