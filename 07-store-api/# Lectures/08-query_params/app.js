/*
  - check HN Algolia API -> we can see how they setup search data -> query string parameter
    + http://hn.algolia.com/api/v1/search?query=...
    + http://hn.algolia.com/api/v1/search_by_date?query=...  


*******************************

  - last lesson, we work on getAllProductsStatic (test)
  - this lesson, we will work on getAllProducts
    + use req.query (to get the key:value pairs after ? in the URL)
    + test {{URL}}/products?featured=true

  - Mongoose v6 update
    + if we pass fields that do not exist in schema, what happens? 
      > v6: mongoose will ignore those fields
    

*******************************

  Strict Query:
  - Mongoose supports a separate strictQuery option to avoid strict mode for query filters. This is because empty query filters cause Mongoose to return all documents in the model, which can cause issues.
  - Set in schema:

      const mySchema = new Schema({ field: Number }, { strict: true });
      const MyModel = mongoose.model('Test', mySchema);

  - Mongoose will filter out `notInSchema: 1` because `strict: true`, meaning this query will return _all_ documents in the 'tests' collection

      MyModel.find({ notInSchema: 1 });

  @@ The strict option does apply to updates. The strictQuery option is just for query filters.

  - Mongoose will strip out `notInSchema` from the update if `strict` is not `false`

      MyModel.updateMany({}, { $set: { notInSchema: 1 } });


  - Mongoose has a separate strictQuery option to toggle strict mode for the filter parameter to queries.

      const mySchema = new Schema({ field: Number }, {
        strict: true,
        strictQuery: false // Turn off strict mode for query filters
      });
      const MyModel = mongoose.model('Test', mySchema);

  - Mongoose will not strip out `notInSchema: 1` because `strictQuery` is false
  
      MyModel.find({ notInSchema: 1 });

  - In general, we do not recommend passing user-defined objects as query filters:
  - Don't do this! 
      const docs = await MyModel.find(req.query);
  - Do this instead: 
      const docs = await MyModel.find({ name: req.query.name, age: req.query.age }).setOptions({ sanitizeFilter: true });

  - In Mongoose 7, strictQuery is false by default. However, you can override this behavior globally:
  - Set `strictQuery` to `true` to omit unknown fields in queries.

      mongoose.set('strictQuery', true);


*******************************

  (1) controllers/products.js


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

// === setup routes
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
    // === Connect DB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
