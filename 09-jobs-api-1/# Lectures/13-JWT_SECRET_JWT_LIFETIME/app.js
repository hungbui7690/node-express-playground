/*
  JWT Secret vs JWT Lifetime
  - https://www.npmjs.com/package/jsonwebtoken -> check expiresIn
    + expiresIn: expressed in seconds or a string describing a time span zeit/ms.
    + Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
  
  @@ https://acte.ltd/vn/utils/randomkeygen
  @@ https://www.allkeysgenerator.com/
    - use to generate secret key for JWT -> more secured keys 
      + Encryption Key , 256-bit
      + pic: keys-generator


  1. after generate key -> go to .env & create JWT_SECRET & JWT_LIFETIME
      JWT_SECRET=?D(G+KbPeShVmYq3t6w9z$B&E)H@McQf
      JWT_LIFETIME=30d

  2. User model to use

      OLD: 
          return jwt.sign({ userID: this._id, name: this.name }, 'jwtSecret', {
              expiresIn: '30d',
          })

      NEW: 
          return jwt.sign(
            { userID: this._id, name: this.name },
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_LIFETIME}
          )
        
  - we've finished /register 

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
