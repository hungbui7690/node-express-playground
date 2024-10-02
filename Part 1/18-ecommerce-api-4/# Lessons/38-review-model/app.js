/*
  Review Model
  - [] create Review.js in models folder
  - [] create Schema
  - [] rating : {type:Number}
  - [] title: {type:String}
  - [] comment: {type:String}
  - [] user
  - [] product
  - [] set timestamps
  - [] export Review model


***************************

  Indexes
  - Indexes support efficient execution of queries in MongoDB. Without indexes, MongoDB must scan every document in a collection to return query results. If an appropriate index exists for a query, MongoDB uses the index to limit the number of documents it must scan.

  - Although indexes improve query performance, adding an index has negative performance impact for write operations. For collections with a high write-to-read ratio, indexes are expensive because each insert must also update any indexes.

  Default Index
  - MongoDB creates a unique index on the _id field during the creation of a collection. The _id index prevents clients from inserting two documents with the same value for the _id field. You cannot drop this index.


***************************

  Index Types 
  - Single Field Index
    + A human resources department often needs to look up employees by employee ID. You can create an index on the employee ID field to improve query performance

  - Single Field Index on an embedded document
    + A salesperson often needs to look up client information by location. Location is stored in an embedded object with fields like state, city, and zipCode. You can create an index on the location object to improve performance for queries on that object. 
      -> When you create an index on an embedded document, only queries that specify the entire embedded document use the index. Queries on a specific field within the document do not use the index.

  - Compound Index
    + A grocery store manager often needs to look up inventory items by name and quantity to determine which items are low stock. You can create a single index on both the item and quantity fields to improve query performance. 

  - https://www.mongodb.com/docs/manual/indexes/

***************************

  - pic: compound-index

  1. review will be tied to User & Product -> need 2 refs

      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
      },

  2. user can only leave 1 review on 1 product -> 2 methods: 
    a. indexing schema
    b. controller

  3. add combined index -> similar to unique property
    + ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
      -> index:
        + product: ascending index 
        + user: ascending index
      -> Only 1 review per product per user


  - https://mongoosejs.com/docs/guide.html#indexes 
  - https://www.mongodb.com/docs/manual/core/index-compound/


***************************

  1. model/Review

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())

app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

///////////////////////////////
// SERVER & PORT
///////////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
