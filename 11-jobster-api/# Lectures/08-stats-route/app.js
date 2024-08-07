/*
  Stats Route
  1. controllers/jobs
  2. routes/jobs

  @@ npm install moment


*****************************
  Aggregation Pipeline
  - we will use aggregation pipeline in this case 
    + google for more info -> https://dev.to/qbentil/understanding-mongodb-aggregation-pipeline-3964

  - pipeline: 
    + collection -> $project -> $match -> $group -> $sort -> result

  - $match - Filters the documents to pass only the documents that match the specified condition(s) to the next pipeline stage. This can reduce the amount of documents that are given as input to the next stage. 

      db.users.aggregate([
        { $match : { email : "example@gmail.com" } } 
      ])

  - $group - It is use to group documents from collections based on a 'group key' Syntax

      db.sales.aggregate([{
          $group: {
            _id: null,
            count: { $count: { } }
          }
      }])

  - $sort - This stage is used to rearrange the resulting document (Ascending or Descending) Syntax

      db.contestants.aggregate([
          { $sort : { votes : 1 } }
      ])

  - $project - It is used to select some specific fields from the resulting collection to be sent to the client. 
      db.events.aggregate([
        $project: {
          _id: 0,
          name: 1,
          description: 1,
          banner: 1,
          opening_date: 1,
          closing_date: 1,
        },
      ])
  - Note: 1 assigned to a field means inclusive. This will include that field in the output document. 0 is the vice versa. It will exclude the field from the document.
  - It is important to note that non-zero values also considered as inclusive.

  - $lookup - Performs a left outer join to a collection in the same database to filter in documents from the "joined" collection for processing.

      db.orders.aggregate([
        {$lookup:
          {
            from: "inventory",
            localField: "item",
            foreignField: "sku",
            as: "inventory_docs"
          }
        }
      ])

  - $unwind - Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element. 

      db.events.aggregate( [ { $unwind : "$organizer" } ] )

*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const path = require('path')

// extra security packages
const helmet = require('helmet')
const xss = require('xss-clean')

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(express.json())
app.use(helmet())
app.use(xss())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// 3. serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
