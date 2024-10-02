/*
  Create Job 
  - controllers: we have company, position, status & createdBy -> but we care about company and position
    -> status: we have default value -> createdBy: from auth middleware

  1. collection -> create job
  2. import model, status codes, BadRequestError, NotFoundError
  3. when we create new job -> we need to get the user info -> req.user from auth middleware  
  4. postman -> pic: pm-createJob -> follow this to automatic set Bearer token for /jobs


  *** createJob -> req.body.createdBy = req.user._id
    - since we use method 2 in auth middleware -> we need to take out _id 
    - if we use method 1 -> req.user.userID

****************************

  - To set token automatically in Postman: Tutorials/NodeJS/Postman.pdf -> Set Token Dynamically
    1. Scripts Tab: when user logins, server responses with jsonData.token

        const jsonData = pm.response.json()
        pm.globals.set('token', jsonData.token)

    2. Authorization
      + Auth Type: Bearer Token 
      + Token: {{accessToken}}

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
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
