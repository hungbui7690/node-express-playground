/*
  Mongoose Middleware
  - now, our controller becomes busy -> create mongoose middleware
  - Docs -> Search: middleware -> look for "pre"
    + https://mongoosejs.com/docs/middleware.html#pre


  1. User model, right before export -> use "pre"   
    - Note: use normal callback function, since we will access to "this" keyword
      + In pre() -> now is document -> copy from controller to 

  2. controllers -> remove hash section


  @@ Pre('save') hook will run when using .save() or User.create() in controller


*/

require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

// ==== connect DB
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
    // ===== Connect DB
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
