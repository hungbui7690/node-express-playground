/*
  Upload Image
  - [] if some question, re-watch 07-file-upload
  - [] images folder with two images


**************************

  - package: "express-fileupload"
  - serve public static 


  1. create public/uploads/
  2. app.js
    + serve public folder
    + import express-fileupload và invoke
  3. restart server

  4. put example.jpeg into uploads/ -> default image

  5. postman: 
    a. login under admin
    b. create product without image
    c. browser: http://localhost:5000/uploads/example.jpeg 

  6. controller -> log out req.files
      a. check existance
      b. check mimetype
      c. check max-size 
      d. use path module + mv function in req.files

  7. const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`)
      -> __dirname === controller > must back 1 level to go to root -> then go to public/ -> use ../

  8. postman -> try to upload image 
    - check if response is correct
    - check public/uploads/


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

app.use(express.static('./public')) // 1a.
app.use(fileUpload()) // 1b. productController

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

///////////////////////////////
// SERVER & PORT
///////////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
