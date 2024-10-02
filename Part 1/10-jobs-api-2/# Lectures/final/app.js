/*
  Sau khi hoàn thành, chúng ta sẽ deploy project lên heroku (:( >> heroku sẽ tắt free hosting ở Nov 2022) 


  Packages
  - helmet: the most popular security package >> set various headers to prevent numerous posible attacks
  - cors: ensures that our API is accessible from different domain >>> nếu ko có cors install, chúng ta chỉ có thể access data from the same domain  
      >> Cross Origin Resource Sharing: it is a machenism to allow or restrict requested resources on a Web server, depending on where the request was initiated, by installing and implementing. >>> Tóm lại, nhờ thằng này mà chúng ta có thể làm cho API accessible from the public 
  - xss-clean: clean library >> sanitizes the user input ở query cũng như req.params nhằm giúp chúng ta chống lại Cross Site Scripting attacks where the attackers try to inject some malicious code 
  - express-rate-limit: giới hạn request 
   >>>>>> những project sau có thể sử dụng thêm các packages cũng như configs khác >>> nhưng với những packages hiện tại cũng giúp website của chúng ta trở nên khá an toàn

  - Chỗ nguy hiểm nhất là ở chỗ user >>> chúng ta ko làm gì đc
      >>> nhưng chúng ta chỉ có thể bảo vệ đc server của chúng ta 
  
////////////////////////////////////////

  1. vào app.js import và app.use() 

            express-limit-rate:  https://www.npmjs.com/package/express-rate-limit
                  const limiter = rateLimit({
                    windowMs: 15 * 60 * 1000, // 15 minutes
                    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
                    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
                    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
                  })
            kéo xuống sẽ thấy message mặc định là: 'Too many requests, please try again later.', statusCode là Defaults to 429
  2. Setup >>> bỏ trước .json() + thêm trust proxy

  >>>> sau khi xong hết thì chúng ta chuẩn bị up lên host >>> trong trường hợp này chúng ta sử dụng Heroku

*/

// ===== extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
// ============================

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

app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
)

app.use(express.json())
// ===== security package
app.use(helmet())
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
