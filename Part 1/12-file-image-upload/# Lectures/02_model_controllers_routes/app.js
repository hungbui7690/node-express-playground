/*
  Model - Controllers - Routes
  - images will be uploaded to public/uploads -> but not to DB
  - when we create product (in form or postman) -> then it will be added to DB


****************************

  1. model -> image is string
  2. product controller + uploadsController
  3. routes

  4. app.js 
    + import productRouter
    + app.use() for /api/v1/products -> use productRouter

  5. postman 

*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')

const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})

app.use('/api/v1/products', productRouter)

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

///////////////////////
// SERVER & PORT
///////////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
