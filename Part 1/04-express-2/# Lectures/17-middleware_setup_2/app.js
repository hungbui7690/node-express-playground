/*
  Middleware Setup
  - instead copy, we will create function logger outside of the route 
    => this is middleware
  - when we pass logger to the route we want -> now at the function definition (logger()), we can access to req, res, and next


  - method 1: now, if we go to localhost:5000 -> though we can log, but browser will hang
    > reason: because after run function, it does not know where to go
    > we need to use res.send() to terminate by sending response to client

  - method 2: we need to have next() to jump to next middleware 

*/

const express = require('express')
const app = express()

// (1) when working with middleware, we must have next() or res.send() or res.sendFile() -> otherwise, hang
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)

  // (a) Method 1:
  // res.send('Hello') // with this, it will show "Hello", but not show "Home" anymore -> this line also stop the response after sending "Hello"

  // (b) Method 2: jump to next middleware
  next()
}

// (2) pass logger to the middle -> now logger will run before callback function
app.get('/', logger, (req, res) => {
  res.send('Home')
})

// (3)
app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
