/*
  Morgan
  - show route info -> will help a lot when debug -> https://www.npmjs.com/package/morgan


********************************
  JWT with Cookies 
  - before, we send JWT through response
  - in this project, we have admin 
    -> admin can perform record operations on all products 
    -> user just can create orders, review products


********************************
  User Model
  - [] create models folder and User.js file
  - [] create schema with name,email, password (all type:String)
  - [] export mongoose model

  -> with email, we just validator package, but not regex (match)
  -> also use mongoose to setup custom validators
  
  
  - https://www.npmjs.com/package/validator

      @@ npm i validator
  - pic: model-validator


  - https://mongoosejs.com/docs/validation.html#custom-validators

      validate: {
        validator: function(v) {
          return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// # rest of the packages
const morgan = require('morgan')

// database
const connectDB = require('./db/connect')

// middlewares
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// extra
app.use(morgan('tiny'))
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

// error middlewares
app.use(notFountMiddleware)
app.use(errorHandler)

////////////////////////
// SERVER & PORT
////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
