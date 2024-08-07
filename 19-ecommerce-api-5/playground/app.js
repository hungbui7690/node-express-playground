/*
  DocGen vs Security Packages
  - pic: docgen
  
  - setup docs -> docgen
    -> this one is simpler than Swagger UI


********************************

  1. Docgen Library: https://github.com/thedevsaddam/docgen
    -> download binary -> window_64.exe -> rename to docgen
  2. Export Postman Collection -> edit -> {{URL}}
      + before
          "url": {
            "raw": "{{URL}}/auth/register",
            "host": [
              "{{URL}}"
            ],
            "path": [
              "auth",
              "register"
            ]
          }

      + after
          "url": {
            "raw": "http://localhost:5000/auth/login",
            "host": ["http://localhost:5000"],
            "path": ["auth", "login"]
          }

  @@ 3. .\docgen.exe build -i ecommerce.json -o index.html
  4. after all -> put in index.html int public/ 


  - If we up to production -> change URL to product URL
  
  5. Browser -> F12 -> Console to see if error exists or not
    + error -> inline JS in public/index.js -> 

  - pic: docgen-fix


********************************

  Security Packages

  1. express-rate-limiter
  2. helmet
  3. xss-clean -> sanitize user inputs
  4. express-mongo-sanitize -> protect mongo db injection
  5. cors (cookies!!!!) -> cookies only work when frontend and backend in the same server


********************************

  1. app.js


*/

require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// 1. import packages
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

const connectDB = require('./db/connect')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')
const notFountMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// 2. use middleware
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
)
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(mongoSanitize())

app.use(cookieParser(process.env.JWT_SECRET))
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('./public'))
app.use(fileUpload())

app.get('/', (req, res) => {
  res.send('Ecommerce API')
})

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies)
  res.send('/api/v1 route')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)

app.use(notFountMiddleware)
app.use(errorHandler)

///////////////////////////
// SERVER & PORT
///////////////////////////
const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB(process.env.MONGO_URI)
  app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
}

start()
