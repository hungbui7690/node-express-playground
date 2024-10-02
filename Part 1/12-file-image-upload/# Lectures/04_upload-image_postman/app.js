/*
  Upload Image in Postman
  - postman 
    + /products/upload
    + body tab -> form-data -> file
      => key must have name -> otherwise, undefined -> pic: postman-image-upload

  - to logout -> req.files -> but NOT req.body -> but it will return undefined
  - to avoid undefined -> we need to install package "express-fileupload" -> get data of image 
    -> similar to req.body -> express.json()

    @@ npm i express-fileupload


  1. app.js -> app.use(fileUpload())
  2. uploadControllers

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const fileUpload = require('express-fileupload') // 1a.

// database
const connectDB = require('./db/connect')

// products router
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra middleware
app.use(express.json())
app.use(fileUpload()) // 1b.

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
