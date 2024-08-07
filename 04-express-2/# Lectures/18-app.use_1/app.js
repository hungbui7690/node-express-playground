/*
  app.use
  - now everything is ok, but function should be placed into a separate file 
    > just need to create 1 module for these function

  - and now, we just have 2 routes that we want to add middleware into
    > but assume that we have multiple routes 
      # there is a method that helps us add middleware into multiple routes at the same time 
      ## app.use(middleware)
  
  - app.use() will help all the ones "after" that can use logger() 
    > in our app, / won't have logger()

  (1) logger.js

  *** ALL MIDDLEWARE FOLLOW THIS RULE ("after")

*/

const express = require('express')
const app = express()
const logger = require('./logger')

app.get('/', (req, res) => {
  res.send('Home') // *** NOT use middleware, since it is placed above app.use(logger)
})

app.use(logger) // *** all routes after this line will go through logger()

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/api/products', (req, res) => {
  res.send('Products')
})

app.get('/api/items', (req, res) => {
  res.send('Items')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
