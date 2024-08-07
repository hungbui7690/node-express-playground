/*
  Hashing Password
  - user sometimes uses same password for everything
    -> must hash password -> generating random bytes and combining it with password before we pipe it to hash function 
  
  - hash is one way -> if input is different, return different result

    @@ npm install bcryptjs
    
  1. controllers -> import bcryptjs

      const salt = await bcrypt.genSalt(10) 
  
  - generating random bytes > 10 = how many random bytes we get 
    > the greater the number, the more secure -> 10 is a big number

  - User model, remove maxlength of password 
    -> just test validator is working or not


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
