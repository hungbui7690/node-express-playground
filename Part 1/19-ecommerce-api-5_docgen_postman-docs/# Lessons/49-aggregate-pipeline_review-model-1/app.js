/*
  Aggregate Pipeline - Review Model
  - https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/
  - https://www.mongodbtutorial.org/mongodb-aggregation/


*****************************

  Example 1
  - Insert documents into the sales collection:
      db.sales.insertMany([
        { "_id" : 1, "item" : "Americanos", "price" : 5, "size": "Short", "quantity" : 22, "date" : ISODate("2022-01-15T08:00:00Z") },
        { "_id" : 2, "item" : "Cappuccino", "price" : 6, "size": "Short","quantity" : 12, "date" : ISODate("2022-01-16T09:00:00Z") },
          ...
          ...
        { "_id" : 3, "item" : "Lattes", "price" : 15, "size": "Grande","quantity" : 25, "date" : ISODate("2022-01-16T09:05:00Z") },
        { "_id" : 4, "item" : "Mochas", "price" : 25,"size": "Tall", "quantity" : 11, "date" : ISODate("2022-02-17T08:00:00Z") }
      ])

  - Use an aggregation pipeline to filter the sales by the Americanos, calculate the sum of quantity grouped by sizes, and sort the result document by the total quantity in descending order.
      db.sales.aggregate([
        { $match: { item: "Americanos" }},
        { $group: {
            _id: "$size",
            totalQty: {$sum: "$quantity"}
          }},
        { $sort: { totalQty : -1}}
      ])

  - Output:
      [
        { _id: 'Grande', totalQty: 33 },
        { _id: 'Short', totalQty: 22 },
        { _id: 'Tall', totalQty: 15 }
      ]

  - This aggregation pipeline contains three stages:
    -> Stage 1: the $match stage filters the orders by Americanos coffee and passes the filtered documents to the $group stage.
    -> Stage 2: the $group stage groups the filtered documents by coffee size and uses the $sum to calculate the total quantity. The $group stage creates a new collection of documents where each document contains two fields _id and totalQty, and passed these documents to the $sort stage.
    -> Stage 3: the $sort stage sorts the documents by the totalQty field in the descending order and returns the result documents.


*****************************

  - SQL equivalent to MongoDB aggregation
      select size, sum(quantity) as totalQty
      from sales 
      where name = 'Americanos'
      group by size
      order by totalQty desc

  - The following table shows the comparison between SQL and MongoDB aggregation:
      SQL clause	    MongoDB Aggregation
      select	        $project
                      $group functions: $avg, $count, $sum, $max, $min
      from	          db.collection.aggregate(…)
      join	          $unwind
      where	          $match
      group by	      $group
      having	        $match


***************************

  1. setup aggregation pipeline 
    - pic: mongo-db-aggr-pipeline 


  2. create models/temp.js -> copy code from step 1 
    -> this is how to use graphical interface


***************************

  3. models/Review -> based on temp.js to setup
  4. postman -> try to update reviews to test


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
const reviewRouter = require('./routes/reviewRoutes')
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
app.use('/api/v1/reviews', reviewRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

///////////////////////////
// SERVER & PORT
///////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
