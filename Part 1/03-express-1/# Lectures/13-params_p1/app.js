/*
  req.params 
  - now, if we go to localhost:5000/api/products, we can get all products
  - so, if we want to get specific product? 
    > /api/products/1 -> we will get the product with ID = 1 -> need to setup route for /1
    > if we have multiple products with ID from 1 to 100 -> our code will be messy 
      # this is why we need to use "param"


  - /api/products/:productID -> placeholder
    + to access -> use req.params 
      > req.params.productID -> return string -> we need to use Number() or parseInt()

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
  const newProducts = products.map((prod) => {
    const { id, name, image } = prod
    return { id, name, image }
  })
  res.json(newProducts)
})

// http://localhost:5000/api/products/1
app.get('/api/products/:productID', (req, res) => {
  console.log(req.params) // (a) req.params -> return { productID: '1' }

  const productID = req.params.productID // (b)

  const singleProduct = products.find(
    (product) => product.id === Number(productID) // (c) we need to convert to Number
  )

  if (!singleProduct) return res.status(404).send('Product does not exist')

  res.json(singleProduct)
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
