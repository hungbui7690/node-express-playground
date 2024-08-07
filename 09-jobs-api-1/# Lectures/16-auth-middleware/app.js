/*
  Auth Middleware - Testing
  - after creating auth middleware -> we need to think where to place it
    + in this project, we want to use auth middleware in all jobs routes -> to protect all jobs routes 
    + because when we create our own job, we don't want anyone to modify our job


****************************

  Steps:
  - register -> generate token 
  - job routes require token 
  - everytime we want to access to job routes, we need to send request to server with authorization header in the format of "Bearer <token>"


****************************

  1. create middleware/authentication.js

  2. app.js -> job route
    + app.use('/api/v1/jobs', authenticateUser, jobsRouter)
    + now, all job routes are projected

  3. job controller -> createJob -> test
    + res.json(req.user)

  4. go to db and remove all users

  5. postman
    - /register: create user -> copy token
    - /jobs: create new job -> header -> add authorization -> Bearer <token>
      -> can add manually or automatically (pic: postman-auto-token)
        + if correct -> return id & name -> pic: auth-middleware

****************************

  Add Header Token Automatically in Postman
  - /login
    + server response json data that contains token in /login
        {"user": {
            "name": "testX",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp..."
          }
        }

    + Script tab: 
      # To log out: Ctrl + Alt + C  
      # Add these lines: 

          const jsonData = pm.response.json()
          console.log(jsonData) // ctrl + alt + c
          pm.environment.set("<accessToken>", jsonData.user.accessToken)


  - /jobs
    + Authorization Tab: 
      # Auth Type: Bearer Token
      # Token = <{{accessToken}}>



*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDb = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

// Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra packages
app.use(express.json())

// routes
app.use('/api/v1/auth', authRouter)

app.use('/api/v1/jobs', authenticateUser, jobsRouter) // use here

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
