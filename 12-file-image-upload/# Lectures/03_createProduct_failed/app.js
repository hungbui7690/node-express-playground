/*
  - this lesson, try to create a product -> hit roadblock 
    -> after this lesson, we will understand why we need to upload image before insert product


  1. controller -> createProduct
    - without image
        {
          "name" : "product name",
          "price" : 300
        }
      + err -> "msg": "Path `image` is required." -> we will learn how to send image to our server later -> but now, we need to learn how to get the correct path of the image in server


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// database
const connectDB = require('./db/connect')

// ====== Product Router
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra middleware
app.use(express.json())

// ===== Routes
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
