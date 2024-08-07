/*
  - params sometimes become very complex
    + ex, we setup: app.get('/api/products/:productID/reviews/:reviewID', cb)   
      > http://localhost:5000/api/products/2/reviews/abc 
        -> now req.params will be { productID: '2', reviewID: 'abc' }

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

app.get('/api/products/:productID', (req, res) => {
  console.log(req.params)
  const productID = req.params.productID
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  )
  if (!singleProduct) return res.status(404).send('Product does not exist')
  res.json(singleProduct)
})

// ***
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
