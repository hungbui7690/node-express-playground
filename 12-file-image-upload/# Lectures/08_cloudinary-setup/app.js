/*
  Cloudinary
  - host for image
  - help us load image faster since Cloudinary has way more servers than us
  - 25Gbs free


**************************
  Get API Key & Secret
  - pic: cloudinary-setup

  - Dashboard
      + cloud_name
      + api_key
      + api_secret
  - .env
      CLOUD_NAME=
      CLOUD_API_KEY=
      CLOUD_API_SECRET=
  - install cloudinary package
      @@ npm i cloudinary
  - app.js 
    + import 
    + config
    + restart server


  - https://cloudinary.com/documentation/node_quickstart

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const { v2: cloudinary } = require('cloudinary') // 1.

const connectDB = require('./db/connect')

// 2.
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true, // Return "https" URLs
})
// console.log(cloudinary.config())

const productRouter = require('./routes/productRoutes')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})

app.use('/api/v1/products', productRouter)

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
