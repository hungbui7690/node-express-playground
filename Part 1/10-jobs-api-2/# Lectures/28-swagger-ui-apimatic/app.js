/*
  Setup Docs 
  - we use Swagger UI to setup
  - Postman allows us to setup Docs -> but it will create separated URL -> i.e. job-api.com, postman will create xxx/api-docs 
  - with Swagger UI, docs will be in the same URL


  Postman: postman-export
  1. Setup Global Variable 
  2. Check all routes -> make sure all routes use correct variable
  3. Export Collection from Postman


*******************************

  - After export collection from postman -> we need to fix a little bit
  - Because we can not import json file from Postman directly to Swagger -> we need to format data via APIMatic
  - pic: apimatic

  
  4. setup in APIMatic


 *******************************
  
  - pic: swagger ui editor
  5. google swagger UI editor -> open in 2 tabs 
  6. copy code in step 4 to editor 
  7. edit 
  8. test


*******************************

  - After edit in Swagger UI -> we want to add into our project 
  - we need 2 packages:
    + yamljs: convert code so swagger ui can understand
    + swagger-ui-express: add swagger into our app

  9. create swagger.yaml -> copy code from swagger UI editor and paste here
  10.  app.js
  ...
  ...
  13. done

  
  *** After done, we need to upload to host to make it run -> in localhost, we can see the UI, but not functionalities


*/

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// 10.
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')

// 11.
const swaggerDocument = YAML.load('./swagger.yaml')

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// connect DB
const connectDb = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.set('trust proxy', 1)

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
)

app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(xss())

// 13. test in local -> error -> need to up to host
app.get('/', (req, res) => {
  res.send(`
  <h1>Job API</h1>
  <a href='/api-docs'>Documentation</a>
  `)
})

// 12.
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

/*
======================================
CONNECT DB & START SERVER
======================================
*/
const port = process.env.PORT || 5000

const start = async () => {
  try {
    // Connect DB
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
