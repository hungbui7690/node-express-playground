/*
  JSON Basics
  - instead of passing directly JSON data into res.json()
    > we have data.js which contains JSON
    > in app.js, we just need to import and pass directly to app.json()

*/

const express = require('express')
const app = express()

const { products } = require('./data') // (1) load file

app.get('/', (req, res) => {
  res.json(products) // (2) pass directly
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
