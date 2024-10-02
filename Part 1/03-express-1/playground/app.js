/*
  https://hn.algolia.com/api -> this is the standard example about setup server

    /api/v1/items/:id                     query param
    /api/v1/users/:username               query param 
    /api/v1/search?query=...              query string
    /api/v1/search?query=foo&tags=story   query string

  - By default a limited number of results are returned in each page, so a given query may be broken over dozens of pages. 
  - The number of results and page number are available as the variables nbPages and hitsPerPage respectively; they can be specified as arguments in requests, allowing for more results to be requested or iteration over the available pages eg appending to the search URL parameters like &page=2 or hitsPerPage=50.


*************************

  - query string param === url param
    + ?key=value
      > ex: /api/v1/search?query=abc
        => ?query=abc -> this is query string

    + app.get('/api/v1/query', (req, res) => {}
      > http://localhost:5000/api/v1/query  ?name=john&id=4
        => req.query() will get {name: john, id: 4}

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
  const productID = req.params.productID
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  )
  if (!singleProduct) return res.status(404).send('Product does not exist')
  res.json(singleProduct)
})

// *** query string: http://localhost:5000/api/v1/query?search=a&limit=2
app.get('/api/v1/query', (req, res) => {
  console.log(req.query) // (a) get ? after /query

  const { search, limit } = req.query // (b)
  console.log(req.query)

  let newProducts = [...products] // (c) copy products

  // (d)
  // http://localhost:5000/api/v1/query?search=a
  // http://localhost:5000/api/v1/query?search=a&limit=1
  if (search) {
    newProducts = newProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }

  // (e)
  // http://localhost:5000/api/v1/query?limit=2
  // http://localhost:5000/api/v1/query?limit=abc => empty array
  if (limit) {
    newProducts = newProducts.slice(0, Number(limit))
  }

  // (f) to avoid empty array
  if (newProducts.length < 1) {
    // return res.status(200).send('No products match your search') // method 1
    return res.status(200).send({ success: true, data: [] }) // method 2: common approach
  }

  return res.status(200).json(newProducts)
})

app.listen(5000, () => {
  console.log(`Server is listening on port 5000...`)
})
