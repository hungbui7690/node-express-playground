/*
  Cloudinary
  - pic: cloudinary-file-upload
  - cloud -> Media Library -> Create new Folder 'file-upload'

  @@ cloudinary.uploader.upload(path, options) 
    - 1st parameter:
      + /public/uploads 

  - do we need to save image to server before upload to cloudinary? yes or no
  - another way is using stream -> we won't use this method -> won't learn this 
  - a better method is store image in server, but using "temporary storage" that came with the previous package that we use -> "express-fileupload" 

  - express-fileupload will help us with the following 2 things: 
    + parse input file 
    + setup temp folder


***************************

  Steps: 
  1. create tmp folder in root
  2. app.js: option for express-fileupload
    - old: app.use(fileUpload())
    - new: app.use(fileUpload({ useTempFiles: true }))
    -> req.files.image -> we will see "tempFilePath"  
  3. controller 
  4. postman -> cloud -> "secure_url"


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

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

app.use(fileUpload({ useTempFiles: true })) // 2.

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
