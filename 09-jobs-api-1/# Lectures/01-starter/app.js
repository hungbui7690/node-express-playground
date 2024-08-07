/*
  Starter Setup
  1. create .env file with 2 variables: 
    - MONGO_URI: Deployment -> Database -> Connect -> Drivers
    - JWT_SECRET: now, use any secrets -> later, will use tool to generate long, complex keys 

  2. npm install
  3. npm start

  4. Folder Structure: 
      - controllers: 
          + auth.js
          + jobs.js
      - db: 
          + connect.js
      - errors: 
          + bad-request.js
          + custom-api.js
          + index.js
          + not-found.js
          + unauthenticated.js
      - middleware: 
          + authentication.js
          + error-handler.js
          + not-found.js
      - models: 
          + Job.js
          + User.js
      - routes:
          + auth.js
          + jobs.js

*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api')
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
