/*
  Security Packages
  - After finish, we will deploy project to Heroku (5$ or 7$) or Render

  - Packages 
    + helmet: the most popular security package 
      -> set various headers to prevent numerous possible attacks
    + cors: ensures that our API is accessible from different domain 
      -> if we don't have cors install, we just can access data from same domain
      -> Cross Origin Resource Sharing: it is a mechanism to allow or restrict requested resources on a Web server, depending on where the request was initiated, by installing and implementing. ->> In general, with this one, we can make our API accessible from public
    + xss-clean: clean library 
      -> sanitizes the user input in query or req.params 
      -> prevent Cross Site Scripting attacks where the attackers try to inject some malicious code
    + express-rate-limit: limit request 
    + express-mongo-sanitize

    
  - later, we can add more packages or more configs -> with these packages, our websites is more secured
  

*****************************

  1. app.js -> import + app.use()

      express-limit-rate:  https://www.npmjs.com/package/express-rate-limit
        const limiter = rateLimit({
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
          standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
          legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        })

      -> scroll down -> default message: 'Too many requests, please try again later.'
      -> statusCode defaults to 429

  2. Setup ->> add trust proxy -> pic: express-limit-rate_proxy


*****************************

  Deploy to Render
  - Steps: pic: render
  - Link: https://nodejs-job-api.onrender.com/


*/

const helmet = require('helmet') // 1.
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

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

app.set('trust proxy', 1) // 2.

// 3.
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)

app.use(express.json())

app.use(helmet()) // 4.
app.use(cors())
app.use(xss())

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
