/*
  Valid Token
  - jsonwebtoken package -> Docs
  
  - controllers 
    + jwt.verity(token, process.env.JWT_SECRET) 
      -> will decode the token & return back payload
      -> { id: 13, username: 'john', iat: 1665693299, exp: 1668285299 } 
        + iat: issued at
        + exp: expiration

  - Test: 
    + Postman 
    + FrontEnd


  ~~ const token   =  jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '30d'})
  ~~ const decoded =  jwt.verify(token, process.env.JWT_SECRET)


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const mainRouter = require('./routes/main')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1', mainRouter)

// notFound & error
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
