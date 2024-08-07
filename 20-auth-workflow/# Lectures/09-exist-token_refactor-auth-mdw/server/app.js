/*
  PIC: token-check-existance (***)

  trong model Token có isValid 
  > nếu user làm gì bậy bạ trên website của chúng ta >> isValid sẽ bị set thành false 
  > và khi đó, nếu accessToken hết hạn thì user sẽ ko thể login 

/////////////////////////////////////////////////////////////////////

  (1) create authController.js

  > xong bước (2) >>  xoá hết token trong db >> postman: thử login >> sau đó vào db set valid false rồi login lại xem đc ko >> PIC: update-isValid
  > nhớ set lại thành true
  
/////////////////////////////////////////////////////////////////////

  giờ chúng ta sẽ sang chỗ /middleware/authentication 
  > hiện tại sẽ ko work bởi vì chúng ta đã sửa token thành accessToken + refreshToken
  > trong khi ở middleware thì sử dụng: 
      const token = req.signedCookies.token;

  > giờ nếu vào /users/showMe để show sẽ ko ra >> PIC: authentication-invalid

  (3) vào utils/jwt.js 
    > đổi:    const isTokenValid = ({ token })
    > thành:  const isTokenValid = (token)



    
*/

require('dotenv').config()
require('express-async-errors')
// express

const express = require('express')
const app = express()
// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')

// database
const connectDB = require('./db/connect')

//  routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const orderRouter = require('./routes/orderRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

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

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'))
app.use(fileUpload())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/orders', orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
