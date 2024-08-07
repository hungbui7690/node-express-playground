/*
  Params - Query String Setup
  - assume that we fetch data and put them into products page 
    + we don't fetch all the fields, but just get some specific fields like: name, price, image... 
    + and we we click on the product to show the details of single product => this is the time we need all the fields 


  - https://react-course-comfy-sloth-store.netlify.app/products

*/

const express = require('express')
const app = express()

const { products } = require('./data')

app.get('/', (req, res) => {
  res.send(`
    <h1>Homepage</h1>
    <a href="/api/products">Products</a>
  `)
})

app.get('/api/products', (req, res) => {
  // use map() to get all the fields that we need
  const newProducts = products.map((prod) => {
    const { id, name, image } = prod
    return { id, name, image }
  })

  // instead of res.json(products) => we map to newProducts and send by json
  res.json(newProducts)
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
