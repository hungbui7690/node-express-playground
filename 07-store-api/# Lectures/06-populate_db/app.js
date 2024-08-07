/*
  1. check products.json 
  
  2. populate.js 
      a. import env, connectDB 
      b. import model, load products.json 
      c. create function start 
      d. stop server > then just run populate.js -> node populate.js 
    *** remember to test connection by log out 
    *** comment import env to test the case when we cannot connect

  3. after connect to db, we want to clear everything in db
    + then insert data in JSON file 
    + check controllers in "Task Manager" lesson -> createTask() -> must pass req.body into that function
    + in this case, we pass JSON file 
      
  4. after insert -> go to mongodb to test

  5. process.exit(0) -> exit after populate 
     process.exit(1) -> exit when having error


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
