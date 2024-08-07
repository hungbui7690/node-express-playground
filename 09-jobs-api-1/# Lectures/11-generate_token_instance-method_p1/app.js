/*
  Instance Method
  - Mongoose Docs -> Schemas -> Instance Methods
    + https://mongoosejs.com/docs/guide.html#methods

  - when we use User.create() to create user -> this instance will have methods 
    -> we can use this instance method to generate token for us
  

  1. model User -> create method getName
  2. controllers -> use instance method
    + res.status(StatusCodes.CREATED).json({ user: { name: user.getName() }, token })
  3. postman -> test


*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDb = require('./db/connect')

// Routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
// extra packages

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

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
