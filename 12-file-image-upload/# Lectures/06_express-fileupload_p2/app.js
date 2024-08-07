/*
  @@ req.files.image:  return info of that image
  @@ req.files.mv: A function to move the file elsewhere on your server. Can take a callback or return a promise.

  *** Need to create public/uploads folder

  4. after file is uploaded to server:
    + response must return path in server 

  5. we want public/ becomes public -> express.static 


  - test: 
    + http://localhost:5000/uploads/computer-1.jpeg
    + http://localhost:5000 -> display UI since we make public/ public
    
  
  *** NOTE: we setup {image:{src}} because front end is setup this way 
    -> and we use key "src" since it is also an img attribute


***************************
  
  1. /controllers/uploadsController.js


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

app.use(express.static('./public')) // 5.

// extra middleware
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
