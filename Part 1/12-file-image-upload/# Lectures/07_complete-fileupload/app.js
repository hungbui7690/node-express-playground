/*
  1. Postman 
    + upload image -> get image path 
    + createProduct 
        {"name" : "product name",
        "price" : 300,
        "image": "/uploads/computer-1.jpeg"}
    => we can add product now 

        
  2. create getAllProduct controller


************************

  Additional Checks 
  
  3. uploadsController.js
    - check if image exists or not 
    - check if format is image or not -> req.files.image.mimetype: 'image/jpeg'
    - check req.files.image.size
    
  - Postman -> test 3 cases above

  *** maxSize: use 1000 to test -> typically use 1024x1024


************************

  After all, can test using UI -> public/


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')

// database
const connectDB = require('./db/connect')

// Product Router
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload())

// Routes
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
