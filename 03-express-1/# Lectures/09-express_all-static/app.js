/*
  index.html is static file or not? 
  - yes, so that we can put it into public/ and remove res.sendFile()
    > this is the way we use to simple site => put everything in public/ and setup middleware to serve static asset 
    > but with complex app => SRR (Server Side Rendering) => learn later

*/

const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('./public')) // setup static and middleware

app.get('/', (req, res) => {})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>')
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
