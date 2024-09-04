/*
  Sort Consistency

    db.restaurants.insertMany( [
      { "_id" : 1, "name" : "Central Park Cafe", "borough" : "Manhattan"},
      { "_id" : 2, "name" : "Rock A Feller Bar and Grill", "borough" : "Queens"},
      { "_id" : 3, "name" : "Empire State Pub", "borough" : "Brooklyn"},
      { "_id" : 4, "name" : "Stan's Pizzaria", "borough" : "Manhattan"},
      { "_id" : 5, "name" : "Jane's Deli", "borough" : "Brooklyn"},
    ] );

  - Sort on the borough field:
      db.restaurants.find().sort( { "borough": 1 } )

  - In this example, sort order may be inconsistent, since the borough field contains duplicate values for both Manhattan and Brooklyn. Documents are returned in alphabetical order by borough, but the order of those documents with duplicate values for borough might not be the same across multiple executions of the same sort. For example, here are the results from two different executions of the above command:

    { "_id" : 3, "name" : "Empire State Pub", "borough" : "Brooklyn" }
    { "_id" : 5, "name" : "Jane's Deli", "borough" : "Brooklyn" }
    { "_id" : 1, "name" : "Central Park Cafe", "borough" : "Manhattan" }
    { "_id" : 4, "name" : "Stan's Pizzaria", "borough" : "Manhattan" }
    { "_id" : 2, "name" : "Rock A Feller Bar and Grill", "borough" : "Queens" }

    { "_id" : 5, "name" : "Jane's Deli", "borough" : "Brooklyn" }
    { "_id" : 3, "name" : "Empire State Pub", "borough" : "Brooklyn" }
    { "_id" : 4, "name" : "Stan's Pizzaria", "borough" : "Manhattan" }
    { "_id" : 1, "name" : "Central Park Cafe", "borough" : "Manhattan" }
    { "_id" : 2, "name" : "Rock A Feller Bar and Grill", "borough" : "Queens" }

  - While the values for borough are still sorted in alphabetical order, the order of the documents containing duplicate values for borough (i.e. Manhattan and Brooklyn) is not the same.

  - To achieve a consistent sort, add a field which contains exclusively unique values to the sort. The following command uses the sort() method to sort on both the borough field and the _id field:
      db.restaurants.find().sort( { "borough": 1, "_id": 1 } )

  - Since the _id field is always guaranteed to contain exclusively unique values, the returned sort order will always be the same across multiple executions of the same sort.

  - https://www.mongodb.com/docs/manual/reference/method/cursor.sort/#sort-consistency


****************************
  Ascending/Descending Sort
  - Specify in the sort parameter the field or fields to sort by and a value of 1 or -1 to specify an ascending or descending sort respectively.
  - The following operation sorts the documents first by the age field in descending order and then by the posts field in ascending order:

      db.users.find({ }).sort( { age : -1, posts: 1 } )


*****************************
  Sort Products
  - let products = await Product.find(queryObject)
    if(sort) products = products.sort() 

  - because we use "await" when finding products => at the time we use products.sort(), we cannot access to products variable => we need to remove "await" at "let products" and change to result => check controllers

  - then, go to postman & test "wooden desk" -> /products?sort=name,-price     
    + {{URL}}/products?featured=true&company=caressa&name=&sort=price,-name 
      -> sort by price (high to low) + name (Z-A)

  - pic: sort + sort-consistency => this will effect when we working with test pagination

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
  res.send(`
 <h1>Store API</h1>
 <a href="/api/v1/products">Products Route</a>
 `)
})

// products route
app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

////////////////////////////////
// START SERVER
////////////////////////////////
const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
