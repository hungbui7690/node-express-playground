/*
  Register User
  - first, must validate: name, email, password -> use mongoose
  - hash password -> use bcryptjs
  - after success -> create user -> create token with user
    -> with token, user can create resources associated with that user (in this case is jobs)
  - send back response with created token 


******************************
  Steps.
  1. controller/auth.js
  2. postman: 
    - POST: {{URL}}/auth/register -> http://localhost:5000/api/v1/auth/register
        {
            "name": "john",
            "email": "john@gmail.com",
            "password": "secret"
        }
  3. go to controller to test if we receive req.body or not -> res.json(req.body)
  4. const user = await User.create({ ...req.body }) 
    - now, mongoose can perform validation for us
  5. postman + mongodb atlas to test


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
