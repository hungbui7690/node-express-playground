/*
  Middleware Setup
  - middlewares appear everywhere in NodeJS 
    > almost everything in NodeJS are middlewares

  - req <> middleware <> res
    > middleware is in between req & res 
      + will handle data before send response to client

*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  const method = req.method
  const url = req.url
  const year = new Date().getFullYear()

  console.log(method, url, year) // now, each time user hits server (localhost:5000/), it will log out -> but if we want /about to log the same things -> we need to copy -> but if we have 100 routes? do we need to copy this to all the routes?

  res.send('Home')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
