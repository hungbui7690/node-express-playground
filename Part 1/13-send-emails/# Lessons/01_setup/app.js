/*
  - in this project, we just have 1 route & 1 controller
    -> setup directly in app.js

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const sendEmail = require('./controllers/sendEmail')

app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send('<h1>Email Project</h1><a href="/send">Send Email<a>')
})

// # send mail
app.get('/send', sendEmail)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

/////////////////////
// SERVER & PORT
/////////////////////
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
