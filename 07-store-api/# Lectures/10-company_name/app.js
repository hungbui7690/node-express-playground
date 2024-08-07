/*
  - in this lesson, we will setup 2 things: company & name
    + company must be exact
    + name=a -> in "name" there must contain "a" letter
    -> ?company=tesla&name=a&price>=99


*****************************

  - "price" will be the one that we want to work last, because its logic is the most complex
  - now, we want to work with "name" & "company"
  - but, how do users know what they need to type into query string 
    + this is why we need to have API DOCS
    + https://hn.algolia.com/api -> Search


*****************************

  - check: mongo db query operators:
    > $regex -> Selects documents where values match a specified regular expression. -> pic: mongodb-regex
    > $gt    -> Matches values that are greater than a specified value.

    -> https://www.mongodb.com/docs/manual/reference/operator/query/regex/

  - example about regex (in static)
      const search = 'a'
      const products = await Product.find({ name: { $regex: search, $options: i } }) 
      > i = insensitive 
      > "name" contains letter "a" -> similar to LIKE in SQL
  

*****************************

  (1) controllers/products.js


  if (company) queryObject.company = company
  if (name) queryObject.name = { $regex: name, $options: 'i' }


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

app.use(express.json()) // middleware

// routes
app.get('/', (req, res) => {
  res.send(`
 <h1>Store API</h1>
 <a href="/api/v1/products">Products Route</a>
 `)
})

// setup routes
app.use('/api/v1/products', productsRouter)

// products route

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
