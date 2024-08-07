/*
  app.use
  @@ app.use(base, middleware) 


  - app.use('/api', logger):
    + just apply logger() for the ones which starts with /api (i.e.: /api/products, /api/items) 
    + req.url now returns: 
      > /products & /items
      > NOT /api/products + /api/items

*/

const express = require('express')
const app = express()
const logger = require('./logger')

app.get('/', (req, res) => {
  res.send('Home')
})

app.use('/api', logger) // *** only work with all the routes that start with /api

app.get('/about', (req, res) => {
  res.send('/about')
})

app.get('/products', (req, res) => {
  res.send('/products')
})

// localhost/api/items -> req.url === /items because we use app.use('/api')
app.get('/api/items', (req, res) => {
  res.send('/api/items')
})

app.get('/v1/items', (req, res) => {
  res.send('/v1/items')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
