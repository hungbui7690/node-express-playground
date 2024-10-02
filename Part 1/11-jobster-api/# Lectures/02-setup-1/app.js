/*
  Setup 
  1. npm install
  2. create .env and provide correct values
  3. npm start


***************************

  Remove Swagger & API Limiter & CORS
  - we don't want external JS apps to access our API (only our front-end) -> remove cors

  1. delete swagger.yaml file
  2. delete API Limiter
  3. app.js


***************************

  Package.json

  4. add "dev" script with nodemon
    - change engines to current version (in my case 16)

    "scripts": {
        "start": "node app.js",
        "dev": "nodemon app.js"
      },

    "engines": {
        "node": "16.x"
      }

  - restart server with "npm run dev"


***************************

  Client Folder
  - let's explore client folder
  - open client folder
  - it's a react app built with CRA
  - it's the same as in my React Course (JOBSTER APP),
  - just base url points to our current server (instead of heroku app) -> client/utils/axios.js

      const customFetch = axios.create({
        baseURL: '/api/v1',
      })

  - notice the build folder (production ready application)
  - in CRA we can create build folder by running "npm run build"
  - that's the one we will use for our front-end

  5. cd client
  6. npm install


***************************

  Setup Front-End
  7. install packages for client 
    cd client
    npm install

  8. require "path" module
  - setup express static (as first middleware)
    to serve static assets from client/build
  - so now instead of public folder we are using client/build

  - serve index.html for all routes (apart from API)
  - front-end routes pick's it up from there

  - navigate to localhost:5000
  - clear local storage (if necessary)

*/

require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const xss = require('xss-clean')

// const cors = require('cors') // 3e.

// const rateLimiter = require('express-rate-limit') // 3c.

// const swaggerUI = require('swagger-ui-express') // 3a. Delete these lines
// const YAML = require('yamljs')
// const swaggerDocument = YAML.load('./swagger.yaml')

const express = require('express')
const app = express()
const path = require('path') // 8a.

const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')
// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// 3d.
// app.set('trust proxy', 1)
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// )

app.use(express.static(path.resolve(__dirname, './client/build'))) // 8b.

app.use(express.json())
app.use(helmet())
// app.use(cors()) // 3f.
app.use(xss())

// 3b.
// app.get('/', (req, res) => {
//   res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
// })
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

// 8c. serve index.html
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
